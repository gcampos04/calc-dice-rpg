import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PdfService, PdfFile } from '../services/pdf.service';

@Component({
  selector: 'app-pdf-list',
  templateUrl: './pdf-list.component.html',
  styleUrls: ['./pdf-list.component.scss']
})
export class PdfListComponent implements OnInit {
  availablePdfs: PdfFile[] = [];

  constructor(
    private pdfService: PdfService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.availablePdfs = this.pdfService.getAvailablePdfs();
  }

  openPdf(pdfId: string): void {
    this.router.navigate(['/pdf-editor', pdfId]);
  }
}
