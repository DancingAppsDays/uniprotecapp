import { Component, OnInit } from '@angular/core';

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

  searchQuery:any;
  constructor() { }

  ngOnInit() {
    console.log('browserswipe');
  }

  swiperConfig = {
    pagination: false,
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    spaceBetween: 10,
    slidesPerView: 4,
    speed: 2000,
  };


  searchList(){

  }

  public setSwiperInstance(swiper: SwiperCore): void {
    // console.log('setSwiperInstance');
  }

  public swiperInit(): void {
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

}
