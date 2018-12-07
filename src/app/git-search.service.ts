import { Injectable } from '@angular/core';
import { GitSearch } from './git-search';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GitUsers } from './git-users';
//import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/shareReplay';


@Injectable({
  providedIn: 'root'
})
export class GitSearchService {
  cachedValues: Array<{ [query: string]: GitSearch }> = [];
  cachedValue: string;
  cachedUsers: Array<{
    [query: string]: GitUsers
    }> = [];
  private APIToken: string = "efc72f4f540097945fd58d56384826a12478f357";
  search: Observable<GitSearch>;

  
  constructor(private http: HttpClient) {
    
   }

  gitSearch = (query: string, page?: number, origin?: string): Observable<GitSearch> => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'token ' + this.APIToken
      })
    };
    //console.log(origin);
    console.log("CachedValue: ", this.cachedValue);
    //query = query + "&page=" + page.toString();
    this.search = this.http.get<GitSearch>('https://api.github.com/search/repositories?q=' + query, httpOptions);
    //this.cachedValue = query;
    return this.search;
  }

  gitSearchUsers = (query: string, page:number): Promise<GitUsers> => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'token ' + this.APIToken
      })
    };
    let promise = new Promise<GitUsers>((resolve, reject) => {
      if (this.cachedValues[query]) {
        resolve(this.cachedValues[query]);
      }
      else {
        query = query + "&page=" + page.toString();
        this.http.get('https://api.github.com/search/users?q=' + query, httpOptions)
          .toPromise()
          .then( (response) => {
            console.log(response);
            this.cachedValues[query] = response as GitUsers;
            resolve(response as GitUsers);
          }, (error) => {
            console.log(error);
            reject(error);
          })
        }
      })
    return promise;
  }
}
