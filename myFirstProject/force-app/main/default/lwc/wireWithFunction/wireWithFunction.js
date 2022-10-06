import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/wireWithFunctions.getAccountList'

export default class WireWithFunction extends LightningElement {

    recordName;
    accountList;
    @wire(getAccountList, {nameOfAccount : '$recordName'}) 
    wireFunction({error, data}){
        this.accountList = data;
    }      
    
    searchResult(){
        this.recordName = this.template.querySelector(".search-criteria").value;
    }

}