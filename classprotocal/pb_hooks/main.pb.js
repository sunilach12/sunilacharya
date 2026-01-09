// This is the updated version for PocketBase v0.35.0
routerAdd("POST", "/api/collections/users/records", (e) => {
    // This counts how many users are already in the database
    const totalUsers = $app.dao().findRecordsByFilter("users", "id != ''").length;

    // If there are already 75 or more users, block the new one
    if (totalUsers >= 75) {
        throw new BadRequestError("The Class is Full! (Limit of 75 reached)");
    }

    return e.next();
});