import * as angular from 'angular';
import { NavBarComponent } from './nav-bar.component';

export const navBarModule: string = angular.module('nav-bar', [])
    .component('navBar', new NavBarComponent())
    .name;