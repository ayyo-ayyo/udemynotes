// Function to call OpenAI API and get the summarized notes
async function callOpenAI(transcriptionText, prompt) {
  const apiKey = 'your-openai-api-key'; // Replace with your OpenAI API key
  const endpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions'; // Adjust endpoint if needed

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: `${prompt}\n\n${transcriptionText}`,
      max_tokens: 1500, // Adjust max_tokens based on your needs and OpenAI's limitations
      temperature: 0.7, // Adjust temperature based on your needs
    })
  });

  const data = await response.json();
  return data.choices[0].text;
}

/** Helper function that clicks the transcript button on the video to get the 
    transription of the video to show
    *@return {void}
    */
function clickTranscriptionButton() {
  var transcriptionButton = document.querySelector(
    'button[data-purpose="transcript-toggle"]'
  );

  transcriptionButton.click();
}

/**  Grab all the text in the transcription of the video and store it in a string
 *@return {string}
 */
function getTranscript() {
  //variable to store the transcription text for the video
  var transcriptionText = "";
  clickTranscriptionButton();

  /* Extract all lines of text in the transcription by getting all elements 
    in the page with data-purpose equals cue-text and put them into an array */
  var transcriptionLines = Array.from(
    document.querySelectorAll('span[data-purpose="cue-text"]')
  );

  /* Compile all the lines of text in the transcription by looping through 
    all the span elemenets contained in the transcriptionLines variable and 
    appending them to the transcriptionText string */
  transcriptionLines.forEach((elem) => {
    transcriptionText += elem.textContent + " ";
  });

  return transcriptionText;
}

function getNotes() {
  //openAI api call
}

function createTXT() {}
