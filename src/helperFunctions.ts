import { 
    drawerBtnIcon, sideBar, main, 
    colorPicker, content, modalButton, 
    modalValue
} from './Elements';
import { toast } from 'materialize-css'
import { Tool } from './structures';
import { modalInstance } from './index';

var isDrawerOpen = false;
var workTitle = '';

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
    const toolName = item.getAttribute('name') as Tool;
    processChoice(toolName);
}

export const processChoice = (tool: Tool): void => {
    switch(tool) {
        case 'add': {
            modalInstance?.open();
            modalButton.addEventListener('click', (): void => {
                workTitle = modalValue.value.trim();
                if(workTitle === '') 
                    notify('Please Enter a valid Title');
                else if (localStorage.getItem(workTitle))
                    notify('Work Title Already Exists.');
                else 
                    modalInstance?.close();
            });
            break;
        }

        case 'save': {
            const work = content.value.trim();
            if(work === '') {
                notify('Please Add Some Work To Save.');
            }
            else if(workTitle === '') {
                notify('Please Provide Work Title To Save.');
                const addButton = document.querySelector('#tools li a i[name="add"]') as HTMLElement;
                addButton.click();
            }
            else {
                localStorage.setItem(workTitle, work);
                notify('Work Saved Successfully.');
                workTitle = '';
            }

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
            if(localStorage.getItem('work')) {
                localStorage.setItem('work', '');
            }
        }
    }
}
