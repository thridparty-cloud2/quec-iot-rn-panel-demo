import {fileURLToPath} from 'url'
import path from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const assetsDir = path.resolve(__dirname, '../src/assets')
const outputFile = path.resolve(__dirname, '../src/types/assets/index.ts')

function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir)
    for (const file of files) {
        const fullPath = path.join(dir, file)
        const stat = fs.statSync(fullPath)
        if (stat.isDirectory()) {
            getAllFiles(fullPath, fileList)
        } else {
            fileList.push(path.relative(assetsDir, fullPath))
        }
    }
    return fileList
}

function parseFileToType(fileName) {
    const str = fileName.split('/')
    if (str.length !== 2) {
        return
    }
    return `"${str[1]}"`
}
function parseFileToMap(fileName) {
    const str = fileName.split('/')
    if (str.length !== 2) {
        return
    }
    return `  "${str[1]}": require("../../assets/${str[0]}/${str[1]}"),`
}

const files = getAllFiles(assetsDir)
    .filter(f => /\.(png|jpe?g|gif|svg|webp|bmp|json)$/i.test(f))
    .map(f => f.replace(/\\/g, '/'))

// 生成 TypeScript 类型
const typeContent = `// 自动生成，请勿手动修改
// 共 ${files.length} 静态资源
export type AssetsName = ${files.map(f => parseFileToType(f)).join(' | ')};

// 映射对象
export const assets: Record<AssetsName, any> = {
${files.map(f => parseFileToMap(f)).join('\n')}
};
`

fs.mkdirSync(path.dirname(outputFile), {recursive: true})
fs.writeFileSync(outputFile, typeContent)

console.log(
    `✅ Generated ${files.length} assets names and mapping to: ${outputFile}`,
)
