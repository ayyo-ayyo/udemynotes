// popup.js
document.getElementById('submitButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { greeting: 'hello from popup' }, (response) => {
        console.log(response.farewell);
      });
    });
  });
  