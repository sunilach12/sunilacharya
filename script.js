const pb = new PocketBase('https://linquid.pockethost.io');
pb.autoCancellation(false);// Fixes the 'autocancelled' error

const postsContainer = document.getElementById('posts-container');
const postInput = document.getElementById('post-input');
const postBtn = document.getElementById('post-btn');
const sideCounter = document.getElementById('side-counter');

// 1. Start the App
async function init() {
    updateMemberCount();
    loadPosts();
    subscribeToPosts();
    checkUserStatus();
}

// 2. Check if user is logged in
function checkUserStatus() {
    if (pb.authStore.isValid) {
        document.getElementById('my-avatar').src = pb.files.getUrl(pb.authStore.model, pb.authStore.model.avatar) || `https://ui-avatars.com/api/?name=${pb.authStore.model.name}`;
    }
}

// 3. Load Feed
async function loadPosts() {
    try {
        const records = await pb.collection('posts').getFullList({
            sort: '-created',
            expand: 'user',
        });
        postsContainer.innerHTML = ''; // Clear loading text
        records.forEach(renderPost);
    } catch (err) {
        postsContainer.innerHTML = '<p style="color:red">Please create the "posts" collection in Admin Dashboard.</p>';
    }
}

function renderPost(post) {
    const user = post.expand?.user;
    const photo = user?.avatar ? pb.files.getUrl(user, user.avatar) : `https://ui-avatars.com/api/?name=${user?.name || 'User'}`;
    
    const html = `
        <div class="post-card">
            <div class="post-header">
                <img src="${photo}" class="pfp">
                <div>
                    <strong>${user?.name || 'Student'}</strong>
                    <div style="font-size:12px; color:gray">${new Date(post.created).toLocaleString()}</div>
                </div>
            </div>
            <div class="post-content">${post.content}</div>
        </div>`;
    postsContainer.insertAdjacentHTML('afterbegin', html);
}

// 4. Post Message
postBtn.addEventListener('click', async () => {
    if (!pb.authStore.isValid) {
        // If not logged in, trigger Google Login
        try {
            await pb.collection('users').authWithOAuth2({ provider: 'google' });
            location.reload();
        } catch (e) { alert("Please login with Google first!"); }
        return;
    }

    if (postInput.value.trim()) {
        await pb.collection('posts').create({
            content: postInput.value,
            user: pb.authStore.model.id
        });
        postInput.value = '';
    }
});

// 5. Real-time updates
function subscribeToPosts() {
    pb.collection('posts').subscribe('*', async (e) => {
        if (e.action === 'create') {
            const newPost = await pb.collection('posts').getOne(e.record.id, { expand: 'user' });
            renderPost(newPost);
        }
    });
}

async function updateMemberCount() {
    const res = await pb.collection('users').getList(1, 1);
    sideCounter.innerText = `${res.totalItems} / 75`;
}

init();
