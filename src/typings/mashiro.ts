declare interface RequestOptions {
  headers?: Headers
  timeout?: number
}

declare interface Rules {
  name: string
  id: number
  version: number
  author: string
  rating: string
  details: string
  type: string
  icon: string
  headers: Headers
  sections: Sections
}

declare interface Headers {
  [key: string]: string
}

declare interface Sections {
  [key: string]: Section
  home: Section
  search: Section
}

declare interface Section {
  index: string
  reuse: string
  name?: string
  detail?: string
  props: Props
}

declare interface Props {
  [key: string]: Selector
  $children: ChildrenNode
}

declare interface ChildrenNode extends Selector {
  flat?: boolean,
  props: Props
}

declare interface Selector {
  selector: string
  regex: string,
  capture?: string
  replacement?: string
}

declare interface Meta {
  children?: Meta[]
  $children?: string
  $site?: Rules
  $section?: Section
  [key: string]: any
}

export {
  RequestOptions,
  Rules,
  Headers,
  Sections,
  Section,
  Props,
  ChildrenNode,
  Selector,
  Meta
}