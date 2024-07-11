const Gemini_API = ' ';
	
document.getElementById("betteroptions").addEventListener("click", getBetterOptions);

function getBetterOptions() {   
    // Show the spinner
    document.getElementById("spinner-overlay").style.display = "block";

    // This will call getBetterOptions by calling Gemini API after fetching the product title from the chrome storage
    chrome.storage.sync.get("productTitle", ({ productTitle }) => {
        let trimmedProductPrice = productTitle.trim();
        console.log(trimmedProductPrice);
        console.log(API_call(trimmedProductPrice));
    });
}

// API call Gemini
async function API_call(input) {
    var res;
    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + Gemini_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'contents': [
                    {
                        'parts': [
                            {
                                'text': 'You are a seasoned product specialist who prides themselves on their in-depth knowledge of a wide range of consumer goods. Your expertise lies in providing detailed descriptions and recommendations for various products to help customers make informed decisions. Your task involves generating a list of alternative product options for a specific item. The product you need to suggest alternatives for is ' + '[' + input + '].' + 'Please provide a list of up to 5 alternative products, along with a brief description of each item to highlight its key features, benefits, and any unique selling points. Remember to consider factors such as price, quality, brand reputation, and customer reviews when suggesting the alternatives. ---Example: When recommending alternatives for a laptop, I always take into account the processor speed, RAM capacity, storage options, display quality, and battery life. Additionally, I consider the specific needs of the user, whether they require a laptop for gaming, professional use, or general everyday tasks. Use HTML for listing bullets and heading to ensure clear organization and readability for the reader, dont use markdown. example<h5>Heading<h5> <li><b>product name<b></li>  description'
                            }
                        ]
                    }
                ]
            })
        });
        
        const data = await response.json();
        displayBetter(res = data);
    } catch (error) {
        displayBetter("error429");
    } finally {
        // Hide the spinner
        document.getElementById("spinner-overlay").style.display = "none";
    }

    return res;
}

// Display better alternatives in the extension
async function displayBetter(options) {
    // Hide the spinner
    document.getElementById("spinner-overlay").style.display = "none";

    if (options == 'error429') {
        document.getElementById("BetterOpt").className += " alert alert-danger";
        document.getElementById("BetterOpt").innerHTML = "Please Check Gemini API key, encountered an error while fetching ";
    } else {
        document.getElementById("BetterOpt").className += " alert alert-success";
        document.getElementById("BetterOpt").innerHTML = options.candidates[0].content.parts[0].text;
    }
}
