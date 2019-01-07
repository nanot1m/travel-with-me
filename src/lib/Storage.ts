import firebase from "firebase";

export class Storage {
  constructor(private firestore: firebase.firestore.Firestore) {}
  async getObjects(type: string, limit: number, lastVisible?: any) {
    return lastVisible
      ? await this.firestore
          .collection(type)
          .startAfter(lastVisible)
          .limit(limit)
          .get()
      : await this.firestore
          .collection(type)
          .limit(limit)
          .get();
  }
}
