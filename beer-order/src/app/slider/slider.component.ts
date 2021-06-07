import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})

export class SliderComponent implements OnInit {
  @Input() value:number;
  @Input() min:number;
  @Input() max:number;

  @Output() onslide = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  update(event){
    this.onslide.emit(event.target.value);
  }
}
