// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD21J-omPyBAXvjDFPANzpFg4a3AWchbFQ",
  authDomain: "tanim-ashs.firebaseapp.com",
  databaseURL: "https://tanim-ashs-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tanim-ashs",
  storageBucket: "tanim-ashs.firebasestorage.app",
  messagingSenderId: "459105073919",
  appId: "1:459105073919:web:ab6cb0346d87233d79aaca",
  measurementId: "G-Q16E4V78WQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM elements
const luxValueEl = document.getElementById("luxValue");
const humidityValueEl = document.getElementById("humidityValue");
const statusEl = document.getElementById("status");
const luxInput = document.getElementById("luxInput");
const humidityInput = document.getElementById("humidityInput");
const sendBtn = document.getElementById("sendBtn");
const sendStatusEl = document.getElementById("sendStatus");

// Reference to database paths
const luxRef = ref(db, "/TANIM-ASHS/Lux");
const humidityRef = ref(db, "/TANIM-ASHS/Humidity");

// Listen for live updates
onValue(luxRef, (snapshot) => {
  const val = snapshot.val();
  luxValueEl.textContent = val ?? "--";
  statusEl.textContent = "Data updated!";
});

onValue(humidityRef, (snapshot) => {
  const val = snapshot.val();
  humidityValueEl.textContent = val ?? "--";
});

// Send new values to Firebase
sendBtn.addEventListener("click", () => {
  const lux = parseFloat(luxInput.value);
  const humidity = parseFloat(humidityInput.value);

  if (!isNaN(lux) && !isNaN(humidity)) {
    set(luxRef, lux)
      .then(() => sendStatusEl.textContent = "Lux updated successfully!")
      .catch((err) => sendStatusEl.textContent = "Error sending Lux: " + err);

    set(humidityRef, humidity)
      .then(() => sendStatusEl.textContent += " Humidity updated successfully!")
      .catch((err) => sendStatusEl.textContent += " Error sending Humidity: " + err);
  } else {
    sendStatusEl.textContent = "Please enter valid numbers.";
  }
});
