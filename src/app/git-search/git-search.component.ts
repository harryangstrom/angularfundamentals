import { Component, OnInit } from '@angular/core';
import { GitSearch } from '../git-search';
import { GitSearchService } from '../git-search.service';
import { GitUsers } from '../git-users';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})


export class GitSearchComponent implements OnInit {
  searchResults: (GitSearch | GitUsers);
  searchQuery: string;
  title: string;
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
/*     this.GitSearchService.gitSearch('angular')
      .then((response) => {
        this.searchResults = response;
        console.log("r: ", response);
        //alert("Total Libraries Found: " + response.total_count);
      }, (error) => {
        //console.log("e: ", error);
        alert("Error: " + error.statusText);
      }
    ) */
    this.route.data.subscribe( (result) => {
      this.title = result.title;
    });

/*     this.GitSearchService.gitSearchUsers('harryangstrom')
    .then((response) => {
      console.log("r: ", response);
      alert("Total Users Found: " + response.total_count);
    }, (error) => {
      //console.log("e: ", error);
      alert("Error: " + error.statusText);
    }
  ) */
  }
  
  gitSearch = () => {
    this.GitSearchService.gitSearch(this.searchQuery, this.page)
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
    this.router.navigate(['/search/' + this.searchQuery]);
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
