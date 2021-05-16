import {AngularFirestore} from "@angular/fire/firestore";
import firebase from "firebase";
import {Injectable} from "@angular/core";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

export class Category {
  public name: string;
  public id: number;

  public createFromDoc(doc: DocumentSnapshot<unknown>) {
    Object.assign(this, doc.data())
    this.id = +doc.id
    return this;
  }
}

@Injectable({providedIn: "root"})
export class CategoryProvider {
  constructor(private db: AngularFirestore) {}

  getCategories(): Promise<Category[]>{
    return new Promise(resolve => {
      this.db.collection("category").ref.get().then((querySnapshot) => {
        const categories = []
        querySnapshot.forEach((category) => {
          categories.push((new Category()).createFromDoc(category))
        })
        resolve(categories)
      })
    })
  }
}
