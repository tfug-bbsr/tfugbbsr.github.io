// JavaScript code in your-script.js

// Function to create an event card with the specified format
function createEventCard(event) {
    const eventCard = document.createElement('div');
    eventCard.classList.add('col-md-3', 'mb-4', 'mx-2', 'event-card');
  
    eventCard.innerHTML = `
      <div class="card">
        <img src="${event.banner}" class="card-img-top" alt="${event.title}"> <!-- Banner Image -->
        <div class="card-body">
          <h5 class="card-title">${event.title}</h5>
          <div class="event-details">
            <i class="bi bi-calendar"></i> ${event.date} <!-- Date with icon -->
            <i class="bi bi-geo-alt"></i> ${event.location} <!-- Location with icon -->
          </div>
        </div>
        <div class="card-body">
          <a href="${event.link}" class="btn btn-warning" target="_blank">Register</a>
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
  
      const eventListContainer = document.getElementById('event-list');
  
      eventData.forEach((event, index) => {
        event.id = index; // Add an ID to each event
        const eventCard = createEventCard(event);
        eventListContainer.appendChild(eventCard);
      });
  
      // Trigger the modal for the first event when the page loads
      const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
      if (eventData.length > 0) {
        const firstEvent = eventData[0];
        const eventModalBody = document.getElementById('eventModalBody');
        eventModalBody.innerHTML = `
          <h5>${firstEvent.title}</h5>
          <img src="${firstEvent.banner}" width="200"></img>
          <p>Date: ${firstEvent.date}</p>
          <p>Location: ${firstEvent.location}</p>
          <p>Description: ${firstEvent.description}</p>
        `;
  
        eventModal.show(); // Trigger the modal open function
      }
    } catch (error) {
      console.error('Error loading events:', error);
    }
  }
  
  // Call the function to load events when the page loads
  window.addEventListener('load', loadEvents);
  