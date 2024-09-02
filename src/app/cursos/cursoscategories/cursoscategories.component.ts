import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-cursoscategories',
  templateUrl: './cursoscategories.component.html',
  styleUrls: ['./cursoscategories.component.scss'],
})
export class CursoscategoriesComponent implements OnInit {

  gettingStartedForm: UntypedFormGroup;

  constructor() {
    this.gettingStartedForm = new UntypedFormGroup({
      browsingCategory: new UntypedFormControl('all')
    })
  }

  ngOnInit() {
    console.log('CursoscategoriesComponent');
  }

}
