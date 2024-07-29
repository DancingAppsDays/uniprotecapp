import { Injectable } from '@angular/core';
import { FCM } from '@awesome-cordova-plugins/fcm/ngx';

@Injectable({
  providedIn: 'root'
})
export class FcmServiceService {



  getToken(): Promise<string> {
    return FCM.getToken();
  }
}
