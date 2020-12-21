import React, { Component } from "react";
import InvoicePsicoDataService from "../services/invoice.psicologia.service";
import moment from "moment";
import 'moment/locale/es';
import Card from 'react-bootstrap/Card';
import SearchModal from "./search-modal-invoices.component";

moment.locale("es");

export default class InvoicesListByPatient extends Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.retrieveInvoices = this.retrieveInvoices.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.cancelInvoice = this.cancelInvoice.bind(this);
    this.payInvoice = this.payInvoice.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleState = this.handleState.bind(this);

    this.state = {
      id: this.props.match.params.id,
      // selectedDate: moment("01-01-2020", "DD-MM-YYYY"),
      filter: "emitted",
      selectedDate: moment(),
      invoices: [],
      concept: "Acupuntura",
      show: false
    };
  }

  componentDidMount() {
    // console.log(moment("01-01-2020", "DD-MM-YYYY").format('DD-MM-YYYY'));
    this.retrieveInvoices();
  }
  componentDidUpdate(prevProps, prevState) {
    // https://medium.com/better-programming/when-to-use-callback-function-of-setstate-in-react-37fff67e5a6c
    // if (this.state.currentMonth !== prevState.currentMonth) {
    //   this.props.getCalendarData(this.state.currentMonth);
    // }
  }
  retrieveInvoices() {
    const { id } = this.state;

    InvoicePsicoDataService.findByPatientId(id)
      .then((response) => {
        // console.log(response);
        const { invoices } = response.data;

        this.setState({
          invoices: invoices,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleDateChange(date) {
    // console.log(date);
    this.setState({
      selectedDate: date,
    }, () => {
     this.retrieveInvoices()
    })
  }

  cancelInvoice(e) {

  	const id = e.target.getAttribute('aid');
  	const arrIndx = e.target.getAttribute('arrindx');

    const data = {
      estate: "cancelled",
    };

    InvoicePsicoDataService.update(id, data)
      .then((response) => {

        // console.log(response.data);
        this.setState(state => {

        	// console.log(response.data);
			    // 1. Make a shallow copy of the items
			    let invoices = [...state.invoices];
			    // 2. Make a shallow copy of the item you want to mutate
			    // let item = {...invoices[arrIndx]};
			    // 3. Replace the property you're intested in
			    // item.name = 'newName';
			    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
			    invoices[arrIndx] = response.data;

        	// sustituir el appo. por el que llega del backend en vez de concat
          // const invoices = state.invoices.concat(response.data);

          return {
            invoices,
          };

        });
      })
      .catch((e) => {
        console.log(e);
      });

  }

  payInvoice(e) {

    const id = e.target.getAttribute('aid');
    const arrIndx = e.target.getAttribute('arrindx');

    const data = {
      estate: "payed",
    };

    InvoicePsicoDataService.update(id, data)
      .then((response) => {

        // console.log(response.data);
        this.setState(state => {

          let invoices = [...state.invoices];
          invoices[arrIndx] = response.data;

          return {
            invoices,
          };

        });
      })
      .catch((e) => {
        console.log(e);
      });

  }
  setFilter(e) {
    // console.log(e.target.getAttribute('filter'));
    this.setState({
      filter: e.target.getAttribute('filter'),
    });
  }

  handleState(filter) {
    // console.log(filter);
    this.setState({
      show: false,
      filter: filter,
    });
  }
  handleCloseModal() {
    this.setState({
      show: false,
    });
  }

  handleShowModal() {
    this.setState({
      show: true,
    });
  }

  render() {

    const {
      invoices,
      filter,
      show,
    } = this.state;

    return (
      <>
      <div className="row" style={{ marginTop: '10px'}}>
        <div className="col-md-12">
          { invoices && invoices.filter(invoice => filter === 'all' ? true : invoice.estate === filter).map((invoice, index) => {

            return <Card style={{ marginBottom: '10px'/*width: '18rem'*/ }} key={index}>
              <Card.Body>
                <Card.Title>{invoice.concept}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                	{moment(invoice.date).format("DD-MM-YYYY")}
                	</Card.Subtitle>
                <Card.Text>
                	{/*{this.props.match.params.id}*/}
                	{invoice.emittedTo.name}&nbsp;{invoice.emittedTo.surname}<br/>
                	<small>creada {moment(invoice.createdAt).fromNow()}</small><br/>
                </Card.Text>
                { invoice.estate === "emitted" ? <div>
                <Card.Link href="#" aid={invoice.id} arrindx={index} onClick={this.cancelInvoice}>Cancelar</Card.Link>
                <Card.Link href="#" aid={invoice.id} arrindx={index} onClick={this.payInvoice}>Pagar</Card.Link>
                </div>
                : invoice.estate === "payed" ? <span className="badge badge-success">Pagada</span> :
                <span className="badge badge-warning">Cancelada</span>
                }
              </Card.Body>
            </Card>

            }
          )}
          <p>&nbsp;</p>
        </div>
      </div>
      <div className="row">
        <div style={{ /*width: '18rem'*/ }} className="col-12">
          <div className="d-flex justify-content-center">
            <SearchModal show={show} handleClose={this.handleCloseModal} handleShow={this.handleShowModal} handleState={this.handleState}/>
          </div>
          <p>&nbsp;</p>
        </div>
      </div>
      </>
    );
  }
}
