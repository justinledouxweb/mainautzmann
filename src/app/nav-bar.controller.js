class NavBarController {
  constructor() {
    this.sideMenuIsOpen = false;
  }

  toggleSideMenu($event) {
    if ($event) {
      $event.preventDefault();
    }

    this.sideMenuIsOpen = !this.sideMenuIsOpen;
  }
}

export default NavBarController;
