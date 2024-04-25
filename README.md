# Mashiro
### 开箱即用的网页内容抓取器

## Required - 需要

Node.js 18+


## Usage - 使用

#### Use NPM
```
npm i @nyarray/mashiro --save
```
#### Use Yarn
```
yarn add @nyarray/mashiro
```

#### Example

``` js
const siteAlias = 'chan-sankakucomplex' // or 'yande'......
const rulesDir = path.join(__dirname, 'rules')
const keyword = 'kani_biimu' // search keyword or tag
let page = 1 
// Load rules from dir 
const rules = await RulesLoader.loadAllFromPath(rulesDir);
const rule = rules.find((item) => item.name.toLowerCase().indexOf(siteAlias) >= 0)
if (rule) {
  const mashiro = new Mashiro(rule)
  // Parse home page data to generate data set
  let root: Meta[] = []
  do {
    root = await mashiro
      .setPage(page++)
      .setKeywords(keyword)
      .parseRoot()
    // Parse sub-node tree based on data set
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
  error(`Rule not found: ${siteAlias}`)
}
```

## License

MIT LIcense