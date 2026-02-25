const inquirer = require('inquirer')
const shelljs = require('shelljs')
const fs = require('fs')
const path = require('path')
const {quec_dependencies_json, quec_name_map_json} = require('./config')

const projectRoot = path.resolve(__dirname, '..')
const time = new Date()

/**
 * @description 构建命令
 */
async function buildPanel() {
    try {
        const data = fs.readFileSync(projectRoot + '/package.json', 'utf8')
        const packageJson = JSON.parse(data)
        const {version} = await inputVersion(packageJson)
        if (!verifyVersion(version)) {
            return
        }
        createOutFolder()
        execBuild(packageJson, version)
    } catch (error) {
        console.log('构建失败: ' + error.message)
        process.exit(1)
    }
}

/**
 * @description 输入版本号
 */
function inputVersion(packageJson) {
    return inquirer.prompt([
        {
            name: 'version',
            message: `请输入本次构建的版本(当前版本为: ${packageJson.version}):  `,
        },
    ])
}

/**
 * @description 创建构建产物文件夹
 */
function createOutFolder() {
    try {
        shelljs.cd(projectRoot)
        shelljs.rm('-fr', 'out')
        shelljs.mkdir('out')
        shelljs.mkdir('out/iOS')
        shelljs.mkdir('out/android')
    } catch (error) {
        throw error
    }
}

/**
 * @description 执行构建命令
 */
function execBuild(packageJson, nextVersion) {
    try {
        const dependenciesData = genDependenciesData()
        const androidDependenciesData =
            genAndroidDependenciesData(dependenciesData)
        const iosDependenciesData = genIOSDependenciesData(dependenciesData)
        //执行打包命令
        shelljs.exec(
            'npx react-native bundle --entry-file index.js --bundle-output ./out/iOS/index.ios.bundle --sourcemap-output ./out/index.ios.bundle.map --platform ios --assets-dest ./out/iOS --dev false',
        )
        shelljs.exec(
            'npx react-native bundle --entry-file index.js --bundle-output ./out/android/index.android.bundle --sourcemap-output ./out/index.android.bundle.map --platform android --assets-dest ./out/android --dev false',
        )
        //版本写回package.json
        packageJson.version = nextVersion

        fs.writeFileSync(
            shelljs.pwd() + '/package.json',
            JSON.stringify(packageJson, null, '\t'),
        )

        const name = packageJson.name
        const tarAndroidStr = genBuildName({
            platform: 'android',
            name,
            version: nextVersion,
        })
        const tarIosStr = genBuildName({
            platform: 'ios',
            name,
            version: nextVersion,
        })
        shelljs.cd('out/android')
        if (androidDependenciesData.length > 0) {
            const androidJsonObj = {
                name: packageJson.name,
                platform: 1,
                version: nextVersion,
                dependencies: androidDependenciesData,
            }
            fs.writeFileSync(
                shelljs.pwd() + '/quec-dependencies.json',
                JSON.stringify(androidJsonObj, null, '\t'),
            )
        }
        shelljs.exec(`tar --exclude=".*" -czvf ${tarAndroidStr} *`)

        shelljs.cd(projectRoot)
        shelljs.cd('out/iOS')
        if (iosDependenciesData.length > 0) {
            const iOSJsonObj = {
                name: packageJson.name,
                platform: 2,
                version: nextVersion,
                dependencies: iosDependenciesData,
            }
            fs.writeFileSync(
                shelljs.pwd() + '/quec-dependencies.json',
                JSON.stringify(iOSJsonObj, null, '\t'),
            )
        }
        shelljs.exec(`tar --exclude=".*" -czvf ${tarIosStr} *`)
    } catch (error) {
        throw error
    }
}

/**
 * @description 验证版本号
 */
function verifyVersion(nextVersion) {
    const err = new Error()

    const versionNum = nextVersion.split('.')
    const regex = /^\d+$/
    if (
        versionNum.length !== 3 ||
        !versionNum.every(element => regex.test(element))
    ) {
        err.message = '面板版本号需满足a.b.c三位语义化规则, 请重新打包'
        throw err
    } else {
        return true
    }
}

/**
 * @description 生成构建包名称
 */
function genBuildName({platform, name, version}) {
    const timeStamp =
        time.getFullYear().toString() +
        '-' +
        (time.getMonth() + 1) +
        '-' +
        time.getDate().toString() +
        '-' +
        time.getHours().toString() +
        '-' +
        time.getMinutes().toString()

    return `${name}-${platform}-${timeStamp}-${version}.tar.gz`
}

/**
 * @description 生成依赖数据
 */
function genDependenciesData() {
    try {
        let analysis_result = []
        if (shelljs.test('-d', 'node_modules')) {
            shelljs.cd('node_modules')
            const paths = shelljs.find('**/package.json')
            for (let i = 0; i < paths.length; i++) {
                const p = paths[i]
                const data = fs.readFileSync(p, 'utf8')
                try {
                    const packageJson = JSON.parse(data)
                    const name = String(packageJson?.name)
                    const version = String(packageJson?.version)
                    if (name !== 'undefined' && version !== 'undefined') {
                        analysis_result.push({
                            name: name,
                            version: version,
                        })
                    }
                } catch (error) {
                    console.log(`${p}组件package.json解析失败`)
                    console.log('失败原因: ' + error.message)
                }
            }
        }

        // 解析Gitlab API返回的JSON数据，获取dependencies对象和name map对象
        const quec_dependencies = []
        for (const key in quec_dependencies_json) {
            if (
                Object.prototype.hasOwnProperty.call(
                    quec_dependencies_json,
                    key,
                ) &&
                Array.isArray(quec_dependencies_json[key])
            ) {
                quec_dependencies.push(...quec_dependencies_json[key])
            }
        }

        //使用名称映射覆盖analysis_result对应元素
        analysis_result = analysis_result.map(item => {
            if (
                Object.prototype.hasOwnProperty.call(
                    quec_name_map_json,
                    item.name,
                )
            ) {
                return {
                    name: quec_name_map_json[item.name],
                    version: item.version,
                }
            }
            return item
        })

        const panel_dependencies = []
        quec_dependencies.forEach(item => {
            const element = analysis_result.find(e => e.name === item.name)
            if (element !== undefined) {
                panel_dependencies.push({
                    name: item.name,
                    version: element.version,
                    platform: item.platform,
                })
            }
        })
        shelljs.cd(projectRoot)

        return panel_dependencies
    } catch (error) {
        throw error
    }
}

/**
 * @description 生成 Android 依赖数据
 */
function genAndroidDependenciesData(data) {
    return data.filter(
        item => Number(item.platform) === 1 || Number(item.platform) === 3,
    )
}

/**
 * @description 生成 IOS 依赖数据
 */
function genIOSDependenciesData(data) {
    return data.filter(
        item => Number(item.platform) === 2 || Number(item.platform) === 3,
    )
}

buildPanel()
