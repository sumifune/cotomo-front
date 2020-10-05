import React, { Component } from "react";
import AppointmentDataService from "../services/appointment.service";
import moment from "moment";
// import 'date-fns';
// import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import 'moment/locale/es';

import Toast from 'react-bootstrap/Toast';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControl from 'react-bootstrap/FormControl';

moment.locale("es");

export default class AddAppointment extends Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.retrieveAppointments = this.retrieveAppointments.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.setService = this.setService.bind(this);

    this.state = {
      id: null,
      apointee: "",
      // selectedDate: moment("01-01-2020", "DD-MM-YYYY"),
      selectedDate:moment(),
      appointments: [],
      service: "Acupuntura"
    };
  }

  componentDidMount() {
    // console.log(moment("01-01-2020", "DD-MM-YYYY").format('DD-MM-YYYY'));
    this.retrieveAppointments();
  }
  componentDidUpdate(prevProps, prevState) {
    // https://medium.com/better-programming/when-to-use-callback-function-of-setstate-in-react-37fff67e5a6c
    // if (this.state.currentMonth !== prevState.currentMonth) {
    //   this.props.getCalendarData(this.state.currentMonth);
    // }
  }
  retrieveAppointments() {
    const { selectedDate } = this.state;

    AppointmentDataService.findByDate(selectedDate.format('DD/MM/YYYY'))
      .then((response) => {
        console.log(response);
        const { appointments } = response.data;

        this.setState({
          appointments: appointments,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleDateChange(date) {
    console.log('------------------------------------------------');
    console.log(date);
    console.log('------------------------------------------------');

    this.setState({
      selectedDate: date,
    }, () => {
     this.retrieveAppointments()
    })}

  deleteAppointment = (i,appointment) => {
    console.log("---------- analizar: usar i o id de mongodb en key ----------------");
    console.log(i);
    console.log(appointment);
    console.log("-------------------------------------------------------------------");

    AppointmentDataService.delete(appointment)
      .then((response) => {

        console.log(response.data);

        this.setState(state => {
          const appointments = state.appointments.filter((item, j) => i !== j);

          return {
            appointments,
          };
        });

      })
      .catch((e) => {
        console.log(e);
      });

  };

  addAppointment(e) {

    // console.log(this.state.selectedDate.format('DD-MM-YYYY'));

    var data = {
      hour: e.target.getAttribute('inx'),
      date: this.state.selectedDate.format('DD-MM-YYYY'),
      service: this.state.service,
      estate: "pending",
      madeBy: this.props.match.params.id
    };


    console.log(data);

    AppointmentDataService.create(data)
      .then((response) => {

        console.log(response.data);
        this.setState(state => {
          const appointments = state.appointments.concat(response.data);

          return {
            appointments,
          };

        });
      })
      .catch((e) => {
        console.log(e);
      });

  }

  setService(e) {
    console.log(e.target.getAttribute('service'));
    this.setState({
      service: e.target.getAttribute('service'),
    });
  }

  render() {

    const timeSlotConainer = {
      // backgroundColor: '#eaf2bf',
      // height: '50px',
      // padding: '10px',
      border: '1px solid lightgrey',
    };
    const timeSlot = {
      backgroundColor: 'lightgrey',
      // height: '50px',
    };
    const appointmentAcu = {
      backgroundColor: '#bde4ea',
      // height: '50px',
      margin: '5px',
    };
    const appointmentPsico = {
      backgroundColor: '#f4c9c9',
      // height: '50px',
      margin: '5px',
    };

    const dropdownService = {
      paddingTop: '25px',
      // margin: '25px',
      // backgroundColor: '#f4c9c9',
      // border: '10px solid lightgrey',
    }

    const {
      appointments,
    } = this.state;

    // console.log(selectedDate.format('DD/MM/YYYY'));

    return (
      <>
      <div className="row">
        <div className="col-5">
          {/* minDate={"01/01/2020"} */}
          <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Fecha"
                format="DD/MM/yyyy"
                minDate={moment()}
                value={this.state.selectedDate}
                onChange={this.handleDateChange}
                cancelLabel="Cancelar"
                okLabel="Aceptar"
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
          </MuiPickersUtilsProvider>

        </div>
        <div className="col-7">
          <div style={dropdownService}>
            <InputGroup>
              <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title="Servicio"
                id="input-group-dropdown-1"
              >
                <Dropdown.Item href="#" service="Acupuntura" onClick={this.setService}>Acupuntura</Dropdown.Item>
                <Dropdown.Item href="#" service="Psicología" onClick={this.setService}>Psicología</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#">Otros</Dropdown.Item>
              </DropdownButton>
              <FormControl aria-describedby="basic-addon1" value={this.state.service} readOnly />
            </InputGroup>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {Array.from({length: 12}, (item, hour) => (

            <div className="row" key={hour}>
              <div className="col-2" style={timeSlot}>
                <div className="row">
                  <div className="col-2">
                    {(hour + 9).toString() + ":00"}
                  </div>
                  <div className="col-10">
                    <button style={{marginLeft: "0px"}}  inx={(hour + 9).toString() + ":00"} onClick={this.addAppointment} className="btn btn-secondary">
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-10" style={timeSlotConainer}>

                { appointments && appointments.map((appointment, index) => {

                  return ((hour + 9).toString() + ":00") === appointment.hour ?
                    <Toast onClose={() => this.deleteAppointment(index, appointment.id)} style={ appointment.service === 'Acupuntura' ? appointmentAcu : appointmentPsico} key={index}>
                      <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                        <strong className="mr-auto">{appointment.service}</strong>
                        <small>{moment(appointment.createdAt).fromNow()}</small>
                      </Toast.Header>
                      <Toast.Body>{appointment.madeBy.surname}, {appointment.madeBy.surname}</Toast.Body>
                    </Toast>
                  :
                    ""
                  }
                )}

              </div>
            </div>

          ))}

          <p>&nbsp;</p>
        </div>
      </div>
      </>
    );
  }
}
