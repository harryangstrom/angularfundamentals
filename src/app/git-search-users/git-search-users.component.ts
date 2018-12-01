import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GitUsers } from '../git-users';
import { GitSearchService } from '../git-search.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AdvancedSearchUsersModel } from '../advanced-search-users-model'
import { FormControl, FormGroup, Validators } from '@angular/forms'

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
  form: FormGroup;
  formControls = {};
  
  constructor(
    private GitSearchService: GitSearchService,
    private route: ActivatedRoute,
    private router: Router) {
      this.modelKeys.forEach( (key) => {
        let validators = [];
        if (key === 'q') {
          validators.push(Validators.required);
        }
        if (key === 'stars') {
          validators.push(Validators.maxLength(4));
        }
        validators.push(this.noSpecialChars);
        this.formControls[key] = new FormControl(this.model[key], validators);
      })
      this.form = new FormGroup(this.formControls);
    }

  model: AdvancedSearchUsersModel = new AdvancedSearchUsersModel('', '', '', '', null); // query, language?, type?, repos?, followers?
  modelKeys = Object.keys(this.model);
    
  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.searchQuery = params.get('query');
      this.displayQuery = this.searchQuery;
      this.gitSearch();
    })
    this.model.q = this.searchQuery;
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
    let search: string = this.form.value['q'];
    let params: string = "";
    this.modelKeys.forEach( (elem) => {
      if (elem === 'q') {
        return false;
      }
      if (this.form.value[elem]) {
        params += '+' + elem + ':' + this.form.value[elem];
      }
    })
    this.searchQuery = search;
    if (params !== '') {
      this.searchQuery = search + params;
    }
    this.displayQuery = this.searchQuery;
    this.gitSearch();
    //this.router.navigate(['/search/' + this.searchQuery]);
  }
  
/*   sendQuery = () => {
    this.searchResults = null;
    this.page = 1;
    this.router.navigate(['/searchUsers/' + this.searchQuery]);
  }

  keyUpFunction(e) {
    if(e.keyCode ==13) {
      this.sendQuery();
    }
  } */

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

  noSpecialChars(c: FormControl) {
    let REGEXP = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);

    return REGEXP.test(c.value) ? {
        validateEmail: {
        valid: false
        }
    } : null;
}

}
