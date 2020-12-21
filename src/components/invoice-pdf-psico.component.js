import React, { Component } from "react";
import { PDFViewer, Document, Page, StyleSheet } from '@react-pdf/renderer';
import Header from '../pdf/components/Header';
import InvoiceID from '../pdf/components/InvoiceID';
import PersonalData from '../pdf/components/PersonalData';
import InvoiceDetails from '../pdf/components/InvoiceDetails';
import Footer from '../pdf/components/Footer';

export default class AddAppointment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoiceData: {},
      id: 0,
    };
  }

  render() {

    const { invoice } = this.props.location.state;
    const date = new Date(invoice.createdAt);

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    const invoiceNumber = `${invoice.inumber}/${year}`;
    const invoiceDate = `${day}-${month}-${year}`;

    const styles = StyleSheet.create({
      page: {
        padding: 30,
      },
    });

    return (
      <div className="row">
        <PDFViewer key={Math.random()} style={{ width: 800, height: 1300 }}>
          <Document
            author="Centro Otomo"
            keywords="acupuntura, psicología"
            subject="Factura"
            title="Factura"
          >
            <Page size="A4" style={styles.page}>
              <Header />
              <InvoiceID number={invoiceNumber} date={invoiceDate} />
              <PersonalData name={invoice.name} surname={invoice.surname} address={invoice.address} dni={invoice.dni}/>
              <InvoiceDetails
                concept={invoice.concept}
                sessions={invoice.sessions}
                iva={invoice.iva}
                base={invoice.base}
                total={invoice.total}
              />
              <Footer />
            </Page>
          </Document>
        </PDFViewer>
      </div>
    )


  }
}
