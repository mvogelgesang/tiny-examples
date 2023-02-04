# Puppeteer Local HTML File

A quick working example showing how to navigate to local HTML files with Puppeteer. This is helpful when writing automated tests as the test does not burden a real website and specific testing conditions can be replicated.

`file:` is a supported protocol in the URL type but many of the methods such as `hostname` return empty strings. For this reason, the host or filename can be determined by evaluating the protocol.

```ts
const name =
  domain.protocol === "file:"
    ? domain.pathname.split("/")[domain.pathname.split("/").length - 1]
    : domain.hostname;
```

## Running

```sh
npm i
npm run build
npm run start
```
