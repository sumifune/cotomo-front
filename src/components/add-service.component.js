import React, { Component } from "react";
import ServiceDataService from "../services/service.service";

export default class AddService extends Component {
  constructor(props) {
    super(props);
    this.onChangeIVA = this.onChangeIVA.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeActivity = this.onChangeActivity.bind(this);
    this.createService = this.createService.bind(this);
    this.newService = this.newService.bind(this);
    this.onChangeCost = this.onChangeCost.bind(this);

    this.state = {
      name: "",
      iva: 0,
      cost: 0,
      submitted: false,
      activity: ""
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

  onChangeCost(e) {
    this.setState({
      cost: e.target.value,
    });
  }

  onChangeActivity(e) {
    this.setState({
      activity: e.target.value,
    });
  }

  createService() {
    var data = {
      iva: this.state.iva,
      name: this.state.name,
      cost: this.state.cost,
      activity: this.state.activity
    };

    ServiceDataService.create(data)
      .then((response) => {
        this.setState({
          submitted: true
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newService() {
    this.setState({
      name: "",
      iva: 0,
      cost: 0,
      submitted: false,
      activity: "",
    });
  }

  render() {
    return (
      <div className="row">
      dff
        <div className="col-12" style={{ marginTop: '10px'}}>
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
                  <label htmlFor="name">Servicio</label>
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
                  <label htmlFor="activity">Actividad</label>
                  <input
                    type="text"
                    className="form-control"
                    id="activity"
                    required
                    value={this.state.activity}
                    onChange={this.onChangeActivity}
                    name="activity"
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

                <div className="form-group">
                  <label htmlFor="cost">Coste</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cost"
                    required
                    value={this.state.cost}
                    onChange={this.onChangeCost}
                    name="cost"
                  />
                </div>


                <button style={{marginBottom: "25px"}} onClick={this.createService} className="btn btn-secondary">
                  Añadir
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
