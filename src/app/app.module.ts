import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { CompletedComponent } from './pages/completed/completed.component';
import { UsersComponent } from './pages/users/users.component';
import { Route } from '@angular/router';

const routes: Route[] = [
  {
    path: "",
    component: MainComponent
  },
  {
    path: "completed",
    component: CompletedComponent
  },
  {
    path: "users",
    component: UsersComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CompletedComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
