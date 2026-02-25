// 脚本依赖：ts-morph
// 安装命令：yarn add ts-morph

const path = require('path')
const {
    Project,
    SyntaxKind,
    QuoteKind,
    StructureKind,
    TypeGuards,
} = require('ts-morph')
const {factory} = require('ts-morph')
const fs = require('fs')
const inquirer = require('inquirer')
const ROOT_DIR = path.resolve(__dirname, '../src')

const project = new Project({
    tsConfigFilePath: path.resolve(__dirname, '../tsconfig.json'),
    manipulationSettings: {
        quoteKind: QuoteKind.Single,
    },
})

const CONFIG_PATH = path.resolve(
    __dirname,
    '../src/config/route-page.config.ts',
)
const ROUTER_DTS_PATH = path.resolve(__dirname, '../src/router/router.d.ts')
const ROUTER_INDEX_PATH = path.resolve(__dirname, '../src/router/index.tsx')
async function main() {
    const {pageName, pageDescription} = await inquirer.prompt([
        {
            type: 'input',
            name: 'pageName',
            message: '请输入页面名称（例如：ExamplePage）：',
            validate: val =>
                /^[A-Z][A-Za-z0-9]*Page$/.test(val) ||
                '必须是合法的 PascalCase 且以 Page 结尾',
        },
        {
            type: 'input',
            name: 'pageDescription',
            message: '请输入页面描述（例如：更多帮助页面）：',
        },
    ])

    const pageConstName = `PAGE_${pageName
        .replace(/([A-Z])/g, '_$1')
        .toUpperCase()
        .replace(/^_/, '')
        .replace(/_PAGE$/, '')}`
    const pageFileName = pageName
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        // 也处理连续多个大写转小写间的连接，如 ReadMe → Read-Me
        .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
        .toLowerCase()

    // 1. 修改 route-page.config.ts
    const configSource = project.addSourceFileAtPath(CONFIG_PATH)
    configSource.addStatements([
        '/**',
        ` * ${pageDescription}`,
        ' */',
        `export const ${pageConstName} = '${pageName}';`,
    ])

    // 2. 修改 router.d.ts
    const dtsSource = project.addSourceFileAtPath(ROUTER_DTS_PATH)
    const rootStackTypeAlias =
        dtsSource.getTypeAliasOrThrow('RootStackParamList')
    const typeNode = rootStackTypeAlias.getTypeNodeOrThrow()

    typeNode.addProperty({
        name: `[PAGES.${pageConstName}]`,
        type: 'undefined',
    })

    // 3. 修改 router/index.tsx
    const pagePath = `../page/${pageFileName}`

    const indexSource = project.addSourceFileAtPath(ROUTER_INDEX_PATH)
    const importDecl = indexSource.addImportDeclaration({
        defaultImport: pageName,
        moduleSpecifier: pagePath,
    })

    const pageRoutesVar = indexSource.getVariableDeclaration('PageRoutes')
    const objLiteral = pageRoutesVar?.getInitializerIfKindOrThrow(
        SyntaxKind.ObjectLiteralExpression,
    )
    objLiteral?.addPropertyAssignment({
        name: pageName,
        initializer: `new PageRouterImp(PAGES.${pageConstName}, ${pageName}, { headerShown: false })`,
    })

    await project.save()

    // 4. 创建页面文件夹与模板文件
    const pageDir = path.join(ROOT_DIR, 'page', pageFileName)
    fs.mkdirSync(pageDir, {recursive: true})
    const content =
        "import React, { FC, useMemo } from 'react';\n" +
        "import { useNavigation } from '../../hooks';\n\n" +
        "import { IconModel, PageContainer } from '@quec/panel-business-kit';\n" +
        "import { useDevice } from '@quec/panel-device-kit';\n" +
        "import { useModel } from '../../App';\n" +
        `import { ${pageName}Styles } from './style';\n` +
        "import { useThemeColors, useThemeImg } from '../../hooks/theme';\n\n" +
        `interface ${pageName}Props {}\n\n` +
        `const ${pageName}: FC<${pageName}Props> = () => {\n` +
        '    const device = useDevice();\n' +
        '    const colors = useThemeColors();\n' +
        '    const images = useThemeImg();\n\n' +
        '    const navigation = useNavigation();\n' +
        '    const models = useModel();\n\n' +
        '    const rightIcons = useMemo<Array<IconModel>>(() => {\n' +
        '        return [\n' +
        '            // {\n' +
        '            //     icon: images.alarmFault,\n' +
        '            //     onClick: () => {},\n' +
        '            // },\n' +
        '        ];\n' +
        '    }, [images]);\n\n' +
        '    return (\n' +
        '        <>\n' +
        '            <PageContainer\n' +
        '                headerTitle={device?.deviceName}\n' +
        '                rightIcons={rightIcons}\n' +
        '                hideStatusBar\n' +
        '            >\n' +
        '                <></>\n' +
        '            </PageContainer>\n' +
        '        </>\n' +
        '    );\n' +
        '};\n\n' +
        `export default ${pageName};\n`
    fs.writeFileSync(path.join(pageDir, 'index.tsx'), content)

    const styleContent =
        "import { StyleSheet } from 'react-native';\n" +
        `export const ${pageName}Styles = StyleSheet.create({\n` +
        '    container: {\n' +
        '        flex: 1,\n' +
        '        paddingHorizontal: 16,\n' +
        '    },\n' +
        '    content: {\n' +
        '        flex: 1,\n' +
        "        justifyContent: 'center',\n" +
        "        alignItems: 'center',\n" +
        '    },\n' +
        '    contentText: {},\n' +
        '});\n'

    fs.writeFileSync(path.join(pageDir, 'style.ts'), styleContent)

    console.log('✅ 页面路由已成功添加：', pageName)
}

main().catch(err => {
    console.error('❌ 添加失败:', err)
})
