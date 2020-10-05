import React, { Component } from "react";
import PatientDataService from "../services/patient.service";

export default class AddPatient extends Component {
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
    this.savePatient = this.savePatient.bind(this);
    this.newPatient = this.newPatient.bind(this);

    this.state = {
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

      submitted: false,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeSurname(e) {
    this.setState({
      surname: e.target.value,
    });
  }
  onChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }
  onChangeCity(e) {
    this.setState({
      city: e.target.value,
    });
  }
  onChangeDni(e) {
    this.setState({
      dni: e.target.value,
    });
  }
  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  savePatient() {
    var data = {
      name: this.state.name,
      surname: this.state.surname,
      address: this.state.address,
      city: this.state.city,
      dni: this.state.dni,
      phone: this.state.phone,
      email: this.state.email,
      description: this.state.description,
    };

    PatientDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          surname: response.data.surname,
          address: response.data.address,
          city: response.data.city,
          dni: response.data.dni,
          phone: response.data.phone,
          email: response.data.email,
          description: response.data.description,
          active: response.data.active,

          submitted: true,
        });
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newPatient() {
    this.setState({
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

      submitted: false,
    });
  }

  render() {
    return (
      <form autoComplete="off">
        {this.state.submitted ? (
          <div>
            <h4>Añadido correctamente!</h4>
            <button className="btn btn-success" onClick={this.newPatient}>
              Nuevo
            </button>
          </div>
        ) : (
          <div>

            <div className="form-group">
              <label htmlFor="title">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="surname">Apellidos</label>
              <input
                type="text"
                className="form-control"
                id="surname"
                required
                value={this.state.surname}
                onChange={this.onChangeSurname}
                name="surname"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                className="form-control"
                id="address"
                required
                value={this.state.address}
                onChange={this.onChangeAddress}
                name="address"
                autoComplete="nope"
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">Ciudad</label>
              <input
                type="text"
                className="form-control"
                id="city"
                required
                value={this.state.city}
                onChange={this.onChangeCity}
                name="city"
                autoComplete="nope"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dni">DNI</label>
              <input
                type="text"
                className="form-control"
                id="dni"
                required
                value={this.state.dni}
                onChange={this.onChangeDni}
                name="dni"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Teléfono</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                required
                value={this.state.phone}
                onChange={this.onChangePhone}
                name="phone"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
                autoComplete="nope"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button style={{marginBottom: "25px"}} onClick={this.savePatient} className="btn btn-secondary">
              Añadir
            </button>
          </div>
        )}
      </form>
    );
  }
}