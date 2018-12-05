import { Component, OnInit } from '@angular/core';
import { GitSearch } from '../git-search';
import { GitSearchService } from '../git-search.service';
//import { GitUsers } from '../git-users';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AdvancedSearchModel } from '../advanced-search-model';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})


export class GitSearchComponent implements OnInit {
  searchResults: (GitSearch);
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
        console.log('validators', validators);
        this.formControls[key] = new FormControl(this.model[key], validators);
      })
      this.form = new FormGroup(this.formControls);
    }

  model: AdvancedSearchModel = new AdvancedSearchModel('', '', '', null, null, ''); // query, language?, user?, size?, stars?, topic?
  modelKeys = Object.keys(this.model);

  ngOnInit() {
    console.log("ejecuto ngOnInit");
    this.route.paramMap.subscribe( (params: ParamMap) => {
      console.log("ejecuto route.paramMap subscribe");
      this.searchQuery = params.get('query');
      this.model.q = this.searchQuery;
      this.displayQuery = this.searchQuery;
      console.log("Model: ", this.model);
      console.log("Modelkeys: ", this.modelKeys);
      console.log("Page: ", this.page);
      this.gitSearch();      
    })
    //this.model.q = this.searchQuery; //inicializa el campo 'q' desde la URI, solo una vez, no subscripción
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
      this.origin = result.origin;
      console.log(this.title);
      console.log(this.origin);
    })

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
    this.GitSearchService.gitSearch(this.searchQuery, this.page, this.origin)
      .subscribe( (response) => {
        this.searchResults = response;
        this.totalEntries = response.total_count;
        response.total_count > 1000 ? this.maxPage = 1000: this.maxPage = response.total_count / 30;
        this.page < this.maxPage ? this.nextPage = true : this.nextPage = false;
//        console.log(this.page);
      }, (error) => {
        alert("Error: "+ error.statusText);
      });
  }

/*   sendQuery = () => {
    this.searchResults = null;
    this.page = 1;
    this.router.navigate(['/search/' + this.searchQuery]);
  } */

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
    console.log("búsqueda sendQuery ", this.searchQuery);
    //this.router.navigate(['/search/' + this.searchQuery]);
  }

/*   keyUpFunction(e) {
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

  typeOf(v: string): string {
    if (v === "size" || v === "stars") {
      return "number";
    }
    else return "text";
  }
}
