import { LightningElement, wire } from "lwc";
import { getRecords } from "lightning/uiRecordApi";
import ID_FIELD from "@salesforce/schema/Account.Id";
import NAME_FIELD from "@salesforce/schema/Account.Name";
import PHONE_FIELD from "@salesforce/schema/Account.Phone";
export default class Table extends LightningElement {
  error;
  accountRecords = [];
  hasData = false;

  @wire(getRecords, {
    records: [
      {
        recordIds: [
          "0018D00000Vq0wPQAR",
          "0018D00000Vq0wQQAR",
          "0018D00000Vq0wRQAR",
          "0018D00000Vq0wSQAR",
          "0018D00000Vq0wTQAR",          
        ],
        fields: [ID_FIELD, NAME_FIELD, PHONE_FIELD]
      }
    ]
  })
  wiredRecords({ error, data }) {
    if (data) {
      let dataarray = [];
      data.results.forEach((record) => {
        dataarray.push(record.result.fields);
      });
      this.accountRecords = [...dataarray];
      this.hasData = true;
      this.error = undefined;
    } else if (error) {
      this.error = error;
    }
  }

  handleEdit(event) {
    console.log("event ", event.currentTarget.dataset.id); //getting as undefined and when checked currentTarget in console is returning null.
  }
}
