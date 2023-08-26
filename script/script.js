
/*This will update all the price tag with the timetake to earn that amount*/ 
updateMainPrice(".a-price");

function appendMainPrice(element, appendContent) {
    element.lastChild.append(" ["+appendContent+"] ");
}

//function to  compute time taken to earn
function getTimeTakenToEarn(productPrice, monthlySalary) {
    let timeTakenToEarn = parseInt(productPrice * (30 / monthlySalary));
    if (timeTakenToEarn === 0) return "<1 day";
    if (timeTakenToEarn === 1) return "1 day";
    if (timeTakenToEarn >= 30) {
        let months = Math.floor(timeTakenToEarn / 30)
        if (months === 1)
            months = months + " month"
        else
            months = months + " months"
        let days = (timeTakenToEarn % 30)
        if (days === 0)
            return months
        else if (days === 1)
            days = days + " day"
        else
            days = days + " days"
        return months + ", " + days
    }

    return timeTakenToEarn + " days";
}

//funtion to update the prices using looping
function updateMainPrice(className) {
    let elements = document.querySelectorAll(className);
    console.log(elements[0].firstChild.textContent)
    elements.forEach((element) => {
        console.log(element.firstChild.textContent);
        let curcomPrice=elements[0].firstChild.textContent;
        curcomPrice=curcomPrice.replace(/,/g,"");
        curcomPrice=curcomPrice.replace(/₹/g,"");    
        let productPrice = parseFloat(curcomPrice);
        if (!isNaN(productPrice) && productPrice !== 0) {
            chrome.storage.sync.get("salary", ({salary}) => {
                appendMainPrice(element, getTimeTakenToEarn(productPrice, salary));
                appended.push(element);
            });
        }
    });
}


