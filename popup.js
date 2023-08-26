//function to update salary onchange of textbox value
let updateSalaryBtn = document.getElementById("salary");
updateSalaryBtn.addEventListener("change", async () => {
  let salaryValue = document.getElementById("salary").value;
  chrome.storage.sync.set({ salary: salaryValue });
  console.log(`Updated salary: ${salaryValue}`);
});
