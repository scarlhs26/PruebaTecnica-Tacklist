// src/pages/ChecklistPage.tsx
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Checklist } from '../components/Check';
import { LogoutButton } from '../components/LogoutButton'
import '../styles/Generales.css';

export function ChecklistPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <LogoutButton/>
      <Checklist />
    </DndProvider>
  );
}
