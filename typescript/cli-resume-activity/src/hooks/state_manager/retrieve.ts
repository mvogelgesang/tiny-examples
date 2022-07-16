import {Hook} from '@oclif/core'
import {retrieveFile} from './helper'

const hook: Hook<'state_manager:retrieve'> = async function (): Promise<string[]> {
  const fileName = `${this.config.cacheDir}/nameList.json`
  return retrieveFile(fileName)
}

export default hook
