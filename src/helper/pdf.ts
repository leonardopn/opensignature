import { PDFDocument } from "pdf-lib";
import * as PDFJS from "pdfjs-dist/legacy/build/pdf";
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

export async function loadPdf(buffer: ArrayBuffer) {
    const pdf = await PDFDocument.load(buffer);
    const page = pdf.getPage(0);
    console.log(page.getSize());
}

export const readFileData = (file: File): Promise<string> => {
    file.arrayBuffer().then((a) => loadPdf(a));

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                resolve(e.target.result.toString());
            }
        };
        reader.onerror = (err) => {
            reject(err);
        };
        reader.readAsDataURL(file);
    });
};

//param: file -> the input file (e.g. event.target.files[0])
//return: images -> an array of images encoded in base64
export const convertPdfToImages = async (file: File) => {
    const images = [];
    const data = await readFileData(file);
    const pdf = await PDFJS.getDocument(data).promise;
    console.log(pdf);
    const canvas = document.createElement("canvas");
    for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const viewport = page.getViewport({ scale: 1 });
        const context = canvas.getContext("2d");
        canvas.height = viewport.height * 1.3333333333333333;
        canvas.width = viewport.width * 1.3333333333333333;
        if (context) {
            await page.render({ canvasContext: context, viewport: viewport }).promise;
            images.push(canvas.toDataURL());
        }
    }
    canvas.remove();
    return images;
};
