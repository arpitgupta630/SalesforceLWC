public with sharing class GetFieldSet {
    
    @AuraEnabled(cacheable=true)
    public static List<Map<String,String>> objFieldSet(String objectName){
        
        Schema.SObjectType convertType = Schema.getGlobalDescribe().get(objectName);
        Schema.DescribeSObjectResult result = convertType.getDescribe();
        Map<String, Schema.FieldSet> fieldSetMap = result.fieldSets.getMap();
        
        Schema.FieldSet fieldSet = fieldSetMap.get('LWC_Field_Set');
        List<Schema.fieldSetMember> fsMember = fieldSet.getFields();
        
        List<Map<String,String>> fields = new List<Map<String,String>>();
        
        for(Integer i=0; i<fsMember.size(); i++){
            Map<String,String> innerMap = new Map<String,String>();
            innerMap.put('label',fsMember[i].getLabel());
            innerMap.put('value',fsMember[i].getFieldPath());
            fields.add(innerMap);
        }
        return fields;
    }
}
