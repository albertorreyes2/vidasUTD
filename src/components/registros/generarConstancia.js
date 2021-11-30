import jsPDF from "jspdf";

export const generarConstancia = (nombre) => {
    const doc = new jsPDF("l", "pt", "landscape");

    doc.save(doc.output("bloburl"), "_blank");
};