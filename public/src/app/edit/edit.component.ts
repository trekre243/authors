import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { HttpService } from './../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  author: object = {name: ''};
  nameError: boolean = false;

  constructor(private _http: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    let id = '';
    this._route.params.subscribe((params: Params) => {
      this._http.getAuthor(params['id']).subscribe(data => {
        if(data['message'] == 'success') {
          this.author = data['data'];
        }
      });
    });
  }

  updateAuthor() {
    if(this.author['name']['length'] < 3) {
      this.nameError = true;
      return;
    }
    this._http.editAuthor(this.author['_id'], this.author).subscribe(data => {
      console.log('entered if statement', data);
      if(data['message'] == 'success') {
        this._router.navigate(['/']);
      } else if(data['data'] == 'too short') {
        this.nameError = true;
      }
    });
  }

}
