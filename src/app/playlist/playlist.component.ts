import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../globalStore/app.reducer';
import { SubSink } from 'subsink';
import { Video } from '../shared/modal/Video';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VideoSevice } from './video.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit, OnDestroy {

  subsink = new SubSink();
  playlist : Video[] =[];
  originalPlayList : Video[] = [];
  loading : boolean ;
  searchMode : boolean  = false;
  selctedPlay : string = '';

  constructor(private store : Store<fromApp.AppState>,
              private router : Router,
               private route : ActivatedRoute) { }

  ngOnInit(){
    this.subsink.add(

        this.store.select('play')
        .subscribe(
          (playData)=>{

              this.playlist = playData.playlist;
              this.originalPlayList = playData.playlist;
              this.loading = playData.loading;

              this.subsink.add(
                this.route.queryParams
                .subscribe(
                  (params )=>{
                    let searchVal = params['search'];

                    if(searchVal !== undefined && searchVal !== null){
                      searchVal = searchVal.toLowerCase();
                      this.searchMode = true;
                      this.playlist = this.originalPlayList.filter(
                        (play)=>{
                          if( play.title.toLowerCase().search(searchVal) !== -1){
                            return true
                          }
                          else if(play.desc.toLowerCase().search(searchVal) !== -1){
                            return true;
                          }
                          else{
                            return false
                          }
                        }
                      );
                    }
                    else {
                      this.playlist = this.originalPlayList;
                    }
                  }
                )
              )
          }
        )
    );

  }


  onSearchPlay( search : HTMLInputElement){
    const searchVal = search.value;

    this.router.navigate([], {
      queryParams : { search : searchVal}
    });
  }

  onSearchClose(){
    this.searchMode = false;
    this.router.navigate([]);
  }

  playVideo( videoUrl : string ){
    this.selctedPlay = videoUrl;
  }

  onClosePlayVideo(){
    this.selctedPlay = '';
  }

  ngOnDestroy(){
    this.subsink.unsubscribe();
  }

}
