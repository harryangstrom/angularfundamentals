import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GitUsers } from '../git-users';
import { GitSearchService } from '../git-search.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';


@Component({
  selector: 'app-git-search-users',
  templateUrl: './git-search-users.component.html',
  encapsulation: ViewEncapsulation.ShadowDom,
  styleUrls: ['./git-search-users.component.css']
})
export class GitSearchUsersComponent implements OnInit {
  searchResults: (GitUsers);
  searchQuery: string;
  title: string;
  origin: string;
  displayQuery: string;
  totalEntries: number;
  page: number = 1;
  maxPage: number;
  nextPage: boolean = true;

  constructor(
    private GitSearchService: GitSearchService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.searchQuery = params.get('query');
      this.displayQuery = this.searchQuery;
      this.gitSearch();
    })
    this.route.data.subscribe( (result) => {
      this.title = result.title;
      this.origin = result.origin;
    })
  }

  gitSearch = () => {
    this.GitSearchService.gitSearchUsers(this.searchQuery, this.page)
      .then( (response) => {
        this.searchResults = response;
        this.totalEntries = response.total_count;
        response.total_count > 1000 ? this.maxPage = 1000: this.maxPage = response.total_count / 30;
        this.page < this.maxPage ? this.nextPage = true : this.nextPage = false;
//        console.log(this.page);
      }, (error) => {
        alert("Error: "+ error.statusText);
      });
  }

  sendQuery = () => {
    this.searchResults = null;
    this.page = 1;
    this.router.navigate(['/searchUsers/' + this.searchQuery]);
  }

  keyUpFunction(e) {
    if(e.keyCode ==13) {
      this.sendQuery();
    }
  }

  next() {
    if (this.page < this.maxPage) {
      this.page++
      //this.searchQuery = this.searchQuery + "&page=" + this.page.toString();
      this.gitSearch();
    };
  }

  previous() {
    if (this.page > 1) {
      this.page--
      //this.searchQuery = this.searchQuery + "&page=" + this.page.toString();
      this.gitSearch();
    };
  }

}
