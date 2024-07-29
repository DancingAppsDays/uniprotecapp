

import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { Observable, ReplaySubject, Subscription, merge } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { FirebaseListingItemModel } from '../../firebase/crud/listing/firebase-listing.model';
//import { FirebaseCreateUserModalComponent } from '../user/create/firebase-create-user.modal';
import { DataStore, ShellModel } from '../../../app/shell/data-store';
import { FirebaseCrudService } from '../../firebase/crud/firebase-crud.service';

@Component({
  selector: 'app-manuales.page',
  templateUrl: './manuales.page.component.html',
  styleUrls: ['./manuales.page.component.scss'],
})
export class ManualesPageComponent implements OnInit {

  searchQuery: string;

  searchSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  searchFiltersObservable: Observable<any> = this.searchSubject.asObservable();

  listingDataStore: DataStore<Array<FirebaseListingItemModel>>;
  stateSubscription: Subscription;

  // Use Typescript intersection types to enable docorating the Array of firebase models with a shell model
  // (ref: https://www.typescriptlang.org/docs/handbook/advanced-types.html#intersection-types)
  items: Array<FirebaseListingItemModel> & ShellModel;


  constructor(
    public firebaseCrudService: FirebaseCrudService,
    public modalController: ModalController,
    private route: ActivatedRoute,
    private routerOutlet: IonRouterOutlet
  ) { }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }


  ngOnInit() {

    console.log('ManualesPageComponent ngOnInit');

  }

  searchList() {
    console.log('searchList');
  }

}
