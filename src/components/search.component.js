import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from "moment";
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'moment/locale/es';


import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

function SearchModal(props) {

	const [date1, setDate1] = useState(moment());
	const [date2, setDate2] = useState(moment());
	const [filter, setFilter] = useState('pending');


	function doFilter(e){
    console.log(e.target.getAttribute('filter'));
    setFilter(e.target.getAttribute('filter'));
    // this.setState({
    //   filter: e.target.getAttribute('filter'),
    // });
  }
  function handleChange(event) {
    // Here, we invoke the callback with the new value
    // props.handleState(event.target.value);
    props.handleState(filter);

  }
  return (
    <>
      <Button variant="primary" onClick={props.handleShow}>
        Filtrar
      </Button>

      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
	        <Container>
	          <Row>
	            <Col xs={6} md={4}>
			          <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
			            <KeyboardDatePicker
			              margin="normal"
			              id="date-picker-dialog-1"
			              format="DD/MM/yyyy"
			              value={date1}
			              onChange={setDate1}
			              cancelLabel="Cancelar"
			              okLabel="Aceptar"
			              KeyboardButtonProps={{
			                'aria-label': 'change date',
			              }}
			            />
			          </MuiPickersUtilsProvider>
	            </Col>
	            <Col xs={6} md={4}>
			          <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
			            <KeyboardDatePicker
			              margin="normal"
			              id="date-picker-dialog-2"
			              format="DD/MM/yyyy"
			              value={date2}
			              onChange={setDate2}
			              cancelLabel="Cancelar"
			              okLabel="Aceptar"
			              KeyboardButtonProps={{
			                'aria-label': 'change date',
			              }}
			            />
			          </MuiPickersUtilsProvider>
	            </Col>
	          </Row>
	          <Row>
	            <Col xs={12} md={8}>
            <InputGroup>
              <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title={filter}
                id="input-group-dropdown-1"
              >
                <Dropdown.Item href="#" filter="pending" onClick={doFilter}>Pendiente</Dropdown.Item>
                <Dropdown.Item href="#" filter="cancelled" onClick={doFilter}>Cancelada</Dropdown.Item>
                <Dropdown.Item href="#" filter="passed" onClick={doFilter}>Cumplir</Dropdown.Item>
                <Dropdown.Item href="#" filter="all" onClick={doFilter}>Todas</Dropdown.Item>
              </DropdownButton>
              {/*<FormControl aria-describedby="basic-addon1" value={this.state.filter} readOnly />*/}
            </InputGroup>
	            </Col>
	          </Row>

	        </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SearchModal;