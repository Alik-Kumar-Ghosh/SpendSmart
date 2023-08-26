//Place your OpenAI API key Here :-
var Open_AI_API_key = ''

document.getElementById("betteroptions").addEventListener("click", getBetterOptions);

//This will call getBetterOptions by calling OpenAI API after fetching the product title from the chrome storage
function getBetterOptions(){
    chrome.storage.sync.get("productTitle", ({ productTitle }) => {
		let trimmedProductPrice=productTitle.trim()
		console.log(trimmedProductPrice)
		console.log(API_call(trimmedProductPrice));
	}); 
}

//API call OpenAI
function API_call(text) {
	var res;
	fetch('https://api.openai.com/v1/completions', {
		method: 'POST',
		headers: {
      'Content-Type': 'application/json',
			'Authorization': 'Bearer '+Open_AI_API_key
		},
		body: JSON.stringify({
			'model': 'text-davinci-003',
			"prompt": "The following is a conversation with an AI assistant. \n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: can you suggest me better alternative options "+text+"\nAI:",
			'temperature': 0,
			'max_tokens': 64,
			'top_p': 1,
			'frequency_penalty': 0,
			'presence_penalty': 0,
			'stop': [
				'\n'
			]
		})
		
	})
	//res=data.choices[0].text
	.then((response) => response.json())
	.then((data) =>  displayBetter(res=data))
	.catch(() => displayBetter("error429")) 
	//console.log(res);
	return (res);
  }

//Display better aternatives in the extention
function displayBetter(options){
	console.log(options)
	if(options=='error429'){
		document.getElementById("BetterOpt").className += "alert alert-danger";
		document.getElementById("BetterOpt").innerHTML="Please Check OpenAI api key, encountered an error while fetching ";
	}
	else{
		document.getElementById("BetterOpt").className += "alert alert-success";
		document.getElementById("BetterOpt").innerHTML=options.choices[0].text;
	}
}
