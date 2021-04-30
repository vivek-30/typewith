import {
  drawerBtnIcon, sideBar, main,
  colorPicker, content, modalButton,
  modalValue
} from './Elements';

import {
  loadModal, displayPrompt, notify,
  tabIndent
} from './Helpers';

import { modalInstance } from './index';
import { Tool, DrawerIconType } from './Definitions';

var isDrawerOpen = false;
var workTitle = localStorage.getItem('current-work-title') || '';
var isWorkSaved = localStorage.getItem(workTitle) ? true : false;
var isCustomTitle = false;

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

export const handleContentChange = (e: KeyboardEvent) => {
  isWorkSaved = false;
  if(e.key == 'Tab') {
    tabIndent(e);
  }
}

export const processChoice = (tool: Tool): void => {
  switch (tool) {

    case 'add': {
      loadModal();
      modalButton.addEventListener('click', (): void => {
        workTitle = modalValue.value.trim();
        if(workTitle === '') {
          notify('Please Enter a valid Title');
        }
        else if(localStorage.getItem(workTitle)) {
          notify('Work Title Already Exists.');
        }
        else {
          isCustomTitle = true;
          modalInstance?.close();
        }
      });
      break;
    }

    case 'save': {
      const work = content.value.trim();
      if (!isCustomTitle) {
        workTitle = localStorage.getItem('current-work-title') || '';
      }
      if (work === '') {
        notify('Please Add Some Work To Save.');
      }
      else if (workTitle === '') {
        notify('Please Provide Work Title To Save.');
        const addButton = document.querySelector('#tools li a i[name="add"]') as HTMLElement;
        addButton?.click();
      }
      else {

        localStorage.setItem(workTitle, work);
        localStorage.setItem('[[//work//]]', work);
        localStorage.setItem('current-work-title', workTitle);

        notify('Work Saved Successfully.');
        isWorkSaved = true;
      }
      break;
    }

    case 'folder_open': {
      loadModal();
      modalButton.addEventListener('click', (): void => {
        workTitle = modalValue.value.trim();
        workTitle === '' ? notify('Please Enter A Valid Title') : modalInstance?.close();
        if (localStorage.getItem(workTitle)) {
          if(!isWorkSaved && content.value.trim() !== '') {
            notify('Please Save Your Work First');
          }
          else {
            let savedWork = localStorage.getItem(workTitle) || '';
            content.value = savedWork;
            localStorage.setItem('current-work-title', workTitle);
            localStorage.setItem('[[//work//]]', savedWork);
          }
        }
        else if(workTitle !== '') {
          notify(`No Work Found With Title ${workTitle}`);
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
      if(content.value !== '') {
        displayPrompt('Delete this work from saved space as well ?', workTitle);
        isWorkSaved = false;
        isCustomTitle = false;
        workTitle = '';
        localStorage.removeItem('[[//work//]]');
        localStorage.removeItem('current-work-title');
      }
      else {
        notify('No Work To Delete');
      }
    }
  }
}
