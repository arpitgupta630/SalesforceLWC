public class GetListOfAccounts {
    
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccountList(String nameOfAccount){
        nameOfAccount += '%';
        List<Account> accList = [
            SELECT Id, Name FROM Account 
            WHERE Name LIKE :nameOfAccount 
        ];
        return accList;
    }

    @AuraEnabled(cacheable = true)
    public static List<Account> getAccountListForTable(){
        
        List<Account> accList = [
            SELECT Id, Name, NumberOfEmployees, AnnualRevenue, Rating FROM Account
        ];
        return accList;
    }

    @AuraEnabled
    public static void deleteSelectedAccounts(List<Account> accList){
        
        DELETE accList;
    }

}
