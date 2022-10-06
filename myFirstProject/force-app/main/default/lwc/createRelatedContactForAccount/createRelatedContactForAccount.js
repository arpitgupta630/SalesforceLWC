import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateRelatedContactForAccount extends NavigationMixin(LightningElement) {

    contactPageRedirect;

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
            //! Page Referance Object
            this.contactPageRedirect = {
                type : 'standard__objectPage',
                attributes : {
                    objectApiName : 'Contact',  
                    actionName : 'new'
                },
                state : {
                    defaultFieldValues : `AccountId=${result.id}`
                }
            };

            this[NavigationMixin.Navigate](this.contactPageRedirect);

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