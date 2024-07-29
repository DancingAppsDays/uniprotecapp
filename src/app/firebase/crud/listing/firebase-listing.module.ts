import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FirebaseListingPage } from './firebase-listing.page';
import { FirebaseListingResolver } from './firebase-listing.resolver';
import { ComponentsModule } from '../../../components/components.module';
import { FirebaseCrudService } from '../firebase-crud.service';
import { FirebaseCrudSharedModule } from '../firebase-crud-shared.module';
import { FirebasemanualesComponent } from '../firebasemanuales/firebasemanuales.component';
//import { FCM, FCMOriginal } from '@awesome-cordova-plugins/fcm';
//import { FcmServiceService } from 'src/app/services/fcm-service.service';

const routes: Routes = [
  {
    path: '',
    component: FirebaseListingPage,
    resolve: {
      data: FirebaseListingResolver
    }
  },
  {
    path: 'manuales',
    component: FirebasemanualesComponent

  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    FirebaseCrudSharedModule
  ],
  declarations: [
    FirebaseListingPage,


    FirebasemanualesComponent
  ],
  providers: [
    FirebaseCrudService,
    FirebaseListingResolver,
    //FcmServiceService
    //FCM
    //FCMOriginal
  ]
})
export class FirebaseListingPageModule { }
