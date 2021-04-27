import { drawerBtnIcon, sideBar, main, colorPicker, content } from './Elements';
import { toast } from 'materialize-css'
import { Tool } from './structures';

var isDrawerOpen = false;

export const handleSideBarDisplay = (e: Event): void => {
    let icon: 'chevron_left' | 'chevron_right';
    icon = isDrawerOpen ? 'chevron_left' : 'chevron_right';
    drawerBtnIcon.innerText = icon;
    isDrawerOpen = !isDrawerOpen;

    sideBar.classList.toggle('close-drawer');
    main.classList.toggle('full-width');
}

export const notify = (message: string): void => {
    toast({
        html: message,
        inDuration: 800,
        outDuration: 800,
        displayLength: 5000,
        classes: 'rounded black-text grey lighten-5'
    });
}

export const handleUsersToolChoice = (e: Event): void => {
    const item =  e.target as HTMLElement;
    const toolName = item.innerText as Tool;
    processChoice(toolName);
}

export const processChoice = (tool: Tool): void => {
    switch(tool) {
        case 'add': {
            console.log('adding feature comming soon');
            break;
        }

        case 'save': {
            console.log('save feature comming soon');
            break;
        }

        case 'text_format': {
            console.log('text_format feature comming soon');
            break;
        }

        case 'color_lens': {
            colorPicker.click();
            colorPicker.addEventListener('input', (e: Event): void => {
                const picker = e.target as HTMLInputElement;
                const color = picker.value;
                content.style.color = color;
            });
            break;
        }

        case 'delete': {
            content.value = '';
        }
    }
}
