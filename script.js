// Connect to your live server
const pb = new PocketBase('https://linquid.pockethost.io');

const counterEl = document.getElementById('counter');
const progressEl = document.getElementById('progress-bar');
const loginBtn = document.getElementById('login-btn');

// 1. Update the counter on page load
async function updateUI() {
    try {
        const resultList = await pb.collection('users').getList(1, 1);
        const totalJoined = resultList.totalItems;
        const remaining = 75 - totalJoined;

        // Update Text
        counterEl.innerText = `${totalJoined} / 75`;
        
        // Update Progress Bar
        const percent = (totalJoined / 75) * 100;
        progressEl.style.width = percent + "%";

        if (totalJoined >= 75) {
            loginBtn.innerText = "Portal Full";
            loginBtn.disabled = true;
            loginBtn.style.background = "#64748b";
        }
    } catch (err) {
        console.error("Error loading count:", err);
    }
}

// 2. Handle Google Login
async function login() {
    try {
        const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
        
        if (pb.authStore.isValid) {
            alert("Welcome to the 75!");
            location.reload();
        }
    } catch (err) {
        alert("Error: " + err.message);
    }
}

// Attach event listener
loginBtn.addEventListener('click', login);

// Initialize
updateUI();
async function loadMembers() {
    try {
        // Fetch all users from the database
        const records = await pb.collection('users').getFullList({
            sort: '-created', // Newest first
        });

        const listEl = document.getElementById('members-list');
        listEl.innerHTML = ''; // Clear the "loading" state

        records.forEach(user => {
            // Get the Google Avatar URL or use a placeholder
            const photoUrl = user.avatar 
                ? pb.files.getUrl(user, user.avatar) 
                : `https://ui-avatars.com/api/?name=${user.name}`;

            const card = `
                <div class="member-card">
                    <img src="${photoUrl}" class="member-photo" alt="${user.name}">
                    <span class="member-name">${user.name || 'Anonymous'}</span>
                </div>
            `;
            listEl.innerHTML += card;
        });
    } catch (err) {
        console.error("Error loading members:", err);
    }
}

// Update your Initialize section at the bottom to include this:
updateUI();
loadMembers();
