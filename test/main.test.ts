import { Mashiro } from '../src/modules/mashiro';
import { Meta } from '../src/typings/mashiro';
import * as RulesLoader from '../src/modules/rulesloader';
import { log, error, debug } from 'console'
import path from 'path'
import fs from 'fs/promises'

const SECONDS = 1000;

/**
 * 简易抓取示例
 * 预置规则文件路径：./rules
 * 
 * 可编写规则即可进行爬取绝大多数网站
 */

it('tests', async () => {
  const siteAlias = 'safebooru'
  const rulesDir = path.join(__dirname, 'rules')
  const keyword = 'ogipote'
  let page = 1
  // 抓取开始
  const rules = await RulesLoader.loadAllFromPath(rulesDir);
  const rule = rules.find((item) => item.name.toLowerCase().indexOf(siteAlias) >= 0)
  if (rule) {
    const mashiro = new Mashiro(rule)
    // 解析首页数据
    let root: Meta[] = []
    do {
      root = await mashiro
        .setPage(page++)
        .setKeywords(keyword)
        .parseRoot()
      // 解析子节点树
      for (const node of root) {
        if (node && node.$section) {
          await mashiro.parseChildrenConcurrency(node, node.$section.props)
          log(node)
        }
      }
      log(root.map(item => ({
        title: item['title'],
        coverUrl: item['coverUrl'],
        children: item['$children']
      })))
    } while (root && root.length)
  } else {
    error(`未匹配到规则: ${siteAlias}`)
  }
  expect(true).toBe(true)
}, 60 * 60 * 24 * SECONDS);
