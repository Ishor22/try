# Flight Ticket Booking Website

A simple static flight ticket booking website with a responsive booking form.

## Files

- `index.html` - Main booking page
- `style.css` - Styling for layout and forms
- `script.js` - Booking form handling and summary preview

## Run

Open `index.html` in your browser, or serve the folder using a local web server:

```bash
cd c:\Users\PC\Documents\try
python -m http.server 8000
```

Then visit:

http://localhost:8000

Notes about images

- The hero background uses a royalty-free photo from Unsplash. If you prefer a local photo, replace the `background-image` URL in `style.css` (look for `.hero { background-image: ... }`) with a relative path like `images/hero.jpg` and place your photo at `images/hero.jpg`.
- The header logo uses `images/logo.svg`. Replace that file with your airline logo if needed.

Auth and dashboard (demo)

- A simple client-side mock login exists for demo purposes. Click "Login" in the header, sign in with any username, and you'll be redirected to `dashboard.html`.
- To clear the demo session, open the browser devtools and run `localStorage.removeItem('mock_user')` or use the "Log out" link on the dashboard.
