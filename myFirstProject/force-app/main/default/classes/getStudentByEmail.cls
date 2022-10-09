public class getStudentByEmail {
    
    @AuraEnabled(cacheable = true)
    public static Student__c getStudent(String email){
        
        Student__c std = [
            SELECT Student_Name__c, Student_Email__c, Course_Opted__c FROM Student__c
            WHERE Student_Email__c = :email
        ];

        return std;
    }

    @AuraEnabled(cacheable = true)
    public static List<Student__c> getStudentsByCourse(String course){
        
        List<Student__c> stdList = [
            SELECT Id, Name, Student_Name__c, Student_Phone__c, Student_Email__c, Course_Opted__c, Total_Fee_Deposited__c FROM Student__c
            WHERE Course_Opted__c = :course
        ];

        return stdList;
    }
}
