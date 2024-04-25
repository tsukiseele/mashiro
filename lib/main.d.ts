import * as cheerio from 'cheerio';

/**
 * 站点内容解析器，通过加载JSON配置抓取网页内容，并封装成数据集
 *
 * @author tsukiseele
 * @date 2022.6.20
 * @license MIT
 */

declare const config: {
    request: (url: string, options: RequestOptions) => Promise<string>;
};
declare interface RequestOptions {
    headers?: Headers;
    timeout?: number;
}
declare class Kumoko<T extends Meta> {
    site: Site | undefined;
    page: number;
    keywords: string | undefined;
    request: ((url: string, options: RequestOptions) => Promise<string | undefined>) | undefined;
    /**
     * 通过配置构造一个抓取对象
     * @param {Site} site 规则
     */
    constructor(site: Site);
    setSite(site: Site): Kumoko<T>;
    setPage(page: number): Kumoko<T>;
    setKeywords(keywords: string): Kumoko<T>;
    setRequest(request: (url: string, options: RequestOptions) => Promise<string | undefined>): Kumoko<T>;
    /**
     * 解析Section对象，返回结果集
     * @param {Section} section 站点板块
     * @param {Number} deep 解析深度
     * @return {Promise<<T extends Meta>[]>}
     */
    parseRoot(isParseChildren?: boolean): Promise<T[]>;
    parseChildrenOfList(list: T[], rules: Rules): Promise<void>;
    /**
     * 解析Children，自动检测末尾，自动继承父级，自动拉平单项子级
     * @param {*} item
     * @param {*} rules
     * @return {Promise<T extends Meta>}
     */
    parseChildrenConcurrency(item: T, rules: Rules, extend?: boolean): Promise<T>;
    /**
     * 解析Rule对象，返回结果集
     * @param {Number} page 页码
     * @param {Number} keywords 关键字
     * @returns {Promise<<T extends Meta>[]>}
     */
    parseRules(_url: string, rule: Rules, page?: number, keywords?: string | undefined): Promise<T[]>;
    /**
     * 请求文档内容，默认使用fetch发送请求，自动注入请求头
     * @param {String} url 链接
     * @param {Object} options 操作
     * @returns {Promise<String>} 响应文本
     */
    requestText(url: string, options: RequestOptions): Promise<string | undefined>;
    /**
     * 获取当前板块
     * @returns {Section}
     */
    getCurrentSection(): Section;
    /**
     * 遍历选择器
     * @param {cheerio.CheerioAPI} $ 文档上下文
     * @param {string} selector 选择器
     * @param {function} each
     */
    selectEach($: cheerio.CheerioAPI, selector: string, each: (content: string, index: number) => void): void;
    /**
     * 替换正则式
     * @param {String} text 文本
     * @param {String} capture 截取式
     * @param {String} replacement 替换式
     * @returns {String} 结果
     */
    replaceRegex(text: string, capture?: string, replacement?: string): string;
    /**
     * 替换URL模板
     * @param {String} template 模板
     * @param {Number} page 当前页码
     * @param {String} keywords 关键字
     * @returns {String} 真实URL
     */
    replaceUrlTemplate(template: string, page: number, keywords?: string): string;
    /**
     * 对象比较
     * see https://stackoverflow.com/a/6713782
     * @author Jean Vincent
     * @param {*} x
     * @param {*} y
     * @param {*} deep deep equals
     * @returns
     */
    objectEquals(x: any, y: any, deep?: boolean): boolean;
}

export { Kumoko, type RequestOptions, config };
