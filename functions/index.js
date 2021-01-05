const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { default: algoliasearch } = require("algoliasearch");
const algoliaConfig = {
  appid: "2J3H4NW9CQ",
  apikey: "5bbc35f573e6b521ec9fd0c1b12cba7c",
};
admin.initializeApp();

const clientAlgolia = algoliasearch(algoliaConfig.appid, algoliaConfig.apikey);
const collectionIndex = clientAlgolia.initIndex("files_search");
exports.algolia = functions.storage.object().onFinalize(async (object) => {
  try {
    const { size, metadata, name } = object;
    const refFiles = admin.firestore().collection("files").doc();
    const id = refFiles.id;
    const file = { id, size, metadata, name };
    await refFiles.set(file);
  } catch (error) {
    console.log("*************************");
    console.log("error", error);
    console.log("*************************");
  }
});
async function saveDocumentInAlgolia(snapshot) {
  if (snapshot.exists) {
    const record = snapshot.data();
    if (record) {
      record.objectID = snapshot.id;
      const { objectID } = await collectionIndex.saveObject(record);
      console.log(objectID);
    }
  }
}
exports.collectionOnCreate = functions.firestore
  .document("files/{uid}")
  .onCreate(async (snapshot) => {
    await saveDocumentInAlgolia(snapshot);
  });
