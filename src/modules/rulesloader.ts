import * as fs from 'fs/promises'
import { Rules } from '../typings/mashiro'
/**
 *
 * @param dir
 * @returns paths
 */
async function listFiles(dir: string, exts: string[]): Promise<string[]> {
  const files: string[] = []
  const items = await fs.readdir(dir)
  if (!dir.endsWith('/')) {
    dir += '/'
  }
  for (const item of items) {
    const path = `${dir}${item}`
    const stat = await fs.stat(path)
    if (stat.isDirectory()) {
      files.push(...(await listFiles(path, exts)))
    } else if (stat.isFile()) {
      if (exts) {
        for (const ext of exts) {
          if (path.endsWith(ext)) {
            files.push(path)
          }
        }
      } else {
        files.push(path)
      }
    }
  }
  return files
}

/**
 *
 * @param file
 * @returns
 */
// async function loadSite(file: string) {
//   return await fs.readFile(file)
// }
async function loadFromPath(file: string): Promise<Rules | undefined> {
  // return await fs.readFile(file)
  try {
    const rules = JSON.parse((await fs.readFile(file)).toString()) as Rules
    // 注入默认请求头
    setDefaultHeaders(rules)
    // 复用规则
    includeRules(rules)
    if (checkRules(rules)) return rules
  } catch (e) {
    console.warn(`JSON load failed: ${file}, Cause: ${(e as Error).message}`)
  }
}

/**
 *
 * @param dir
 * @returns 解析目录下所有json为对象
 */
async function loadAllFromPath(dir: string): Promise<Rules[]> {
  const resultSet: Rules[] = []
  for (const file of await listFiles(dir, ['.json'])) {
    const rules = await loadFromPath(file)
    rules && resultSet.push(rules)
  }
  return resultSet
}

function checkRules(rules: Rules) {
  if (!(rules && rules.sections)) throw new Error('Empty site rules!')
  const values = Object.values(rules.sections)
  if (!(values && values.length && (values[0].props || values[0].include))) throw new Error('Invalid site rules!')
  return rules
}

function includeRules(rules: Rules) {
  if (rules && rules.sections) {
    Object.entries(rules.sections).forEach(([, section]) => {
      if (section && section.include && rules.sections[section.include]) {
        section.props = rules.sections[section.include].props
      }
    })
  }
  return rules
}

function getRulesById(rules: Rules[], id: number): Rules | undefined {
  return rules.find(item => item.id == id)
}

/**
 * 设置默认的请求头
 * @param rules
 */
function setDefaultHeaders(rules: Rules) {
  if (!rules) return
  const headers = rules.headers || {}
  if (!headers.hasOwnProperty('User-Agent')) {
    headers['User-Agnet'] = 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36'
  }
  if (!headers.hasOwnProperty('Referer') && rules.sections?.home?.index) {
    const match = new RegExp('https?://.+?/').exec(rules.sections.home.index)
    if (match && match[0]) headers['Referer'] = match[0]
  }
  // if (headers.hasOwnProperty('Cookie')) {
  //   headers['Cookie'] = headers['Cookie'] + 'SameSite=None; Secure;'
  // }
  rules.headers = headers
}

export {
  setDefaultHeaders,
  includeRules,
  checkRules,
  loadFromPath,
  loadAllFromPath,
  getRulesById,
}
