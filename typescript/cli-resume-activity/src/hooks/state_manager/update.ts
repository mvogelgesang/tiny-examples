import {Hook} from '@oclif/core'
import {writeFileSync} from 'node:fs'
import {retrieveFile} from './helper'

const hook: Hook<'state_manager:update'> = async function (): Promise<void> {
  process.stdout.write('Removing name from list\n')
  const fileName = `${this.config.cacheDir}/nameList.json`
  const data = await retrieveFile(fileName)
  data.shift()

  writeFileSync(fileName, JSON.stringify(data))
}

export default hook
