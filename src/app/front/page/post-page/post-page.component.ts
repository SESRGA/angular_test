import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {PostsProvider} from "../../../data/data";

@Component({
  selector: 'app-root',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent {
  public post: any
  public loaded: boolean = false
  constructor(route: ActivatedRoute, provider: PostsProvider) {
    route.params.pipe(map(p => p.id)).subscribe((id)=>{
      provider.getById(+id).subscribe((c) => {
        this.post = c.data()
        this.loaded = true
      })
    })
  }
}

