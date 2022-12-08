public class getAllObjectsAndFields {
    
    @AuraEnabled(cacheable = true)
    public static List<String> getAllObjects() {

        List<String> objectList = new List<String>();

        List <Schema.sObjectType> globalDescribeValueList = Schema.getGlobalDescribe().values(); 

        for(sObjectType obj : globalDescribeValueList){
            objectList.add(obj.getDescribe().getName());
        }
        return objectList;

    }

    @AuraEnabled
    public static List<String> getAllFields(String requestedObject){

        List<String> reqFields = new List<String>();

        Map <String, Schema.sObjectType> globalDescribeMap = Schema.getGlobalDescribe();
        Schema.sObjectType sObjType = globalDescribeMap.get(requestedObject);
        Schema.DescribeSObjectResult result = sObjType.getDescribe();

        Map<String, Schema.SObjectField> mapOfField = result.fields.getMap();

        for(String keys: mapOfField.keySet()){
            reqFields.add(mapOfField.get(keys).getDescribe().getName());
        }
        return reqFields;
    }
}
