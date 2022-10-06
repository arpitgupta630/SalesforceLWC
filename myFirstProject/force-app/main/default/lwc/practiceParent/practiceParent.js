import { LightningElement } from 'lwc';

export default class PracticeParent extends LightningElement {
    
    textToShow = "";
    showText(){
        const value = this.template.querySelector(".child");
        this.textToShow = value.childTextArea;
    }
    searchText(){
        let myOutput = this.template.querySelector(".output");
        let search = this.template.querySelector(".child").childTextSearch;
        let regex = new RegExp(search, 'g');
        let result = this.textToShow.replace(regex, '<b>' + search + '</b>');
        myOutput.innerHTML = result;
    }
}