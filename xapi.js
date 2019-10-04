// Generate random email address for user
var email = localStorage.getItem('email');

if (email === null) {
  var num = Math.floor(Math.random() * 50000) + 1;
  
  email = 'User' + num + '@user.com';

  localStorage.setItem('email', email);
}

function sendStatement(verbId, verb, objectId, name, description, score, success){  
        var conf = {  
             "endpoint" : "https://ll.1010data.nyc/data/xAPI/",  // Put your LRS endpoint here with a / after xapi.
             "auth" : "Basic " + toBase64("0795093ec7bea0a730e4241069fd913a97cd1efd:278501d8b13ca71d6a9484b366b6eef894b9fce8") // Put your LRS username in, then a colon, and then your password. No spaces. This field defaults to the Test LRS.
             };  
  
        ADL.XAPIWrapper.changeConfig(conf);  
           
        //define the xapi statement being sent  
        var statement = {  
             'actor': {  
      'mbox': 'mailto:' + email,
      'name': email,  
      'objectType': 'Agent'  
    },  
    'verb': {  
       'id': verbId,  
      'display': {'en-US': verb}  
    }, 
    'object': { 
      'id': objectId,  
      'definition': {  
        'name': {
          'en-US': name
        },  
        'description': {
          'en-US': description
        }  
      },  
      'objectType': 'Activity' 
    },

    'result': {
      'score': {
        'scaled': 1,
        'min': 0,
        'max': 100,
        'raw': score
      },
      
      'success': success
    }
        }; //end statement definition  
   
        // Dispatch the statement to the LRS  
        var result = ADL.XAPIWrapper.sendStatement(statement);  
        }  
