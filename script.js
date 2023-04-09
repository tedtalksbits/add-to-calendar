let baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
let eventName = document.getElementById('event-name');
let eventDate1 = document.getElementById('event-date1');
let eventDate2 = document.getElementById('event-date2');
let eventLocation = document.getElementById('event-location');
let eventDescription = document.getElementById('event-description');
let submit = document.getElementById('submit');

// set default date and time

let today = new Date();

eventDate1.value = today.toISOString().slice(0, 19);
eventDate2.value = today.toISOString().slice(0, 19);

eventDate1.addEventListener('change', (e) => {
    eventDate2.min = eventDate1.value;

    if (eventDate2.value < eventDate1.value) {
        eventDate2.value = eventDate1.value;
    }
});

eventDate2.addEventListener('change', (e) => {
    if (eventDate2.value < eventDate1.value) {
        eventDate2.value = eventDate1.value;
    }
});

submit.addEventListener('click', (e) => {
    e.preventDefault();

    let formattedDate1 = formatDate(eventDate1.value);
    let formattedDate2 = formatDate(eventDate2.value) || formattedDate1;

    let url = `${baseUrl}&text=${eventName.value}&dates=${formattedDate1}/${formattedDate2}&location=${eventLocation.value}&details=${eventDescription.value}`;
    window.open(url, '_blank');
});

function formatDate(date) {
    if (!date) return;
    let isoStringDate = new Date(date).toISOString();
    // remove -, ., and :
    let formattedDate = isoStringDate.replace(/-|\.|:/g, '');

    return formattedDate;
}
