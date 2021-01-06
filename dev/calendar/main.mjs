

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    timeZone: 'UTC',
    initialView: 'dayGridMonth',
    events: 'https://fullcalendar.io/demo-events.json',
    editable: true,
    selectable: true,
    dateClick(info) {
      console.log(info)
    }
  });

  calendar.render();
});
