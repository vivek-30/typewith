import {
  modalValue, userPrompt, userPromptTitle,
  content, dashBoardItem, participants,
  modalTitle, modalButton
} from './Elements';

import { socket } from './socket';
import { WorkType, User } from './Definitions';
import { toast } from 'materialize-css';
import { modalInstance } from './index';

var workTitle: string;
var oldWorks: WorkType[] = [];

export const loadModal = (title: string): void => {
  modalTitle.innerText = title;
  modalValue.value = '';
  modalInstance?.open();
  modalValue.focus();
}

export const displayPrompt = (message: string, usersWorkTitle: string): void => {
  workTitle = usersWorkTitle;
  userPromptTitle.innerText = message;
  userPrompt.style.display = 'block';
}

export const setWork = (savedWorks: WorkType[]) => {
  if (savedWorks.length) {
    dashBoardItem.innerHTML = '';
    let isGrey = true;
    savedWorks.forEach(({ title }): void => {
      dashBoardItem.innerHTML += `<li class="collection-item grey lighten-${isGrey ? '5' : '4'}
      my-work">${title}</li>`;
      isGrey = !isGrey;
    });
  }
  else {
    dashBoardItem.innerHTML = `<li class="collection-item center my-work">
    No Saved Work Found !!!</li>`;
  }
}

export const setParticipants = (people: User[]) => {
  if (people.length) {
    participants.innerHTML = '';
    people.forEach(({ name, id }): void => {
      participants.innerHTML +=  `<li>
      <a class="waves-effect" name="${id}">${name}</a></li>`;
    });
  }
  else {
    participants.innerHTML = `<li>
    <a class="waves-effect">No Active User Found !!!</a></li>`;
  }
}

export const setName = (name: string) => {

  if (name === '') {
    loadModal('Enter Your Name.');
    modalButton.addEventListener('click', (): void => {
      name = modalValue.value.trim();
      if (name === '') {
        notify('Name must not be Empty.');
      }
      else {
        modalInstance?.close();
        socket.emit('join-me', name);
        localStorage.setItem('MyTypeWithName', name);
      }
    });
  }
  else {
    socket.emit('join-me', name);
  }
}

export const handlePromptRejectance = (): void => {
  content.value = '';
  userPrompt.style.display = 'none';
}

export const handlePromptAcceptance = (): void => {
  content.value = '';
  let oldSavedWorks = localStorage.getItem('TypeWithWorks');
  oldWorks = oldSavedWorks ? JSON.parse(oldSavedWorks) as WorkType[] : oldWorks;
  let updatedWorks = oldWorks.filter(({title}) => title !== workTitle);
  localStorage.setItem('TypeWithWorks', JSON.stringify(updatedWorks));
  setWork(updatedWorks);
  userPrompt.style.display = 'none';
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

export const openSelectedWork = (e: Event) => {
  let work = e.target as HTMLLIElement;
  let workTitle = work.innerText;

  if(workTitle !== 'No Saved Work Found !!!') {
    let savedWorks = localStorage.getItem('TypeWithWorks');
    let parsedWorks: WorkType[] = savedWorks ? JSON.parse(savedWorks) : [];
    let searchedWork = parsedWorks.find(({ title }) => title === workTitle);
    content.value = searchedWork?.content || '';
    content.style.color = searchedWork?.color || '#000';
  }
}

export const tabIndent = (e: KeyboardEvent): void => {
  e.preventDefault();
  let start = content.selectionStart;
  content.value += '\t';
  content.selectionStart = content.selectionEnd = start + 1;
}
