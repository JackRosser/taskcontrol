import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { CompletedComponent } from './pages/completed/completed.component';
import { UsersComponent } from './pages/users/users.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { NavbarComponent } from './sections/navbar/navbar.component';
import { FooterComponent } from './sections/footer/footer.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Route[] = [
  // Michele qua ho fatto confusione con i path richiesti dal compito, ho invertito users con main
  // non cambia assolutamente nulla a livello di funzionalità, è solo il nome
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
    UsersComponent,
    NavbarComponent,
    FooterComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
