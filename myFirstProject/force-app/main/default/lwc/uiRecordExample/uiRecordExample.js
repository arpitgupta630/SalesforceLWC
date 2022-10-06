import { LightningElement, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class UiRecordExample extends LightningElement {

    // @wire(getRecord, {
    //     recordId : '0015i00000R8TQcAAN',
    //     fields : ['Name', 'NumberOfEmployees', 'AnnualRevenue', 'Rating']
    // }) accountRecord;

    createAcc(){
        let accName = this.template.querySelector('[data-id="acc-name"]').value;
        let accNOE = this.template.querySelector('[data-id="acc-noe"]').value;
        let accRevenue = this.template.querySelector('[data-id="acc-revenue"]').value;
        let accRating = this.template.querySelector('[data-id="acc-rating"]').value;

        createRecord({
            apiName : 'Account',
            fields : {
                'Name' : accName,
                'NumberOfEmployees' : accNOE,
                'AnnualRevenue' : accRevenue,
                'Rating' : accRating
            }
        }).then(result=>{

            let successToastMessage = new ShowToastEvent({
                title : 'Success',
                variant : 'Success',
                message : `Record Created Successfully with Record Id: ${result.id}`
            })
            this.dispatchEvent(successToastMessage);   
        }).catch(error=>{
            let errorToastMessage = new ShowToastEvent({
                title : 'ERROR',
                variant : 'Error',
                message : error.body.message
            })
            this.dispatchEvent(errorToastMessage);
        })

    }

}