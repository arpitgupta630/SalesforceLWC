import { LightningElement } from 'lwc';
import getStudent from '@salesforce/apex/getStudentByEmail.getStudent'

export default class GetStudentByEmailParent extends LightningElement {

    student;
    studentName;
    studentEmail;
    courseOpted;
    flag = false;
    reciveData(event){
        
        let recivedEmail = event.detail;

        getStudent({
            email : recivedEmail
        }).then(result=>{
            this.student = result;
            this.studentName = this.student.Student_Name__c;
            this.studentEmail = this.student.Student_Email__c;
            this.courseOpted = this.student.Course_Opted__c;
            this.flag = true;
        }).catch(error=>{
            this.flag = false
            console.log("ERROR!!! Failed to Fetch Record");
            console.log(error);
        })
    }
}