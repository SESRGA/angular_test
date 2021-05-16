import {Component} from '@angular/core';
import {PostsProvider} from "../../data/data";

@Component({
  selector: 'app-root',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {
  public posts = []
  constructor(provider: PostsProvider) {
    this.posts = provider.getAll()
  }
}

