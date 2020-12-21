import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// import AddPatient from "./components/add-patient.component";
import AddPatient from "./components/add-patient.component.2";

import Patient from "./components/patient.component";
import PatientsList from "./components/patients-list.component";
import AppointmentsList from "./components/appointments-list.component";
import AddAppointment from "./components/add-appointment.component";
// import Appointment from "./components/appointment.component";
import AppointmentsListByPatient from "./components/appointments-list-by-patient.component";
// dsfsdf
import InvoicesList from "./components/invoices-list.component";
import InvoicesListPsico from "./components/invoices-list-psico.component";


import AddInvoice from "./components/add-invoice.component";
import AddInvoicePsico from "./components/add-invoice.psico.component";


// import InvoicesListByPatient from "./components/invoices-list-by-patient.component";
// import InvoicesListByPatientPsico from "./components/invoices-list-by-patient-psico.component";

import InvoicePDF from "./components/invoice-pdf.component";
import InvoicePDFMobile from "./components/invoice-pdf-mobile.component";

import InvoicePDFPsico from "./components/invoice-pdf-psico.component";
import InvoicePDFPsicoMobile from "./components/invoice-pdf-psico-mobile.component";


// import InvoicePDF from "./components/invoice-pdf-functional.component";
import ObservationsList from "./components/observations-list-by-patient.component";
import AddObservation from "./components/add-observation.component";

import ServicesList from "./components/services-list.component";
import AddService from "./components/add-service.component";
import Service from "./components/service.component";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

class App extends Component {
  render() {
    return <>
          <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="/patients">Otomo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/appointments">Citas</Nav.Link>
                <NavDropdown alignRight title="Pacientes" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/patients">Buscar</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/add">Nuevo</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown alignRight title="Facturas" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/invoices">Facturas Acupuntura</NavDropdown.Item>
                  <NavDropdown.Item href="/invoicespsico">Facturas Psicología</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/services">Servicios</NavDropdown.Item>
                  <NavDropdown.Item href="/addservice">Nuevo Servicio</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="container">
            <Router>
              <Switch>
                <Route
                  exact
                  path={["/", "/appointments"]}
                  component={AppointmentsList}
                />
                <Route
                  exact
                  path={["/", "/appointments/after/:selected"]}
                  component={AppointmentsList}
                />
                <Route exact path="/addappointment/:id" component={AddAppointment} />
                {/*<Route path="/appointments/:id" component={Appointment} />*/}
                <Route path="/appointments/patient/:id" component={AppointmentsListByPatient} />
                <Route
                  exact
                  path={["/", "/patients"]}
                  component={PatientsList}
                />
                <Route
                  exact
                  path={["/", "/patients/appoint/:id"]}
                  component={PatientsList}
                />
                <Route exact path="/add" component={AddPatient} />
                <Route exact path="/patients/:id" component={Patient} />
                <Route exact path="/patients/:id/obs" component={ObservationsList} />
                <Route path="/patients/:id/obs/new" component={AddObservation} />

                <Route
                  exact
                  path={["/", "/invoicespsico"]}
                  component={InvoicesListPsico}
                />
                <Route exact path="/addinvoicepsico/:id" component={AddInvoicePsico} />
                {/*<Route path="/invoicespsico/patient/:id" component={InvoicesListByPatientPsico} />*/}
                <Route exact path="/invoicespsicomobile/pdf/:id" component={InvoicePDFPsicoMobile} />
                <Route exact path="/invoicespsico/pdf/:id" component={InvoicePDFPsico} />

                <Route
                  exact
                  path={["/", "/invoices"]}
                  component={InvoicesList}
                />
                <Route exact path="/addinvoice/:id" component={AddInvoice} />
                {/*<Route path="/invoices/patient/:id" component={InvoicesListByPatient} />*/}
                <Route path="/invoicesmobile/pdf/:id" component={InvoicePDFMobile} />
                <Route path="/invoices/pdf/:id" component={InvoicePDF} />

                <Route
                  exact
                  path={["/", "/services"]}
                  component={ServicesList}
                />
                <Route exact path="/addservice" component={AddService} />
                <Route exact path="/services/:id" component={Service} />
                {/*
                */}
              </Switch>
            </Router>
          </div>
        </>
  }
}

export default App;
