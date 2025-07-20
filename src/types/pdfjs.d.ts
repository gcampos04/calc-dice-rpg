// Declarações de tipos para PDF.js
declare module 'pdfjs-dist' {
  export interface PDFDocumentProxy {
    numPages: number;
    getPage(pageNumber: number): Promise<PDFPageProxy>;
  }

  export interface PDFPageProxy {
    getViewport(params: { scale: number }): PDFPageViewport;
    render(params: any): { promise: Promise<void> };
  }

  export interface PDFPageViewport {
    height: number;
    width: number;
  }

  export const GlobalWorkerOptions: {
    workerSrc: string;
  };

  export function getDocument(src: string): { promise: Promise<PDFDocumentProxy> };
  export const version: string;
}
