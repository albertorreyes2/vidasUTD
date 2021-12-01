import jsPDF from "jspdf";

export const generarConstancia = (nombre) => {
    const doc = new jsPDF({ 
        orientation: "landscape", 
        unit: "pt", 
        format: 'letter'});

    let blobPDF = new Blob([doc.output('blob')], { type: 'application/pdf' });
    let blobURL = URL.createObjectURL(blobPDF);
    doc.save(`constancia_vidas2021_${nombre.toLowerCase().trim().split(' ').join('_')}`);
};