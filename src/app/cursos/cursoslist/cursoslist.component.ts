import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cursoslist',
  templateUrl: './cursoslist.component.html',
  styleUrls: ['./cursoslist.component.scss'],
})
export class CursoslistComponent implements OnInit {

  listing: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadJson();
  }

  loadJson(): void {
    this.http.get('../../../assets/sample-data/cursossample.json').subscribe(data => {
      this.listing = data;
      console.log(this.listing); // For debugging purposes
    });
  }

}
