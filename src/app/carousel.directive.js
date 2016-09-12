function CarouselDirective($window) {
  return {
    restrict: 'E',
    link(_scope_, elem) {
      const scope = _scope_;
      const mask = elem.find('.carousel__mask');
      const drawer = elem.find('.carousel__drawer');
      const photos = elem.find('.carousel__photo');
      const nextBtn = elem.find('#next');
      const prevBtn = elem.find('#prev');
      const window = angular.element($window);

      let position = 0;
      let pageWidth = mask.width();

      scope.position = position;
      scope.changePosition = changePosition;

      window.on('resize', () => {
        pageWidth = mask.width();
      });

      nextBtn.on('click', moveDrawerNext);
      prevBtn.on('click', moveDrawerPrev);

      function moveDrawer(dir, pos = null) {
        if (dir && (dir === 'prev' && position === 0)
          || (dir === 'next' && position === (photos.length - 1))) {
          return;
        }

        if (pos >= 0) {
          position = pos;
          scope.position = pos;
        } else {
          position += dir === 'next' ? 1 : -1;
          scope.position = position;
          scope.$apply();
        }

        drawer.css({
          transform: `translateX(${- (pageWidth + 15) * position}px)`,
        });
      }

      function moveDrawerNext() {
        moveDrawer('next');
      }

      function moveDrawerPrev() {
        moveDrawer('prev');
      }

      function changePosition(pos) {
        moveDrawer(null, pos);
      }
    },
  };
}

CarouselDirective.$inject = [];

export default CarouselDirective;
