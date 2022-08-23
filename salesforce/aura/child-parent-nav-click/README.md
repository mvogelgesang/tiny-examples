# Child to Parent Navigation Click Event Handling

A brief example to demonstrate how to handle click events for Navigation Menus when employing parent and child components. This is based off the content on [salesforcepoint.com](https://www.salesforcepoint.com/2020/12/how-to-pass-values-from-child-to-parent.html).

## Installation

The following will create a new scratch org named `pcnavclick`, install the components, and open the Digital Experiences page in Setup.

```sh
orgName=pcnavclick
sfdx force:org:create -a $orgName -f config/project-scratch-def.json
sfdx force:source:push -u $orgName
sfdx force:org:open -u $orgName -p /lightning/setup/SetupNetworks/home
unset orgName
```

- Once logged in, create a new Digital experience, pick any type.
- Update Default Navigation menu to include additional items.
- Drag component onto page and publish
