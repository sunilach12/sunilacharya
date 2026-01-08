<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Settings</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="css/main.css">
</head>
<body>

<div class="settings-page">
  <h2>Account Settings</h2>

  <!-- Profile Info -->
  <div class="setting-card">
    <h3>Profile</h3>
    <p id="settingName"></p>
    <p id="settingCountry"></p>
  </div>

  <!-- Security -->
  <div class="setting-card">
    <h3>Password & Security</h3>
    <input type="password" id="newPassword" placeholder="New Password">
    <button onclick="changePassword()">Change Password</button>
  </div>

  <!-- Logout -->
  <div class="setting-card danger">
    <button onclick="logout()">Logout</button>
  </div>
</div>

<script src="js/auth.js"></script>
<script src="js/settings.js"></script>
</body>
</html>
