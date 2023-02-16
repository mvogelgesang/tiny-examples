import * as puppeteer from "puppeteer";
import { mkdir } from "fs/promises";
import { existsSync, readFileSync, writeFileSync } from "fs";

const PNG = require("pngjs").PNG;
const pixelmatch = require("pixelmatch");
const screencapFolder = "screencaps/";

let args = require("minimist")(process.argv.slice(2), {
  string: "domain",
  alias: { d: "domain" },
});

const checkFileExists = (cleanURL: string): boolean => {
  return existsSync(`${screencapFolder}${cleanURL}.png`);
};

const cleanUrl = (url: URL): string => {
  return url
    .toString()
    .replace(/(https:\/\/|\/$)/gi, "")
    .replace(/[./:]/gi, "_");
};

const checkSite = async (url: URL, date?: Date) => {
  if (!existsSync("screencaps")) await mkdir("screencaps");
  const browser = await puppeteer.launch({
    executablePath: process.env["PUPPETEER_EXECUTABLE_PATH"],
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(url.toString());
  const cleanURL = cleanUrl(url);
  const imgPath =
    date != undefined
      ? `${screencapFolder}${cleanURL}_${date.toJSON()}.png`
      : `${screencapFolder}${cleanURL}.png`;
  await page.screenshot({ path: imgPath });
  await browser.close();
  return imgPath;
};

const compareImages = (cleanUrl: string, control: string, test: string) => {
  const img1 = PNG.sync.read(readFileSync(control));
  const img2 = PNG.sync.read(readFileSync(test));
  const { width, height } = img1;
  const diff = new PNG({ width, height });

  pixelmatch(img1.data, img2.data, diff.data, width, height, {
    threshold: 0.1,
  });
  const diffPath = `${screencapFolder}${cleanUrl}_DIFF.png`;
  writeFileSync(diffPath, PNG.sync.write(diff));
  return diffPath;
};

(async () => {
  const domains = args.domain ? args.domain.split(",") : [];
  if (domains.length > 0) {
    for (var item in domains) {
      const url = new URL(domains[item]);
      const cleanURL = cleanUrl(url);
      if (checkFileExists(cleanURL)) {
        console.log("\nControl image found, running test");
        const test = await checkSite(url, new Date());
        console.log(
          "Diff created:",
          compareImages(cleanURL, `${screencapFolder}${cleanURL}.png`, test)
        );
      } else {
        const newImgPath = await checkSite(url);
        console.log(
          `\nA control screenshot did not exist, saved to\n${newImgPath}`
        );
      }
    }
  } else {
    console.log(`\nOne or more domain names are required to run this script. \n
        npm run start -- -d "https://blah.com,https://nytimes.com"
        npm run start -- -d https://blah.com
        `);
  }
})();
