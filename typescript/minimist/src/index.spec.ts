const fsTest = require("fs/promises");
const folder = "data/xyz/"

describe('index script', () => {
    beforeAll(async () => {
        // generates dummy files which can be consumed by the condenser
        
        const content = {domain: "developers.login.gov",
        url: "developers.login.gov",
        scanVersion: "0.0.9",
        scanDate: "20220412",
        scanStatus: "Page loaded successfully",
        performanceMetric: {
          search: false,
        },
        siteScanner: {
          data: {
            scan_date: "2022-04-12T00:35:47.361Z",
            uswds_usa_classes: 35,
          },
        },
        uswdsComponents: {
          header: true,
        },
        lighthouse: {
          desktopData: {
            lhr: {
              audits: {
                "content-width": {
                  score: 1,
                },
              },
              categories: {
                seo: {
                  score: 1,
                },
              },
            },
          },
        },
      };
        try {
            await fsTest.mkdir(folder,{recursive: true});
            for (let i = 0; i< 5; i++) {
                // change a small portion of the file to ensure there are differences for comparison
                content.domain += i;
                await fsTest.writeFile(`${folder}site${i}.json`, JSON.stringify(content));
            }
        }
        catch (err) {
            console.error(err);
        }
    });




    test("should read mocked files", async () => {
        process.argv.push("--folders=xyz");
        require("./index");
        expect(false).toEqual(false);
    });

    
});