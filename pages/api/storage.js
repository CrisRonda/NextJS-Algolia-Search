import firebase from "firebase";
import initFirebase from "../../utils/auth/initFirebase";
import "firebase/storage";

initFirebase();

const storage = firebase.storage();
const rootRef = storage.ref("/");
export const getFiles = async () => {
  const list = await rootRef.listAll();
  const { prefixes, items, nextPageToken } = list;
  const files = items.map((i) => {
    return {
      name: i.name,
      path: i.fullPath,
      isItem: true,
    };
  });
  const folders = prefixes.map((p) => ({
    name: p.name,
    path: p.fullPath,
    isItem: false,
  }));
  return { files, folders, nextPageToken };
};
