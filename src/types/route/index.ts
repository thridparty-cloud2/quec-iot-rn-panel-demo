import {RootStackParamList} from '../../router/router'

type HeaderOptions = {
  props?: any
  headerShown?: boolean
  title?: string
  barStyle?: 'dark' | 'light'
}

export class PageRouterImp {
  pageName: keyof RootStackParamList
  pageClass: any
  pageOptions?: HeaderOptions
  constructor(pageName: keyof RootStackParamList, pageClass: any, pageOptions?: HeaderOptions) {
    this.pageName = pageName
    this.pageClass = pageClass
    this.pageOptions = {
      headerShown: false,
      ...(pageOptions || {}),
    }
  }
}
