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

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

moment.locale("es");

export default class AddAppointment extends Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.retrieveAppointments = this.retrieveAppointments.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.previousDates = this.previousDates.bind(this);
    this.followingDates = this.followingDates.bind(this);

    this.state = {
      id: null,
      apointee: "fff",
      // selectedDate: moment("01-01-2020", "DD-MM-YYYY"),
      selectedDate: moment(),
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

    AppointmentDataService.findByDateNext(selectedDate.format('DD/MM/YYYY'))
      .then((response) => {
        console.log(response);
        const { nextFiveDates } = response.data;

        this.setState({
          appointments: nextFiveDates,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleDateChange(date) {
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

    var data = {
      surname: this.props.match.params.surname,
      hour: e.target.getAttribute('inx'),
      date: this.state.selectedDate.format('DD/MM/YYYY'),
      service: this.state.service,
      estate: "pending",
    };

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

  previousDates(e) {
    console.log(this.state.apointee);

    this.setState({
      selectedDate: moment(this.state.selectedDate, "DD-MM-YYYY").add(-5,'days'),
    }, () => {
     this.retrieveAppointments()
    });


  }

  followingDates(e) {
    console.log(moment(this.state.selectedDate, "DD-MM-YYYY").add(5,'days').format("DD-MM-YYYY"));
    // this.setState({
    //   selectedDate: moment(this.state.selectedDate, "DD-MM-YYYY").add(5,'days'),
    // });

    this.setState({
      selectedDate: moment(this.state.selectedDate, "DD-MM-YYYY").add(5,'days'),
    }, () => {
     this.retrieveAppointments()
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
    // const appointmentAcu = {
    //   backgroundColor: '#bde4ea',
    //   // height: '50px',
    //   margin: '5px',
    // };
    // const appointmentPsico = {
    //   backgroundColor: '#f4c9c9',
    //   // height: '50px',
    //   margin: '5px',
    // };

    const dropdownService = {
      paddingTop: '25px',
      // margin: '25px',
      // backgroundColor: '#f4c9c9',
      // border: '10px solid lightgrey',
    }

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
    }

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
    }

    const aaaa = {
      height: '40px',
      // marginTop: '10px',
      // paddingLeft: '12px',
      // paddingTop: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }

    const {
      appointments,
      selectedDate,
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
            <ButtonGroup>
              <Button variant="secondary" onClick={this.previousDates}>Anteriores</Button>
              <Button variant="secondary" onClick={this.followingDates}>Siguientes</Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">

          <div className="row">
            <div className="col-2" style={timeSlot}>
            </div>
            { Array.from({length: 5}, (item, date) => (
              <div className="col-2" key={date} style={timeSlotConainer}>
                {moment(selectedDate, "DD-MM-YYYY").add(date,'days').format('DD')}
              </div>
            ))}

          </div>
          {Array.from({length: 12}, (item, hour) => (

            <div className="row" key={hour}>
              <div className="col-2" style={timeSlot}>
                <div className="row">
                  <div className="col-2">
                    {(hour + 9).toString() + ":00"}
                  </div>
                  <div style={aaaa} className="col-10">
                    &nbsp;
                  </div>
                </div>
              </div>
              { appointments && appointments.map((appointmentDates, indexDate) => (

                <div className="col-2" style={timeSlotConainer} key={indexDate}>

                  { appointmentDates && appointmentDates.map((appointment, index) => {

                    const popover = (
                      <Popover id="popover-basic">
                        <Popover.Title as="h3">{appointment.service}</Popover.Title>
                        <Popover.Content>
                          <span>{appointment.surname}</span>
                          <br/><small>creada: {moment(appointment.createdAt).fromNow()}</small>
                        </Popover.Content>
                      </Popover>
                    );

                    return ((hour + 9).toString() + ":00") === appointment.hour ?
                      <div key={index}>
                        <OverlayTrigger trigger="click" placement="auto" rootClose={true} overlay={popover}>
                          <div style={appointment.service === 'Acupuntura' ? appointA : appointP}>{appointment.service.charAt(0)}</div>
                        </OverlayTrigger>
                      </div>

                    :
                     ""
                    }
                  )}

                </div>

              ))}

            </div>

          ))}

          <p>&nbsp;</p>
        </div>
      </div>
      </>
    );
  }
}
