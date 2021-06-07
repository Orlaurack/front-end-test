import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  toggle_message = true;
  animation_cooldown = true;
  next_message = '';
  border_effect_height = '0px';
  timout_border_effect;
  bubbles: {top:number, left:number, size:number, speed:number, to_down: boolean, opacity: string }[];
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
