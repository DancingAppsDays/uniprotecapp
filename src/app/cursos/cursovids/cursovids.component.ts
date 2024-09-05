import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Share } from '@capacitor/share';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-cursovids',
  templateUrl: './cursovids.component.html',
  styleUrls: ['./cursovids.component.scss'],
})
export class CursovidsComponent implements OnInit {

  ssr = true;
  video_playlist_model: any = {};// VideoPlaylistModel;
  listing: any;
  start_playing = false;
  api: VgApiService;

  currentVideoUrl: string = "" //this.video_playlist_model.selected_video.youtube_url;
  currentCourse: string = ""

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  loadJson(): void {    //TODO: change this string depending on currentCurso...
    this.http.get('../../../assets/sample-data/cursosbrigadasvideo.json').subscribe(data => {
      this.listing = data;
      //console.log(this.listing); // For debugging purposes
      //console.log(this.listing.videos)

      this.video_playlist_model.video_playlist = this.listing.videos;
      this.video_playlist_model.selected_video = this.listing.videos[0];

      this.changevideo(this.video_playlist_model.selected_video.youtube_url)
    });
  }

  ngOnInit(): void {
    // In SSR show a placeholder for the <vg-player>
    if (isPlatformBrowser(this.platformId)) {
      this.ssr = false;
      console.log("Browser video player")
    }
   
    // if (this.router.getCurrentNavigation()?.extras.state['itemslug']) {
    // Accessing data passed via state and activatedroute
    if (history.state.itemslug) {
      this.currentCourse = history.state.itemslug;
      console.log(this.currentCourse);
    }else{
      
      console.log("Warning: no state passed")
    }
    /*
    this.route.data
      .pipe(
        // Extract data for this page
        switchMap((resolvedRouteData) => resolvedRouteData['data'].state)
      )
      .subscribe({
        next: (state: any) => {
          this.video_playlist_model = state;
          if (!state.isShell) {
            this.video_playlist_model.video_playlist = state.videos;
            this.video_playlist_model.selected_video = state.videos[0];
          }
        },
        error: (error) => console.log(error)
      });
    //console.log(this.video_playlist_model);
    // console.log(this.video_playlist_model.video_playlist);
    */

    this.loadJson();




  }

  playMedia(media) {
    // Check if this media is not the same we are currently playing
    if (media !== this.video_playlist_model.selected_video) {
      // Change sources
      this.video_playlist_model.selected_video = media;
    
      // When changing sources we wait until the metadata is loaded and then we start playing the video


      //youtube implementation
     // console.log(this.video_playlist_model.selected_video)
     // console.log(this.video_playlist_model.selected_video.youtube_url)
      this.changevideo(this.video_playlist_model.selected_video.youtube_url)
    }
  }

  changevideo(videourl){
    this.currentVideoUrl = videourl
  }

  onPlayerReady(api: VgApiService) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
  }

  playVideo() {
    if (this.start_playing) {
      this.api.play();
    } else {
      this.start_playing = true;
    }
  }

  shareMedia() {/*
    const selectedVideo = this.video_playlist_model.selected_video;
    Share.share({
      title: selectedVideo.title,
      text: selectedVideo.description,
      url: 'https://ionicthemes.com/',
      dialogTitle: 'Share Media'
    })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing', error));
  }*/

  }
}
