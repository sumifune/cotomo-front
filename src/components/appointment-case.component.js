import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';





import { useMediaQuery } from 'react-responsive';
import moment from "moment";
import 'moment/locale/es';
import './appointment-case.component.css';


const AppointmentCase = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const isMobile = useMediaQuery({
    query: '(max-width: 760px)'
  })

  let { service, estate } = props.appointment;

  function calcStyle(service, estate){

    const appointA = {
      backgroundColor: '#bde4ea',
      height: '40px',
      marginTop: '10px',
      marginBottom: '10px',
      // paddingLeft: '0px',
      // paddingTop: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '4px',
    };
    const appointAF = {
      backgroundColor: '#bde400',
      height: '40px',
      marginTop: '10px',
      marginBottom: '10px',
      // paddingLeft: '12px',
      // paddingTop: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '4px',
    };
    const appointAC = {
      backgroundColor: '#ff4d4d',
      height: '40px',
      marginTop: '10px',
      marginBottom: '10px',
      // paddingLeft: '12px',
      // paddingTop: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '4px',
    };

    const appointP = {
      backgroundColor: '#f4c9c9',
      height: '40px',
      marginTop: '10px',
      marginBottom: '10px',
      // paddingLeft: '12px',
      // paddingTop: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '4px',
    };
    const appointPF = {
      backgroundColor: '#bde400',
      height: '40px',
      marginTop: '10px',
      marginBottom: '10px',
      // paddingLeft: '12px',
      // paddingTop: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '4px',
    };
    const appointPC = {
      backgroundColor: '#ff4d4d',
      height: '40px',
      marginTop: '10px',
      marginBottom: '10px',
      // paddingLeft: '12px',
      // paddingTop: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '4px',
    };

    switch (service) {
      case 'Acupuntura':

        switch (estate) {
          case 'pending':
            return appointA;
          case 'fulfilled':
            return appointAF;
          case 'cancelled':
            return appointAC;
          default:
            return {};
        }
      case 'Psicología':

        switch (estate) {
          case 'pending':
            return appointP;
          case 'fulfilled':
            return appointPF;
          case 'cancelled':
            return appointPC;
          default:
            return {};
        }
      default:
        return {};
    }
 }

  return (
    <>
      <div style={calcStyle(service, estate)} onClick={handleShow}>
        { isMobile ?
            props.appointment.madeBy?.name.substring(0,1) +
            props.appointment.madeBy?.surname.substring(0,1) :
            props.appointment.madeBy?.name}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.appointment.madeBy?.name} {props.appointment.madeBy?.surname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{props.appointment.service}</p>
          <br/><small>creada: {moment(props.appointment.createdAt).fromNow()}</small>
        </Modal.Body>
        <Modal.Footer>
          { props.appointment.estate === 'pending' ?
              <div className="flex-container">
                <div>
                  <Dropdown>
                    <Dropdown.Toggle variant="danger" id="dropdown-basic">
                      Cancelar
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        variant="danger"
                        aid={props.appointment.id}
                        arrindx={props.index}
                        indexdate={props.indexdate}
                        onClick={(e) => {handleClose();props.cancelAppointment(e)}}
                      >Cancelar la cita (definitivamente)</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                <div>
                  <Button
                    variant="primary"
                    aid={props.appointment.id}
                    arrindx={props.index}
                    indexdate={props.indexdate}
                    onClick={(e) => {handleClose();props.fulfillAppointment(e)}}
                  >
                    Confirmar
                  </Button>
                </div>

              </div>
            :
            ""
          }
          { props.appointment.estate === 'fulfilled' ?
            <div>
              <Dropdown>
                <Dropdown.Toggle variant="danger" id="dropdown-basic">
                  Cancelar
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    variant="danger"
                    aid={props.appointment.id}
                    arrindx={props.index}
                    indexdate={props.indexdate}
                    onClick={(e) => {handleClose();props.cancelAppointment(e)}}
                  >Cancelar la cita (definitivamente)</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            :
            ""
          }
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppointmentCase;
