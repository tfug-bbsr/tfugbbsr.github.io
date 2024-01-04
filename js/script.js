
// Fetch speaker details from the JSON file and dynamically add speaker cards
document.addEventListener("DOMContentLoaded", function () {
    fetch('./json/events.json')  // Path to your events.json file
        .then(response => response.json())
        .then(data => {
            var speakerListContainer = document.getElementById("speaker-list");
            var addedSpeakers = {}; // To keep track of added speakers

            // Loop through event data and extract speakers
            data.forEach(function (event) {
                event.speakers.forEach(function (speaker) {
                    // Check if the speaker is not already added
                    if (!addedSpeakers[speaker.name]) {
                        var speakerCard = document.createElement("div");
                        speakerCard.classList.add("speaker");

                        var speakerImage = document.createElement("img");
                        speakerImage.src = speaker.image;
                        speakerImage.alt = speaker.name;

                        var speakerName = document.createElement("h3");
                        speakerName.textContent = speaker.name;

                        var speakerTitle = document.createElement("p");
                        speakerTitle.textContent = speaker.title;

                        // Append elements to the speaker card
                        speakerCard.appendChild(speakerImage);
                        speakerCard.appendChild(speakerName);
                        speakerCard.appendChild(speakerTitle);

                        // Append the speaker card to the speaker list container
                        speakerListContainer.appendChild(speakerCard);

                        // Mark the speaker as added
                        addedSpeakers[speaker.name] = true;
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching speaker data:', error));
});
