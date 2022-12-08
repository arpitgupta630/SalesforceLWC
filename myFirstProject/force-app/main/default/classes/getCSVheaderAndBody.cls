public class getCSVheaderAndBody {
    
    @AuraEnabled
    public static Map<String, List<List<String>>> getCSVobject(String stringFile){
        // String stringFile   = EncodingUtil.urlDecode(fileContents, 'UTF-8');
        List<String> fileLines     = stringFile.split('\n');
        List<String> csvHeaders   = new List<String>();
        List<List<String>> csvDummyHeaders = new List<List<String>>();
        List<List<String>> csvBody   = new List<List<String>>();
        Map<String, List<List<String>>> csvObject = new Map<String, List<List<String>>>();

        for(String strHeader : fileLines[0].split(',')){
            csvHeaders.add(strHeader.trim());
        }

        for(Integer i=1; i<fileLines.size(); i++){
            List<String> body = fileLines[i].split(',');
            csvBody.add(body);
        }

        for(Integer i=0; i<csvBody.size(); i++){
            String s = csvBody[i][csvBody[i].size()-1];
            csvBody[i][csvBody[i].size()-1] = s.substring(0, s.length()-1);
            System.debug(csvBody[i][csvBody[i].size()-1]);
        }
        System.debug(csvBody);
        System.debug(csvHeaders);
        csvDummyHeaders.add(csvHeaders);
        csvObject.put('headers', csvDummyHeaders);
        csvObject.put('bodies', csvBody);
        
        return csvObject;
    }
}
