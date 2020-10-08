// AuthButton.js
import React, { useState } from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import moment from "moment";
// import MomentUtils from '@date-io/moment';
import 'moment/locale/es';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CancelAppointmentModal from "./cancel-appointment-modal.component";
import { useMediaQuery } from 'react-responsive';

const AppointmentItem = props => {
  let { service, estate } = props.appointment;
  const appointA = {
    backgroundColor: '#bde4ea',
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


  const isMobile = useMediaQuery({
    query: '(max-width: 760px)'
  })

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true);};

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h4">
        {props.appointment.service}&nbsp;&nbsp;&nbsp;
        { props.appointment.estate !== 'cancelled' ?

          <CancelAppointmentModal
            show={show}
            handleClose={handleClose}
            handleShow={handleShow}
            aid={props.appointment.id}
            arrindx={props.index}
            indexdate={props.indexdate}
            cancelAppointment={props.cancelAppointment}
          />

          :
          ""
        }
      </Popover.Title>
      <Popover.Content>
        <span>{props.appointment.madeBy?.surname}, {props.appointment.madeBy?.name}</span>
        <br/><small>creada: {moment(props.appointment.createdAt).fromNow()}</small>
      </Popover.Content>
      { props.appointment.estate === 'pending' ?
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="button"
            className="btn btn-link btn-sm"
            aid={props.appointment.id}
            arrindx={props.index}
            indexdate={props.indexdate}
            onClick={(e) => {document.body.click();props.fulfillAppointment(e)}}
          >
            Confirmar
          </button>
        </div>
        :
        ""
      }
    </Popover>
  );

  switch (service) {
    case 'Acupuntura':

      switch (estate) {
        case 'pending':
          return <OverlayTrigger trigger="click" placement="auto" rootClose={true} overlay={popover}>
                    <div style={appointA}>
                      { isMobile ? service.charAt(0) : props.appointment.madeBy?.name}
                    </div>
                  </OverlayTrigger>;
        case 'fulfilled':
          return <OverlayTrigger trigger="click" placement="auto" rootClose={true} overlay={popover}>
                    <div style={appointAF}>
                      { isMobile ? service.charAt(0) : props.appointment.madeBy?.name}
                    </div>
                  </OverlayTrigger>;
        case 'cancelled':
          return <OverlayTrigger trigger="click" placement="auto" rootClose={true} overlay={popover}>
                    <div style={appointAC}>
                      { isMobile ? service.charAt(0) : props.appointment.madeBy?.name}
                    </div>
                  </OverlayTrigger>;
        default:
          return null;
      }
    case 'Psicología':

      switch (estate) {
        case 'pending':
          return <OverlayTrigger trigger="click" placement="auto" rootClose={true} overlay={popover}>
                    <div style={appointP}>
                      { isMobile ? service.charAt(0) : props.appointment.madeBy?.name}
                    </div>
                  </OverlayTrigger>;
        case 'fulfilled':
          return <OverlayTrigger trigger="click" placement="auto" rootClose={true} overlay={popover}>
                    <div style={appointPF}>
                      { isMobile ? service.charAt(0) : props.appointment.madeBy?.name}
                    </div>
                  </OverlayTrigger>;
        case 'cancelled':
          return <OverlayTrigger trigger="click" placement="auto" rootClose={true} overlay={popover}>
                    <div style={appointPC}>
                      { isMobile ? service.charAt(0) : props.appointment.madeBy?.name}
                    </div>
                  </OverlayTrigger>;
        default:
          return null;
      }
    default:
      return null;
  }
};
export default AppointmentItem;


