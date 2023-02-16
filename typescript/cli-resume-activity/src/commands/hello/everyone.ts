import {Command, Flags} from '@oclif/core'

export default class Everyone extends Command {
  static description = 'Say hello to everyone in a list';
  static nameList: string[] = [
    'Liam',
    'Olivia',
    'Noah',
    'Emma',
    'Oliver',
    'Charlotte',
    'Elijah',
    'Amelia',
    'James',
    'Ava',
    'William',
    'Sophia',
    'Benjamin',
    'Isabella',
    'Lucas',
    'Mia',
    'Henry',
    'Evelyn',
    'Theodore',
    'Harper',
    'Jack',
    'Luna',
    'Levi',
    'Camila',
    'Alexander',
    'Gianna',
    'Jackson',
    'Elizabeth',
    'Mateo',
    'Eleanor',
    'Daniel',
    'Ella',
    'Michael',
    'Abigail',
    'Mason',
    'Sofia',
    'Sebastian',
    'Avery',
    'Ethan',
    'Scarlett',
    'Logan',
    'Emily',
    'Owen',
    'Aria',
    'Samuel',
    'Penelope',
    'Jacob',
    'Chloe',
    'Asher',
    'Layla',
    'Aiden',
    'Mila',
    'John',
    'Nora',
    'Joseph',
    'Hazel',
    'Wyatt',
    'Madison',
    'David',
    'Ellie',
    'Leo',
    'Lily',
    'Luke',
    'Nova',
    'Julian',
    'Isla',
    'Hudson',
    'Grace',
    'Grayson',
    'Violet',
    'Matthew',
    'Aurora',
    'Ezra',
    'Riley',
    'Gabriel',
    'Zoey',
    'Carter',
    'Willow',
    'Isaac',
    'Emilia',
    'Jayden',
    'Stella',
    'Luca',
    'Zoe',
    'Anthony',
    'Victoria',
    'Dylan',
    'Hannah',
    'Lincoln',
    'Addison',
    'Thomas',
    'Leah',
    'Maverick',
    'Lucy',
    'Elias',
    'Eliana',
    'Josiah',
    'Ivy',
    'Charles',
    'Everly',
  ];

  static examples = [
    `$ oex hello everyone
... (./src/commands/hello/world.ts)
`,
  ];

  static flags = {
    ...Command.flags,
    resume: Flags.boolean({
      char: 'r',
      description: 'Flag denoting whether to resume the operation where it left off previously.',
      default: false,
    }),
  };

  static args = [];

  static fileName = 'nameList';

  async run(): Promise<void> {
    const {flags} = await this.parse(Everyone)

    const delay = (time: number): Promise<void> => {
      // eslint-disable-next-line no-promise-executor-return
      return new Promise(resolve => setTimeout(resolve, time))
    }

    if (flags.resume) {
      this.log('Attempting to resume previous operation.')
      const result = await (await this.config.runHook('state-manager:retrieve', {fileName: Everyone.fileName})).successes[0].result
      if (result.length > 0) {
        this.log(`${result.length} records found`)
        Everyone.nameList = result
      } else {
        this.log('Data was not present in the cache, operation will restart from the beginning')
      }
    }

    await this.config.runHook('state-manager:create', {nameList: Everyone.nameList, fileName: Everyone.fileName})

    for (const element of Everyone.nameList) {
      this.log(`hello ${element}!`)
      // eslint-disable-next-line no-await-in-loop
      await this.config.runHook('state-manager:update', {fileName: Everyone.fileName})
      // eslint-disable-next-line no-await-in-loop
      await delay(1000)
    }
  }
}
