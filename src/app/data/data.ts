import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";

const state = {
  posts: []
}

@Injectable({providedIn: "root"})
export class PostsProvider {
  public posts: any = []
  constructor(private db: AngularFirestore) {
    db.collection("posts").get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.posts.push({
          id: +doc.id,
          // @ts-ignore
          ...doc.data(),
        })
      })})
  }


  public getAll(){
    return this.posts
  }

  getById(id: number) {
    return this.db.collection("posts" ).doc(id.toString()).get()
  }
}
