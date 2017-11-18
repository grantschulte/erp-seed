import greet from "./components/greet";

// Import the main stylesheet so webpack and webpack loaders
// process the styles.

import "../styles/app.scss";

window.onload = greet;
