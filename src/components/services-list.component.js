import React, { Component } from "react";
import ServiceDataService from "../services/service.service";
// import { Link } from "react-router-dom";
// import './patients-list.component.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
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

        console.log(data);
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
            <div className="col-12">

              { services && services.map((service, index) => {

                return <div className="row"  key={index}>
                        <div className="col-12">
                          <div className="card">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-8">
                                  <p>Servicio: {service.name}</p>
                                  <p>Servicio: {service.cost}</p>
                                  <p>IVA: {service.iva}</p>
                                </div>
                                <div className="col-4">
                                  <Dropdown as={ButtonGroup}>
                                    <Button variant="secondary" href={"/services/" + service.id}>Modificar</Button>

                                    <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />

                                    <Dropdown.Menu>
                                      <Dropdown.Item href={"/addservice"}>Nuevo</Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
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