import { drawerBtnIcon, sideBar, main } from './Elements'

var isDrawerOpen = false;

export const handleSideBarDisplay = (e: Event): void => {

    let icon: 'chevron_left' | 'chevron_right';
    icon = isDrawerOpen ? 'chevron_left' : 'chevron_right';
    drawerBtnIcon.innerText = icon;
    isDrawerOpen = !isDrawerOpen;

    sideBar.classList.toggle('close-drawer');
    main.classList.toggle('full-width');
}
