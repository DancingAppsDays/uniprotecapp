import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { Observable, ReplaySubject, Subscription, merge } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { FirebaseListingItemModel } from '../listing/firebase-listing.model';
//import { FirebaseCreateUserModalComponent } from '../user/create/firebase-create-user.modal';
import { DataStore, ShellModel } from '../../../../app/shell/data-store';
import { FirebaseCrudService } from '../firebase-crud.service'  //'../firebase/crud/firebase-crud.service';
import { FirebasemanualesModel } from './firebasemanuales.model.model';


import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { FCM } from '@awesome-cordova-plugins/fcm';
//import { FcmServiceService } from 'src/app/services/fcm-service.service';


@Component({
  selector: 'app-firebasemanuales',
  templateUrl: './firebasemanuales.component.html',
  styleUrls: ['./firebasemanuales.component.scss'],
})
export class FirebasemanualesComponent implements OnInit {

  searchQuery: string;

  searchSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  searchFiltersObservable: Observable<any> = this.searchSubject.asObservable();

  //listingDataStore: DataStore<Array<FirebaseListingItemModel>>;
  listingDataStore: DataStore<Array<FirebasemanualesModel>>;
  stateSubscription: Subscription;

  // Use Typescript intersection types to enable docorating the Array of firebase models with a shell model
  // (ref: https://www.typescriptlang.org/docs/handbook/advanced-types.html#intersection-types)
  items: Array<FirebasemanualesModel>;//& ShellModel;



  constructor(
    public firebaseCrudService: FirebaseCrudService,
    public modalController: ModalController,
    private route: ActivatedRoute,
    private routerOutlet: IonRouterOutlet,

    private firestore: Firestore,

    // private fcm: FcmServiceService
  ) { }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }


  ngOnInit() {

    console.log('ManualesPageComponent ngOnInit');

    /* FCM.getToken().then(token => {
       console.log(token);
       // Save the token to the Firestore database
     });*/

    this.webnotification();

    this.simplefirebasequery2();
    //this.firebaseshowlist();
  }

  webnotification() {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        // If the user granted permission, subscribe to the push service
        navigator.serviceWorker.ready.then(registration => {
          registration.pushManager.subscribe({ userVisibleOnly: true }).then(subscription => {
            // Send the subscription to the server
            fetch('/api/save-subscription', {
              method: 'POST',
              body: JSON.stringify(subscription)
            });
          });
        });
      }
    });

  }

  /* simplefirebasequery(){
 
     const userCollection = collection(this.firestore, 'uniprotec/user/users');
     collectionData<FirebasemanualesModel>(userCollection, { idField: 'id' })
       .subscribe({
         next: (items) => {
           this.items = items;
         },
         error: (error) => console.log(error)
       });
   }*/

  simplefirebasequery2() {
    const userCollection = collection(this.firestore, 'uniprotec/user/users').withConverter({
      fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return { id: snapshot.id, ...data } as FirebasemanualesModel;
      },
      toFirestore: (modelObject) => modelObject,
    });

    collectionData<FirebasemanualesModel>(userCollection, { idField: 'id' })
      .subscribe({
        next: (items) => {
          this.items = items.map(item => ({ ...item, isShell: false }));
        },
        error: (error) => console.log(error)
      });
  }





  firebaseshowlist() {

    this.route.data
      .subscribe({
        next: (resolvedRouteData) => {
          this.listingDataStore = resolvedRouteData['data'];

          // We need to avoid having multiple firebase subscriptions open at the same time to avoid memory leaks
          // By using a switchMap to cancel previous subscription each time a new one arrives,
          // we ensure having just one subscription (the latest)
          const updateSearchObservable = this.searchFiltersObservable.pipe(
            switchMap((filters) => {
              const filteredDataSource = this.firebaseCrudService.searchManualesbyName(
                filters.lower,
                filters.upper
              );
              // Send a shell until we have filtered data from Firebase
              const searchingShellModel = [
                new FirebasemanualesModel(),
                new FirebasemanualesModel()
              ];
              // Wait on purpose some time to ensure the shell animation gets shown while loading filtered data
              const searchingDelay = 400;

              const dataSourceWithShellObservable = DataStore.AppendShell(filteredDataSource, searchingShellModel, searchingDelay);

              return dataSourceWithShellObservable.pipe(
                map(filteredItems => {
                  // Just filter items by name if there is a search query and they are not shell values
                  if (filters.query !== '' && !filteredItems.isShell) {
                    const queryFilteredItems = filteredItems.filter(item =>
                      item.name.toLowerCase().includes(filters.query.toLowerCase()
                      ));
                    // While filtering we strip out the isShell property, add it again
                    return Object.assign(queryFilteredItems, { isShell: filteredItems.isShell });
                  } else {
                    return filteredItems;
                  }
                })
              );
            })
          );

          // Keep track of the subscription to unsubscribe onDestroy
          // Merge filteredData with the original dataStore state
          this.stateSubscription = merge(
            this.listingDataStore.state,
            updateSearchObservable
          )
            .subscribe({
              next: (state) => {
                this.items = state;
              },
              error: (error) => console.log(error),
              complete: () => console.log('stateSubscription completed')
            });
        },
        error: (error) => console.log(error)
      });
  }


  searchList() {
    console.log('searchList');
  }

}
