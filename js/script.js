
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

// Hero Animation
window.onload = function () {
    const canvas = document.getElementById('neuronCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();

    const dots = [];

    function Dot() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 3 + 1;
        this.color = `rgba(255, 0, 0, ${Math.random() * 0.5})`;
        this.velocity = {
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1
        };
    }

    Dot.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };

    Dot.prototype.update = function () {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.x > canvas.width || this.x < 0) {
            this.velocity.x = -this.velocity.x;
        }

        if (this.y > canvas.height || this.y < 0) {
            this.velocity.y = -this.velocity.y;
        }

        this.draw();
    };

    function connectDots() {
        for (let i = 0; i < dots.length; i++) {
            for (let j = i + 1; j < dots.length; j++) {
                const distance = Math.sqrt((dots[i].x - dots[j].x) ** 2 + (dots[i].y - dots[j].y) ** 2);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(dots[i].x, dots[i].y);
                    ctx.lineTo(dots[j].x, dots[j].y);
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }

    function createDots() {
        for (let i = 0; i < 100; i++) {
            dots.push(new Dot());
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        connectDots();

        for (let i = 0; i < dots.length; i++) {
            dots[i].update();
        }
    }

    createDots();
    animate();

    // Handle window resize
    window.addEventListener('resize', function () {
        resizeCanvas();
        dots.length = 0; // Clear the existing dots
        createDots();
    });
};