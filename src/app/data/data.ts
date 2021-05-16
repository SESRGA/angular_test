import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
import firebase from "firebase";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;


export class Post {
  public title: string;
  public content: string;
  public id: number;

  public createFromDoc(doc: DocumentSnapshot<unknown>) {
    Object.assign(this, doc.data())
    this.id = +doc.id
    return this;
  }
}

@Injectable({providedIn: "root"})
export class PostsProvider {

  constructor(private db: AngularFirestore) {}

  private getCollection() {
    return this.db.collection("posts");
  }

  public getById(id: number) {
    return this.getCollection().doc(id.toString()).get()
  }

  public getPaginationList(pageNumber: number, postsCount: number): Promise<Post[]> {

    const offset = postsCount * pageNumber;
    if (offset === 0) {
      return new Promise(resolve => {
        this.getCollection().ref
          .orderBy(firebase.firestore.FieldPath.documentId())
          .limit(postsCount).get().then((querySnapshot) => {
          const result = []
          querySnapshot.forEach((doc) => {
            result.push((new Post()).createFromDoc(doc));
          })
          resolve(result)
        })
      })

    } else {
      let current = this.getCollection().ref
        .orderBy(firebase.firestore.FieldPath.documentId())
        .limit(offset)

      return new Promise(resolve => {
        current.get().then((documentSnapshots) => {
          const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
          const next = this.getCollection().ref
            .orderBy(firebase.firestore.FieldPath.documentId())
            .startAfter(lastVisible.id)
            .limit(postsCount);
          next.get().then((querySnapshot) => {
            const result = []
            querySnapshot.forEach((doc) => {
              result.push((new Post()).createFromDoc(doc));
            })
            resolve(result)
          })
        });
      })
    }
  }

  getTotalCount(): Promise<number>{
    return new Promise(resolve => {
      this.getCollection().ref.get().then((querySnapshot) => {
        resolve(querySnapshot.docs.length)
      })
    })
  }
}
