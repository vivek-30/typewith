import {
  modalValue, userPrompt, userPromptTitle,
  content
} from './Elements';

import { WorkType } from './Definitions';
import { toast } from 'materialize-css';
import { modalInstance } from './index';

var workTitle: string;
var oldWorks: WorkType[] = [];

export const loadModal = (): void => {
  modalInstance?.open();
  modalValue.value = '';
  modalValue.focus();
}

export const displayPrompt = (message: string, usersWorkTitle: string): void => {
  workTitle = usersWorkTitle;
  userPromptTitle.innerText = message;
  userPrompt.style.display = 'block';
}

export const handlePromptRejectance = (): void => {
  userPrompt.style.display = 'none';
}

export const handlePromptAcceptance = (): void => {
  let oldSavedWorks = localStorage.getItem('TypeWithWorks');
  oldWorks = oldSavedWorks ? JSON.parse(oldSavedWorks) as WorkType[] : oldWorks;
  let updatedWorks = oldWorks.filter(({title}) => title !== workTitle);
  localStorage.setItem('TypeWithWorks', JSON.stringify(updatedWorks));
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

export const tabIndent = (e: KeyboardEvent): void => {
  e.preventDefault();
  let start = content.selectionStart;
  content.value += '\t';
  content.selectionStart = content.selectionEnd = start + 1;
}
