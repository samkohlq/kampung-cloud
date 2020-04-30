var admin = require("firebase-admin");

var serviceAccount = require("./CCServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
