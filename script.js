// Suggestion Logic
function fillUser() {
    document.getElementById('username').value = "music_creator_01!";
}

function fillPass() {
    document.getElementById('password').value = "Secure#2026";
}

// Redirect to Main after "Login"
function validate() {
    // In a real site, you'd check the database here
    window.location.href = "main.html";
}

// Google Login Callback
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    window.location.href = "main.html";
}

// Search Logic
function searchAction(event) {
    if (event.key === "Enter") {
        let query = document.getElementById('mainSearch').value;
        // Redirect to google search as requested
        window.open("https://www.google.com/search?q=" + encodeURIComponent(query), "_blank");
    }
}

function openSettings() {
    alert("User Search History: \n1. Guitar Tabs\n2. Portfolio Design\n3. Best Blogs");
}
