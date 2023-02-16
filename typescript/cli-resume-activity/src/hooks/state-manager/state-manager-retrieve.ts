import {Hook} from '@oclif/core'
import {retrieveFile} from './helper'

/**
 * Given a filename, retrieves the json file from the local cache directory
 * @param options object containing 'fileName' key
 * @returns array
 */
const hook: Hook<'state-manager:retrieve'> = async function (options): Promise<string[]> {
  const fileName = `${this.config.cacheDir}/${options.fileName}.json`
  return retrieveFile(fileName)
}

export default hook
