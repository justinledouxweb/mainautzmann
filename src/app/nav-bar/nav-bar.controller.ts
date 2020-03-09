import * as angular from 'angular';

export class NavBarController implements ng.IOnChanges, ng.IOnInit {
  private hero: ng.IAugmentedJQuery;
  private heroHeight: number;
  private navBar: ng.IAugmentedJQuery;
  private links: ng.IAugmentedJQuery;
  private window: ng.IAugmentedJQuery;
  private htmlBody: ng.IAugmentedJQuery;

  public language: any;
  public sideMenuIsOpen: boolean = false;
  public navLinks: any[];

  constructor(private $window: ng.IWindowService) {
    'ngInject';
  }

  $onChanges(changes: ng.IOnChangesObject) {
    if (changes.language.currentValue !== undefined) {
      this.language = angular.copy(changes.language.currentValue);
    }
  }

  $onInit() {
    this.navLinks = [
      {
        href: this.language.biography,
        label: this.language.Biography
      },

      {
        href: this.language.photos,
        label: this.language.Photos
      },

      {
        href: this.language.videos,
        label: this.language.Videos
      },

      {
        href: this.language.music,
        label: this.language.Music
      },

      {
        href: this.language.contact,
        label: this.language.Contact
      },
    ]
  }
  
  toggleSideMenu($event) {
    if ($event) {
      $event.preventDefault();
    }

    this.sideMenuIsOpen = !this.sideMenuIsOpen;
  }

  ngInit() {
    this.hero = angular.element('#hero');
    this.heroHeight = +this.hero.attr('outerHeight');
    this.navBar = angular.element('#nav-bar');
    this.links = angular.element('.nav-bar__item:not(.nav-bar__item--language)');
    this.window = angular.element(this.$window);
    this.htmlBody = angular.element('html, body');

    this.fixeNavBar();
    this.activateLinks();

    this.window.on('scroll.fixed', this.throttle(this.fixeNavBar, 16));
    this.window.on('scroll.sections', this.throttle(this.activateLinks, 100));

    this.links.on('click', (event) => {
      const target = angular.element(event.target);
      const sectionId = target.attr('href');

      event.preventDefault();

      (<any>this.htmlBody).animate({
        scrollTop: (<any>angular.element(sectionId)).offset().top - 67,
      }, 300, 'swing');
    });
  }

  throttle(fn, threshold = 250) {
    let last;
    let deferTimer;

    return function func(...args) {
      const now = +new Date;

      if (last && now < last + threshold) {
        clearTimeout(deferTimer);
        deferTimer = setTimeout(() => {
          last = now;
          fn.apply(this, args);
        }, threshold);
      } else {
        last = now;
        fn.apply(this, args);
      }
    };
  }

  fixeNavBar() {
    const addRemoveClass = this.$window.pageYOffset >= this.heroHeight
      ? 'addClass'
      : 'removeClass';

    this.navBar[addRemoveClass]('nav-bar--is-fixed');
  }

  activateLinks() {
    if (this.$window.innerWidth > 767) {
      angular.forEach(this.links, (_link_) => {
        const link = angular.element(_link_);

        if (this.isBetweenSection(link.attr('href'))) {
          link.addClass('nav-bar__item--is-active');
        } else {
          link.removeClass('nav-bar__item--is-active');
        }
      });
    }
  }

  isBetweenSection(sectionId) {
    const section: any = angular.element(sectionId);
    const sectionOffsetTop = section.offset().top - 68;

    return this.$window.pageYOffset >= sectionOffsetTop
      && this.$window.pageYOffset <= sectionOffsetTop + section.outerHeight();
  }
}
