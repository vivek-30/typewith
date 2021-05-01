import {
  toolBarButton, toolTipps, drawerBtn,
  promptRejected, promptAccepted,
  tools, content, modal
} from './Elements';

import {
  handleSideBarDisplay, handleUsersToolChoice,
  handleContentChange
} from './Executors';

import { handlePromptAcceptance, handlePromptRejectance } from './Helpers';
import { FloatingActionButton, Tooltip, Modal } from 'materialize-css';
import './sass/index.scss';

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

content.addEventListener('keydown', handleContentChange);
drawerBtn.addEventListener('click', handleSideBarDisplay);
tools.addEventListener('click', handleUsersToolChoice);
promptAccepted.addEventListener('click', handlePromptAcceptance);
promptRejected.addEventListener('click', handlePromptRejectance);
