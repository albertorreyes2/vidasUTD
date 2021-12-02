import jsPDF from "jspdf";
import pdfTemplate from '../../images/pdfDegreeUser.jpg';

export const generarConstancia = (nombre) => {
    //SET CONFIGURATION TO GENERATE PDF
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: 'letter'
    });

    // let blobPDF = new Blob([doc.output('blob')], { type: 'application/pdf' });
    // let blobURL = URL.createObjectURL(blobPDF);



    doc.setFontSize(25);
    doc.setFont("Helvetica", "italic")


    //SET DATA INTO LAYOUT PDF
    doc.addImage(pdfTemplate, 'jpg', 0, 5, 810, 600);
    //CALCULATE OFFSET FOR X POSITION UN LAYOUT 
    const xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(nombre) * doc.internal.getFontSize() / 2);
    //PUT STRING IN DOCUMENT
    doc.text(nombre, xOffset, 360);


    //GENERATE PFD
    window.open(doc.output('bloburl'), `constancia_vidas2021_${nombre.toLowerCase().trim().split(' ').join('_')}`);

    // doc.save(`constancia_vidas2021_${nombre.toLowerCase().trim().split(' ').join('_')}`);
};