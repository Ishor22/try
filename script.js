const form = document.getElementById('bookingForm');
const summaryName = document.getElementById('summaryName');
const summaryRoute = document.getElementById('summaryRoute');
const summaryDates = document.getElementById('summaryDates');
const summaryClass = document.getElementById('summaryClass');
const summaryPassengers = document.getElementById('summaryPassengers');
const summaryNotice = document.getElementById('summaryNotice');

function formatAirport(code) {
  const labels = {
    NYC: 'New York (NYC)',
    LAX: 'Los Angeles (LAX)',
    LHR: 'London (LHR)',
    DXB: 'Dubai (DXB)',
    PAR: 'Paris (PAR)',
    TYO: 'Tokyo (TYO)',
    SYD: 'Sydney (SYD)',
    CPT: 'Cape Town (CPT)',
  };
  return labels[code] || code;
}

function updateSummary(data) {
  summaryName.textContent = data.fullName || '—';
  summaryRoute.textContent = data.from && data.to ? `${formatAirport(data.from)} → ${formatAirport(data.to)}` : '—';
  summaryDates.textContent = data.departureDate ? data.departureDate : '—';
  if (data.returnDate) {
    summaryDates.textContent += ` / ${data.returnDate}`;
  }
  summaryClass.textContent = data.travelClass ? data.travelClass.replace(/(^|\s)\S/g, (letter) => letter.toUpperCase()) : '—';
  summaryPassengers.textContent = data.passengers ? `${data.passengers} passenger${data.passengers > 1 ? 's' : ''}` : '—';
  summaryNotice.textContent = data.booked
    ? 'Your flight booking request has been received. A confirmation email will be sent shortly.'
    : 'Fill out the form to see a preview of your flight details.';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const bookingData = {
    fullName: document.getElementById('fullName').value.trim(),
    email: document.getElementById('email').value.trim(),
    from: document.getElementById('fromAirport').value,
    to: document.getElementById('toAirport').value,
    departureDate: document.getElementById('departureDate').value,
    returnDate: document.getElementById('returnDate').value,
    passengers: Number(document.getElementById('passengers').value),
    travelClass: document.getElementById('travelClass').value,
    notes: document.getElementById('notes').value.trim(),
    booked: true,
  };

  if (bookingData.from === bookingData.to) {
    summaryNotice.textContent = 'Origin and destination cannot be the same. Please choose different airports.';
    return;
  }

  updateSummary(bookingData);
  form.reset();
});

updateSummary({});
