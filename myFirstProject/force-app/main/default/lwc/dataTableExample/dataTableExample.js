import { LightningElement } from 'lwc';

export default class DataTableExample extends LightningElement {

    columns;
    data;
    
    columns = [
        { label: 'Account Name', fieldName: 'Name', type : "text" },
        { label: 'Number of Employees', fieldName: 'NumberOfEmployees', type: 'number' },
        { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' },
        { label: 'Rating', fieldName: 'Rating', type: 'text' }
    ];

    data = [
        {id : "1", Name : "Acc1", NumberOfEmployees : "500", AnnualRevenue : "5000000", Rating : "Cold"},
        {id : "2", Name : "Acc2", NumberOfEmployees : "600", AnnualRevenue : "6000000", Rating : "Cold"},
        {id : "3", Name : "Acc3", NumberOfEmployees : "700", AnnualRevenue : "7000000", Rating : "Warm"},
        {id : "4", Name : "Acc4", NumberOfEmployees : "800", AnnualRevenue : "8000000", Rating : "Warm"},
        {id : "5", Name : "Acc5", NumberOfEmployees : "900", AnnualRevenue : "9000000", Rating : "Hot"},
        {id : "6", Name : "Acc6", NumberOfEmployees : "1000", AnnualRevenue : "10000000", Rating : "Hot"}
    ];
}