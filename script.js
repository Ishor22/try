const button = document.getElementById('greetButton');
const greeting = document.getElementById('greeting');

button.addEventListener('click', () => {
  const now = new Date();
  const hour = now.getHours();
  let message = 'Have a great day!';

  if (hour < 12) {
    message = 'Good morning!';
  } else if (hour < 18) {
    message = 'Good afternoon!';
  } else {
    message = 'Good evening!';
  }

  greeting.textContent = `${message} Thanks for visiting the hello website.`;
});
