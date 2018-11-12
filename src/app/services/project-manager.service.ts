import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable , of} from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService {

  name: string = "";
  proxyurl = "https://cors-anywhere.herokuapp.com/";

  constructor(
    private http: HttpClient
  ) { }

  set Name(value: string) {
    this.name = value;
  }

  get Name() {
    return this.name;
  }

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.proxyurl}en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&contentformat=json&formatversion=2&titles=${this.name}`).pipe(
      map(res => res.query.pages));
  }
}
