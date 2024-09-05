import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cursoslist',
  templateUrl: './cursoslist.component.html',
  styleUrls: ['./cursoslist.component.scss'],
})
export class CursoslistComponent implements OnInit {

  listing: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loadJson();
  }

  loadJson(): void {
    this.http.get('../../../assets/sample-data/cursossample.json').subscribe(data => {
      this.listing = data;
      console.log(this.listing); // For debugging purposes
    });
  }

  navigateToVideos(itemslug: string) {
   // this.router.navigate(['/app/cursos/videos', ]);
 
    this.router.navigate(['/app/cursos/videos',], {
      state: { itemslug: itemslug } // Replace 'yourCustomData' with the actual data you want to pass
    });
  }

}
