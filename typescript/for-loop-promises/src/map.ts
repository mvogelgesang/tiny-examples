const Spinner = require("cli-spinner").Spinner;
import {
  CaaRecord,
  MxRecord,
  NaptrRecord,
  RecordWithTtl,
  SoaRecord,
  SrvRecord,
} from "node:dns";
import dns from "node:dns/promises";

const dnsReport = async (hostname: string): Promise<any> => {
  const rrTypeValues = [
    "A",
    "AAAA",
    "ANY",
    "CAA",
    "CNAME",
    "MX",
    "NAPTR",
    "NS",
    "PTR",
    "SOA",
    "SRV",
    "TXT",
  ];

  const dnsPromisesArray = [];
  for (const record in rrTypeValues) {
    if (Object.prototype.hasOwnProperty.call(rrTypeValues, record)) {
      dnsPromisesArray.push(
        getDnsValues(hostname, rrTypeValues[record] as RrType).then(
          (value) => {value
        )
      );
    }
  }

  return Promise.all(dnsPromisesArray).then((map) => {
    console.log("map", map);
    return map;
  });
};

const getDnsValues = async (hostname: string, rrtype: RrType) => {
  let val: any;
  let obj: any = {};
  try {
    val = await dns.resolve(hostname, rrtype.toString());
  } catch (error) {
    console.log(error);
    val = [];
  }

  return val;
};

export type DnsDataType = {
  a: string[] | RecordWithTtl;
  aaaa: string[] | RecordWithTtl;
  caa: string[] | CaaRecord[];
  cname: string[];
  mx: string[] | MxRecord[];
  naptr: string[] | NaptrRecord[];
  ns: string[];
  ptr: string[];
  soa: string[] | SoaRecord;
  srv: string[] | SrvRecord[];
  txt: string[][];
};

export type RrType =
  | "A"
  | "AAAA"
  | "ANY"
  | "CAA"
  | "CNAME"
  | "MX"
  | "NAPTR"
  | "NS"
  | "PTR"
  | "SOA"
  | "SRV"
  | "TXT";

// this automatically executes the function
(() => {
  // create a spinner to make the CLI experience a bit better
  const spinner = new Spinner("processing.. %s");
  spinner.setSpinnerString("|/-\\");
  spinner.start();
  // call the funtion
  dnsReport("gsa.gov").then((result) => {
    // now that it has resolved, stop the spinner
    spinner.stop();
    process.stdout.write("\n");
    // print the result
    console.log(`completed, DNS RR Types are:`);
    for (const item in result) {
      console.log("item:", result[item]);
    }
  });
})();
