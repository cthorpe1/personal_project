import React from 'react';
import { Modal, Popover, OverlayTrigger, Button} from 'react-bootstrap';
import styles from './ModalContainer.module.css';
import {deleteMarker} from '../../handlers/markerHandlers';

const ModalContainer = props => {
  const deleteMarkerHandler = () => {
    deleteMarker(props.modalContent.id);
    props.setShowModal(false);
  }

  const confirmDeletePopover = (
    <Popover>
      <Popover.Title as="h3">Confirm Delete</Popover.Title>
      <Popover.Content>
        <p>Are you sure want to delete the {props.modalContent && props.modalContent.title} marker?</p>
        <Button variant="danger" className="d-block w-100" onClick={deleteMarkerHandler}>Yes</Button>
      </Popover.Content>
    </Popover>
  );

  return (
    <div>
      <Modal 
        show={props.showModal} 
        onHide={() => props.setShowModal(false)} 
        dialogClassName={styles.ModalContainer}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className={styles.TitleContainer}>
              {props.modalContent && props.modalContent.title}
              <div className={props.modalContent && props.modalContent.hasOwnProperty("id") ? styles.TrashContainer : styles.Hidden}>
                <OverlayTrigger trigger="click" placement="right" overlay={confirmDeletePopover}>
                  <div className={styles.Trash}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </div>
                </OverlayTrigger>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.modalContent && props.modalContent.body}
        </Modal.Body>
        {props.modalContent && props.modalContent.component}
      </Modal>
    </div>
  )
};

export default ModalContainer;