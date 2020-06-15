import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAuthors() {
    return this._http.get('/api/authors');
  }

  getAuthor(author_id) {
    return this._http.get(`/api/authors/${author_id}`);
  }

  editAuthor(author_id, newInfo) {
    return this._http.put(`/api/authors/${author_id}`, newInfo);
  }

  createAuthor(author) {
    return this._http.post('/api/authors', author);
  }

  deleteAuthor(author_id) {
    return this._http.delete(`/api/authors/${author_id}`);
  }
  

}
