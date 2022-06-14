// this type is a list of terms which may be passed to the program via a CLI
export type facetType =
  | "screenshot"
  | "lighthouse desktop"
  | "lighthouse mobile"
  | "it performance metric"
  | "site scanner"
  | "uswds";

/**
 * function accepts any string and transforms to lowercase. The lowercase value is validated against the facetType type.
 * https://stackoverflow.com/questions/43677527/typescript-type-ignore-case#answer-64932909
 */
function acceptAnyCaseFacetType<T extends string>(
  facetType: Lowercase<T> extends facetType ? T : facetType
) {
  return facetType.toLowerCase();
}

console.log("SCREENSHOT", acceptAnyCaseFacetType("SCREENSHOT"));
console.log("ScreenSHOT", acceptAnyCaseFacetType("ScreenSHOT"));
console.log("ScreenSHOT", acceptAnyCaseFacetType("ScreenSHOT"));
console.log("lighthouse mobile", acceptAnyCaseFacetType("lighthouse mobile"));
console.log("LightHouse Mobile", acceptAnyCaseFacetType("LightHouse Mobile"));
