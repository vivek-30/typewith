import {
  toolBarButton, toolTipps, drawerBtn,
  promptRejected, promptAccepted,
  tools, content, modal, usersList
} from './Elements';

import {
  handleSideBarDisplay, handleUsersToolChoice,
  handleContentChange
} from './Executors';

import {
  handlePromptAcceptance, handlePromptRejectance,
  setWork
} from './Helpers';

import {
  FloatingActionButton, Tooltip,
  Modal, Sidenav
} from 'materialize-css';

import { socket } from './socket';
import { WorkType } from './Definitions';
import './sass/index.scss';

let recentWorks = localStorage.getItem('TypeWithWorks');
let savedWorks: WorkType[] = recentWorks ? JSON.parse(recentWorks) : [];
setWork(savedWorks);

FloatingActionButton.init(toolBarButton, {
  direction: 'left',
  hoverEnabled: false
});

Tooltip.init(toolTipps, {
  position: 'top',
  exitDelay: 0,
  enterDelay: 1,
  inDuration: 300,
  outDuration: 0,
  margin: 10
});

export const modalInstance = Modal.init(modal, {
  dismissible: true,
  opacity: 0.6
});

Sidenav.init(usersList, {
  edge: 'right'
});

// Events For DOM Elements.
content.addEventListener('keyup', handleContentChange);
drawerBtn.addEventListener('click', handleSideBarDisplay);
tools.addEventListener('click', handleUsersToolChoice);
promptAccepted.addEventListener('click', handlePromptAcceptance);
promptRejected.addEventListener('click', handlePromptRejectance);

// Socket Events.
socket.on('writing', (data: string) => {
  content.value = data;
});
