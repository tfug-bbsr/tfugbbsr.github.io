// Function to create an event card with the specified format
function createEventCard(event, isUpcoming) {
  const eventCard = document.createElement('div');
  eventCard.classList.add('col-md-3', 'mb-4', 'mx-2', 'event-card');

  eventCard.innerHTML = `
    <div class="card" style="border-color: rgba(255, 255, 255, 0) !important;">
      <img src="${event.banner}" class="card-img-top" alt="${event.title}"> <!-- Banner Image -->
      <div class="card-body">
        <h5 class="card-title">${event.title}</h5>
        <div class="event-details">
          <i class="bi bi-calendar"></i> ${event.date} <!-- Date with icon -->
          <i class="bi bi-geo-alt"></i> ${event.location} <!-- Location with icon -->
        </div>
      </div>
      <div class="card-body">
        ${isUpcoming ? `<a href="${event.link}" class="btn btn-warning" target="_blank">Register</a>` : ''}
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

    // Get the current date
    const currentDate = new Date();

    // Separate events into upcoming and past events
    const upcomingEvents = eventData.filter(event => new Date(event.date) >= currentDate);
    const pastEvents = eventData.filter(event => new Date(event.date) < currentDate);

    const eventListContainer = document.getElementById('event-list-all');
    const pastEventsContainer = document.getElementById('past-events-all');

    // Sort upcoming events by date
    upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Display upcoming events
    upcomingEvents.forEach((event, index) => {
      event.id = index; // Add an ID to each event
      const eventCard = createEventCard(event, true);
      eventListContainer.appendChild(eventCard);
    });

    // Display past events
    pastEvents.forEach((event, index) => {
      event.id = index; // Add an ID to each event
      const eventCard = createEventCard(event, false);
      pastEventsContainer.appendChild(eventCard);
    });

    // Trigger the modal for the first upcoming event when the page loads
    const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
    if (upcomingEvents.length > 0) {
      const firstEvent = upcomingEvents[0];
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

// Function to fetch and display events
async function loadEventsTop() {
  try {
    const response = await fetch('./json/events.json');
    const eventData = await response.json();

    // Get the current date
    const currentDate = new Date();

    // Separate events into upcoming and past events
    const upcomingEvents = eventData.filter(event => new Date(event.date) >= currentDate);
    const pastEvents = eventData.filter(event => new Date(event.date) < currentDate);

    const eventListContainer = document.getElementById('event-list');
    const pastEventsContainer = document.getElementById('past-events');

    // Sort upcoming events by date
    upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Display upcoming events
    upcomingEvents.forEach((event, index) => {
      event.id = index; // Add an ID to each event
      const eventCard = createEventCard(event, true);
      eventListContainer.appendChild(eventCard);
    });

    // Display recent three past events
    const recentPastEvents = pastEvents.slice(0, 3); // Get the recent three events
    recentPastEvents.forEach((event, index) => {
      event.id = index; // Add an ID to each event
      const eventCard = createEventCard(event, false);
      pastEventsContainer.appendChild(eventCard);
    });

    // Trigger the modal for the first upcoming event when the page loads
    const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
    if (upcomingEvents.length > 0) {
      const firstEvent = upcomingEvents[0];
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
window.addEventListener('load', loadEventsTop);
