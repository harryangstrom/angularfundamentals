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

  constructor(
    private GitSearchService: GitSearchService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.searchQuery = params.get('query');
      this.gitSearch();
      this.displayQuery = params.get('query');
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
    this.GitSearchService.gitSearch(this.searchQuery)
      .then( (response) => {
        this.searchResults = response;
      }, (error) => {
        alert("Error: "+ error.statusText);
      });
  }

  sendQuery = () => {
    this.searchResults = null;
    this.router.navigate(['/search/' + this.searchQuery]);
  }

  keyUpFunction(e) {
    if(e.keyCode ==13) {
      this.sendQuery();
    }
  }

}
