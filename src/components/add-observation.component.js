import React, { Component } from "react";
import PatientDataService from "../services/patient.service";
import { Redirect } from "react-router-dom";

export default class AddPatient extends Component {
  constructor(props) {
    super(props);
    this.onChangeNote = this.onChangeNote.bind(this);
    this.addObservation = this.addObservation.bind(this);

    this.state = {
      id: this.props.match.params.id,
      note: "",
      success: false
    };
  }

  onChangeNote(e) {
    this.setState({
      note: e.target.value,
    });
  }

  addObservation() {
    var data = {
      note: this.state.note
    };

    PatientDataService.addObservation(this.state.id, data)
      .then((response) => {
        this.setState({
          success: true
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return this.state.success ? <Redirect to={`/patients/${this.state.id}/obs`} /> : (
      <div className="submit-form">
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
              <label htmlFor="note">Note</label>
              <textarea
                type="text"
                className="form-control"
                id="note"
                required
                value={this.state.note}
                onChange={this.onChangeNote}
                name="note"
                rows="10"
              >
              </textarea>
            </div>

            <button style={{marginBottom: "25px"}} onClick={this.addObservation} className="btn btn-secondary">
              Guardar
            </button>
          </div>
        )}
      </div>
    );
  }
}
