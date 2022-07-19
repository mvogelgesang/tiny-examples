import {Hook} from '@oclif/core'
import {existsSync, mkdirSync, writeFileSync} from 'node:fs'

/**
 * Hook implementation to create a locally cached file which will allow for resumption of activities. Writes a json file to the cacheDir.
 * @param options object containing 'command' and 'data' keys
 * @returns Promise<void>
 */
const hook: Hook<'state_manager:create'> = async function (options): Promise<void> {
  if (!options.command || !options.nameList) {
    this.log('Missing parameters to create cached file, exiting...', 'info')
    return
  }

  this.log('Caching the list\n')
  if (!existsSync(this.config.cacheDir)) {
    mkdirSync(this.config.cacheDir)
  }

  writeFileSync(`${this.config.cacheDir}/nameList.json`, JSON.stringify(options.nameList))
}

export default hook
