import { Component } from '@angular/core';
import * as data from '../assets/messages.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = "Beer order";
  slider_value = 0;
  messages = (data as any).default;
  message = this.messages[this.slider_value];
  max = this.messages.length-1;
  toggle_message = true;
  animation_cooldown = true;
  next_message = '';
  border_effect_height = '0px';
  timout_border_effect;
  bubbles: {top:number, left:number, size:number, speed:number, to_down: boolean, opacity: string }[];

  constructor() {
    this.bubbles = [];

    const create_bubble =()=>{
      this.bubbles.push({
        left: Math.random()*100, // 0% to 100%
        top: Math.random()*100, // 0% to 100%
        size: Math.random()*20+10, // 10px to 30px
        speed: Math.round((Math.random()*3000)+3000), // 3000ms to 6000ms
        to_down: 1>Math.random()*5, // 1 chance to 5;
        opacity: (Math.floor(Math.random()*2)*127+128).toString(16) // 80 or ff
      });

      setTimeout(() => {
        this.bubbles.shift();
      }, this.bubbles[this.bubbles.length-1].speed);

      setTimeout(() => {
        create_bubble(); // recursive function
      }, (10-this.slider_value+1) * 300 ); // +slider_value = -couldown time = +bubbles
    };

    create_bubble();
  }

  changeValue(event:number){
    const new_slider_value = Math.round(event/10);

    if (this.slider_value != new_slider_value){

      this.border_effect_height = Math.min(Math.abs(this.slider_value-new_slider_value)*5, 30)+'px';
      clearTimeout(this.timout_border_effect);

      this.timout_border_effect = setTimeout(() => {
        this.slider_value = new_slider_value;

        setTimeout(() => {
          this.border_effect_height = '0px';
        }, 800);
      }, 100);
    }
    this.next_message= this.messages[Math.round((event/100)*4)];

    if(this.next_message!=this.message && this.animation_cooldown){
      this.changeMessage();
    }
  }

  changeMessage(){
    this.toggle_message = false;
    this.animation_cooldown = false; // block change during animation
    setTimeout(() => {
      this.message = this.next_message;
      this.toggle_message = true;
      setTimeout(() => {
        this.animation_cooldown = true;
        if (this.next_message != this.message) {
          this.changeMessage(); // if after the changement, the message is the wrong, change again...
        }
      }, 300);
    }, 300);
  }
}
