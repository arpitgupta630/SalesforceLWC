import { LightningElement, wire } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';
import { createRecord } from 'lightning/uiRecordApi';

export default class NavigationExample extends NavigationMixin(LightningElement) {

    @wire(CurrentPageReference) pageRef;
    recordPageRedirect;
    objectPageRedirect

    toObject(){
        
        this.objectPageRedirect = {
            type : 'standard__objectPage',
            attributes : {
                objectApiName : 'Account',
                actionName : 'new'         // new for create new record, list for list view 
            }
            // state : {
            //      filterName : 'Recent'       // for listView filter
            //  }
        };

        this[NavigationMixin.Navigate](this.objectPageRedirect);
    }

    toRecord(){
        // console.log(this.pageRef);
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
            this.recordPageRedirect = {
                type : 'standard__recordPage',
                attributes : {
                    recordId : result.id,
                    objectApiName : 'Account',  // optional
                    actionName : 'view'         // we can use 'edit'
                }
            };

            this[NavigationMixin.Navigate](this.recordPageRedirect);

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