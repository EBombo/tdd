import { firestore } from "./index";
import { snapshotToArray } from "../utils";
import get from "lodash/get";
import chunk from "lodash/chunk";

const limit = 1000;

export const updateCollection = async (collection_, startAfter_ = "") => {
  const collectionRef = firestore.collection(collection_);

  // const documentsQuerySnapShot = await collectionRef.orderBy("id", "asc").startAfter(startAfter_).limit(limit).get();
  const documentsQuerySnapShot = await collectionRef.limit(limit).get();

  if (documentsQuerySnapShot.empty) return console.log("finish->", documentsQuerySnapShot.empty);

  let documents = snapshotToArray(documentsQuerySnapShot);

  console.log("traidos--->", documents.length);

  const promises = chunk(documents, 500).map(async (documentsChunk) => {
    const batchRef = firestore.batch();

    documentsChunk.map(async (document) => {
      // batchRef.update(firestore.collection(collection_).doc(document.id), {
      //   updateAt: new Date(),
      //   createAt: new Date(),
      //   seen: false,
      //   deleted: false,
      //   id: document.id,
      // });
      await firestore
        .collection("emails")
        .doc(document.id)
        .set(
          {
            ...document,
            updateAt: new Date(),
            createAt: new Date(),
            seen: false,
            deleted: false,
            id: document.id,
          },
          { merge: true }
        );
    });

    await batchRef.commit();
  });

  await Promise.all(promises);

  const newStartAfter_ = get(documents, `[${documents.length - 1}].id`);

  if (!newStartAfter_) return console.log("finish no StartAfter_", newStartAfter_);

  console.log("newStartAfter_->", newStartAfter_);

  await updateCollection(collection_, newStartAfter_);
};
