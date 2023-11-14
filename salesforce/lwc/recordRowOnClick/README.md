# Record Row onClick

Demonstrates displaying data in a table and consuming onClick events from buttons within the table rows.

## Installation

`cd salesforce/lwc/recordRowClick`
`sf org create scratch -f config/project-scratch-def.json -a recordRowCreate -d -v {targetDevHub}`
`sf data import tree -f data/Account.json`

Copy new Account IDs from terminal into table.js file, replacing existing IDs.

`sf project deploy start`
`sf org open -p lightning/n/Record_Row_onClick`
