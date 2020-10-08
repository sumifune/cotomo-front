import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


function CancelAppointmentModal(props) {

  function handleChange(event) {
    // Here, we invoke the callback with the new value
    // props.handleState(event.target.value);
    props.handleClose();
    props.cancelAppointment(props.aid,props.arrindx, props.indexdate);
  }
  return (
    <>
      <OverlayTrigger
        key={'top'}
        placement={'top'}
        overlay={
          <Tooltip id={`tooltip-${'top'}`}>
            Cancelar cita
          </Tooltip>
        }
      >
        <Button variant="danger" size="sm" onClick={props.handleShow}>
          <span style={{ fontWeight: 'bold' }}>Cancelar</span>
        </Button>
      </OverlayTrigger>



      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cancelar cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
	        <Container>
	          <Row>
	            <Col xs={6} md={4}>

	            </Col>
	          </Row>
	        </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleChange}>
            Si
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CancelAppointmentModal;