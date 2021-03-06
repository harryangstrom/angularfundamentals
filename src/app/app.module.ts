import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GitSearchService } from './git-search.service';
import { GitCodeSearchService } from './git-code-search.service';
import { UnifiedSearchService } from './unified-search.service';
import { GitSearchComponent } from './git-search/git-search.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GitSearchUsersComponent } from './git-search-users/git-search-users.component';
import { NoSpecialCharsDirective } from './no-special-chars.directive';
import { RepositoryDisplayComponent } from './repository-display/repository-display.component';
import { CodeDisplayComponent } from './code-display/code-display.component';
import { FadeDirective } from './fade.directive';
import { FavoriteTextPipe } from './favorite-text.pipe';


const appRoutes: Routes = [
  { path: '',
    component: HomePageComponent
  },
  { path: 'angularfundamentals',
    component: HomePageComponent
  },
  { path: 'search',
    redirectTo: '/search/angular',
    pathMatch: 'full'
  },
  { path: 'searchUsers',
    redirectTo: '/searchUsers/harryangstrom',
    pathMatch: 'full'
  },
  { path: 'search/:query',
    component: GitSearchComponent,
    data: { title: 'Git Search',
            origin: 'repositories' }
  },
  { path: 'searchUsers/:query',
    component: GitSearchUsersComponent,
    data: { title: 'Git User Search',
            origin: 'users' }
  },
  { path: '**',
    component: NotFoundComponent 
  }
];

@NgModule({
  declarations: [
    AppComponent,
    GitSearchComponent,
    HomePageComponent,
    NotFoundComponent,
    GitSearchUsersComponent,
    NoSpecialCharsDirective,
    RepositoryDisplayComponent,
    CodeDisplayComponent,
    FadeDirective,
    FavoriteTextPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [GitSearchService, GitCodeSearchService, UnifiedSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
