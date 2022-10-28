// tslint:disable no-implicit-dependencies
import {Command, Config, Flags, HelpBase, Interfaces, loadHelpClass, Plugin, toConfiguredId} from '@oclif/core'
import * as fs from 'fs-extra'
import * as _ from 'lodash'
import * as path from 'path'
import {URL} from 'url'

import {castArray, compact, sortBy, template, uniqBy} from '../util'
import {HelpCompatibilityWrapper} from '../help-compatibility'

const normalize = require('normalize-package-data')
const columns = Number.parseInt(process.env.COLUMNS!, 10) || 120
const slugify = new (require('github-slugger') as any)()

interface HelpBaseDerived {
  new (config: Interfaces.Config, opts?: Partial<Interfaces.HelpOptions>): HelpBase;
}

export default class Readme extends Command {
  static description = `adds commands to README.md in current directory
The readme must have any of the following tags inside of it for it to be replaced or else it will do nothing:
# Usage
<!-- usage -->
# Commands
<!-- commands -->

Customize the code URL prefix by setting oclif.repositoryPrefix in package.json.
`

  static flags = {
    dir: Flags.string({description: 'output directory for multi docs', default: 'docs', required: true}),
    multi: Flags.boolean({description: 'create a different markdown page for each topic'}),
    aliases: Flags.boolean({description: 'include aliases in the command list', allowNo: true, default: true}),
  }

  private HelpClass!: HelpBaseDerived

  async run(): Promise<void> {
    const {flags} = await this.parse(Readme)
    const cwd = process.cwd()
    const readmePath = path.resolve(cwd, 'testReadme.md')
    const config = await Config.load({root: cwd, devPlugins: false, userPlugins: false})

    try {
      const p = require.resolve('@oclif/plugin-legacy', {paths: [cwd]})
      const plugin = new Plugin({root: p, type: 'core'})
      await plugin.load()
      config.plugins.push(plugin)
    } catch {}

    await (config as Config).runHook('init', {id: 'readme', argv: this.argv})

    this.HelpClass = await loadHelpClass(config)

    let readme = await fs.readFile(readmePath, 'utf8')

    readme = this.replaceTag(readme, 'toc', this.toc(config, readme))

    readme = readme.trimEnd()
    readme += '\n'

    await fs.outputFile(readmePath, readme)
  }

  replaceTag(readme: string, tag: string, body: string): string {
    if (readme.includes(`<!-- ${tag} -->`)) {
      if (readme.includes(`<!-- ${tag}stop -->`)) {
        readme = readme.replace(new RegExp(`<!-- ${tag} -->(.|\n)*<!-- ${tag}stop -->`, 'm'), `<!-- ${tag} -->`)
      }

      this.log(`replacing <!-- ${tag} --> in README.md`)
    }

    return readme.replace(`<!-- ${tag} -->`, `<!-- ${tag} -->\n${body}\n<!-- ${tag}stop -->`)
  }

  toc(__: Interfaces.Config, readme: string): string {
    return readme.split('\n').filter(l => l.startsWith('# '))
    .map(l => l.trim().slice(2))
    .map(l => `* [${l}](#${slugify.slug(l)})`)
    .join('\n')
  }

 
}