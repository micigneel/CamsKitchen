import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { videoArr } from '../shared/VideoData';
import { Video } from '../shared/modal/Video';

@Injectable({
  providedIn : 'root'
})
export class VideoSevice{

  videosURL : string = 'https://camskitchen-f1a0c.firebaseio.com/videos.json';

  constructor(private http : HttpClient){}


  setVideos(){
    this.http.put<Video>(this.videosURL , videoArr)
    .subscribe(
      (response)=>{
        console.log(response);
      }
    )
  }


}
