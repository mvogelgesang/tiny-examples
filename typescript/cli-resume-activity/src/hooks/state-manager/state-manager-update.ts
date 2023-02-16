import {Hook} from '@oclif/core'
import {writeFileSync} from 'node:fs'
import {retrieveFile} from './helper'

/**
 * Provided the name of a json file, opens it and removes the first element in the array.
 * @param options object containing 'fileName' key
 * @returns Promise<void>
 */
const hook: Hook<'state-manager:update'> = async function (options): Promise<void> {
  this.log('Removing name from list\n')
  const fileName = `${this.config.cacheDir}/${options.fileName}.json`
  const data = await retrieveFile(fileName)
  data.shift()

  writeFileSync(fileName, JSON.stringify(data))
}

export default hook
