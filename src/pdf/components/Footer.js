import React from 'react';

import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  footerText: {
    fontSize: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 100,
  },
});

const Footer = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        De conformidad con la Ley Orgánica 15/1999 de Protección de Datos, CENTRO OTOMO le informa de que sus
        datos personales están incluidos en un fichero denominado FICHERO DE DATOS DE PACIENTES inscrito en la
        Agencia Española de Protección de Datos y cuya finalidad es la GESTIÓN DE PACIENTES, pudiendo ejercitar
        sus derechos de OPOSICIÓN, ACCESO, RECTIFICACIÓN Y/O CANCELACIÓN mediante escrito a: CENTRO OTOMO, calle
        Castelao 13-15, bajo, 27001 Lugo,indicando por escrito su petición y adjuntando fotocopia de DNI o en su
        defecto doccumento que acredite su debida identidad.
      </Text>
    </View>
);

export default Footer;