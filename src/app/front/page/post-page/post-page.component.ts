import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {Post, PostsProvider} from "../../../data/post-provider";

@Component({
  selector: 'app-root',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent {
  public post: Post | null
  public loaded: boolean = false

  constructor(route: ActivatedRoute, provider: PostsProvider) {
    route.params.pipe(map(p => p.id)).subscribe((id) => {
      provider.getById(+id).then((post) => {
        this.post = post
        this.loaded = true
      })
    })
  }
}



