import { LightningElement, wire } from 'lwc';
import getAccountListForTable from '@salesforce/apex/getListOfAccounts.getAccountListForTable';
import deleteSelectedAccounts from '@salesforce/apex/getListOfAccounts.deleteSelectedAccounts';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class DataTableExample extends LightningElement {

    accountList;
    cacheReferance;
    selectedRow;
    fldsItemValues=[];
    
    columns = [
        { 
            label: 'Account Name', fieldName: 'Name', type : 'text', editable : 'true' 
        },
        { 
            label: 'Number of Employees', fieldName: 'NumberOfEmployees', type: 'number', editable : 'true', 
            actions: [
                { label : "All Records", checked : true, name : "all_records" },
                { label : "Less than 2000", checked : false, name : "less_than_2000" },
                { label : "Greater than 2000", checked : false, name : "greater_than_2000" }
            ] 
        },
        { 
            label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency', sortable : 'true', editable : 'true' 
        },
        { 
            label: 'Rating', fieldName: 'Rating', type: 'text', editable : 'true' 
        }
    ];

    @wire(getAccountListForTable) getRecords(result){
        this.cacheReferance = result;
        this.accountList = result.data;
    }

    handleSave(event) {
        
    }

    handleHeaderAction(event){
        
        refreshApex(this.cacheReferance);

        let actionName = event.detail.action.name;
        let rows = this.cacheReferance.data;
        let filteredRows;
        
        let temp = [...this.columns];
        if(actionName == 'less_than_2000'){
            filteredRows = rows.filter((row)=>{
                return(row.NumberOfEmployees <= 2000);
            })
            temp[1].actions[1].checked = true
            temp[1].actions[2].checked = false
            temp[1].actions[0].checked = false
        }else if(actionName == 'greater_than_2000'){
            filteredRows = rows.filter((row)=>{
                return(row.NumberOfEmployees > 2000);
            })
            temp[1].actions[0].checked = false
            temp[1].actions[1].checked = false
            temp[1].actions[2].checked = true
        }else{
            filteredRows = rows;
            temp[1].actions[0].checked = true
            temp[1].actions[1].checked = false
            temp[1].actions[2].checked = false
        }
        this.columns=[...temp]
        this.accountList = filteredRows;    
    }

    handleRowSelection(event){
        console.log("Row is Selected");
        this.selectedRow = event.detail.selectedRows;
        if(this.selectedRow.length>0){
            for(let row of this.selectedRow){
                console.log(row.Name);
            }
        }
    }

    handleDelete(){

        if(this.selectedRow.length<1){

            let selectionErrorToastMessage = new ShowToastEvent({
                title : 'ERROR',
                variant : 'Error',
                message : 'Select Atleast One Record'
            })
            this.dispatchEvent(selectionErrorToastMessage);
        }else{
            deleteSelectedAccounts({
                accList : this.selectedRow
            }).then(result=>{
                
                let successToastMessage = new ShowToastEvent({
                    title : 'Success',
                    variant : 'Success',
                    message : `Selected Records are Deleted Successfully`
                })
                this.dispatchEvent(successToastMessage);
                
                refreshApex(this.cacheReferance);
                this.template.querySelector('lightning-datatable').maxRowSelection=0;
                this.template.querySelector('lightning-datatable').maxRowSelection=100;
            
            }).catch(error=>{
                console.log(error);
                let errorToastMessage = new ShowToastEvent({
                    title : 'ERROR',
                    variant : 'Error',
                    message : 'Somthing went Worng please try again.'
                })
                this.dispatchEvent(errorToastMessage);
            })
        }
    }
}