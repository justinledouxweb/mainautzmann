import * as angular from 'angular';
import { CarouselComponent } from './carousel.component';

export const carouselModule: string = angular.module('carousel', [])
    .component('carousel', new CarouselComponent())
    .name;
