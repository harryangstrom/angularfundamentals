import { Component, OnInit } from '@angular/core';
import { GitSearch } from '../git-search';
import { GitSearchService } from '../git-search.service';
import { GitUsers } from '../git-users';

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit {
  searchResults: (GitSearch | GitUsers);
  searchQuery: string;

  constructor(private GitSearchService: GitSearchService) { }

  ngOnInit() {
    this.GitSearchService.gitSearch('angular')
      .then((response) => {
        this.searchResults = response;
        console.log("r: ", response);
        //alert("Total Libraries Found: " + response.total_count);
      }, (error) => {
        //console.log("e: ", error);
        alert("Error: " + error.statusText);
      }
    )

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

}
