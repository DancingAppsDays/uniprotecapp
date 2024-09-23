import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Preferences } from '@capacitor/preferences';

import { MenuController, IonicSwiper } from '@ionic/angular';

import SwiperCore, { Pagination } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-browserswipe',
  templateUrl: './browserswipe.component.html',
  styleUrls: ['./browserswipe.component.scss'],
})
export class BrowserswipeComponent implements OnInit {

  searchQuery: any;
  // cursoslist: any;
  //articlelist: any;
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  articlelist = [
    {
      "nombre": "Plan de Evacuación en Emergencias",
      "subtitulo": "Preparación y Respuesta",
      "contenido": "Un plan de evacuación efectivo es crucial para garantizar la seguridad de todos durante una emergencia. Conozca los pasos esenciales para crear y ejecutar un plan de evacuación en su lugar de trabajo o residencia."
    },
    {
      "nombre": "Uso de Extintores de Incendio",
      "subtitulo": "Guía Práctica",
      "contenido": "Aprenda a utilizar correctamente los extintores de incendio para combatir pequeños fuegos. Esta guía práctica le enseñará los tipos de extintores y las técnicas adecuadas para su uso seguro."
    },
    {
      "nombre": "Formación de Brigadas de Emergencia",
      "subtitulo": "Capacitación y Roles",
      "contenido": "Las brigadas de emergencia son equipos entrenados para actuar rápidamente en situaciones críticas. Descubra cómo formar y capacitar a su brigada de emergencia para mejorar la respuesta ante incidentes."
    },
    {
      "nombre": "Seguridad en el Trabajo",
      "subtitulo": "Prevención de Accidentes",
      "contenido": "La seguridad en el trabajo es fundamental para prevenir accidentes y lesiones. Conozca las mejores prácticas y medidas preventivas que pueden implementarse para crear un entorno laboral seguro."
    }
  ];

  cursoslist = [
    {
      "id": 4,
      "slug": "4-guests-2-bedrooms-powell-street-san-francisco",
      "picture": "./assets/cursosthumbnails/brigadas_thumb_evac.png",
      "nombre": "Brigadas de emergencia",
      "descripcion": "Cómo actuar ante cualquier emergencia, poniendo tu seguridad ante todo",
      "price": "1900",
      "liked": true,
      "category": "brigadas",
      "tags": [
        "seguridad",
        "emergencia"
      ]
    },
    {
      "id": 1,
      "slug": "4-guests-2-bedrooms-powell-street-san-francisco",
      "picture": "./assets/cursosimages/montacargas.jpg",
      "nombre": "Montacargas",
      "descripcion": "INNOVAMOS LA CAPACITACIÓN Y EL ENTRENAMIENTO DE OPERADORES DE MONTACARGAS",
      "price": "1900",
      "liked": true,
      "category": "seguridad",
      "tags": [
        "seguridad",
        "emergencia"
      ]
    },
    {
      "id": 2,
      "slug": "4-guests-2-bedrooms-powell-street-san-francisco",
      "picture": "./assets/cursosimages/legos.png",
      "nombre": "Liderazgo bloque a bloque",
      "descripcion": "Potencia las principales habilidades blandas que todo líder debe ejercer, lo que le permitirá desarrollar una posición responsable sobre sus compromisos y los de su equipo de trabajo",
      "price": "1900",
      "liked": true,
      "category": "liderazgo",
      "tags": [
        "liderazgo",
        "habilidades blandas"
      ]
    },
    {
      "id": 3,
      "slug": "4-guests-2-bedrooms-powell-street-san-francisco",
      "picture": "./assets/cursosimages/Desarrollo-humano.jpg",
      "nombre": "Desarrollo humano",
      "descripcion": "La metodología que revolucionará los cursos de desarrollo humano.  Vive una experiencia de aprendizaje acelerado y duradero",
      "price": "1900",
      "liked": true,
      "category": "liderazgo",
      "tags": [
        "liderazgo",
        "habilidades blandas"
      ]
    }
  ];

  ngOnInit(): void {
    console.log('BrowserswipeComponent');
    // this.loadJson();
    //  this.loadJsonArticles();
  }
  /*
  loadJson(): void {
    this.http.get('../../../assets/sample-data/cursossample.json').subscribe(data => {
      this.cursoslist = data;
      console.log(this.cursoslist); // For debugging purposes
    });
  }

  loadJsonArticles(): void {
    this.http.get('../../../assets/sample-data/samplearticulos.json').subscribe(data => {
      this.articlelist = data;
      console.log(this.articlelist);
    });
  }*/

  swiperConfig = {
    pagination: false,
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    spaceBetween: 10,
    slidesPerView: 3,
    speed: 2000,
  };


  searchList() {

  }

  public setSwiperInstance(swiper: SwiperCore): void {
    // console.log('setSwiperInstance');
    swiper.update();
  }

  public swiperInit(): void {
    this.cdr.detectChanges();
    // console.log('swiperInit');
  }

  public slideWillChange(): void {
    // console.log('slideWillChange');
  }

  public markSlides(swiper: SwiperCore): void {
    //this.isFirstSlide = (swiper.isBeginning || swiper.activeIndex === 0);
    // this.isLastSlide = swiper.isEnd;
  }

  public skipWalkthrough(): void {
    // Skip to the last slide
    //this.swiperRef.slideTo(this.swiperRef.slides.length - 1);
  }

  onSwiper(swiper) {
    swiper.update();
  }

}
