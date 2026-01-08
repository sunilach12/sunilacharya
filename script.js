// 1. Suggestion Logic (Touch the text to fill the box)
function fillUser() {
    document.getElementById('username').value = "music_fan_2026!";
}

function fillPass() {
    document.getElementById('password').value = "Pass#789!";
}

// 2. Fix the Login Redirect
function validate() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user !== "" && pass !== "") {
        // This line sends you to the main website page
        window.location.href = "main.html"; 
    } else {
        alert("Please enter a username and password (or use the suggestions!)");
    }
}

// 3. Fix the Sign Up Toggle
function toggleAuth() {
    const title = document.getElementById('auth-title');
    const btn = document.querySelector('.btn-login');
    
    if (title.innerText === "Login") {
        title.innerText = "Sign Up";
        btn.innerText = "Create Account";
        alert("Switched to Sign Up mode! Enter your new details.");
    } else {
        title.innerText = "Login";
        btn.innerText = "Continue";
    }
}

// 4. Google Login Redirect
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    window.location.href = "main.html";
}
