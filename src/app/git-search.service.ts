import { Injectable } from '@angular/core';
import { GitSearch } from './git-search';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GitUsers } from './git-users';
//import 'rxjs/add/operator/toPromise';


@Injectable({
  providedIn: 'root'
})
export class GitSearchService {
  cachedValues: Array<{ [query: string]: GitSearch }> = [];
  private APIToken: string = "efc72f4f540097945fd58d56384826a12478f357";

  
  constructor(private http: HttpClient) {
    
   }

  gitSearch = (query: string, page: number, origin: string): Promise<GitSearch> => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'token ' + this.APIToken
      })
    };
    //console.log(origin);
    let promise = new Promise<GitSearch>((resolve, reject) => {
      if (this.cachedValues[query]) {
        resolve(this.cachedValues[query]);
      }
      else {
        query = query + "&page=" + page.toString();
        this.http.get('https://api.github.com/search/repositories?q=' + query, httpOptions)
          .toPromise()
          .then( (response) => {
            console.log(response);
            resolve(response as GitSearch);
          }, (error) => {
            console.log(error);
            reject(error);
          })
        }
      })
    return promise;
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
