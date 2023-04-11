import { LightningElement } from 'lwc';
import getRecords from '@salesforce/apex/GetAccountAndChild.getRecords'
import { deleteRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from "lightning/navigation";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import currentUserId from '@salesforce/user/Id';
import { subscribe, unsubscribe, onError } from 'lightning/empApi';

export default class MitOrgAccordion extends NavigationMixin(LightningElement) {

    allData =[];
    error;
    recordId;
    getAccountRecords(){
        getRecords().then(result=>{
            let refineData = result;
            this.error = undefined;
            this.isLoading = false;
            for(let i = 0; i<refineData.length; i++){
                if(refineData[i].Contacts == undefined){
                    refineData[i]['Contacts'] = [];
                }
                if(refineData[i].Opportunities == undefined){
                    refineData[i]['Opportunities'] = [];
                }
            }
            this.allData = [...refineData];
            console.log(this.allData);
        }).catch(error=>{
            this.error = error;
            this.allData = undefined;
            this.isLoading = false;
            console.log(error);
        })
    }

    subscription = {};
    CHANNEL_NAME = '/event/Refresh_Record_Event__e';
    isLoading = false;

    connectedCallback(){
        this.isLoading = true;
        this.getAccountRecords();
        subscribe(this.CHANNEL_NAME, -1, this.manageEvent).then(response => {
            console.log('Subscribed Channel');
            this.subscription = response;
        });
        onError(error => {
            console.error('Server Error--->'+error);
        });
    }

    manageEvent = event=> {
        const refreshRecordEvent = event.data.payload;
        this.isLoading = true;
        console.log('Event--->'+JSON.stringify(refreshRecordEvent));
        if (!this.createdRecord && refreshRecordEvent.Record_Id__c === this.recordId && refreshRecordEvent.User_Id__c === currentUserId) {
            this.getAccountRecords();
        }
        else if (this.createdRecord && refreshRecordEvent.User_Id__c === currentUserId) {            
            this.getAccountRecords();
        }
    }

    handleToggleSection(){
        console.log('Toggle');
    }

    editAccount(event){
        let recId = event.currentTarget.dataset.id;
        this.recordId = recId;
        const config = {
            type: "standard__recordPage",
            attributes: {
              recordId: recId,
              objectApiName: "Account",
              actionName: "edit"
            }
        };
        this[NavigationMixin.Navigate](config);
    }
    deleteRecord(event){
        let recordId = event.currentTarget.dataset.id;
        deleteRecord(recordId).then(()=>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Record deleted',
                    variant: 'success'
                })
            );
            this.getAccountRecords();
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error deleting record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }

    handleRowSelection(){

    }
    
    disconnectedCallback() {
        unsubscribe(this.subscription, response => {
            console.log('Unsubscribed Channel');
        });
    }
}