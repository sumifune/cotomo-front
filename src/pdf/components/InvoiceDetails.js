import React from 'react';

import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  invoiceData: {
    flexDirection: 'column',
    border: 1,
    alignItems: 'stretch',
    marginTop: 60,
  },
  containerHeaders: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
  },
  bolding: {
    fontWeight: 900,
    fontSize: 12,
    textDecoration: 'underline',
    textTransform: 'bold',
  },
  detailValue: {
    fontSize: 11,
  },
  containerDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
  },
});

const InvoiceDetails = (props) => (
    <View style={styles.invoiceData}>
      <View style={styles.containerHeaders}>
        <View style={[styles.detailValue, { width: 150, margin: 5 }]}>
          <Text style={styles.bolding}>Concepto</Text>
        </View>
        <View style={[styles.detailValue, { width: 50, margin: 5 }]}>
          <Text style={styles.bolding}>Sesiones</Text>
        </View>
        <View style={[styles.detailValue, { width: 50, margin: 5 }]}>
          <Text style={styles.bolding}>IVA</Text>
        </View>
        <View style={[styles.detailValue, { width: 50, margin: 5 }]}>
          <Text style={styles.bolding}>Base</Text>
        </View>
        <View style={[styles.detailValue, { width: 50, margin: 5 }]}>
          <Text style={styles.bolding}>Importe</Text>
        </View>
      </View>
      <View style={styles.containerDetails}>
        <View style={[styles.detailValue, { width: 150, margin: 5 }]}>
          <Text>{props.concept}</Text>
        </View>
        <View style={[styles.detailValue, { width: 50, margin: 5 }]}>
          <Text>{props.sessions}</Text>
        </View>
        <View style={[styles.detailValue, { width: 50, margin: 5 }]}>
          <Text>{props.iva}</Text>
        </View>
        <View style={[styles.detailValue, { width: 50, margin: 5 }]}>
          <Text>{props.base}</Text>
        </View>
        <View style={[styles.detailValue, { width: 50, margin: 5 }]}>
          <Text>{props.total}</Text>
        </View>
      </View>
    </View>
);

export default InvoiceDetails;