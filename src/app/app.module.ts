import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FrontModule} from "./front/front.module";
import {RouterModule, Routes} from "@angular/router";
import {PageComponent} from "./front/page/page.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PostPageComponent} from "./front/page/post-page/post-page.component";
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {firebaseConfig} from 'src/environments/vars';

const routes: Routes = [
  { path: '', component: PageComponent },
  { path: 'posts/:id', component: PostPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FrontModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
