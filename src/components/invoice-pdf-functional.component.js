import React from 'react';
import Invoice from '../pdf/components/Invoice';
import { PDFViewer } from '@react-pdf/renderer';

const InvoicePDF = () => {

	return (
		<div>
		  <PDFViewer width="800" height="1200">
		    <Invoice />
		  </PDFViewer>
	  </div>
	)

};

export default InvoicePDF;