import puppeteer from "puppeteer";

/**
 * Headlessly loads a file or domain and saves a screenshot
 * @param domain {URL}
 * @returns {string} name of file created
 */
const loadPage = async (domain: URL): Promise<string> => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(domain.toString(), { waitUntil: "networkidle2" });
  const fileName = createFileName(domain);
  await page.screenshot({
    path: `./${fileName}`,
  });
  await browser.close();
  return fileName;
};

/**
 * Given a domain, constructs a filename containing the hostname or path and today's date
 * xkcd_
 * @param domain {URL}
 * @returns {string}
 */
const createFileName = (domain: URL): string => {
  // if a file is passed, returns the file name, otherwise returns hostname
  const name =
    domain.protocol === "file:"
      ? domain.pathname.split("/")[domain.pathname.split("/").length - 1]
      : domain.hostname;
  return `${name}_${new Date().toJSON()}.png`;
};

const go = async () => {
  const local = new URL(`file://${__dirname}/test.html`);
  const online = new URL(`https://xkcd.com`);
  const localImagePath = await loadPage(local);
  const onlineImagePath = await loadPage(online);
  console.log(
    `Done, screenshots saved at:\n>> ${localImagePath}\n>> ${onlineImagePath}`
  );
  process.exit();
};

go();
