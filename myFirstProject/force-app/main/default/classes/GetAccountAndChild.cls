public with sharing class GetAccountAndChild {
    
    @AuraEnabled
    public static List<Account> getRecords(){
        
        return [
            SELECT Id, Name, (SELECT Id, Name, AccountId FROM Contacts), (SELECT Id, Name, AccountId FROM Opportunities) FROM Account
            ORDER BY CreatedDAte DESC
        ];
    }
}
