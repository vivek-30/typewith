import {
  drawerBtnIcon, sideBar, main,
  colorPicker, content, modalButton,
  modalValue
} from './Elements';

import { loadModal, displayPrompt, notify } from './Helpers';
import { modalInstance } from './index';
import { Tool, DrawerIconType } from './Definitions';

var isDrawerOpen = false;
var workTitle = '';
var presentContent = '';

export const handleSideBarDisplay = (): void => {
  let icon: DrawerIconType;
  icon = isDrawerOpen ? 'chevron_left' : 'chevron_right';
  drawerBtnIcon.innerText = icon;
  isDrawerOpen = !isDrawerOpen;

  sideBar.classList.toggle('close-drawer');
  main.classList.toggle('full-width');
}

export const handleUsersToolChoice = (e: Event): void => {
  const item = e.target as HTMLElement;
  const toolName = item.getAttribute('name') as Tool;
  processChoice(toolName);
}

export const processChoice = (tool: Tool): void => {

  switch (tool) {
    case 'add': {
      loadModal();
      modalButton.addEventListener('click', (): void => {
        workTitle = modalValue.value.trim();
        if (workTitle === '')
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
      if (work === '') {
        notify('Please Add Some Work To Save.');
      }
      else if (workTitle === '') {
        notify('Please Provide Work Title To Save.');
        const addButton = document.querySelector('#tools li a i[name="add"]') as HTMLElement;
        addButton.click();
      }
      else {
        localStorage.setItem(workTitle, work);
        localStorage.setItem('[[//work//]]', work);
        notify('Work Saved Successfully.');
        workTitle = '';
      }
      break;
    }

    case 'folder_open': {
      loadModal();
      modalButton.addEventListener('click', (): void => {
        workTitle = modalValue.value.trim();
        if (workTitle === '')
          notify('Please Enter a valid Title');
        else
          modalInstance?.close();

        if (workTitle !== '') {
          presentContent = content.value;
          content.value = localStorage.getItem(workTitle) || '';
        }
      });
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
      displayPrompt('Delete this work from saved space as well ?');
    }
  }
}
