# Tiny Examples

Brief projects that aim to prototype specific functionality.

- [Tiny Examples](#tiny-examples)
  - [React Native](#react-native)
    - [Swipeable Navigation](#swipeable-navigation)
  - [Salesforce](#salesforce)
    - [Aura](#aura)
      - [Child to Parent Navigation Click Handling](#child-to-parent-navigation-click-handling)
  - [Typescript](#typescript)
    - [CLI Resume Activity](#cli-resume-activity)
    - [Promises within For Loops](#promises-within-for-loops)
    - [Mocking FS](#mocking-fs)
    - [Puppeteer Dialog Boxes](#puppeteer-dialog-boxes)
    - [Save API Result](#save-api-result)

## [React Native](https://github.com/mvogelgesang/tiny-examples/tree/main/react-native)

### [Swipeable Navigation](https://github.com/mvogelgesang/tiny-examples/tree/main/react-native/swipeable-nav)

Demonstration of using [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/) and [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) to transition between screens via swipe actions.

## [Salesforce](https://github.com/mvogelgesang/tiny-examples/tree/main/salesforce)

### [Aura](https://github.com/mvogelgesang/tiny-examples/tree/main/salesforce/child-parent-nav-click)

#### [Child to Parent Navigation Click Handling](https://github.com/mvogelgesang/tiny-examples/tree/main/salesforce/child-parent-nav-click)

A brief example to demonstrate how to handle click events for Navigation Menus when employing parent and child components. This is based off the content on [salesforcepoint.com](https://www.salesforcepoint.com/2020/12/how-to-pass-values-from-child-to-parent.html).

## [Typescript](https://github.com/mvogelgesang/tiny-examples/tree/main/typescript)

### [CLI Resume Activity](https://github.com/mvogelgesang/tiny-examples/tree/main/typescript/cli-resume-activity)

A set of hooks for [OCLIF](https://oclif.io/) which allows long running processes to be stopped and then resumed at a later time. This example iterates over a list of names and saves a copy of the remaining list to the local cache directory. Upon resumption, the CLI checks the cache directory for a file, if it contains items, it uses that list.

### [Promises within For Loops](https://github.com/mvogelgesang/tiny-examples/tree/main/typescript/for-loop-promises)

This Tiny Example demonstrates how to execute a `for loop` which contains a call to a function that returns a promise. In short, the `for loop` must be wrapped in a function that returns a Promise.

Finally, [CLI-Spinner](https://www.npmjs.com/package/cli-spinner) is used to make the execution of code easier to follow while in the terminal.

### [Mocking FS](https://github.com/mvogelgesang/tiny-examples/tree/main/typescript/mocking-fs)

Implementation of [https://medium.com/@shashankshekhar_40767/using-jest-mocking-to-run-tests-on-a-simple-node-script-dealing-with-fs-module-db8bc01ff583](https://medium.com/@shashankshekhar_40767/using-jest-mocking-to-run-tests-on-a-simple-node-script-dealing-with-fs-module-db8bc01ff583)

### [Puppeteer Dialog Boxes](https://github.com/mvogelgesang/tiny-examples/tree/main/typescript/puppeteer-dialog-boxes)

Given a URL or list of URLs, navigates to the page and prints any content from a Javascript alert to the console.

### [Save API Result](https://github.com/mvogelgesang/tiny-examples/tree/main/typescript/save-api-result)

A quick example of fetching api data and saving it locally. Old copies of the data are stored in the `data/legacy` folder.

As a more robust example, there is a [GitHub Action](../../.github/workflows/save-api-result.yml) of the same name which runs on schedule and commits the results.
