import { firestore } from "firebase";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Trip } from "../models/Trip";
import { SnapshotIn, SnapshotOut } from "mobx-state-tree";

function fromCollectionRef(ref: firestore.CollectionReference) {
  return new Observable<firestore.QuerySnapshot>(observer => {
    ref.onSnapshot(observer);
  });
}

export class TripRepository {
  constructor(private firestore: firestore.Firestore) {}

  getTripsStream() {
    return fromCollectionRef(this.firestore.collection("trips")).pipe(
      map(snapshot =>
        snapshot.docs.map(doc => doc.data() as SnapshotIn<typeof Trip>)
      )
    );
  }

  addTrip(trip: SnapshotOut<typeof Trip>) {
    return this.firestore
      .collection("trips")
      .doc(trip.id)
      .set(trip);
  }
}
