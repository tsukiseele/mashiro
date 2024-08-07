import path from 'path'
import fs from 'fs/promises'
import { log, error, debug } from 'console'

it('test', async () => {
  expect(true).toBe(true)
})
/*
it('test', async () => {
  const files = await fs.readdir('E:/Games/COM3D2/Mod/__Append__', { recursive: true })
  const menuFiles = files.filter(item => item.endsWith('.menu')).map(item => ({ path: item, name: path.basename(item) }))

  var newarr: {}[] = [];
  let text = '';
  for (var i = 0; i < menuFiles.length; i++) {

    const j = menuFiles.findIndex(item => item.name == menuFiles[i].name)
    if (j != i) {
      const diff = [menuFiles[i], menuFiles[j]]
      text += `${diff[0].path}\n${diff[1].path}\n\n`
      newarr.push(diff);
    }
  }
  text += `\n共${newarr.length}项重复\n`
  await fs.writeFile(path.join('diff_list.txt'), text)
  // const diffMenuFiles = menuFiles.
  // log(`共${newarr.length}项重复`);

  expect(true).toBe(true)

}, 1000 * 60 * 60 * 24)

*/