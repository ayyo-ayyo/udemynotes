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
    in the page with data-purpose equals cue-text */    
  var transcriptionLines = document.querySelectorAll(
    'span[data-purpose="cue-text"]'
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
