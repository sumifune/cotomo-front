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
// import Popover from 'react-bootstrap/Popover';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

// import AppointmentItem from './appointment-item';
import AppointmentCase from './appointment-case.component';




import './appointments-list.component.css';


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
    this.fulfillAppointment = this.fulfillAppointment.bind(this);
    this.cancelAppointment = this.cancelAppointment.bind(this);
    this.redirectPatients = this.redirectPatients.bind(this);
    // this.resize = this.resize.bind(this);

    this.state = {
      id: null,
      apointee: "fff",
      // selectedDate: moment("01-01-2020", "DD-MM-YYYY"),
      selectedDate: moment(),
      appointments: [],
      service: "Acupuntura",
      // showShortName: true
    };
  }

  componentDidMount() {
    // console.log(moment("01-01-2020", "DD-MM-YYYY").format('DD-MM-YYYY'));
    if (this.props.match.params.selected){
      this.setState({
        selectedDate: moment(this.props.match.params.selected, "DD-MM-YYYY"),
      }, () => {
       this.retrieveAppointments()
      });
    }else{
      this.setState({
        selectedDate: moment(),
      }, () => {
       this.retrieveAppointments()
      });
    }


    // window.addEventListener("resize", this.resize.bind(this));
    // this.resize();

    // this.retrieveAppointments();
  }
  componentDidUpdate(prevProps, prevState) {
    // https://medium.com/better-programming/when-to-use-callback-function-of-setstate-in-react-37fff67e5a6c
    // if (this.state.currentMonth !== prevState.currentMonth) {
    //   this.props.getCalendarData(this.state.currentMonth);
    // }
  }
  // componentWillUnmount() {
  //     window.removeEventListener("resize", this.resize.bind(this));
  // }
  // resize() {
  //   console.log(window.innerWidth <= 600);
  //     this.setState({showShortName: window.innerWidth <= 600});
  // }
  retrieveAppointments() {
    const { selectedDate } = this.state;

    AppointmentDataService.findByDateNext(selectedDate.format('DD/MM/YYYY'))
      .then((response) => {
        // console.log(response);
        const { nextFiveDates } = response.data;
        // console.log(nextFiveDates);
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

        // console.log(response.data);

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

    console.log("Esto no se ejecuta NUNCA")
    // REVISAR ESTO
    var data = {
      surname: this.props.match.params.surname,
      hour: e.target.getAttribute('inx'),
      date: this.state.selectedDate.format('DD/MM/YYYY'),
      service: this.state.service,
      estate: "pending",
    };

    AppointmentDataService.create(data)
      .then((response) => {

        // console.log(response.data);
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
    // console.log(this.state.apointee);
    this.setState({
      selectedDate: moment(this.state.selectedDate, "DD-MM-YYYY").add(-5,'days'),
    }, () => {
     this.retrieveAppointments()
    });


  }

  followingDates(e) {
    // console.log(moment(this.state.selectedDate, "DD-MM-YYYY").add(5,'days').format("DD-MM-YYYY"));
    this.setState({
      selectedDate: moment(this.state.selectedDate, "DD-MM-YYYY").add(5,'days'),
    }, () => {
     this.retrieveAppointments()
    });

  }

  cancelAppointment(e){

    const id = e.target.getAttribute('aid');
    const arrIndx = e.target.getAttribute('arrindx');
    const indexdate = e.target.getAttribute('indexdate');

    const data = {
      estate: "cancelled",
    };

    AppointmentDataService.update(id, data)
      .then((response) => {

        // console.log(response.data);
        this.setState(state => {

          let appointments = [...state.appointments];
          appointments[indexdate][arrIndx] = response.data;

          return {
            appointments,
          };

        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  fulfillAppointment(e) {

    const id = e.target.getAttribute('aid');
    const arrIndx = e.target.getAttribute('arrindx');
    const indexdate = e.target.getAttribute('indexdate');

    const data = {
      estate: "fulfilled",
    };

    AppointmentDataService.update(id, data)
      .then((response) => {

        // console.log(response.data);
        this.setState(state => {

          // console.log(response.data);
          // 1. Make a shallow copy of the items
          let appointments = [...state.appointments];
          // 2. Make a shallow copy of the item you want to mutate
          // let item = {...appointments[arrIndx]};
          // 3. Replace the property you're intested in
          // item.name = 'newName';
          // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
          appointments[indexdate][arrIndx] = response.data;

          // sustituir el appo. por el que llega del backend en vez de concat
          // const appointments = state.appointments.concat(response.data);

          return {
            appointments,
          };

        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  redirectPatients = (hour, day, selectedDate) => {
    // console.log('red ' + dh);
    // return <Redirect to={`/patients`}/>

  // let momentDate = moment(date, "DD-MM-YYYY");
  // let mongoDate = moment(momentDate).format('YYYY-MM-DD');


    // console.log('lllllllllllllllllllllllllllllllllllllll')
    // console.log(selectedDate);

    let qdate = moment(this.state.selectedDate).add(day,'days').format('DD-MM-YYYY');
    // console.log(qdate);

    let id = hour + "_" + qdate + "_" + selectedDate;

    // console.log(id);
    this.props.history.push('/patients/appoint/' + id);
  }

  render() {

    const timeSlotConainer = {
      border: '1px solid lightgrey',
      minHeight: '80px',
    };
    const hourHeader = {
      border: '1px solid lightgrey',
    };
    const timeSlot = {
      backgroundColor: 'lightgrey',
      // height: '50px',
      width: '100px',
    };
    const daySlot = {
      backgroundColor: 'lightgrey',
      // width: '100px',
      // border: '1px solid black'
    };


    const dropdownService = {
      paddingTop: '25px',
    }

    const aaaa = {
      height: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // border: '1px solid black',
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


          {/* --------------------------- HEADER --------------------------------------*/}
          <div className="row">
            <div className="col-2 col-sm-1 padding-0" style={daySlot}>
            </div>
            { Array.from({length: 5}, (item, date) => (
              <div className="col col-sm" key={date} style={hourHeader}>
                {moment(selectedDate, "DD-MM-YYYY").add(date,'days').format('DD')}
              </div>
            ))}
          </div>


          {Array.from({length: 12}, (item, hour) => (

            <div className="row" key={hour}>
              <div className="col-2 col-sm-1 padding-0" style={timeSlot}>
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

                <div className="col col-sm padding-0"
                  style={timeSlotConainer}
                  key={indexDate}
                  onClick={() => {
                    // console.log((hour + 9).toString() + ":00");
                    this.redirectPatients((hour + 9).toString() + ":00", indexDate, moment(this.state.selectedDate, "DD-MM-YYYY").format("DD-MM-YYYY"));
                    }
                  }
                >

                  { appointmentDates && appointmentDates.map((appointment, index) => {

                    return ((hour + 9).toString() + ":00") === appointment.hour ?
                        <div key={index} className="appointmentItem">
                          <div onClick={(e) => {e.stopPropagation()}}>
                          {/*
                            <AppointmentItem
                              appointment={appointment}
                              index={index}
                              indexdate={indexDate}
                              fulfillAppointment={ this.fulfillAppointment }
                              cancelAppointment={this.cancelAppointment}
                            />
                          */}
                            <AppointmentCase
                              appointment={appointment}
                              index={index}
                              indexdate={indexDate}
                              fulfillAppointment={ this.fulfillAppointment }
                              cancelAppointment={this.cancelAppointment}
                            />
                          </div>
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
