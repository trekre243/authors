import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  newAuthor: string = '';
  nameError: boolean = false;

  constructor(private _http: HttpService, private _router: Router) { }

  ngOnInit() {

  }

  addAuthor() {
    if(this.newAuthor.length <=3) {
      this.nameError = true;
      return;
    }
    this._http.createAuthor({name: this.newAuthor}).subscribe(data => {
      if(data['message'] == 'success') {
        this.newAuthor = '';
        this.nameError = false;
        this._router.navigate(['/']);
      } else if(data['data']['errors']['name']['name'] == 'ValidatorError') {
        this.nameError = true;
      }
    });
  }

}
