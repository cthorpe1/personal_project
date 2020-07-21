import React from 'react';
import { Modal} from 'react-bootstrap';
import styles from './ModalContainer.module.css';

const ModalContainer = props => {
  return (
    <div>
      <Modal 
        show={props.showModal} 
        onHide={() => props.setShowModal(false)} 
        dialogClassName={styles.ModalContainer}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.modalContent && props.modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.modalContent && props.modalContent.body}</Modal.Body>
        {props.modalContent && props.modalContent.component}
      </Modal>
    </div>
  )
};

export default ModalContainer;