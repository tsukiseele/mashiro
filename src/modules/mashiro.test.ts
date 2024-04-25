import Mashiro from './mashiro';
import RuleLoader from './rulesloader';
import {log, error} from 'console'
import fs from 'fs/promises'
import path from 'path'


it('tests', async () => {
  // const sites = await RuleLoader.loadSites(path.join(__dirname, 'rules'));
  const result = [1,2,3].find((item) => item == 2)
  log(result)
  expect(true).toBe(true)
});