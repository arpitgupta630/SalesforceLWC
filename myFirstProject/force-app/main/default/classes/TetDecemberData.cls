public without sharing class TetDecemberData {
    
    @AuraEnabled
    public static List<Horse__c> getAllHorses(){
        
        return [
            SELECT Name FROM Horse__c 
            ORDER BY createdDate DESC
        ];
    }

    @AuraEnabled
    public static List<Horse_in_Race__c> getHorseInRace(id horseId){
        return [
            SELECT Race__r.Name FROM Horse_in_Race__c 
            WHERE Horse__r.Id = :horseId 
            ORDER BY createdDate DESC
        ];
    }
}
