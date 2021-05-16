import {Component} from '@angular/core';
import {PostsProvider} from "../../data/data";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-root',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {
  public pageSize = 5
  public posts = []
  postsTotalCount: number = 0;
  constructor(private provider: PostsProvider) {
    this.provider.getPaginationList(0, this.pageSize).then((posts) => {
      this.posts = posts
    })
    this.provider.getTotalCount().then((count) => this.postsTotalCount = count)
  }
  onPageEvent(event: PageEvent) {
    this.provider.getPaginationList(event.pageIndex, this.pageSize).then((posts) => {
      this.posts = posts
    })
  }
}

