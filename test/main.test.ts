import Mashiro from '../src/modules/mashiro';
import RulesLoader from '../src/modules/rulesloader';
import { log, error, debug } from 'console'
import fs from 'fs/promises'
import path from 'path'

it('tests', async () => {
  const siteAlias = 'chan-sankaku'
  const rulesDir = path.join(__dirname, 'rules')
  const page = 1
  const keyword = 'kani_biimu'
  // 抓取开始
  const rules = await RulesLoader.loadAllFromPath(rulesDir);
  const rule = rules.find((item) => item.name.toLowerCase().indexOf() >= 0)
  if (rule) {
    const mashiro = new Mashiro(rule)
    const root = await mashiro
      .setPage(page)
      .setKeywords(keyword)
      .parseRoot()
    for (const node of root)  {
      const children = await mashiro.parseChildrenConcurrency(node, node.$section.props)
      log(children)
    }
    log(root.map(item => ({
      title: item['title'],
      coverUrl: item['coverUrl'],
      children: item['$children']
    })))
  } else {

  }

  // expect(1).toBe(2)
});
