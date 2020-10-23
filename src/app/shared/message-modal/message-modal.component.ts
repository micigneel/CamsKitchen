import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent implements OnInit {

  @Input('message') message : string ;
  @Input('type') type : string;
  @Output('popupStatus') status  = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onClose(){
    this.status.emit(true);
  }

}
