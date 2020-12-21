import React, { Component } from "react";
import PatientDataService from "../services/patient.service";
import './patient.component.css';
import './add-patient.component.css';

import SignaturePad from 'react-signature-canvas';
import moment from "moment";
import 'moment/locale/es';
moment.locale("es");

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
    this.onChangeTutor1 = this.onChangeTutor1.bind(this);
    this.onChangeTutor2 = this.onChangeTutor2.bind(this);
    this.onChangeNIFTutor1 = this.onChangeNIFTutor1.bind(this);
    this.onChangeNIFTutor2 = this.onChangeNIFTutor2.bind(this);


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
        tutor1: "",
        tutor2: "",
        niftutor1: "",
        niftutor2: "",
        pddate: "",
        pdok: false
      },
      message: "",
    };
    this.sigPad = {};
  }

  componentDidMount() {
    this.getPatient(this.props.match.params.id);
  }

  hanglePDOK(){
    this.setState(function (prevState) {
      const pdflag = !!prevState.currentPatient.name &&
                     !!prevState.currentPatient.surname &&
                     !!prevState.currentPatient.address &&
                     !!prevState.currentPatient.city &&
                     !!prevState.currentPatient.dni &&
                     !!prevState.currentPatient.phone &&
                     !!prevState.currentPatient.signature;
      // console.log("---->>>>" + pdflag);
      return {
        currentPatient: {
          ...prevState.currentPatient,
          pdok: pdflag
        },
      };
    });
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
    }, () => {
      this.hanglePDOK();
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
    }, () => {
      this.hanglePDOK();
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
    }, () => {
      this.hanglePDOK();
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
    }, () => {
      this.hanglePDOK();
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
    }, () => {
      this.hanglePDOK();
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
    }, () => {
      this.hanglePDOK();
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

  // onChangeTutor1(e) {
  //   const tutor1 = e.target.value;

  //   this.setState(function (prevState) {
  //     return {
  //       currentPatient: {
  //         ...prevState.currentPatient,
  //         tutor1: tutor1,
  //       },
  //     };
  //   });
  // }

  onChangeTutor1(e) {
    const tutor1 = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPatient: {
          ...prevState.currentPatient,
          tutor1: tutor1,
        },
      };
    });
  }

  onChangeTutor2(e) {
    const tutor2 = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPatient: {
          ...prevState.currentPatient,
          tutor2: tutor2,
        },
      };
    });
  }

  onChangeNIFTutor1(e) {
    const niftutor1 = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPatient: {
          ...prevState.currentPatient,
          niftutor1: niftutor1,
        },
      };
    });
  }

  onChangeNIFTutor2(e) {
    const niftutor2 = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPatient: {
          ...prevState.currentPatient,
          niftutor2: niftutor2,
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
        console.log(response.data);
        console.log(moment().format());
        console.log(moment(moment().format()).format('MMMM'));

        this.setState({
          currentPatient: {
            ...response.data,
            tutor1: response.data.tutor1 || "",
            tutor2: response.data.tutor2 || "",
            niftutor1: response.data.niftutor1 || "",
            niftutor2: response.data.niftutor2 || "",
          },
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
      active: this.state.currentPatient.status,
      signature: this.state.currentPatient.signature,
      tutor1: this.state.currentPatient.tutor1,
      tutor2: this.state.currentPatient.tutor2,
      niftutor1: this.state.currentPatient.niftutor1,
      niftutor2: this.state.currentPatient.niftutor2,
      pddate: this.state.currentPatient.pddate,
      pdok: this.state.currentPatient.pdok
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

  updatePatient(e) {
    e.preventDefault();
    PatientDataService.update(
      this.state.currentPatient.id,
      this.state.currentPatient
    )
      .then((response) => {
        console.log(response.data);
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

  clear = (e) => {
    e.preventDefault();
    this.sigPad.clear();
    // this.setState({signature: null});
    this.setState(prevState => ({
        currentPatient: {                   // object that we want to update
            ...prevState.currentPatient,    // keep all other key-value pairs
            signature: null      // update the value of specific key
        }
    }));
  }
  trim = (e) => {
    e.preventDefault();

    this.setState(function (prevState) {
      return {
        currentPatient: {
          ...prevState.currentPatient,
          signature: this.sigPad.getTrimmedCanvas().toDataURL('image/png'),
          pddate: moment().format()
        },
      };
    }, () => {
      this.hanglePDOK();
    });

  }

  render() {
    const { currentPatient } = this.state;

    return (
      <div className="row">
      <div className="col-12" style={{ marginTop: '10px'}}>
      {currentPatient.pddate}
      <form autoComplete="off">
        {currentPatient ? (
          <div>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={currentPatient.name}
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
                value={currentPatient.surname}
                onChange={this.onChangeSurname}
                name="surname"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Teléfono</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                required
                value={currentPatient.phone}
                onChange={this.onChangePhone}
                name="phone"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                className="form-control"
                id="address"
                required
                value={currentPatient.address}
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
                value={currentPatient.city}
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
                value={currentPatient.dni}
                onChange={this.onChangeDni}
                name="dni"
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
                value={currentPatient.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tutor1">Tutor 1</label>
              <input
                type="text"
                className="form-control"
                id="tutor1"
                value={currentPatient.tutor1}
                onChange={this.onChangeTutor1}
                name="tutor1"
                autoComplete="nope"
              />
            </div>
            <div className="form-group">
              <label htmlFor="niftutor1">NIF Tutor 1</label>
              <input
                type="text"
                className="form-control"
                id="niftutor1"
                value={currentPatient.niftutor1 || ""}
                onChange={this.onChangeNIFTutor1}
                name="niftutor1"
                autoComplete="nope"
              />
            </div>
            <div className="form-group">
              <label htmlFor="tutor2">Tutor 2</label>
              <input
                type="text"
                className="form-control"
                id="tutor2"
                value={currentPatient.tutor2 || ""}
                onChange={this.onChangeTutor2}
                name="tutor2"
                autoComplete="nope"
              />
            </div>
            <div className="form-group">
              <label htmlFor="niftutor2">NIF Tutor 2</label>
              <input
                type="text"
                className="form-control"
                id="niftutor2"
                value={currentPatient.niftutor2 || ""}
                onChange={this.onChangeNIFTutor2}
                name="niftutor2"
                autoComplete="nope"
              />
            </div>


            <div className='row' style={{marginTop: '100px'}}>
              <div className="col">
                <p>En base a la presente clausula HASHIME OTOMO HIDALGO (CENTRO OTOMO) solicita su consentimiento a:</p>
              </div>
            </div>

            <div className='row'>
              <div className="col-8">
                TUTOR: {currentPatient.tutor1}
              </div>
              <div className="col-4">
                NIF: {currentPatient.niftutor1}
              </div>
            </div>
            <div className='row'>
              <div className="col-8">
                TUTOR: {currentPatient.tutor2}
              </div>
              <div className="col-4">
                NIF: {currentPatient.niftutor2}
              </div>
            </div>
            <div className='row'>
              <div className="col-8">
                PACIENTE: {currentPatient.name} {currentPatient.surname}
              </div>
              <div className="col-4">
                NIF: {currentPatient.dni}
              </div>
            </div>

            <div className='row' style={{marginTop: '40px'}}>
              <div className='col'>

                <p>Para el tratamient de sus datos personales según lo dispuesto en los artículos 6 y 9
                 del Reglamento (UE) 2016/679 informándole que el tratamiento de sus datos tiene su base
                  en la prestación de servicios sanitarios (Centro Otomo)
                </p>
                <p>En cumplimiento del artículo 13 del Reglamento Europeo de Protección de Datos, he sido
                informado/a de que mis datos personales pasarán a formar parte del sistema de tratamiento
                 PACIENTES.
                </p>
                <p>La finalidad del tratamiento es la “gestión de los datos de los pacientes y de su historia
                 clínica y de las tareas administrativas derivadas de la prestación asistencial”
                </p>
                <p>Sus datos podrán ser cedidos a entidades sanitarias por imperativo legal y la documentación
                 clínica será conservada durante el tiempo necesario para prestar la debida asistencia al paciente
                  y, como mínimo, cinco años contados desde la fecha del alta del proceso asistencial.
                </p>
                <p>Podrá ejercitar los derechos de OPOSICIÓN, ACCESO, RECTIFICACIÓN, LIMITACIÓN DEL TRATAMIENTO,
                 SUPRESIÓN Y PORTABILIDAD mediante escrito dirigido a HASHIME OTOMO HIDALGO (CENTRO OTOMO).
                 RUA CASTELAO 13-15 BAJO 2 27001-LUGO acompañando fotocopia de DNI o en su defecto documento que
                  acredite su debida identidad o bien con carácter previo a tal actuación solicitar con las mismas
                   señas que le sean remitidos los impresos que el responsable del fichero dispone a tal efecto.
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col' style={{marginBottom: '40px'}}>
                <p>
                  En LUGO a {moment(currentPatient.pddate).format('D')} de {moment(currentPatient.pddate).format('MMMM')} de 2020
                </p>
              </div>
            </div>

            <div className='row suplemtext'>
              <div className='col'>
              Firmado Paciente/Padre/Madre/Tutor
              </div>
            </div>



            <div className="sigContainer">
              <SignaturePad
                canvasProps={{className: 'sigPad'}}
                ref={(ref) => { this.sigPad = ref }}
              />
            </div>
            <div className='row buttons-margin'>
              <div className="col">
                <button className="buttons" onClick={this.clear}>
                  Reset
                </button>
              </div>
              <div className="col">
                <button className="buttons" onClick={this.trim}>
                  Capturar
                </button>
              </div>
            </div>
            <div className='row'>
              <div className="col text-center">
                {this.state.trimmedDataURL
                  ? <img className="sigImage"
                    src={this.state.trimmedDataURL} alt='manolito'/>
                  : null}
              </div>
            </div>
            <div className='row'>
              <div className="col text-center">
                {this.state.currentPatient.signature
                  ? <img className="sigImage"
                    src={this.state.currentPatient.signature} alt='manolito'/>
                  : null}
              </div>
            </div>
            <div className="form-group">
              <label>
                <strong>Estado:</strong>
              </label>
              {currentPatient.active ? "Active" : "Inactive"}
            </div>
            <div className="form-group">
              <label>
                <strong>Protección de datos:</strong>
              </label>
              {currentPatient.pdok ? "OK" : "NO"}
            </div>

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
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Patient...</p>
          </div>
        )}
      </form>
      </div>
      </div>
    );
  }
}
