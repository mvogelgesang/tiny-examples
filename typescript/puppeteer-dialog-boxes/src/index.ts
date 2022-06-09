import * as puppeteer from "puppeteer";
let args = require("minimist")(process.argv.slice(2), {
  string: "domain",
  alias: { d: "domain" },
});

const checkSite = async (domain) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const url = new URL(domain);
  page.on("dialog", async (dialog) => {
    console.log(dialog.message());
    await dialog.dismiss();
  });
  await page.goto(url.toString());

  await browser.close();
};

(async () => {
  const domains = args.domain ? args.domain.split(",") : [];
  if (domains.length > 0) {
    for (var item in domains) {
      await checkSite(domains[item]);
    }
  } else {
    console.log(`\nOne or more domain names are required to run this script. \n
        npm run start -- -d "https://blah.com,https://nytimes.com"
        npm run start -- -d https://blah.com
        `);
  }
})();
