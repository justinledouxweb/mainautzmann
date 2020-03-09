import * as angular from 'angular';
import * as angularSanitize from 'angular-sanitize';
import * as angularMessages from 'angular-messages';
import { navBarModule } from './nav-bar/nav-bar.module';
import { contactFormModule } from './contact-form/contact-form.module';
import { carouselModule } from './carousel/carousel.module';

import '../styles/main.scss';
import '../images/album.jpg';
import '../images/hero.jpg';
import '../images/maina-1.jpg';
import '../images/maina-2.jpg';
import '../images/maina-3.jpg';
import '../images/maina-4.jpg';
import '../images/maina-5.jpg';
import '../images/maina-6.jpg';
import '../images/pattern.svg';
import '../images/sprite.png';
import '../images/sprite.svg';
import '../images/sprite@2x.png';
import '../images/sprite1.png';

const app: string = angular
  .module('app', [
    angularSanitize,
    angularMessages,
    navBarModule,
    contactFormModule,
    carouselModule,
  ])
  .name;

function bootstrap(): void {
  angular.bootstrap(document, [app], {
    strictDi: true,
  });
}

bootstrap();