import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/getlistOfAccounts.getAccountList'

export default class ShowListOfAccounts extends LightningElement {
    
    recordName;
    @wire(getAccountList, {nameOfAccount : '$recordName'}) accountList;      // wire to wire property
    
    searchResult(){
        this.recordName = this.template.querySelector(".search-criteria").value;
    }
}