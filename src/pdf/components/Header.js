import React from 'react';

import { Text, Image, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // borderBottomWidth: 1,
    // borderBottomColor: '#112131',
    // borderBottomStyle: 'solid',
    alignItems: 'stretch',
    marginTop: 60,
  },
  containerFactura: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
    marginTop: 50,
  },
  detailColumn: {
    flexDirection: 'column',
    flexGrow: 9,
    textTransform: 'uppercase',
    // border: 1,
    // backgroundColor: 'yellow'
  },
  linkColumn: {
    flexDirection: 'column',
    flexGrow: 2,
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
  name: {
    fontSize: 24,
  },
  address: {
    fontSize: 10,
  },
  subtitle: {
    fontSize: 10,
    justifySelf: 'flex-end',
  },
  image: {
    // marginBottom: 10,
    width: 200,
    height: 107,
  },
});

const Header = () => (
  <>
  <View style={styles.container}>
    <View style={styles.detailColumn}>
      <Image
        src="/logo_co_2019_ok2peque_NEGRO.jpg"
        style={styles.image}
      />
    </View>
    <View style={styles.linkColumn}>
      <Text style={styles.address}>Calle Castelao 13-15, bajo</Text>
      <Text style={styles.address}>27001 Lugo</Text>
      <Text style={styles.address}>33535792K</Text>
      <Text style={styles.address}>Telf: 982 203 954</Text>
    </View>
  </View>
  <View style={styles.containerFactura}>
    <Text style={styles.name}>Factura</Text>
  </View>
  </>
);

export default Header;