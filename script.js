const pb = new PocketBase('https://linquid.pockethost.io');
pb.autoCancellation(false);

const postsContainer = document.getElementById('posts-container');
const postInput = document.getElementById('post-input');
const postBtn = document.getElementById('post-btn');
const sideCounter = document.getElementById('side-counter');

// 1. Initial Load
async function init() {
    updateMemberCount();
    loadPosts();
    subscribeToPosts(); // Real-time magic
}

// 2. Load Existing Posts
async function loadPosts() {
    try { 
        const records = await pb.collection('posts').getFullList({ 
            sort: '-created',
            expand: 'user',
        }); 
        postsContainer.innerHTML = '';
        records.forEach(renderPost); 
        } catch (err) { 
        console.error("Load error:", err); 
        postsContainer.innerHTML = `<div class="error">⚠️ Unable to load posts. Server error.</div>`; 
    } 
}

// 3. Render a Post Card
function renderPost(post) {
    const user = post.expand.user;
    const photo = user?.avatar ? pb.files.getUrl(user, user.avatar) : `https://ui-avatars.com/api/?name=${user?.name || 'User'}`;
    
    const html = `
        <div class="post-card" id="post-${post.id}">
            <div class="post-header">
                <img src="${photo}" class="pfp">
                <div>
                    <div class="member-name">${user?.name || 'Anonymous'}</div>
                    <small style="color:gray">${new Date(post.created).toLocaleString()}</small>
                </div>
            </div>
            <div class="post-content">${post.content}</div>
        </div>
    `;
    postsContainer.insertAdjacentHTML('afterbegin', html);
}

// 4. Create a New Post (safe null check)
if (postBtn) {
    postBtn.addEventListener('click', async () => {
        if (!pb.authStore.isValid) return alert("Please log in first!");
        if (!postInput.value.trim()) return;

        try {
            await pb.collection('posts').create({
                content: postInput.value,
                user: pb.authStore.model.id
            });
            postInput.value = ''; // Clear input
        } catch (err) {
            alert("Post failed: " + err.message);
        }
    });
}

// 5. Real-time Subscription
function subscribeToPosts() {
    pb.collection('posts').subscribe('*', function (e) {
        if (e.action === 'create') {
            pb.collection('posts').getOne(e.record.id, { expand: 'user' })
              .then(renderPost);
        }
    });
}

// 6. Member Count Utility
async function updateMemberCount() {
    try {
        const users = await pb.collection('users').getList(1, 1); 
        sideCounter.innerText = `${users.totalItems} / 75`; 
    } catch (err) { 
        console.error("Count error:", err); 
        sideCounter.innerText = `⚠️ Error`; } }

init();
