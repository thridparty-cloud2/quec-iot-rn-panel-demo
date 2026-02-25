export interface PageProps<P> {
  navigation: any
  route: PagePropsRoute<P>
}

export interface PagePropsRoute<P> {
  key: string
  name: string
  params: P
}
