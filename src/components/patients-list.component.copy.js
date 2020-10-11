import React, { Component } from "react";
import PatientDataService from "../services/patient.service";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import './patients-list.component.css';

export default class PatientsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchSurname = this.onChangeSearchSurname.bind(this);
    this.retrievePatients = this.retrievePatients.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);

    this.state = {
      patients: [],
      searchSurname: "",

      page: 1,
      count: 0,
      pageSize: 3,
    };

    this.pageSizes = [3, 6, 9];
  }

  componentDidMount() {
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
      console.log('enter press here! ');
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

  render() {

    const {
      searchSurname,
      patients,
      page,
      count,
      pageSize,
    } = this.state;

    return (
      <div className="list row">
        <div className="col-md-12">
          <div className="input-group mb-3">
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
        <div className="col-md-12">

          <div id="accordion">

            { patients && patients.map((patient, index) => (

              <div className="card" key={index}>
                <div className="card-header"
                     id={`heading${index}`}>

                  <div className="row">
                    <div className="col-9">
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
                    <div className="col-3">
                      <div className="btn-group" role="group">
                        <button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Dropdown
                        </button>
                        <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                          <a className="dropdown-item" href="/add/">Dropdown link</a>
                          <a className="dropdown-item" href="/add/">Dropdown link</a>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div id={`collapse${index}`}
                     className={"collapse" + (patient.expanded ? " show" : "")}
                     aria-labelledby={`heading${index}`}
                     data-parent="#accordion">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-9">
                        <p>{patient.address} - &nbsp; {patient.city}</p>
                        <p>DNI: {patient.dni} - &nbsp; Tel: {patient.phone}</p>
                        <p>{patient.email}</p>
                        <p>Notas: {patient.description}</p>
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
                      <div className="col-3">
                        <Link
                          type="button"
                          to={"/patients/" + patient.id}
                          className="btn btn-secondary"
                        >
                          Editar
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            ))}

          </div>
        </div>
        <div className="col-md-12">
          <div className="paging">
            <div>
              {"Refs por página: "}
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
      </div>
    );
  }
}