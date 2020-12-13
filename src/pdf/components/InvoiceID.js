import React from 'react';

import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 25,
  },
  numberColumn: {
    flexDirection: 'column',
    flexGrow: 9,
    textTransform: 'uppercase',
  },
  dateColumn: {
    flexDirection: 'column',
    flexGrow: 2,
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
    width: 30,
    textAlign: 'right',
  },
  basicFont: {
    fontSize: 11,
  },
});

const InvoiceID = (props) => (
  <View style={styles.container}>
    <View style={styles.numberColumn}>
      <Text style={styles.basicFont}>Número: {props.number}</Text>
    </View>
    <View style={styles.dateColumn}>
      <Text style={[styles.basicFont, { width: 100, textAlign: 'right' }]}>Fecha: {props.date}</Text>
    </View>
  </View>
);

export default InvoiceID;