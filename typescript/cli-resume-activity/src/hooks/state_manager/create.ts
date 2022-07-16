import {Hook} from '@oclif/core'
import {writeFileSync} from 'node:fs'

const hook: Hook<'state_manager:create'> = async function (options): Promise<void> {
  process.stdout.write('Caching the list\n')
  writeFileSync(`${this.config.cacheDir}/nameList.json`, JSON.stringify(options.nameList))
}

export default hook
