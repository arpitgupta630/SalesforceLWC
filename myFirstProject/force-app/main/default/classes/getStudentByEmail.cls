public class getStudentByEmail {
    
    @AuraEnabled(cacheable = true)
    public static Student__c getStudent(String email){
        
        Student__c std = [
            SELECT Student_Name__c, Student_Email__c, Course_Opted__c FROM Student__c
            WHERE Student_Email__c = :email
        ];

        return std;
    }
}
