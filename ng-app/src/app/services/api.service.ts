import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = 'http://localhost:3000/api';

  constructor(
    public http: HttpClient
  ) {

  }

  getAuthHeaders(credentials?): HttpHeaders {
    var headers =  new HttpHeaders();
    if (localStorage.getItem('token')) {
      headers = headers.append("Authorization", 'Bearer ' + localStorage.getItem('token'));
    }
    return headers;
  }

  get(endpoint: string, params?: any, reqOpts?: any, authenticate: boolean = true) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
        headers: new HttpHeaders()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        if (params[k] !== undefined) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }

    if (authenticate) {
      reqOpts.headers = reqOpts.headers.append("Authorization", this.getAuthHeaders().get("Authorization"));
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any, authenticate: boolean = true) {
    if (!reqOpts) {
      reqOpts = {
        headers: new HttpHeaders()
      };
    }

    if (authenticate) {
      reqOpts.headers = reqOpts.headers.append("Authorization", this.getAuthHeaders().get("Authorization"));
    }

    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any, authenticate: boolean = true) {
    if (!reqOpts) {
      reqOpts = {
        headers: new HttpHeaders()
      };
    }

    if (authenticate) {
      reqOpts.headers = reqOpts.headers.append("Authorization", this.getAuthHeaders().get("Authorization"));
    }

    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any, authenticate: boolean = true) {
    if (!reqOpts) {
      reqOpts = {
        headers: new HttpHeaders()
      };
    }

    if (authenticate) {
      reqOpts.headers = reqOpts.headers.append("Authorization", this.getAuthHeaders().get("Authorization"));
    }

    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any, authenticate: boolean = true) {
    if (!reqOpts) {
      reqOpts = {
        headers: new HttpHeaders()
      };
    }

    if (authenticate) {
      reqOpts.headers = reqOpts.headers.append("Authorization", this.getAuthHeaders().get("Authorization"));
    }

    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }
}
