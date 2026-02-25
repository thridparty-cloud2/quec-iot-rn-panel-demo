import {assets, AssetsName} from '../types/assets'

/**
 * 根据 name 获取 assets
 * @param name
 * @returns
 */
function getAssets(name: AssetsName) {
  return assets[name]
}

export {getAssets}
