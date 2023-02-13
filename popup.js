// Rename tab
function renameTab(newTitle) {
  document.title = newTitle;
}

// Get form
const form = document.querySelector("form")

form.addEventListener("submit", async (evt) => {
  // Prevent form submission
  evt.preventDefault();
  
  // Get new tab title from text input
  const newTitle = await document.querySelector("#newTitle").value;

  // Get current tab
  const [currentTab] = await chrome.tabs.query({active: true, currentWindow: true});

  // Update current tab's title (inject renameTab script into current tab)
  chrome.scripting.executeScript(
    {
      // Set current tab as target
      target : {tabId : currentTab.id},
      // Inject renameTab func
      func: renameTab,
      // Pass in newTitle as arg
      args: [ newTitle ]
  })
})