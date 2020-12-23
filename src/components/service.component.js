import React, { Component } from "react";
import ServiceDataService from "../services/service.service";
import { Redirect } from "react-router-dom";

export default class AddService extends Component {
  constructor(props) {
    super(props);
    this.onChangeIVA = this.onChangeIVA.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCost = this.onChangeCost.bind(this);
    this.updateService = this.updateService.bind(this);

    this.state = {
      id: null,
      name: "",
      iva: 0,
      cost: 0,
      submitted: false,
    };
  }


  componentDidMount() {
    this.getService(this.props.match.params.id);
  }

  getService(id) {
    ServiceDataService.get(id)
      .then((response) => {
        // console.log(response.data);
        this.setState({
          id: response.data.id,
          name: response.data.name,
          iva: response.data.iva,
          cost: response.data.cost
        });
      })
      .catch((e) => {
        console.log(e);
      });
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

  updateService() {
    var data = {
      iva: this.state.iva,
      name: this.state.name,
      cost: this.state.cost
    };

    ServiceDataService.update(this.state.id,data)
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

  render() {
    return (
      <div className="row" style={{ marginTop: '10px'}}>
        <div className="col-12">
          <div className="submit-form">
            {this.state.submitted ? <Redirect to={`/services`} /> : (
              <div>

                <div className="form-group">
                  <label htmlFor="title">Servicio</label>
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

                <button style={{marginBottom: "25px"}} onClick={this.updateService} className="btn btn-secondary">
                  Actualizar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
