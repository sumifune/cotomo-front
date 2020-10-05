import React, { Component } from "react";
import ServiceDataService from "../services/service.service";

export default class AddService extends Component {
  constructor(props) {
    super(props);
    this.onChangeIVA = this.onChangeIVA.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.createService = this.createService.bind(this);
    this.newService = this.newService.bind(this);

    this.state = {
      name: "",
      iva: 0,
      submitted: false,
    };
  }

  onChangeIVA(e) {
    this.setState({
      iva: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  createService() {
    var data = {
      iva: this.state.iva,
      name: this.state.name
    };

    ServiceDataService.create(data)
      .then((response) => {
        this.setState({
          submitted: true
        });
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newService() {
    this.setState({
      name: "",
      iva: 0,
      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Servicio añadido correctamente!</h4>
            <button className="btn btn-success" onClick={this.newService}>
              Nuevo
            </button>
          </div>
        ) : (
          <div>

            <div className="form-group">
              <label htmlFor="title">Service</label>
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
              <label htmlFor="iva">IVA</label>
              <input
                type="text"
                className="form-control"
                id="iva"
                required
                value={this.state.iva}
                onChange={this.onChangeIVA}
                name="iva"
              />
            </div>


            <button style={{marginBottom: "25px"}} onClick={this.createService} className="btn btn-secondary">
              Añadir
            </button>
          </div>
        )}
      </div>
    );
  }
}
