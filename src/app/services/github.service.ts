import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  API_ENDPOINT = 'https://api.github.com/search/users';
  constructor(private httpClient: HttpClient) { }
  get(dat:any){
    if (dat!='') {
      return this.httpClient.get(this.API_ENDPOINT + '?q=' + dat);
    }else{
      return this.httpClient.get(this.API_ENDPOINT + '?q=""');
    }
  }
}
