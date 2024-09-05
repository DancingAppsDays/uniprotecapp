import { APP_INITIALIZER, NgModule, Optional, PLATFORM_ID } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { isPlatformServer } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { ManualesPageComponent } from './manuales/manuales.page/manuales.page.component';
import { Firestore, FirestoreModule, provideFirestore } from '@angular/fire/firestore';


import { RouterModule, Routes } from '@angular/router';
import { provideFirebaseApp } from '@angular/fire/app';
import { BrowserswipeComponent } from './browserswipe/browserswipe.component';
import { SwiperModule } from 'swiper/angular';
import { CursoscategoriesComponent } from './cursos/cursoscategories/cursoscategories.component';
import { CursoslistComponent } from './cursos/cursoslist/cursoslist.component';
import { CursovidsComponent } from './cursos/cursovids/cursovids.component';
import { SafeUrlPipe } from './shared/safe-url.pipe';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent,SafeUrlPipe,
    
    
    ManualesPageComponent,

    BrowserswipeComponent, CursoscategoriesComponent, CursoslistComponent, CursovidsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,

    FormsModule,
    FirestoreModule,

    SwiperModule,





    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [



    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: (platformId: object, response: any) => {
        return () => {
          // In the server.ts we added a custom response header with information about the device requesting the app
          if (isPlatformServer(platformId)) {
            if (response && response !== null) {
              // Get custom header from the response sent from the server.ts
              const mobileDeviceHeader = response.get('mobile-device');

              // Set Ionic config mode?
            }
          }
        };
      },
      deps: [PLATFORM_ID, [new Optional(), RESPONSE]],
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
