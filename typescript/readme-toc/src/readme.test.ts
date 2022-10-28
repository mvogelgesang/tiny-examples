import {expect, test} from '@oclif/test'
import * as fs from 'fs-extra'
import * as path from 'path'

process.env.NODE_ENV = 'development'
const readmeFileName = 'testReadme.md'
const readme = fs.readFileSync(readmeFileName, 'utf8')

describe('readme', () => {
  test
  .stdout()
  .finally(() => fs.writeFile(readmeFileName, readme))
  .command(['readme'])
  .it('runs readme', () => {
    // expect(fs.readFileSync(readmeFileName, 'utf8')).to.contain('manifest')
    expect(fs.readFileSync(readmeFileName, 'utf8')).to.contain('multi')
  })

  test
  .stdout()
  .finally(() => fs.writeFile(readmeFileName, readme))
  .finally(() => fs.remove('docs'))
  .command(['readme', '--multi'])
  .it('runs readme --multi', () => {
    // expect(fs.readFileSync(readmeFileName, 'utf8')).to.contain('manifest')
    expect(fs.readFileSync(readmeFileName, 'utf8')).to.contain('multi')
  })

  describe('with custom help that does not implement formatCommand', () => {
    const rootPath = path.join(__dirname, '../fixtures/cli-with-custom-help-no-format-command')
    const readmePath = path.join(rootPath, readmeFileName)
    const originalReadme = fs.readFileSync(readmePath, 'utf8')

    test
    .stdout()
    .finally(() => fs.writeFileSync(readmePath, originalReadme))
    .stub(process, 'cwd', () => rootPath)
    .command(['readme'])
    .catch(error => {
      expect(error.message).to.contain('Please implement `formatCommand`')
    })
    .it('prints a helpful error message')
  })
})