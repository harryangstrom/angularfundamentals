import { Injectable } from '@angular/core';
import { UnifiedSearch } from './unified-search';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { GitSearchService } from './git-search.service';
import { GitCodeSearchService } from './git-code-search.service';
//import { GitSearch } from './git-search';
//import { GitCodeSearch } from './git-code-search';


@Injectable({
  providedIn: 'root'
})

export class UnifiedSearchService {
  search: Observable<UnifiedSearch>;

  constructor(private searchService: GitSearchService, private codeSearchService: GitCodeSearchService) {}
  unifiedSearch = (query: string): Observable<UnifiedSearch> => {
    this.search = forkJoin(this.searchService.gitSearch(query), this.codeSearchService.codeSearch(query))
    .pipe(map( (response) => {
      return {
        'repositories': response[0],
        'code': response[1]
      }
    }))
    return this.search;
  }


}
