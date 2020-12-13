import React from 'react';

// import {
//   useParams
// } from "react-router-dom";

import PropTypes from "prop-types";
import { withRouter } from "react-router";
// import { withRouter } from "react-router";
import {
  Document,
  Page,
  StyleSheet,
} from '@react-pdf/renderer';
import Header from './Header';
import InvoiceID from './InvoiceID';
import PersonalData from './PersonalData';
import InvoiceDetails from './InvoiceDetails';
import Footer from './Footer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
});

const Resume = props => (
  <Page {...props} style={styles.page}>
    <Header />
    <InvoiceID number={props.number} date={props.date}/>
    <PersonalData />
    <InvoiceDetails />
    <Footer />
  </Page>
);

const Invoice = (props) => {

  // const { id } = useParams();
  // console.log(id);
  // console.log(props.history);
  // console.log(props.match);
  // console.log(props.location);

  return (
    <Document
      author="Centro Otomo"
      keywords="acupuntura, psicología"
      subject="Factura"
      title="Factura"
    >
      <Resume size="A4" number={'id'} date={"123231221"}/>
    </Document>
  )
};

// A simple component that shows the pathname of the current location
class ShowTheLocation extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    const { match, location, history } = this.props;

    return <div>You are now at {location.pathname}</div>;
  }
}
// without withRouter the props in the Title component would be an empty object
export default withRouter(ShowTheLocation);