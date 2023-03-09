
import {  Injectable } from '@angular/core';
import { DateHelper } from './date-helper';
import { MessageHelper } from './message-helper';
import { FormBuilder } from '@angular/forms';
import { CommonHelper } from './common-helper';

import { transition, style, animate, trigger, animation, useAnimation, state } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  state(
    'open',
    style({
      opacity: 1,
    })
  ),
  state(
    'close',
    style({
      opacity: 0,
    })
  ),
  transition('open =>close', [animate('0.1s ease-out')]),
  transition('* => open', [animate('0.5s ease-in')]),
]);


export const fadeInOutTransform = trigger('fadeInOutTransform', [
 
  transition(':enter', [
    style({
      opacity:0, trasform:'translateX(30px)'
    }),
    animate('1s ease-in-out',style({
      opacity:1,transform:'translateY(0)'
    }))
  ]),
 
  transition(':leave', [
    animate('1s ease-in-out',style({
      opacity:0, transform:'translateY(30px)'
    }))
  ]),
 
]);
@Injectable({
  providedIn: 'root',
})

export class AnimationHelper {

  constructor(
    public ch: CommonHelper,
    public messageHelper: MessageHelper,
    public formBuilder: FormBuilder,
    public dateHelper: DateHelper,

  ) {
  }

  }
 
