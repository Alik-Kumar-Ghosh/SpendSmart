//Function to fetch product title and save it to chrome storage -> key -> productTitle
getProductTitle("#productTitle");

function getProductTitle(idName){
    const elem = document.querySelectorAll(idName);
    let titleValue=elem[0].textContent;
    //alert(titleValue)
    chrome.storage.sync.set({ productTitle: titleValue });
}
