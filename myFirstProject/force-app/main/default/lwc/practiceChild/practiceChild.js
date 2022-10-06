import { LightningElement, api } from 'lwc';

export default class PracticeChild extends LightningElement {

    @api childTextArea;
    textArea(event){
        this.childTextArea  = event.target.value;
    }

    @api childTextSearch;
    textSearch(event){
        this.childTextSearch = event.target.value
    }
}