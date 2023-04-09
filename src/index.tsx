import React from 'react';
import { createRoot } from 'react-dom/client';
import { configure } from 'mobx';
import { App } from './app';

setTimeout(() => {
  configure({
    enforceActions: 'never',
    reactionScheduler: (f) => setTimeout(f),
  });
});

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(<App />);
