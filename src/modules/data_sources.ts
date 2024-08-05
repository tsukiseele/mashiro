/*
 * Copyright (C) 2022. TsukiSeele
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Rules, Section, Props, Meta, RulesLoader } from "../main";

class DataSources {
  rules: Rules;
  section: Section;

  constructor(rules: Rules, section: Section, depth?: number) {
    this.rules = rules
    this.section = section
    if (section.include != null) {
      // section.props = rules.sections?['${section.reuse}']?.props;
      section.props = rules.sections[section.include].props;
    }
    if (depth) section.props = this.getPropsByDepth(depth)
  }

  public getPropsByDepth(depth: number): Props {
    let node = this.section.props;
    for (let i = depth; i > 0; i--) {
      node = node['$children'].props;
    }
    return node;
  }
}

class DataSourcesInfo {
  rulesId: number;
  sectionName: string;
  depth: number = 0;

  constructor(rulesId: number, sectionName: string, depth?: number) {
    this.rulesId = rulesId;
    this.sectionName = sectionName
    if (depth) this.depth = depth
  }

  isAvaliable(): boolean {
    return this.rulesId != null
      && !Number.isNaN(this.rulesId)
      && this.sectionName != null
      && this.sectionName != '';
  }

  getDataSources<T>(rulesList: Rules[], item: Meta): DataSources {
    if (item == null || !item.isAvaliable()) {
      throw Error('Unavailable data sources!');
    }
    const rules = RulesLoader.getRulesById(rulesList, this.rulesId)!;
    const section = rules.sections![item.sectionName]!;

    return new DataSources(rules, section, this.depth);
  }
}
export { DataSources, DataSourcesInfo }