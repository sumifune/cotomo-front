import React, { Component } from "react";
import PatientDataService from "../services/patient.service";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import './patients-list.component.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import AppointmentDataService from "../services/appointment.service";
import MediaQuery from 'react-responsive';
import Image from 'react-bootstrap/Image';
import moment from "moment";



export default class PatientsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchSurname = this.onChangeSearchSurname.bind(this);
    this.retrievePatients = this.retrievePatients.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.makeAppointment = this.makeAppointment.bind(this);

    this.state = {
      patients: [],
      searchSurname: "",

      page: 1,
      count: 0,
      pageSize: 9,
    };

    this.pageSizes = [3, 6, 9];
  }

  componentDidMount() {
    // console.log(this.props.match.params.id);
    this.retrievePatients();
  }

  onChangeSearchSurname(e) {
    const searchSurname = e.target.value;

    this.setState({
      searchSurname: searchSurname,
    });
  }

  getRequestParams(searchSurname, page, pageSize) {
    let params = {};

    if (searchSurname) {
      params["surname"] = searchSurname;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  }

  retrievePatients() {
    const { searchSurname, page, pageSize } = this.state;
    const params = this.getRequestParams(searchSurname, page, pageSize);

    PatientDataService.getAll(params)
      .then((response) => {
        const { patients, totalPages } = response.data;

        this.setState({
          patients: patients,
          count: totalPages,
        });
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
      },
      () => {
        this.retrievePatients();
      }
    );
  }

  handlePageSizeChange(event) {
    this.setState(
      {
        pageSize: event.target.value,
        page: 1
      },
      () => {
        this.retrievePatients();
      }
    );
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      // console.log('enter press here! ');
      this.retrievePatients();
    }
  }

  toggleMenu(event){
    // console.log(event.target.getAttribute('inx'));
    // 1. Make a shallow copy of the items
    let patients = [...this.state.patients];
    // 2. Make a shallow copy of the item you want to mutate
    let patient = {...patients[event.target.getAttribute('inx')]};
    // console.log(patient);
    // 3. Replace the property you're intested in
    patient.expanded = !!!patient.expanded;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    patients[event.target.getAttribute('inx')] = patient;
    // 5. Set the state to our new copy
    this.setState({patients});
  }

  makeAppointment(e){
    console.log(this.props.match.params.id);

    console.log(this.props.history.push('/appointments/'));
    console.log('--------------------------------------------------');
    var res = this.props.match.params.id.split("_");
    console.log(res);
    console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
    console.log(e.target.getAttribute('patientid'));
  }

  addAppointment(e) {

    let hour_date_selectedDate = this.props.match.params.id.split("_");

    var data = {
      madeBy: e.target.getAttribute('patientid'),
      hour: hour_date_selectedDate[0],
      date: hour_date_selectedDate[1],
      service: e.target.getAttribute('serviceid'),
      estate: "pending",
    };

    AppointmentDataService.create(data)
      .then((response) => {

        this.props.history.push('/appointments/after/' + hour_date_selectedDate[2])
        // console.log(response.data);
        // this.setState(state => {
        //   const appointments = state.appointments.concat(response.data);

        //   return {
        //     appointments,
        //   };

        // });
      })
      .catch((e) => {
        console.log(e);
      });

  }

  render() {

    // const isMobile = useMediaQuery({
    //   query: '(max-width: 760px)'
    // });

    const {
      searchSurname,
      patients,
      page,
      count,
      pageSize,
    } = this.state;

    return (
      <>
      <div className="row">
        <div className="col-12 style={{ boxSizing: 'border-box' }}">
          <div className="input-group mb-3" style={{ marginTop: '10px' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por apellido"
              value={searchSurname}
              onChange={this.onChangeSearchSurname}
              onKeyPress={this.handleKeyPress}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.retrievePatients}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">

          <div id="accordion">

            { patients && patients.map((patient, index) => (


              <div className="card" key={index}>
                <div className="card-header"
                     id={`heading${index}`}>

                  <div className="row">
                    <div className="col-8 col-md-9" style={{ paddingLeft: '0px'}}>
                      <h5 className="mb-0">
                        <button className={"btn btn-link" + (patient.expanded ? "" : " collapsed")}
                                data-toggle="collapse"
                                data-target={`#collapse${index}`}
                                aria-expanded={(patient.expanded ? "true" : "false")}
                                aria-controls={`collapse${index}`}
                                inx={index}
                                onClick={ this.toggleMenu }
                                >
                          {patient.surname},&nbsp; {patient.name}
                        </button>
                      </h5>
                    </div>
                    <div className="col-4 col-md-3">

                      { this.props.match.params.id ?
                        <Dropdown as={ButtonGroup}>
                          <Button variant="secondary" patientid={patient.id} serviceid="Acupuntura" onClick={this.addAppointment}>
                            <MediaQuery minDeviceWidth={760}>
                              {(matches) =>
                                matches
                                  ? 'Acupuntura'
                                  : 'Acu'
                              }
                            </MediaQuery>
                          </Button>
                          <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />

                          <Dropdown.Menu>
                            <Dropdown.Item patientid={patient.id} serviceid="Psicología" onClick={this.addAppointment}>Psicología</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        :
                        <Dropdown as={ButtonGroup}>
                          <Button variant="secondary" href={"/addappointment/" + patient.id}>Citar</Button>

                          <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />

                          <Dropdown.Menu>
                            <Dropdown.Item href={"/appointments/patient/" + patient.id}>Citas</Dropdown.Item>
                            <Dropdown.Item href={"/patients/" + patient.id + "/obs"}>Historia</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href={"/addinvoice/" + patient.id}>Nueva factura</Dropdown.Item>
                            <Dropdown.Item href={"/invoices/patient/" + patient.id}>Facturas</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href={"/patients/" + patient.id}>Editar</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>

                      }
                      {/* comment */}
                    </div>
                  </div>

                </div>
                <div id={`collapse${index}`}
                     className={"collapse" + (patient.expanded ? " show" : "")}
                     aria-labelledby={`heading${index}`}
                     data-parent="#accordion">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-8 col-sm-10">
                        <p>{patient.address}</p>
                        <p>{patient.city}</p>
                        <p>DNI: {patient.dni}</p>
                        <p>Tel: {patient.phone}</p>
                        <p>{patient.email}</p>

                        <p className="badgePatient">
                          {patient.active ? (
                            <span className="badge badge-primary">
                              Activo
                            </span>
                          ):(
                            <span className="badge badge-danger">
                              Inactivo
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="col-4 col-sm-2">
                        <Link
                          type="button"
                          to={"/patients/" + patient.id}
                          className="btn btn-secondary"
                        >
                          Editar
                        </Link>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-12">
                        <p>Notas: {patient.description}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-12">
                        <p>Registrado: {moment(patient.createdAt).format("DD-MM-YYYY hh:mm:ss")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            ))}

          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="paging">
            <div>
              <span className="selectText">{"Refs por página: "}</span>
              <select onChange={this.handlePageSizeChange} value={pageSize}>
                {this.pageSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="bbb">
                <Pagination
                  className="my-3"
                  count={count}
                  page={page}
                  siblingCount={1}
                  boundaryCount={1}
                  variant="outlined"
                  shape="rounded"
                  onChange={this.handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <Image src="https://github.com/sumifune/cotomo-front/workflows/Node.js%20CI/badge.svg" rounded />
        </div>
      </div>
      </>
    );
  }
}