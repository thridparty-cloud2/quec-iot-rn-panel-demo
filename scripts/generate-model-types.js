const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer')
const camelCase = require('lodash.camelcase')
const {Project, QuoteKind} = require('ts-morph')

const ROOT_DIR = path.resolve(__dirname, '../')
const ROOT_DIR_SRC = path.resolve(__dirname, '../src')
const MODEL_JSON_DIR = path.join(ROOT_DIR, 'tsl-model-json-folder')
const MODEL_TYPE_FILE = path.join(ROOT_DIR_SRC, 'types/model/index.ts')
const ATTR_CONFIG_FILE = path.join(ROOT_DIR_SRC, 'config/attr.config.ts')

const dataTypeMap = {
    INT: 'number',
    FLOAT: 'number',
    DOUBLE: 'number',
    BOOL: 'boolean',
    ENUM: 'string',
    TEXT: 'string',
    DATE: 'number | string',
}

const modelTypeMap = {
    INT: 'NumberTSLModel',
    FLOAT: 'NumberTSLModel',
    DOUBLE: 'NumberTSLModel',
    BOOL: 'BooleanTSLModel',
    ENUM: 'EnumTSLModel',
    TEXT: 'TextTSLModel',
    DATE: 'DateTSLModel',
}

;(async () => {
    const files = fs
        .readdirSync(MODEL_JSON_DIR)
        .filter(f => f.endsWith('.json'))
    if (files.length === 0) {
        return console.error('❌ 没有可用的 JSON 文件')
    }

    const {selectedFile} = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedFile',
            message: '选择一个 JSON 文件生成 ModelsType：',
            choices: files,
        },
    ])

    const jsonPath = path.join(MODEL_JSON_DIR, selectedFile)
    const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))

    const allProps = [...(json.properties || []), ...(json.events || [])]
    const typeLines = []
    const constSet = new Set()
    const constUsedInType = new Set()

    const getConstName = code =>
        `TSL_ATTR_SUB_${code.toUpperCase().replace(/-/g, '_')}`

    const buildTSLType = item => {
        const code = item.code
        const name = item.name || ''
        const typeName = camelCase(code)
        const comment = `// ${name}`

        let type = ''

        const addNestedConst = code => {
            const constName = getConstName(code)
            constSet.add(`export const ${constName} = '${code}'`)
            constUsedInType.add(constName)
            return constName
        }

        if (item.dataType === 'STRUCT') {
            const inner = item.specs || []
            const fields = inner.map(f => {
                const fieldType = dataTypeMap[f.dataType] || 'any'
                const constName = addNestedConst(f.code)
                return `[${constName}]: ${fieldType}`
            })
            type = `StructTSLModel<{ ${fields.join(', ')} }>`
        } else if (item.dataType === 'ARRAY') {
            const spec = item.specs || {}
            const subType = spec.dataType
            if (subType === 'STRUCT') {
                const inner = spec.specs || []
                const fields = inner.map(f => {
                    const fieldType = dataTypeMap[f.dataType] || 'any'
                    const constName = addNestedConst(f.code)
                    return `[${constName}]: ${fieldType}`
                })
                type = `ArrayTSLModel<{ ${fields.join(', ')} }[]>`
            } else {
                const val = dataTypeMap[subType] || 'any'
                type = `ArrayTSLModel<${val}[]>`
            }
        } else if (item.type === 'EVENT') {
            type = 'EventTSLModel'
            ;(item.outputData || []).forEach(f => addNestedConst(f.code))
        } else {
            type = modelTypeMap[item.dataType] || 'any'
        }

        typeLines.push(`  ${typeName}?: ${type} ${comment}`)
    }

    allProps.forEach(prop => buildTSLType(prop))

    // 构建 index.ts 文件内容
    const header = `import {
    ArrayTSLModel,
    BooleanTSLModel,
    EnumTSLModel,
    EventTSLModel,
    NumberTSLModel,
    StructTSLModel,
    TextTSLModel,
    DateTSLModel,
} from '@quec/panel-model-kit';
import { ${Array.from(constUsedInType).join(
        ', ',
    )} } from '../../config/attr.config';

export type ModelsType = {
${typeLines.join('\n')}
};\n`
    fs.writeFileSync(MODEL_TYPE_FILE, header, 'utf8')

    // 写入 attr.config.ts（去重且只保留 struct/array/event 内部字段）
    const constContent = `// 由脚本自动生成，请勿手动修改
    ${Array.from(constSet).sort().join(';')};`
    fs.writeFileSync(ATTR_CONFIG_FILE, constContent, 'utf8')
    console.log('✅ ModelsType 和 attr.config.ts 生成完成')

    // 👉 添加格式化逻辑
    const {execSync} = require('child_process')
    try {
        execSync(`npx eslint ${MODEL_TYPE_FILE} --fix`, {stdio: 'inherit'})
        execSync(`npx eslint ${ATTR_CONFIG_FILE} --fix`, {stdio: 'inherit'})
        console.log('✨ 已格式化生成文件')
    } catch (err) {
        console.warn('⚠️ ESLint 格式化失败，请确保已正确安装 ESLint')
    }
    console.log('✅ ModelsType 和 attr.config.ts 生成完成')
})()
