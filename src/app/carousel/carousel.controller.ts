import * as angular from 'angular';

export class CarouselController implements ng.IOnChanges, ng.IOnInit {
  private mask: ng.IRootElementService;
  private drawer: ng.IRootElementService;
  private window: ng.IRootElementService;
  private position: number;
  private pageWidth: number;
  public next: string;
  public previous: string;
  public images: any[];

  constructor(private $window: ng.IWindowService) {
    'ngInject';
  }

  $onChanges(changes: ng.IOnChangesObject) {
    if (changes.next.currentValue !== '') {
      this.next = changes.next.currentValue;
    }

    if (changes.previous.currentValue !== '') {
      this.previous = changes.previous.currentValue;
    }
  }

  $onInit() {
    this.mask = angular.element('.carousel__mask');
    this.drawer = angular.element('.carousel__drawer');
    this.window = angular.element(this.$window);
    this.position = 0;
    this.pageWidth = +(this.mask as any).width();
    this.images = [
      { src: '/images/maina-1.jpg'},
      { src: '/images/maina-4.jpg'},
      { src: '/images/maina-2.jpg'},
      { src: '/images/maina-5.jpg'},
      { src: '/images/maina-3.jpg'},
      { src: '/images/maina-6.jpg'},
    ];

    this.window.on('resize', this.resizeDrawer.bind(this));
  }

  resizeDrawer() {
    this.pageWidth = +(this.mask as any).width();
    this.moveDrawer(null, this.position);
  }

  moveDrawer(dir, pos = undefined) {
    if (dir && (dir === 'prev' && this.position === 0)
      || (dir === 'next' && this.position === (this.images.length - 1))) {
      return;
    }

    if (pos >= 0) {
      this.position = pos;
    } else {
      this.position += dir === 'next' ? 1 : -1;
    }

    this.drawer.css({
      transform: `translateX(${- (this.pageWidth + 15) * this.position}px)`,
    });
  }

  moveDrawerNext() {
    this.moveDrawer('next');
  }

  moveDrawerPrev() {
    this.moveDrawer('prev');
  }

  changePosition(pos) {
    this.moveDrawer(undefined, pos);
  }
}
