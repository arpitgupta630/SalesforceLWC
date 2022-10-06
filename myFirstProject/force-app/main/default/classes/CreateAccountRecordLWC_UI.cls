public with sharing class CreateAccountRecordLWC_UI {
    
    @AuraEnabled
    public static void createAccount(Map<String, Object> recivedMap) {
        
        Account acc = new Account(
            Name = String.valueOf(recivedMap.get('accountName')), 
            NumberOfEmployees = Integer.valueOf(recivedMap.get('accountNOE')), 
            AnnualRevenue = (Decimal) Integer.valueOf(recivedMap.get('accountRevenue')), 
            Rating = String.valueOf(recivedMap.get('accountRating'))
        );
        INSERT acc;
    }

    @AuraEnabled
    public static List<Account> getRecentAccount(){
        List<Account> recentAcc = [
            SELECT Name, NumberOfEmployees, AnnualRevenue, Rating FROM Account
            ORDER BY createdDate DESC LIMIT 5
        ];
        return recentAcc;
    }
}
