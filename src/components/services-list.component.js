import React, { Component } from "react";
import ServiceDataService from "../services/service.service";
import Button from 'react-bootstrap/Button';

export default class ServicesList extends Component {
  constructor(props) {
    super(props);
    this.retrieveServices = this.retrieveServices.bind(this);

    this.state = {
      services: [],
    };

  }

  componentDidMount() {
    this.retrieveServices();
  }

  retrieveServices() {

    ServiceDataService.getAll({})
      .then((response) => {
        const { data } = response.data;

        // console.log(data);
        // console.log(response.data.data);

        this.setState({
          services: data
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {

    const {
      services,
    } = this.state;

    return (

          <div className="row">
            <div className="col-12" style={{ marginTop: '10px'}}>

              { services && services.map((service, index) => {

                return <div className="row"  key={index} style={{ marginTop: '10px' }}>
                        <div className="col-12">
                          <div className="card">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-12">
                                  <p>Servicio: {service.name}</p>
                                  <p>IVA: {service.iva}</p>
                                  <p>Coste: {service.cost}</p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12">
                                  <Button variant="secondary" href={"/services/" + service.id}>Modificar</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                       </div>
                }

              )}
            </div>
          </div>

    );
  }
}