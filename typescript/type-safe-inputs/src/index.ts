/* https://dev.to/hansott/how-to-check-if-string-is-member-of-union-type-1j4m */
/* quality explanation, https://stackoverflow.com/questions/66993264/what-does-the-as-const-mean-in-typescript-and-what-is-its-use-case 
https://stackoverflow.com/questions/52085454/typescript-define-a-union-type-from-an-array-of-strings
*/
const VOWELS = ["a", "e", "i", "o", "u"] as const;
type VowelTuple = typeof VOWELS;
// uses indexed access types to basically convert a readonly array to a union type
// https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html#handbook-content
type Vowel = VowelTuple[number];
let argv = require("minimist")(process.argv.slice(2));

function isVowel(value: string): value is Vowel {
  return VOWELS.includes(value as Vowel);
}
console.log(argv);

argv._.forEach((element: string) => {
  console.log(element);
  console.log(isVowel(element));
});
