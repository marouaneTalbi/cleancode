
import { test, expect } from '@playwright/experimental-ct-react';
import MyModal from '../components/Modal';
import App from '../App';

test('Test d\'ouverture du modal', async ({ mount }) => {
  // Montez l'application
  const modal = await mount(<MyModal /> );
  await modal.getByPlaceholder('Votre question').fill('Quelle est la capitale de la France ?');

  //await questionInput.fill('Rick')
});