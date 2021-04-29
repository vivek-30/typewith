import {
  modalValue, userPrompt, userPromptTitle,
  content
} from './Elements';

import { toast } from 'materialize-css';
import { modalInstance } from './index';

var workTitle: string;

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
  content.value = '';
  userPrompt.style.display = 'none';
}

export const handlePromptAcceptance = (): void => {
  content.value = '';
  localStorage.removeItem('current-work-title');
  localStorage.removeItem('[[//work//]]');
  localStorage.removeItem(workTitle);
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
