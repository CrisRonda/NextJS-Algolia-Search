import * as admin from "firebase-admin";
import credential from "./service-account.json";
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(credential),
  });
}
export const verifyIdToken = async (token) => {
  try {
    return admin.auth().verifyIdToken(token);
  } catch (error) {
    throw error;
  }
};

export const getAuthUsers = async () => {
  try {
    const listUsersResult = await admin.auth().listUsers(1000);
    const _users = listUsersResult.users.map((userRecord) =>
      userRecord.toJSON()
    );
    return _users;
  } catch (error) {
    throw error;
  }
};
