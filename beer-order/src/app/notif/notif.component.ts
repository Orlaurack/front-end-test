import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'notif',
  templateUrl: './notif.component.html',
  styleUrls: ['./notif.component.scss']
})

export class NotifComponent implements OnInit {
  @Input() number;
  @Input() text;

  constructor() { }

  ngOnInit(): void {
  }

}
