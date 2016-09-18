import controller from './nav-bar.controller.js';

function NavBarDirective($window) {
  return {
    retrict: 'A',
    controller,
    controllerAs: '$ctrl',
    link(scope, elem) {
      const hero = angular.element('#hero');
      const heroHeight = hero.outerHeight();
      const navBar = elem.find('#nav-bar');
      const links = elem.find('.nav-bar__item:not(.nav-bar__item--language)');

      fixeNavBar();
      activateLinks();

      angular.element($window).on('scroll.fixed', throttle(fixeNavBar, 16));
      angular.element($window).on('scroll.sections', throttle(activateLinks, 100));

      links.on('click', (event) => {
        const target = angular.element(event.target);
        const sectionId = target.attr('href');

        event.preventDefault();

        angular.element('html, body').animate({
          scrollTop: angular.element(sectionId).offset().top - 67,
        }, 300, 'swing');
      });

      function throttle(fn, threshold = 250, self) {
        let last;
        let deferTimer;

        return function func(...args) {
          const context = self || this;
          const now = +new Date;

          if (last && now < last + threshold) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(() => {
              last = now;
              fn.apply(context, args);
            }, threshold);
          } else {
            last = now;
            fn.apply(context, args);
          }
        };
      }

      function fixeNavBar() {
        const addRemoveClass = $window.pageYOffset >= heroHeight
          ? 'addClass'
          : 'removeClass';

        navBar[addRemoveClass]('nav-bar--is-fixed');
      }

      function activateLinks() {
        if ($window.innerWidth > 767) {
          angular.forEach(links, (_link_) => {
            const link = angular.element(_link_);

            if (isBetweenSection(link.attr('href'))) {
              link.addClass('nav-bar__item--is-active');
            } else {
              link.removeClass('nav-bar__item--is-active');
            }
          });
        }
      }

      function isBetweenSection(sectionId) {
        const section = angular.element(sectionId);
        const sectionOffsetTop = section.offset().top - 68;

        return $window.pageYOffset >= sectionOffsetTop
          && $window.pageYOffset <= sectionOffsetTop + section.outerHeight();
      }
    },
  };
}

NavBarDirective.$inject = [
  '$window',
];

export default NavBarDirective;
