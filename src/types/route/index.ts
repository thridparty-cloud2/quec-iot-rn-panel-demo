import {RootStackParamList} from '../../router/router'

type HeaderOptions = {headerShown?: boolean; title?: string}

export class PageRouterImp {
    pageName: keyof RootStackParamList
    pageClass: any
    pageOptions?: HeaderOptions
    constructor(
        pageName: keyof RootStackParamList,
        pageClass: any,
        pageOptions: HeaderOptions = {
            headerShown: false,
        },
    ) {
        this.pageName = pageName
        this.pageClass = pageClass
        this.pageOptions = pageOptions
    }
}
