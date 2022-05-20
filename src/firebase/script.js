import { firestore } from "./index";
import { snapshotToArray } from "../utils";
import get from "lodash/get";
import chunk from "lodash/chunk";

const limit = 2;

export const updateCollection = async (collection_, startAfter_ = null) => {
  let documentRef = firestore.collection(collection_).orderBy("id", "desc");

  if (startAfter_) {
    documentRef = documentRef.startAfter(startAfter_);
  }

  documentRef = documentRef.limit(limit);

  const documentsQuerySnapShot = await documentRef.get();

  if (documentsQuerySnapShot.empty) return console.log("finish->", documentsQuerySnapShot.empty);

  let documents = snapshotToArray(documentsQuerySnapShot);

  console.log("fetching--->", documents.length);

  const promises = chunk(documents, 500).map(async (documentsChunk) => {
    const batchRef = firestore.batch();

    documentsChunk.map(async (document) => {
      if (!document?.user?.id) return;

      console.log("document", document);

      await firestore
        .collection("users")
        .doc(document.user.id)
        .set({ payment: document, hasPayment: !!document }, { merge: true });
    });

    await batchRef.commit();
  });

  await Promise.all(promises);

  const newStartAfter_ = get(documents, `[${documents.length - 1}].id`);

  if (!newStartAfter_) return console.log("finish no StartAfter_", newStartAfter_);

  console.log("newStartAfter_->", newStartAfter_);

  await updateCollection(collection_, newStartAfter_);
};
