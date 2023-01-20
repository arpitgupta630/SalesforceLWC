import { LightningElement, track } from 'lwc';

export default class TetDecember2022 extends LightningElement {

    @track columns = [
        { 
            label: 'Title', fieldName: 'Name', type : 'text'
        },
        { 
            label: 'Close Date', fieldName: 'CloseDate', type: 'date'
        },
        { 
            label: 'Stage', fieldName: 'StageName', type: 'currency', sortable : 'true', editable : 'true' 
        }
    ];
}