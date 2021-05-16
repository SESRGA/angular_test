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

  constructor(private db: AngularFirestore) {
  }

  private getCollection() {
    return this.db.collection("posts");
  }

  private getPostTagsCollection() {
    return this.db.collection("post_tags");
  }

  public getById(id: number): Promise<Post> {
    return new Promise(resolve => this.getCollection().doc(id.toString()).get().subscribe((docSnapshot) => {
      resolve((new Post()).createFromDoc(docSnapshot))
    }))
  }

  public getPaginationList(pageNumber: number, postsCount: number, tagId: number | null, categoryId: number | null): Promise<Post[]> {
    const offset = postsCount * pageNumber;
    if (offset === 0) {
      return new Promise(resolve => {
        let query: firebase.firestore.Query<unknown> = this.getCollection().ref;
        if (!!categoryId) {
          query = query.where("category_id", "==", categoryId)
        }
        if (!!tagId) {
          return new Promise(resolve => {
            this.getPostTagsCollection().ref
              .where("tag_id", "==", tagId)
              .get().then((querySnapshot) => {
              const postIds = []
              querySnapshot.forEach((elem) => {
                // @ts-ignore
                postIds.push(elem.data().post_id.toString())
              })
              resolve(postIds)
            })
          }).then((postIds: []) => {
            if (postIds.length === 0) {
              resolve([])
              return
            }
            query
              .where(firebase.firestore.FieldPath.documentId(), "in", postIds)
              .orderBy(firebase.firestore.FieldPath.documentId())
              .limit(postsCount).get().then((querySnapshot) => {
              const result = []
              querySnapshot.forEach((doc) => {
                result.push((new Post()).createFromDoc(doc));
              })
              resolve(result)
            })
          })
        }
        query
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

  getTotalCount(): Promise<number> {
    return new Promise(resolve => {
      this.getCollection().ref.get().then((querySnapshot) => {
        resolve(querySnapshot.docs.length)
      })
    })
  }
}


