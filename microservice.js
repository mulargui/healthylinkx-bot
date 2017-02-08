var API_URL_PREFIX = "http://192.168.1.103:8081"; //android phones doesn't like localhost
//var API_URL_PREFIX = "http://127.0.0.1:8081";
var methodseparator="?"

//var API_URL_PREFIX = "http://127.0.0.1:8081/api.php?rquest=";
//var methodseparator="&"

var paramseparator="&"

function getSearchResults(zipcode, lastname, distance, gender, specialty) {
	var requeststring = "/providers";
	var firstparam = true;

	if (zipcode){
		if(firstparam){
			requeststring+=methodseparator;
			firstparam=false;
		}else{
			requeststring+=paramseparator;
		}
		requeststring+="zipcode=";
		requeststring+=zipcode;
	}
	
	if ((gender[0]=='M')||(gender[0]=='F')){
		if(firstparam){
			requeststring+=methodseparator;
			firstparam=false;
		}else{
			requeststring+=paramseparator;
		}
		requeststring+="gender=";
		requeststring+=gender[0];
	}

	if (lastname){
		if(firstparam){
			requeststring+=methodseparator;
			firstparam=false;
		}else{
			requeststring+=paramseparator;
		}
		requeststring+="lastname1=";
		requeststring+=lastname;
	}

	if (specialty){
		if(firstparam){
			requeststring+=methodseparator;
			firstparam=false;
		}else{
			requeststring+=paramseparator;
		}
		requeststring+="specialty=";
		requeststring+=specialty;
	}

	if (distance){
		if(firstparam){
			requeststring+=methodseparator;
			firstparam=false;
		}else{
			requeststring+=paramseparator;
		}
		requeststring+="distance=";
		requeststring+=distance;
	}
	
 	//lets get a few doctors
	var responsestring="";
	var resultstring="\tName\t\t\tStreet\t\t\tCity\n";

	var options = {
  		host: API_URL_PREFIX,
  		path: requeststring
 	};

	var req = require("http").request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			responsestring += chunk;
		});

		res.on('error', function(e) {
			throw e;
		});	

		res.on('end', function() {

			//no data
  			if (!responsestring) {	
				resultstring += 'No matching providers were found.\n';
				return resultstring;
 			}
			/*$.each(data, function(i, item) {
				$.each(item, function(j, field) {
					resultstring += field+"\t"; 
				});
				resultstring += "\n";
			});*/
			resultstring += responsestring;
			return resultstring;
		});
	}).end();	
}

/////////// exporting the entry point to the search code
exports.getSearchResults=getSearchResults;
//////////

