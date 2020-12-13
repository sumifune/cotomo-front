import React from 'react';

import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  personalData: {
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
    marginTop: 60,
    paddingLeft: 30,
    paddingBottom: 30,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 20,
  },
  attribute: {
    fontSize: 11,
  },
});

const PersonalData = (props) => (
  <View style={styles.personalData}>
    <View style={styles.containerRow}>
      <Text style={styles.attribute}>Nombre: {props.name} {props.surname}</Text>
    </View>
    <View style={styles.containerRow}>
      <Text style={styles.attribute}>Dirección: {props.address}</Text>
    </View>
    <View style={styles.containerRow}>
      <Text style={styles.attribute}>DNI: {props.dni}</Text>
    </View>
  </View>
);

export default PersonalData;