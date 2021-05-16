import {Component} from '@angular/core';
import {PostsProvider} from "../../data/post-provider";
import {PageEvent} from "@angular/material/paginator";
import {TagProvider} from "../../data/tag-provider";
import {CategoryProvider} from "../../data/category-provider";

@Component({
  selector: 'app-root',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {
  public pageSize = 5
  public posts = []
  public tags = []
  public categories = []
  public selectedTagId = 0
  public selectedCategoryId = 0
  public selectedPageIndex = 0
  postsTotalCount: number = 0;
  constructor(private postProvider: PostsProvider, private tagProvider: TagProvider, private categoryProvider: CategoryProvider, ) {
    this.postProvider.getPaginationList(0, this.pageSize, this.selectedTagId, this.selectedCategoryId).then((posts) => {
      this.posts = posts
    })
    this.tagProvider.getTags().then((tags) => {
      this.tags = tags
    })
    this.categoryProvider.getCategories().then((categories) => {
      this.categories = categories
    })
    this.postProvider.getTotalCount().then((count) => this.postsTotalCount = count)
  }
  onPageEvent(event: PageEvent) {
    this.postProvider.getPaginationList(event.pageIndex, this.pageSize, this.selectedTagId, this.selectedCategoryId).then((posts) => {
      this.posts = posts
    })
  }
  onTagsSelectEvent(event) {
    this.postProvider.getPaginationList(this.selectedPageIndex, this.pageSize, this.selectedTagId, this.selectedCategoryId).then((posts) => {
      this.posts = posts
    })
  }
  onCategoriesSelectEvent(event) {
    this.postProvider.getPaginationList(this.selectedPageIndex, this.pageSize, this.selectedTagId, this.selectedCategoryId).then((posts) => {
      this.posts = posts
    })
  }
}

