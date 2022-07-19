import {Hook} from '@oclif/core'
import {writeFileSync} from 'node:fs'
import {retrieveFile} from './helper'

/**
 * Provided the name of a json file, opens it and removes the first element in the array.
 * @returns Promise<void>
 */
const hook: Hook<'state_manager:update'> = async function (): Promise<void> {
  this.log('Removing name from list\n')
  const fileName = `${this.config.cacheDir}/nameList.json`
  const data = await retrieveFile(fileName)
  data.shift()

  writeFileSync(fileName, JSON.stringify(data))
}

export default hook
