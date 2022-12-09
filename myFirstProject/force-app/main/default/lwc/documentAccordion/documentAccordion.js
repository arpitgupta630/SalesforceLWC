import { LightningElement } from 'lwc';
import getDocuments from '@salesforce/apex/DocumentAccordion.getDocuments';

export default class DocumentAccordion extends LightningElement {

    documents;
    years=[];
    connectedCallback(){
        this.getDoc();
    }
    // renderedCallback(){
    //     let style = document.createElement("style");
    //     style.innerText = "slds-th__action {display:flex !important; justify-content: center !important;}";
    //     document.querySelector('lightning-datatable').appendChild(style);
    // }

    getDoc(){
        getDocuments().then(result=>{
            console.log('old this.document', this.documents);
            this.documents = [...result];
            let uYear = [];
            for(let i=0; i<result.length; i++){
                if(!uYear.includes(result[i].Valid_From_Year__c)){
                    uYear.push(result[i].Valid_From_Year__c);
                }
            }
            this.years = [...uYear];
            console.log(this.years);
            console.log('new', this.documents);
        }).catch(error=>{
            console.log(error);
        });
    }
    columns = [
        { 
            label: 'Title', fieldName: 'Name', type : 'text', initialWidth: 250,
            cellAttributes: { iconName: 'doctype:image', alignment: 'center' }
        },
        { 
            label: 'Valid From', fieldName: 'Valid_From_Year__c', type: 'text', initialWidth: 250,
            cellAttributes: { alignment: 'center' }
        },
        { 
            label: 'Valid Till', fieldName: 'Valid_Till_Year__c', type: 'text', initialWidth: 250,
            cellAttributes: { alignment: 'center' }
        },
        { 
            label: 'Document Type', fieldName: 'Document_Type__c', type: 'text', initialWidth: 250,
            cellAttributes: { alignment: 'center' }
        },
        { 
            label: 'Is Valid', fieldName: 'Is_Active__c', type: 'boolean', initialWidth: 250,
            cellAttributes: { alignment: 'center' }
        },
        { 
            type: "button", 
            initialWidth: 125,
            cellAttributes: { alignment: 'center' }, 
            typeAttributes: {  
                label: 'Edit',  
                name: 'Edit',  
                title: 'Edit',  
                disabled: false,  
                value: 'Edit',  
                iconPosition: 'left'  
            } 
        }
    ];

    dataForTable;
    datedDocuments = [];
    handleToggleSection(event){
        console.log(typeof +event.detail.openSections, +event.detail.openSections);
        let tempDoc = [];
        for(let i=0; i<this.documents.length; i++){
            if(this.documents[i].Valid_From_Year__c == +event.detail.openSections){
                tempDoc.push(this.documents[i]);
            }
        }
        this.datedDocuments = [...tempDoc];
        console.log(this.datedDocuments);
    }

    recordId;
    isEdit = false;
    editAction(event){
        this.recordId =  event.detail.row.Id;
        this.isEdit = true;
    }
    handleDialogClose(){
        this.isEdit=false;
    }
    handleSuccess(event){
        this.isEdit=false;
        this.getDoc();
    }
}