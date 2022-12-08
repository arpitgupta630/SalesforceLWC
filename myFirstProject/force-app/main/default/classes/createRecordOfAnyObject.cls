public class createRecordOfAnyObject {
    
    @AuraEnabled
    public static Map<id, Object> createRecord(String objectName, List<String> fieldList, List<List<String>> csvRecords){
        
        List<sObject> genericObjectList = new List<sObject>();
        
        for(Integer i=0; i<csvRecords.size(); i++){
            Schema.SObjectType convertType = Schema.getGlobalDescribe().get(objectName);
            sObject genericObject = convertType.newSObject();
            for(Integer j=0; j<csvRecords[i].size(); j++){
                genericObject.put(fieldList[j], csvRecords[i][j]);
            }
            genericObjectList.add(genericObject);
        }

        for(sObject obj : genericObjectList){
            system.debug(obj);
        }

        List<Database.SaveResult> resultList = Database.insert(genericObjectList, false);
        Map<id, Object> resultMap = new Map<id, Object>();
        Map<String, Object> errorMap = new Map<String, Object>();
        Integer i = 0;
        for(Database.SaveResult result : resultList){
            
            if(result.isSuccess() == true){
                resultMap.put(result.getId(), genericObjectList[i]);
                System.debug(result);
                System.debug(genericObjectList[i]);
            }else{
                for(Database.Error err : result.getErrors()){
                    errorMap.put('err'+i, new List<Object>{err.getStatusCode(), err.getMessage(), err.getFields()});
                    System.debug(err);
                }
            }
            i+=1;
        }
        return resultMap;
    }
}
