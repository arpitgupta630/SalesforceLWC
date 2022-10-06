public class createAccountRecordLWC {
    
    @AuraEnabled
    public static void createAccount(String accountName, Integer accountNOE) {
        
        Account acc = new Account(Name = accountName, NumberOfEmployees = accountNOE);
        INSERT acc;
    }
}
