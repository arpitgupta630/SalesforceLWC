import { LightningElement, track } from 'lwc';
import getStudentsByCourse from '@salesforce/apex/getStudentByEmail.getStudentsByCourse';

export default class StudentByCourseDataTable extends LightningElement {

    columns;
    @track studentList;
    flag = false

    columns = [
        { label: 'Student Id', fieldName: 'Name', type : 'text', editable : 'true' },
        { label: 'Student Name', fieldName: 'Student_Name__c', type: 'text', editable : 'true' },
        { label: 'Student Phone', fieldName: 'Student_Phone__c', type: 'text', sortable : 'true', editable : 'true' },
        { label: 'Student Email', fieldName: 'Student_Email__c', type: 'email', editable : 'true' },
        { label: 'Course Opted', fieldName: 'Course_Opted__c', type: 'text', editable : 'true' },
        { label: 'Total Fee Deposited', fieldName: 'Total_Fee_Deposited__c', type: 'currency', editable : 'true' }
    ];

    searchStudent(){

        let courseOpted = this.template.querySelector('[data-id="course-opted"]').value;

        getStudentsByCourse({
            course : courseOpted
        }).then(result=>{
            this.flag = true;
            let jsonString = JSON.parse(JSON.stringify(result));
            this.studentList = jsonString;
        }).catch(error=>{
            this.flag = false;
            console.log(error.body.message);
        })
    }

    handleRowSelection(event){
        console.log("Row is Selected");
        console.log(event);
        let selRow = event.detail.selectedRows;
        if(selRow.length>0){
            for(let row of selRow){
                console.log(`${row.Name} : ${row.Student_Name__c}`);
            }
        }
    }
}