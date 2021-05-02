import {
  drawerBtnIcon, sideBar, main,
  colorPicker, content, modalButton,
  modalValue
} from './Elements';

import {
  loadModal, displayPrompt, notify,
  tabIndent, setWork
} from './Helpers';

import { socket } from './socket';
import { modalInstance } from './index';
import { Tool, DrawerIconType, WorkType } from './Definitions';

var isDrawerClose = false;
var fontColor = '#000';
var workTitle = '';
var isWorkSaved = true;
var isOpening = false;

var savedWorks: WorkType[] = [];

export const handleSideBarDisplay = (): void => {
  let icon: DrawerIconType;
  icon = isDrawerClose ? 'chevron_left' : 'chevron_right';
  drawerBtnIcon.innerText = icon;
  isDrawerClose = !isDrawerClose;

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
  socket.emit('writing', content.value);
}

export const processChoice = (tool: Tool): void => {
  switch (tool) {

    case 'add': {
      loadModal();
      if(!isOpening) {
        modalButton.addEventListener('click', (): void => {
          workTitle = modalValue.value.trim();
          let checkWork = localStorage.getItem('TypeWithWorks');
          let isExists = false;
          if (checkWork) {
            let parsedWork = JSON.parse(checkWork) as WorkType[];
            let result = parsedWork.find(({ title }) => title === workTitle);
            isExists = result ? true : false;
          }
          workTitle === '' ? notify('Please Enter A Valid Title') : isExists ?
          notify('Work Title Already Exists.') : modalInstance?.close();
        });
      }
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
        addButton?.click();
      }
      else {

        let oldWorks = localStorage.getItem('TypeWithWorks');
        savedWorks = oldWorks ? JSON.parse(oldWorks) as WorkType[] : savedWorks;
        let currentWork = {
          title: workTitle,
          content: work,
          color: fontColor
        }
        savedWorks = savedWorks.filter(({ title }) => title !== workTitle);
        savedWorks = [ ...savedWorks, currentWork ];
        localStorage.setItem('TypeWithWorks', JSON.stringify(savedWorks));
        setWork(savedWorks);

        notify('Work Saved Successfully.');
        isWorkSaved = true;
      }
      break;
    }

    case 'folder_open': {
      loadModal();
      isOpening = true;
      modalButton.addEventListener('click', (): void => {
        workTitle = modalValue.value.trim();
        workTitle === '' ? notify('Please Enter A Valid Title') : modalInstance?.close();
        let oldWorks = localStorage.getItem('TypeWithWorks');
        if (oldWorks && workTitle !== '') {
            let localWorks = JSON.parse(oldWorks) as WorkType[];
            let searchedWork = localWorks.find(({ title }) => title === workTitle);
            let searchedWorkContent = searchedWork ? searchedWork.content : '';
            content.value = searchedWorkContent;
            content.style.color = searchedWork ? searchedWork.color : fontColor;
        }
        else if (workTitle !== '') {
          notify(`No Work Found With Title ${workTitle}`);
        }
      });
      isOpening = false;
      break;
    }

    case 'color_lens': {
      colorPicker.click();
      colorPicker.addEventListener('input', (e: Event): void => {
        const picker = e.target as HTMLInputElement;
        const color = picker.value;
        content.style.color = color;
        fontColor = color;
      });
      break;
    }

    case 'delete': {
      if (content.value !== '') {
        displayPrompt('Delete this work from saved space as well ?', workTitle);
        content.value = '';
        workTitle = '';
        fontColor = '#000';
        isWorkSaved = false;
        content.style.color = fontColor;
      }
      else {
        notify('No Work To Delete');
      }
    }
  }
}
