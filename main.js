
//Function to show text value in the text box -> id = "salary"
getSalarySync()

function getSalarySync(){
	chrome.storage.sync.get("salary", ({ salary }) => {
		document.getElementById("salary").value=salary
	});
}


//Tablink for future use; to enable this extension in multiple shopping sites.
chrome.tabs.getSelected(null, function(tab) {
    getTabLink(tab.url);
});
function getTabLink(tablink) {
  if(tablink.includes('amazon')){
        console.log("Tablink -> amazon");
  }
  console.log(tablink);
}
