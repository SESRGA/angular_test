import {AngularFirestore} from "@angular/fire/firestore";
import firebase from "firebase";
import {Injectable} from "@angular/core";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

export class Tag {
  public name: string;
  public id: number;

  public createFromDoc(doc: DocumentSnapshot<unknown>) {
    Object.assign(this, doc.data())
    this.id = +doc.id
    return this;
  }
}

@Injectable({providedIn: "root"})
export class TagProvider {
  constructor(private db: AngularFirestore) {}

  getTags(): Promise<Tag[]>{
    return new Promise(resolve => {
      this.db.collection("tags").ref.get().then((querySnapshot) => {
        const tags = []
        querySnapshot.forEach((tag) => {
          tags.push((new Tag()).createFromDoc(tag))
        })
        resolve(tags)
      })
    })
  }
}
