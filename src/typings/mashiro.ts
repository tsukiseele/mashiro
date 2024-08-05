import { DataSources, DataSourcesInfo } from '../modules/data_sources';

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
  include: string
  name?: string
  detail?: string
  props: Props
}

declare interface Props {
  [key: string]: Selector
}

declare interface Selector {
  selector: string
  regex: string,
  capture?: string
  replacement?: string
  flat?: boolean,
  props: Props
}

declare interface Meta {
  children?: Meta[]
  dataSourcesInfo: DataSourcesInfo
  [key: string]: any
  // $children?: string
  // $site?: Rules
  // $section?: Section
}

export {
  RequestOptions,
  Rules,
  Headers,
  Sections,
  Section,
  Props,
  Selector,
  Meta,
  // DataSources,
  // DataSourcesInfo
}