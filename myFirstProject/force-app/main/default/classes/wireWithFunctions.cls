public class wireWithFunctions {

    @AuraEnabled(cacheable = true)
    public static List<Account> getAccountList(String nameOfAccount) {

        nameOfAccount += '%';
        List<Account> accList = [
            SELECT Id, Name FROM Account 
            WHERE Name LIKE :nameOfAccount 
        ];
        return accList;
    }
}
