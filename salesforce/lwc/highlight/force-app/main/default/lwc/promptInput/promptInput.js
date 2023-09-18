import { LightningElement, wire } from "lwc";
import { MessageContext, publish } from "lightning/messageService";
import CODEMC from "@salesforce/messageChannel/CodePromptMessageChannel__c";

export default class PromptInput extends LightningElement {
  input;
  languageValue;
  themeValue;

  get languageOptions() {
    return [
      { label: "Apex", value: "java" },
      { label: "JavaScript", value: "javascript" },
      { label: "Visualforce", value: "xml" }
    ];
  }
  


  handleChangeLanguage(event) {
    this.languageValue = event.detail.value;
  }

  @wire(MessageContext)
  messageContext;

  handleButtonClick() {
    this.sendMessageService(this.input, this.languageValue);
  }
  handleChange(event) {
    this.input = event.target.value;
  }
  sendMessageService(input, language) {
    console.log("codeprompt sendMessageService");
    // explicitly pass boatId to the parameter recordId
    publish(this.messageContext, CODEMC, { response: {code: input, language: language }});
  }
}
