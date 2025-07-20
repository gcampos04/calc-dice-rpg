import { Injectable } from '@angular/core';

export interface PdfFile {
  id: string;
  name: string;
  path: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  // Lista de PDFs disponíveis
  getAvailablePdfs(): PdfFile[] {
    return [
      {
        id: 'pandora-nath',
        name: 'Pandora Nath',
        path: '/assets/archives/Pandora-Nath.pdf',
        description: 'Ficha de personagem RPG - Pandora Nath'
      }
      // Adicione outros PDFs aqui conforme necessário
    ];
  }

  getPdfById(id: string): PdfFile | undefined {
    return this.getAvailablePdfs().find(pdf => pdf.id === id);
  }
}
