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
  public posts: Post[] = []
  constructor(private db: AngularFirestore) {
    this.getCollection().get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.posts.push((new Post()).createFromDoc(doc))
      })})
  }

  private getCollection() {
    return this.db.collection("posts");
  }

  public getAll(): Post[]{
    return this.posts
  }

  public getById(id: number) {
    return this.getCollection().doc(id.toString()).get()
  }
}
