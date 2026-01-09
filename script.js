const pb = new PocketBase('https://linquid.pockethost.io');

// STOP THE 500/CANCELLATION ERRORS
pb.autoCancellation(false);

const counterEl = document.getElementById('counter');
const progressEl = document.getElementById('progress-bar');
const loginBtn = document.getElementById('login-btn');
const listEl = document.getElementById('members-list');

async function init() {
    await updateUI();
    await loadMembers();
}

async function updateUI() {
    try {
        const resultList = await pb.collection('users').getList(1, 1);
        const total = resultList.totalItems;
        counterEl.innerText = `${total} / 75`;
        progressEl.style.width = (total / 75 * 100) + "%";

        if (total >= 75) {
            loginBtn.innerText = "Class Full";
            loginBtn.disabled = true;
        }
    } catch (e) { console.error(e); }
}

async function loadMembers() {
    try {
        const records = await pb.collection('users').getFullList({ sort: '-created' });
        listEl.innerHTML = '';
        records.forEach(user => {
            const photo = user.avatar ? pb.files.getUrl(user, user.avatar) : `https://ui-avatars.com/api/?name=${user.name}`;
            listEl.innerHTML += `
                <div class="member-card">
                    <img src="${photo}" class="member-photo">
                    <span class="member-name">${user.name || 'Student'}</span>
                </div>`;
        });
    } catch (e) { console.error(e); }
}

function filterMembers() {
    const term = document.getElementById('member-search').value.toLowerCase();
    const cards = document.getElementsByClassName('member-card');
    Array.from(cards).forEach(card => {
        const name = card.querySelector('.member-name').innerText.toLowerCase();
        card.style.display = name.includes(term) ? "" : "none";
    });
}

loginBtn.addEventListener('click', async () => {
    try {
        await pb.collection('users').authWithOAuth2({ provider: 'google' });
        location.reload();
    } catch (e) { alert("Registration Error: " + e.message); }
});

init();
