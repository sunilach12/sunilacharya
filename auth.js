let currentUser = {
  username: "Sunil",
  firstName: "Sunil",
  lastName: "Acharya",
  email: "sunil@example.com",
  phone: "977XXXXXXXXX",
  country: "Nepal",
  photo: "assets/defaultavatar.png",
  blogs: [],
  music: [],
  videos: []
};
localStorage.setItem("currentUser", JSON.stringify(currentUser));
