import { LightningElement, api } from 'lwc';
import getRecentAccount from '@salesforce/apex/createAccountRecordLWC_UI.getRecentAccount'

export default class InnerComponent extends LightningElement {

    recentRecords

    connectedCallback(){
        getRecentAccount().then(result=>{
            this.recentRecords = result;
        }).catch(error=>{
            console.log("ERROR!!! Failed to Fetch Record");
            console.log(error);
        })
    }

    @api displayRecordOnChild(){
        getRecentAccount().then(result=>{
            this.recentRecords = result;
        }).catch(error=>{
            console.log("ERROR!!! Failed to Fetch Record");
            console.log(error);
        })
    }


}