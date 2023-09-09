// JavaScript code in your-script.js

// Function to create an event card with the specified format
function createEventCard(event) {

  
    eventCard.innerHTML = `
      <div class="card">
        <img src="${event.banner}" class="card-img-top" alt="${event.title}"> <!-- Banner Image -->
        <div class="card-body">
          <h5 class="card-title">${event.title}</h5>
          <p class="card-text">${event.shortDescription}</p> <!-- Short Description -->
          <div class="event-details">
            <i class="bi bi-calendar"></i> Date: ${event.date} <!-- Date with icon -->
            <i class="bi bi-geo-alt"></i> Location: ${event.location} <!-- Location with icon -->
          </div>
        </div>
        <div class="card-body">
          <a href="${event.link}" class="btn btn-warning" target="_blank">Register Now 🚀</a>
        </div>
      </div>
    `;
  
    return eventCard;
  }
  
  // Function to fetch and display events
  async function loadEvents() {
    try {
      const response = await fetch('./json/events.json');
      const eventData = await response.json();
  
      // Show event details in the modal for the first event
      if (eventData.length > 0) {
        const firstEvent = eventData[0];
        const eventModalBody = document.getElementById('eventModalBody');
        eventModalBody.innerHTML = `
          <h5>${firstEvent.title}</h5>
          <p>Date: ${firstEvent.date}</p>
          <p>Location: ${firstEvent.location}</p>
          <p>Description: ${firstEvent.description}</p>
        `;
  
        // Trigger the modal
        const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
        eventModal.show();
      }
    } catch (error) {
      console.error('Error loading events:', error);
    }
  }
  
  // Call the function to load events when the page loads
  window.addEventListener('load', loadEvents);
  