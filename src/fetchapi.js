function buttonClicked() {
    var word = document.getElementById("word_input").value;
    document.getElementById("display").innerHTML = `Looking up the word "${word}"...`;

    const primaryApiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    // Fetch data from the primary API
    fetch(primaryApiUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data.length > 0) {
                const result = data[0];
                const phonetic = result.phonetic;
                const meanings = result.meanings;

                const sourceUrl = result.sourceUrls[0]; 

                
                let htmlContent = `
                    <h2>Phonetic: ${phonetic}</h2>
                    <p style="margin-bottom:5px; margin-top:5px;"
                    ><strong>Source URL:</strong> <a href="${sourceUrl}" target="_blank">${sourceUrl}</a></p>
                `;

                //to display the audio icon
                htmlContent += `<i class="fas fa-volume-up" id="audio-icon" onclick="playAudio('${result.phonetics[0].audio}')"></i><br>`;

                
                for (const meaning of meanings) {
                    htmlContent += `<br><h2>${meaning.partOfSpeech}</h2>`;
                    const definition = meaning.definitions[0];
                    const antonyms = getFirstNonEmptyValue(meaning.definitions, "antonyms");
                    const example = getFirstNonEmptyValue(meaning.definitions, "example");

                    if (definition) {
                        htmlContent += `
                            <p style="margin-bottom:5px; margin-top:5px;"><strong>Definition:</strong> ${definition.definition}</p>
                            <p style="margin-bottom:5px;"><strong>Antonyms:</strong> ${antonyms || 'N/A'}</p>
                            <p style="margin-bottom:5px;"><strong>Example:</strong> ${example || 'N/A'}</p>
                        `;
                    }
                }

                
                htmlContent += `<br>`;

                
                document.getElementById("display").innerHTML = htmlContent;
            } else {
                
                document.getElementById("display").innerHTML = "Word not found in the dictionary, or no additional information available.";
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            document.getElementById("display").innerHTML = "Error fetching data.";
        });
}

function playAudio(audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play();
}


function getFirstNonEmptyValue(arr, property) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] && arr[i][property] && arr[i][property].length > 0) {
            return arr[i][property];
        }
    }
    return 'N/A';
}