import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  authors = [];

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this._http.getAuthors().subscribe(data => {
      console.log(data);
      if(data['message'] == 'success') {
        this.authors = data['data'];
      }
    });
  }

  deleteAuthor(index) {
    this._http.deleteAuthor(this.authors[index]['_id']).subscribe(data => {
      if(data['message'] == 'success') {
        this.authors.splice(index, 1);
      }
    });
  }

}
