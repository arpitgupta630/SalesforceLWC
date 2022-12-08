public class DocumentAccordion {
    
    @AuraEnabled
    public static List<Conative_Document__c> getDocuments(){
        
        return [
            SELECT Id, Name, Document_Type__c, Valid_From__c, Valid_From_Year__c, Valid_Till__c, Valid_Till_Year__c, Is_Active__c
            FROM Conative_Document__c
            ORDER BY Valid_From__c
        ];
    }
}
