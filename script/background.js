//default salary
let salary = "50000";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ salary });
  console.log(`Default Salary: ${salary}`);
});
//changing the salary
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});
