import * as dotenv from 'dotenv';
dotenv.config();

// Function to call OpenAI API and get the summarized notes
async function callOpenAI(transcriptionText, prompt) {
    const apiKey = process.env.OPENAI_API_KEY;
    const endpoint = 'https://api.openai.com/v1/chat/completions';

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4-turbo", // Specify the model
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: `${prompt}\n\n${transcriptionText}` }
                ],
                max_tokens: 1500, // Adjust max_tokens based on your needs and OpenAI's limitations
                temperature: 0.7, // Adjust temperature based on your needs
            }),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return 'Error fetching notes from OpenAI API.';
    }
}

/** Helper function that clicks the transcript button on the video to get the 
    transription of the video to show
    *@return {void}
    */
function clickTranscriptionButton() {
    const transcriptionButton = document.querySelector(
        'button[data-purpose="transcript-toggle"]'
    );

    if (transcriptionButton) {
        console.log("button clicked");
        transcriptionButton.click();
    } else {
        console.error('Transcription button not found.');
    }
}

/**  Grab all the text in the transcription of the video and store it in a string
 *@return {string}
 */
async function getTranscript() {
    //variable to store the transcription text for the video
    console.log("Tried to get transcript");
    let transcriptionText = "";
    clickTranscriptionButton();

    // Wait for the transcript to be visible/loaded
    await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust delay as needed
    
    /* Extract all lines of text in the transcription by getting all elements 
    in the page with data-purpose equals cue-text and put them into an array */
    const transcriptionLines = Array.from(
        document.querySelectorAll('span[data-purpose="cue-text"]')
    );

    
    if (transcriptionLines.length === 0) {
        console.error('No transcription lines found.');
        return "";
    }

    transcriptionLines.forEach((elem) => {
        transcriptionText += elem.textContent + " ";
    });

    return transcriptionText.trim();

// Function to get notes by sending the transcription text to OpenAI and receiving the response
async function getNotes() {
  const transcriptionText = await getTranscript();
  if (!transcriptionText) {
    console.error('No transcription text available.');
    return;
  }

  const promptInput = document.getElementById('prompt').value.trim();
  const basePrompt = "Please provide a detailed summary of the following video transcript. Neatly arrange the content into different sections or topics of the course with proper formatting. If applicable, focus on the following specific topic: ";
  const promptText = basePrompt + promptInput;
  
  const notes = await callOpenAI(transcriptionText, promptText);

  // Save the notes to a text file
  createTXT(notes);
}

// Function to create and download a text file with the notes
function createTXT(notes) {
  const element = document.createElement("a");
  const file = new Blob([notes], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = "notes.txt";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// Add event listener to the button in the Chrome extension UI
document
  .getElementById("submit")
  .addEventListener("click", getNotes);
