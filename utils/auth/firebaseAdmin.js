import * as admin from "firebase-admin";
const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY;

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       // https://stackoverflow.com/a/41044630/1332513
//       privateKey: firebasePrivateKey.replace(/\\n/g, "\n"),
//     }),
//     databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
//   });
// }
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: "service_account",
      project_id: "nextjsfirebase-4a083",
      private_key_id: "010c2262031ff38749aeff03b9205704b37d32d4",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC1BMHB7PuKYR1k\nX6GLHz36KHzrzWhsiT1f8ah7k2XlgrK89RuE6Cn/AUQVavUiBZFwsosDdCWf4PHK\noMDrGTmD/QkniG/4pSZR0ojTzd62pm40MjxLXZQ+DjmHhAoxYrqrxWbn1xMgsQoV\nCa570xUeJnNjqWdBZWIpPdh4jNgte4n+1dNnqNs3xp3tt8GG9tQjn2AdxREVprTK\nyMCqkqYZB3f5WszFoywQlfPdFFLSPExBGSfM12PhpTJnM213xPucANpmSnYOfEYn\no3feEWwtOJmGxkzNzm8owf4B9kqSdRKNwfqwVPpPwVYiPBMhMMGX0iTKPfzPP6t5\nuG+oiSFXAgMBAAECggEAU+rmoC5q1lX7OEMVMtfC9au7bd2F4XsmFsqDHvbQMDwM\n/Ihsv4qZnXxKwdsZ1THboPFEfM9led7geN1ZUiQZg9TUX51iu1RklV4SzI4OB4LU\naCI5zX6OcM5LYUWXLBnnDCaxdB1C4s7wK5yXZRQQIDAXIkawdaK4hQIEzq4Msdhh\nSR8BfGGZdaokeuUp9dVZuXyXnLb3oRF+zWBzboljYvFZPhGPRe6d444s+RUAJzhE\nBTFRLEMnkb11KlYGsG5rXSjNRkfCi5uRjG8dLxDnW6fNbUCez11GnNIkuHxBiKfJ\n9FCwpT3iUGsNvKeWk2JV/D9tovJ0kwC1UWCNkqHCcQKBgQDsE1aNsVBUkwvNX8Wn\n3YGjCxcVqaTRwElVQi+nJbiWouwVSG/fR2vghUB/giPeloUvkKuH7Pa7RVJxPX0H\n8gMBahLNIaHjPyclV9mYlrgAVoabiPDtvrfzXIPJIxYZk2JDt4x5/WzNXnM2fST2\nh7W/0jWx7eFSCaHO7eHW9grglQKBgQDES9rbt8Ti3UFGtmkaOfyvrn8UkQW8dbpl\n1DPpt9bb8RZYXZxvrf4ZwwM2PqUUw6yi7/ummh/BFtRJ8/pehmfWVlzZwlUmEZgO\nDicM8kMsRJPz3xP57gGnlCcjz53LRP+buTfNqbOEO902neIeT2y9D6FjJseujSa/\nj1g29kcjOwKBgE//PZVGQLJoIde2XIRFy2g0md39Xpy1TCRYCU3aunJRQy7zHPXM\nfgHXJcQPlZgX6Yn0vCuTYQiUtRsqevP2To5sI3LfsrwO6nT9D/9lE3UJ3RNXlEz8\nE9mjwASonxSLnQDVcgTkm7n8B46vWZcw5aXa1dc1hOUH3o0Aj0cImScBAoGAcPnT\nebe3ynZbNm6P6TdMlnRQ0a5x5bjAUhEi27YiJC4KlUszWReD8qHJfHProRrJhnGm\nnYmBEymnfvS7uaGTq8nC4NW3GhTwNc6xbQMV5CmIGcjff24bZ66eJD8+6xnIH4En\ne+fa2RV3SRLvbFB8Hggb86wDKxQ0I/ZFaESwRrcCgYBPL4Gqj7Ux+QDtsfzy/+7A\nxbsLDPzrca5wXfCsgjYdB5NTBhcg0YAguHxsvL3DIzCZEvXL9e9I2OgUFEItiXLR\nJvg80ghVS0p9fcKQpN9Z3enfmvRoDGqyNIZKjJr51wpH86MCy/UeGVtqbQ/lzW7Y\no5nWDAb9ewD1y21zTUYtcQ==\n-----END PRIVATE KEY-----\n",
      client_email:
        "firebase-adminsdk-wcvq0@nextjsfirebase-4a083.iam.gserviceaccount.com",
      client_id: "111866016326313617931",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-wcvq0%40nextjsfirebase-4a083.iam.gserviceaccount.com",
    }),
  });
}
export const verifyIdToken = async (token) => {
  try {
    return admin.auth().verifyIdToken(token);
  } catch (error) {
    throw error;
  }
};

export const getAuthUsers = async (nextPageToken = "") => {
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
