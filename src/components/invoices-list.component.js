import React, { Component } from "react";
import InvoiceDataService from "../services/invoice.service";
// import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import './invoices-list.component.css';
// import Button from 'react-bootstrap/Button';
// import SearchModal from "./search.component";
import moment from "moment";
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'moment/locale/es';

import Dropdown from 'react-bootstrap/Dropdown';
// import SplitButton from 'react-bootstrap/SplitButton';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';

import DropdownButton from 'react-bootstrap/DropdownButton';



export default class InvoicesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchSurname = this.onChangeSearchSurname.bind(this);
    this.retrieveInvoices = this.retrieveInvoices.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.setDate1 = this.setDate1.bind(this);
    this.setDate2 = this.setDate2.bind(this);
    this.cancelInvoice = this.cancelInvoice.bind(this);
    this.payInvoice = this.payInvoice.bind(this);
    this.sayHi = this.sayHi.bind(this);


    this.state = {
      invoices: [],
      searchSurname: "",
      date1: moment().startOf('quarter'),
      date2: moment(),
      page: 1,
      count: 0,
      pageSize: 6,
    };

    this.pageSizes = [3, 6, 9];
  }

  componentDidMount() {
    this.retrieveInvoices();
  }

  onChangeSearchSurname(e) {
    const searchSurname = e.target.value;

    this.setState({
      searchSurname: searchSurname,
    });
  }

  getRequestParams(searchSurname, date1, date2, page, pageSize) {
    let params = {};

    if (searchSurname) {
      params["surname"] = searchSurname;
    }

    if (date1) {
      params["date1"] = date1;
    }

    if (date2) {
      params["date2"] = date2;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  }

  retrieveInvoices() {
    const { searchSurname, date1, date2, page, pageSize } = this.state;
    const params = this.getRequestParams(searchSurname, date1.format("DD-MM-YYYY"), date2.format("DD-MM-YYYY"), page, pageSize);

    // console.log(params);

    InvoiceDataService.getAll(params)
      .then((response) => {
        const { invoices, totalPages } = response.data;

        // console.log(invoices);
        this.setState({
          invoices: invoices,
          count: totalPages,
        });
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
      },
      () => {
        this.retrieveInvoices();
      }
    );
  }

  handlePageSizeChange(event) {
    this.setState(
      {
        pageSize: event.target.value,
        page: 1
      },
      () => {
        this.retrieveInvoices();
      }
    );
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      console.log('enter press here! ');
      this.retrieveInvoices();
    }
  }

  toggleMenu(event){
    // console.log(event.target.getAttribute('inx'));
    // 1. Make a shallow copy of the items
    let invoices = [...this.state.invoices];
    // 2. Make a shallow copy of the item you want to mutate
    let invoice = {...invoices[event.target.getAttribute('inx')]};
    // console.log(invoice);
    // 3. Replace the property you're intested in
    invoice.expanded = !!!invoice.expanded;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    invoices[event.target.getAttribute('inx')] = invoice;
    // 5. Set the state to our new copy
    this.setState({invoices});
  }

  setDate1(date) {
    this.setState(
      {
        date1: date,
        pageSize: 3,
        page: 1,
        count: 0
      },
      () => {
        this.retrieveInvoices();
      }
    );
  }

  setDate2(date) {
    this.setState(
      {
        date2: date,
        pageSize: 3,
        page: 1,
        count: 0
      },
      () => {
        this.retrieveInvoices();
      }
    );
  }

  cancelInvoice(e) {


    const id = e.target.getAttribute('aid');
    const arrIndx = e.target.getAttribute('arrindx');

    const data = {
      estate: "cancelled",
    };

    InvoiceDataService.update(id, data)
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

    InvoiceDataService.update(id, data)
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

  sayHi() {
    console.log('hi');
  }
  render() {

    const {
      searchSurname,
      invoices,
      date1,
      date2,
      page,
      count,
      pageSize,
    } = this.state;

    return (
        <>
        <div className="row">
          <div className="col-12">
            <div className="input-group mb-3"  style={{ marginTop: '10px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por apellido"
                value={searchSurname}
                onChange={this.onChangeSearchSurname}
                onKeyPress={this.handleKeyPress}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.retrieveInvoices}
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog-1"
                format="DD/MM/yyyy"
                value={date1}
                onChange={this.setDate1}
                cancelLabel="Cancelar"
                okLabel="Aceptar"
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className="col-6">
            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog-2"
                format="DD/MM/yyyy"
                value={date2}
                onChange={this.setDate2}
                cancelLabel="Cancelar"
                okLabel="Aceptar"
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>

          { invoices && invoices.map((invoice, index) => {

            return <div className="row" key={index}>
                      <div className="col-12">
                        <div className="card" style={{ marginBottom: '10px' }} key={index}>
                          <div className="card-header">
                            <div className="row">
                              <div className="col-8">
                                {invoice.inumber}/{moment(invoice.createdAt).format('YYYY')}&nbsp;&nbsp;&nbsp;{moment(invoice.date).format("DD-MM-YYYY")}
                              </div>
                              <div className="col-4">


                                { invoice.estate === "emitted" ?

                                <div className="d-flex justify-content-end">

                                  <DropdownButton
                                    variant="secondary"
                                    size="sm"
                                    id="dropdown-basic-button"
                                    title="Acciones">
                                    <Dropdown.Item
                                      href=""
                                      aid={invoice.id}
                                      arrindx={index}
                                      onClick={this.payInvoice}
                                    >
                                      Pagar
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      href=""
                                      aid={invoice.id}
                                      arrindx={index}
                                      onClick={this.cancelInvoice}
                                    >
                                      Cancelar
                                    </Dropdown.Item>
                                  </DropdownButton>

                                </div>
                                : invoice.estate === "payed" ?
                                  <div className="d-flex justify-content-end">
                                    <span className="badge badge-primary">Pagada</span>
                                  </div> :
                                  <div className="d-flex justify-content-end">
                                    <span className="badge badge-danger">Cancelada</span>
                                  </div>
                                }


                              </div>
                            </div>
                          </div>
                          <div className="card-body">
                            <h6 className="card-title">
                              {invoice.name.charAt(0).toUpperCase() + invoice.name.slice(1)}&nbsp;
                              {invoice.surname.charAt(0).toUpperCase() + invoice.surname.slice(1)}
                            </h6>
                            <p className="card-text">
                              {invoice.address}&nbsp;-&nbsp;{invoice.city}
                              <br/>
                              {invoice.dni}
                            </p>
                            <div className="row" style={{ borderRadius: '3px',background: '#F7F7F7', border: '1px solid lightgrey'}}>
                              <div className="col-6">
                                <span>Concepto</span>
                              </div>
                              <div className="col-2" style={{ paddingLeft: '0px',paddingRight: '0px'}}>
                                Base
                              </div>
                              <div className="col-1" style={{ paddingLeft: '0px',paddingRight: '0px'}}>
                                <span>IVA</span>
                              </div>
                              <div className="col-3">
                                <span>Total</span>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-6">
                                <span>{invoice.concept}</span>
                              </div>
                              <div className="col-2" style={{ paddingLeft: '0px',paddingRight: '0px'}}>
                                <span>{invoice.base}</span>
                              </div>
                              <div className="col-1" style={{ paddingLeft: '0px',paddingRight: '0px'}}>
                                <span>{invoice.iva}</span>
                              </div>
                              <div className="col-3">
                                <span>{invoice.total}</span>
                              </div>
                            </div>
                            <hr/>
                            <div className="row">
                              <div className="col-6">
                                <small>creada {moment(invoice.createdAt).fromNow()}</small>
                              </div>
                              <div className="col-6 d-flex justify-content-end" style={{paddingTop: '3px'}}>
                                <small>{invoice.emittedTo ? invoice.emittedTo._id : "ficha eliminada"}</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>

            }
          )}

          <div className="row">
            <div className="col-12" style={{ marginBottom: '10px' }}>
              <div className="paging">
                <div>
                  <span className="selectText">{"Refs por página: "}</span>
                  <select onChange={this.handlePageSizeChange} value={pageSize}>
                    {this.pageSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="bbb">
                    <Pagination
                      className="my-3"
                      count={count}
                      page={page}
                      siblingCount={1}
                      boundaryCount={1}
                      variant="outlined"
                      shape="rounded"
                      onChange={this.handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
      </>
    );
  }
}