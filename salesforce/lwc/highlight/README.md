# Highlight

Component accepts a block of code along with name of programming language and renders code with highlighting courtesy of [highlightjs](https://highlightjs.org/). User can configure default theme or select desired theme within component.

Component expects to receive code block via Lightning Message Service.

## Prerequisites

1. SF CLI
1. Salesforce Developer Hub Org

## Installation

`sf project deploy start -o {targetOrg}`

## Configuration

- Drag component promptInput and highlight components onto existing AppPage or HomePage
- Choose default theme

## Use

- Paste code selection into promptInput component
- Click Highlight button



TO DO
- configure both to work together
- test
- ship