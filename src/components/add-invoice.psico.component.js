import React, { Component } from "react";
import InvoicePsicoDataService from "../services/invoice.psicologia.service";
import ServiceDataService from "../services/service.service";
import Form from 'react-bootstrap/Form';

export default class AddVoice extends Component {
  constructor(props) {
    super(props);
    this.onChangeConcept = this.onChangeConcept.bind(this);
    this.onChangeSessions = this.onChangeSessions.bind(this);
    this.saveInvoice = this.saveInvoice.bind(this);
    this.newInvoice = this.newInvoice.bind(this);

    this.state = {
      id: null,
      emittedTo: this.props.match.params.id,
      concept: "",
      sessions: 1,
      services: [],
      submitted: false,
    };
  }
  componentDidMount() {
    this.retrieveServices();
  }
  retrieveServices() {

    ServiceDataService.getAllActivity({ activity: "Psicología" })
      .then((response) => {
        // console.log(response);
        const { data } = response.data;

        // console.log(data);
        if (data.length === 0) {
          this.setState({
            services: [],
          });
        } else {
          console.log(data[0].id);
          this.setState({
            services: data,
            concept: data[0].id
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  onChangeConcept(e) {
    // const id = e.target.getAttribute('aid');
    // console.log(id);

    // console.log(e.target);
    // console.log(e.target.options[e.target.selectedIndex].dataset.serviceid);
    console.log(e.target.options[e.target.selectedIndex].getAttribute('serviceid'));


    this.setState({
      concept: e.target.options[e.target.selectedIndex].getAttribute('serviceid'),
    });
  }
  onChangeSessions(e) {
    console.log(e.target.value)
    this.setState({
      sessions: e.target.value,
    });
  }
  saveInvoice() {
    var data = {
      emittedTo: this.state.emittedTo,
      concept: this.state.concept,
      sessions: this.state.sessions
    };


    console.log(data);
    InvoicePsicoDataService.create(data)
      .then((response) => {
        this.setState({
          submitted: true,
        });
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newInvoice() {
    this.setState((prevState) => ({
      id: null,
      emittedTo: this.props.match.params.id,
      counter: prevState.counter,
      sessions: 1,
      submitted: false,
    }));
  }

  render() {

    const { services, sessions } = this.state;


    return (
      <div className="row">
        <div className="col-12" style={{ marginTop: '10px'}}>
          <div className="submit-form">
            {this.state.submitted ? (
              <div>
                <h4>Factura creada correctamente!</h4>
                <button className="btn btn-success" onClick={this.newInvoice}>
                  Nueva
                </button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  {services.length === 0 ? <h4>No hay servicios para esta actividad</h4> : ""}
                  <Form>
                    <Form.Group controlId="exampleForm.ControlSelect2">
                      <Form.Label>Concepto</Form.Label>
                      <Form.Control as="select" onChange={this.onChangeConcept}>

                        { services && services.map((service, index) => {

                          return <option key={index} serviceid={service.id} >{service.name}</option>

                          }
                        )}

                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1" onChange={this.onChangeSessions}>
                      <Form.Label>Sesiones</Form.Label>
                      <Form.Control type="text" defaultValue={sessions}/>
                    </Form.Group>
                  </Form>
                </div>
                <button style={{marginBottom: "25px"}} onClick={this.saveInvoice} className="btn btn-secondary">
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
