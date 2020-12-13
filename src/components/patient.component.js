import React, { Component } from "react";
import PatientDataService from "../services/patient.service";
import './patient.component.css';

export default class Patient extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeDni = this.onChangeDni.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);

    this.getPatient = this.getPatient.bind(this);
    this.updateActive = this.updateActive.bind(this);
    this.updatePatient = this.updatePatient.bind(this);
    this.deletePatient = this.deletePatient.bind(this);

    this.state = {
      currentPatient: {
        id: null,
        name: "",
        surname: "",
        address: "",
        city: "",
        dni: "",
        phone: "",
        email: "",
        description: "",
        active: false,
        signature: null,
        submitted: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getPatient(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPatient: {
          ...prevState.currentPatient,
          name: name,
        },
      };
    });
  }

  onChangeSurname(e) {
    const surname = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPatient: {
          ...prevState.currentPatient,
          surname: surname,
        },
      };
    });
  }

  onChangeAddress(e) {
    const address = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPatient: {
          ...prevState.currentPatient,
          address: address,
        },
      };
    });
  }

  onChangeCity(e) {
    const city = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPatient: {
          ...prevState.currentPatient,
          city: city,
        },
      };
    });
  }

  onChangeDni(e) {
    const dni = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPatient: {
          ...prevState.currentPatient,
          dni: dni,
        },
      };
    });
  }

  onChangePhone(e) {
    const phone = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPatient: {
          ...prevState.currentPatient,
          phone: phone,
        },
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPatient: {
          ...prevState.currentPatient,
          email: email,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentPatient: {
        ...prevState.currentPatient,
        description: description,
      },
    }));
  }

  getPatient(id) {
    PatientDataService.get(id)
      .then((response) => {
        // console.log(response.data.signature);
        this.setState({
          currentPatient: response.data,
        });
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateActive(status) {
    var data = {
      id: this.state.currentPatient.id,
      name: this.state.currentPatient.name,
      surname: this.state.currentPatient.surname,
      address: this.state.currentPatient.address,
      city: this.state.currentPatient.city,
      dni: this.state.currentPatient.dni,
      phone: this.state.currentPatient.phone,
      email: this.state.currentPatient.email,
      description: this.state.currentPatient.description,
      active: status,
    };

    PatientDataService.update(this.state.currentPatient.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentPatient: {
            ...prevState.currentPatient,
            active: status,
          },
        }));
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePatient() {
    PatientDataService.update(
      this.state.currentPatient.id,
      this.state.currentPatient
    )
      .then((response) => {
        // console.log(response.data);
        this.setState({
          message: "Paciente actualizado correctamente!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deletePatient() {
    PatientDataService.delete(this.state.currentPatient.id)
      .then((response) => {
        // console.log(response.data);
        this.props.history.push("/patients");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentPatient } = this.state;

    return (
      <div>
        {currentPatient ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentPatient.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="surname">Apellidos</label>
                <input
                  type="text"
                  className="form-control"
                  id="surname"
                  value={currentPatient.surname}
                  onChange={this.onChangeSurname}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Dirección</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={currentPatient.address}
                  onChange={this.onChangeAddress}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">Ciudad</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={currentPatient.city}
                  onChange={this.onChangeCity}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dni">DNI</label>
                <input
                  type="text"
                  className="form-control"
                  id="dni"
                  value={currentPatient.dni}
                  onChange={this.onChangeDni}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={currentPatient.phone}
                  onChange={this.onChangePhone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentPatient.email}
                  onChange={this.onChangeEmail}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentPatient.description}
                  onChange={this.onChangeDescription}
                />
              </div>


              <div className="form-group">
                <label>
                  <strong>Estado:</strong>
                </label>
                {currentPatient.active ? "Active" : "Inactive"}
              </div>
            </form>

            <div className="action-buttons">
              {currentPatient.active ? (
                <button
                  className="badge badge-primary mr-2"
                  onClick={() => this.updateActive(false)}
                >
                  Desactivar
                </button>
              ) : (
                <button
                  className="badge badge-primary mr-2"
                  onClick={() => this.updateActive(true)}
                >
                  Activar
                </button>
              )}

              <button
                className="badge badge-danger mr-2"
                onClick={this.deletePatient}
              >
                Eliminar
              </button>

              <button
                type="submit"
                className="badge badge-success"
                onClick={this.updatePatient}
              >
                Actualizar
              </button>
              <p>{this.state.message}</p>
            </div>
            <div className='row'>
              <div className="col text-center">
                {this.state.currentPatient.signature
                  ? <img className="sigImage"
                    src={this.state.currentPatient.signature} alt='manolito'/>
                  : null}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Patient...</p>
          </div>
        )}
      </div>
    );
  }
}
