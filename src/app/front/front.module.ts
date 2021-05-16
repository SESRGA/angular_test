import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {PageComponent} from "./page/page.component";
import {CardComponent} from "./page/card/card.component";
import {MatCardModule} from "@angular/material/card";
import {PostPageComponent} from "./page/post-page/post-page.component";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";

@NgModule({
  declarations: [
    PostPageComponent,
    PageComponent,
    CardComponent
  ],
  imports: [
    MatProgressBarModule,
    BrowserModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSelectModule,
    MatOptionModule,
  ],
  providers: [],
  bootstrap: [PageComponent]
})
export class FrontModule { }
