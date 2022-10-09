import { LightningElement, track } from 'lwc';

export default class TreeGridExample extends LightningElement {

    @track columns = [
        { 
            label: 'Account Name', fieldName: 'Name', type : 'text', editable : 'true' 
        },
        { 
            label: 'Number of Employees', fieldName: 'NumberOfEmployees', type: 'number', editable : 'true'
        },
        { 
            label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency', sortable : 'true', editable : 'true' 
        },
        { 
            label: 'Rating', fieldName: 'Rating', type: 'text', editable : 'true' 
        }
    ];

    @track row = [
        { 
            id : '0', Name : 'Acc1', NumberOfEmployees : 500, AnnualRevenue : 5000000, Rating : "Cold",
            _children : [
                {id : '0A', Name : 'Acc1A', NumberOfEmployees : 501, AnnualRevenue : 5000001, Rating : "Cold"},
                {id : '0B', Name : 'Acc1B', NumberOfEmployees : 502, AnnualRevenue : 5000002, Rating : "Cold"},
                {id : '0C', Name : 'Acc1C', NumberOfEmployees : 503, AnnualRevenue : 5000003, Rating : "Warm"},
                {id : '0D', Name : 'Acc1D', NumberOfEmployees : 504, AnnualRevenue : 5000004, Rating : "Warm"},
                {id : '0E', Name : 'Acc1E', NumberOfEmployees : 505, AnnualRevenue : 5000005, Rating : "Hot"},
                {id : '0F', Name : 'Acc1F', NumberOfEmployees : 506, AnnualRevenue : 5000006, Rating : "Hot"}
            ] 
        },
        { 
            id : '3', Name : 'Acc4', NumberOfEmployees : 800, AnnualRevenue : 8000000, Rating : "Warm" 
        },
        { 
            id : '1', Name : 'Acc2', NumberOfEmployees : 600, AnnualRevenue : 6000000, Rating : "Cold",
            _children : [
                {id : '1A', Name : 'Acc2A', NumberOfEmployees : 601, AnnualRevenue : 6000001, Rating : "Cold"},
                {id : '1B', Name : 'Acc2B', NumberOfEmployees : 602, AnnualRevenue : 6000002, Rating : "Cold"},
                {id : '1C', Name : 'Acc2C', NumberOfEmployees : 603, AnnualRevenue : 6000003, Rating : "Warm"},
                {id : '1D', Name : 'Acc2D', NumberOfEmployees : 604, AnnualRevenue : 6000004, Rating : "Warm"},
                {id : '1E', Name : 'Acc2E', NumberOfEmployees : 605, AnnualRevenue : 6000005, Rating : "Hot"},
                {id : '1F', Name : 'Acc2F', NumberOfEmployees : 606, AnnualRevenue : 6000006, Rating : "Hot"}
            ] 
        },
        { 
            id : '4', Name : 'Acc6', NumberOfEmployees : 900, AnnualRevenue : 9000000, Rating : "Hot" 
        },
        { 
            id : '2', Name : 'Acc3', NumberOfEmployees : 700, AnnualRevenue : 7000000, Rating : "Warm",
            _children : [
                {id : '2A', Name : 'Acc3A', NumberOfEmployees : 701, AnnualRevenue : 7000001, Rating : "Cold"},
                {id : '2B', Name : 'Acc3B', NumberOfEmployees : 702, AnnualRevenue : 7000002, Rating : "Cold"},
                {id : '2C', Name : 'Acc3C', NumberOfEmployees : 703, AnnualRevenue : 7000003, Rating : "Warm"},
                {id : '2D', Name : 'Acc3D', NumberOfEmployees : 704, AnnualRevenue : 7000004, Rating : "Warm"},
                {id : '2E', Name : 'Acc3E', NumberOfEmployees : 705, AnnualRevenue : 7000005, Rating : "Hot"},
                {id : '2F', Name : 'Acc3F', NumberOfEmployees : 706, AnnualRevenue : 7000006, Rating : "Hot"}
            ] 
        },
        { 
            id : '5', Name : 'Acc7', NumberOfEmployees : 1000, AnnualRevenue : 10000000, Rating : "Hot" 
        }
    ];

    @track expandedRows = ['0', '2'];
    getExpanded = [];

    handleSelection(event){
        console.log(JSON.parse(JSON.stringify(event.detail.selectedRows)));
    }

    getExpandedRows(){

        let getElements = this.template.querySelector('lightning-tree-grid');
        this.getExpanded = getElements.getCurrentExpandedRows();
        console.log(this.getExpanded);
    }

    handleExpandCollapse(){
        let getElements = this.template.querySelector('lightning-tree-grid');
        this.getExpanded = getElements.getCurrentExpandedRows();
        if(this.getExpanded.length > 0){
            getElements.collapseAll();
        }else{
            getElements.expandAll();
        }
        
    }

    handleToggle(event){
        console.log(`isExpanded : ${event.detail.isExpanded}`);
    }

    handleHeaderAction(){

    }
}