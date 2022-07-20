
const { google } = require("googleapis");
const searchconsole = google.searchconsole({ version: "v1", auth: APIKEY });

async function main() {
  const auth = new google.auth.GoogleAuth({
    // Scopes can be specified either as an array or as a single, space-delimited string.
    scopes: [
      "https://www.googleapis.com/auth/webmasters",
      "https://www.googleapis.com/auth/webmasters.readonly",
    ],
  });

  // Acquire an auth client, and bind it to all future calls
  // const authClient = await auth.getClient();
  // const project = await auth.getProjectId();
  // google.options({ auth: authClient });

  // Do the magic
  const res = await searchconsole.searchanalytics.query({
    // The site's URL, including protocol. For example: `http://www.example.com/`.
    siteUrl: "gsaelibrary.gsa.gov",

    // Request body metadata
    requestBody: {
      // request body parameters
      // {
      //   "aggregationType": "my_aggregationType",
      //   "dataState": "my_dataState",
      //   "dimensionFilterGroups": [],
      //   "dimensions": [],
      //   "endDate": "my_endDate",
      //   "rowLimit": 0,
      //   "searchType": "my_searchType",
      //   "startDate": "my_startDate",
      //   "startRow": 0,
      //   "type": "my_type"
      // }
    },
  });
  console.log(res.data);

  // Example response
  // {
  //   "responseAggregationType": "my_responseAggregationType",
  //   "rows": []
  // }
}

main().catch((e) => {
  console.error(e);
  throw e;
});
