import React from "react";
import { Button, Modal, Label, TextInput } from 'flowbite-react';


export default function MyModal({openModal, setOpenModal, formData, handleChange, handleSubmit}) {
    
    return (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Créer une carte mémoire</Modal.Header>
        <Modal.Body>
          <form className="flex max-w-md flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="question" value="Question*" />
              </div>
              <TextInput id="question" type="text" placeholder="Votre question" value={formData.question} onChange={handleChange} required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="answer" value="Réponse*" />
              </div>
              <TextInput id="answer" type="text" placeholder="Votre réponse" value={formData.answer} onChange={handleChange} required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="tag" value="Tag" />
              </div>
              <TextInput id="tag" type="text" placeholder="Votre tag" value={formData.tag} onChange={handleChange} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="categorie" value="Catégorie" />
              </div>
              <TextInput id="categorie" type="text" placeholder="1" disabled readOnly />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={handleSubmit}>Créer</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>Annuler</Button>
        </Modal.Footer>
      </Modal>
    )
}