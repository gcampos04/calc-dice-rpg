import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PdfService, PdfFile } from '../services/pdf.service';

// Importação simplificada do PDF.js para evitar problemas de tipos
declare const pdfjsLib: any;

export interface FormField {
  id: string;
  name: string;
  type: 'text' | 'checkbox' | 'radio' | 'select';
  value: any;
  x: number;
  y: number;
  width: number;
  height: number;
  page: number;
  options?: string[]; // Para select e radio
}

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit, AfterViewInit {
  @ViewChild('pdfCanvas', { static: true }) pdfCanvas!: ElementRef<HTMLCanvasElement>;
  
  private pdfDocument: any = null;
  currentPage: number = 1;
  totalPages: number = 0;
  scale: number = 1.5;
  isEditMode: boolean = false;
  
  // Informações do PDF atual
  currentPdf: PdfFile | null = null;
  pdfId: string = '';
  
  // Campos do formulário
  formFields: FormField[] = [];
  selectedField: FormField | null = null;
  
  // Anotações e edições (mantido para compatibilidade)
  private annotations: any[] = [];
  private isDrawing: boolean = false;
  private drawingContext: CanvasRenderingContext2D | null = null;

  constructor(
    private route: ActivatedRoute,
    private pdfService: PdfService
  ) { }

  ngOnInit(): void {
    // Configurar o worker do PDF.js quando o componente for inicializado
    if (typeof window !== 'undefined' && (window as any).pdfjsLib) {
      (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = 
        `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
    }
    
    // Obter o ID do PDF da rota
    this.route.params.subscribe(params => {
      this.pdfId = params['id'] || 'pandora-nath';
      this.currentPdf = this.pdfService.getPdfById(this.pdfId) || null;
      if (this.currentPdf) {
        console.log('Carregando PDF:', this.currentPdf.name);
      }
    });
    
    // Inicializar campos mock para demonstração
    this.initializeMockFormFields();
  }

  ngAfterViewInit(): void {
    // Aguardar um pouco para garantir que o PDF.js foi carregado
    setTimeout(() => {
      this.loadPdf().then(() => {
        // Carregar dados salvos após carregar o PDF
        this.loadFormData();
      }).catch((error) => {
        console.error('Falha ao carregar PDF:', error);
        // Em caso de erro, mostrar uma demo sem PDF
        this.showDemoMode();
      });
    }, 1000);
  }

  private showDemoMode(): void {
    console.log('Entrando no modo demonstração...');
    this.totalPages = 1; // Simular que há uma página
    
    // Criar um canvas de demonstração
    const canvas = this.pdfCanvas.nativeElement;
    const context = canvas.getContext('2d');
    
    if (context) {
      canvas.width = 600;
      canvas.height = 800;
      
      // Fundo branco
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Título
      context.fillStyle = '#160e41';
      context.font = 'bold 24px Arial';
      context.fillText('📋 Ficha de Personagem RPG', 50, 50);
      
      // Linhas de exemplo
      context.fillStyle = '#666';
      context.font = '16px Arial';
      context.fillText('Nome do Personagem:', 50, 120);
      context.fillText('Classe:', 50, 160);
      context.fillText('Nível:', 270, 160);
      context.fillText('Experiência:', 50, 200);
      context.fillText('PV Máximo:', 250, 200);
      
      // Renderizar campos de formulário
      setTimeout(() => this.renderFormFields(), 100);
    }
  }

  async loadPdf(): Promise<void> {
    try {
      // Verificar se o PDF.js está disponível
      if (typeof window === 'undefined' || !(window as any).pdfjsLib) {
        console.error('PDF.js não está disponível');
        return;
      }

      // Usar URL completa para evitar problemas com rotas dinâmicas
      const basePath = this.currentPdf?.path || '/assets/archives/Pandora-Nath.pdf';
      const pdfPath = window.location.origin + basePath;
      console.log('Tentando carregar PDF:', pdfPath);
      
      // Primeiro, verificar se o arquivo existe
      try {
        const response = await fetch(pdfPath);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        console.log('PDF encontrado, iniciando carregamento...');
      } catch (fetchError) {
        console.error('Erro ao buscar PDF:', fetchError);
        throw new Error(`Não foi possível encontrar o PDF em: ${pdfPath}`);
      }
      
      const loadingTask = (window as any).pdfjsLib.getDocument({
        url: pdfPath,
        cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
        cMapPacked: true
      });
      
      this.pdfDocument = await loadingTask.promise;
      this.totalPages = this.pdfDocument.numPages;
      
      console.log('PDF carregado com sucesso!');
      console.log('Total de páginas:', this.totalPages);
      
      await this.renderPage(this.currentPage);
      
      // Renderizar campos de formulário
      this.renderFormFields();
    } catch (error) {
      console.error('Erro ao carregar PDF:', error);
      // Mostrar uma mensagem de erro mais amigável
      alert(`Erro ao carregar PDF: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  private initializeMockFormFields(): void {
    // Campos mock para demonstração - em um caso real, estes seriam extraídos do PDF
    this.formFields = [
      {
        id: 'nome',
        name: 'Nome do Personagem',
        type: 'text',
        value: '',
        x: 150,
        y: 120,
        width: 200,
        height: 25,
        page: 1
      },
      {
        id: 'classe',
        name: 'Classe',
        type: 'text',
        value: '',
        x: 150,
        y: 160,
        width: 150,
        height: 25,
        page: 1
      },
      {
        id: 'nivel',
        name: 'Nível',
        type: 'text',
        value: '',
        x: 320,
        y: 160,
        width: 50,
        height: 25,
        page: 1
      },
      {
        id: 'experiencia',
        name: 'Experiência',
        type: 'text',
        value: '',
        x: 150,
        y: 200,
        width: 100,
        height: 25,
        page: 1
      },
      {
        id: 'pv_max',
        name: 'PV Máximo',
        type: 'text',
        value: '',
        x: 300,
        y: 200,
        width: 70,
        height: 25,
        page: 1
      }
    ];
  }

  private renderFormFields(): void {
    const canvas = this.pdfCanvas.nativeElement;
    const container = canvas.parentElement;
    
    if (!container) return;

    // Remover campos existentes
    const existingFields = container.querySelectorAll('.form-field');
    existingFields.forEach(field => field.remove());

    // Renderizar campos da página atual
    this.formFields
      .filter(field => field.page === this.currentPage)
      .forEach(field => this.createFormFieldElement(field, container));
  }

  private createFormFieldElement(field: FormField, container: HTMLElement): void {
    const input = document.createElement('input');
    input.type = field.type === 'text' ? 'text' : field.type;
    input.className = 'form-field';
    input.id = field.id;
    input.value = field.value;
    input.placeholder = field.name;
    
    // Posicionamento absoluto
    input.style.position = 'absolute';
    input.style.left = `${field.x * this.scale}px`;
    input.style.top = `${field.y * this.scale}px`;
    input.style.width = `${field.width * this.scale}px`;
    input.style.height = `${field.height * this.scale}px`;
    input.style.border = '2px solid #007bff';
    input.style.borderRadius = '4px';
    input.style.padding = '4px';
    input.style.fontSize = `${12 * this.scale}px`;
    input.style.zIndex = '10';
    input.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    
    // Eventos
    input.addEventListener('input', (e) => {
      field.value = (e.target as HTMLInputElement).value;
    });
    
    input.addEventListener('focus', () => {
      this.selectedField = field;
      input.style.border = '2px solid #28a745';
    });
    
    input.addEventListener('blur', () => {
      input.style.border = '2px solid #007bff';
    });
    
    container.appendChild(input);
  }

  async renderPage(pageNumber: number): Promise<void> {
    if (!this.pdfDocument) return;

    try {
      const page = await this.pdfDocument.getPage(pageNumber);
      const viewport = page.getViewport({ scale: this.scale });

      const canvas = this.pdfCanvas.nativeElement;
      const context = canvas.getContext('2d');
      
      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext).promise;
      
      // Renderizar anotações se existirem
      this.renderAnnotations(context);
      
      // Renderizar campos de formulário
      setTimeout(() => this.renderFormFields(), 100);
      
      console.log(`Página ${pageNumber} renderizada`);
    } catch (error) {
      console.error('Erro ao renderizar página:', error);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderPage(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.renderPage(this.currentPage);
    }
  }

  zoomIn(): void {
    this.scale += 0.25;
    this.renderPage(this.currentPage);
  }

  zoomOut(): void {
    if (this.scale > 0.5) {
      this.scale -= 0.25;
      this.renderPage(this.currentPage);
    }
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    
    if (this.isEditMode) {
      this.setupDrawing();
    } else {
      this.removeDrawingEvents();
    }
  }

  private setupDrawing(): void {
    const canvas = this.pdfCanvas.nativeElement;
    this.drawingContext = canvas.getContext('2d');
    
    if (!this.drawingContext) return;

    // Configurar o contexto para desenho
    this.drawingContext.strokeStyle = '#ff0000';
    this.drawingContext.lineWidth = 2;
    this.drawingContext.lineCap = 'round';

    // Eventos de mouse para desenho
    canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    canvas.addEventListener('mousemove', this.draw.bind(this));
    canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
  }

  private removeDrawingEvents(): void {
    const canvas = this.pdfCanvas.nativeElement;
    canvas.removeEventListener('mousedown', this.startDrawing.bind(this));
    canvas.removeEventListener('mousemove', this.draw.bind(this));
    canvas.removeEventListener('mouseup', this.stopDrawing.bind(this));
  }

  private startDrawing(event: MouseEvent): void {
    if (!this.isEditMode || !this.drawingContext) return;
    
    this.isDrawing = true;
    const rect = this.pdfCanvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    this.drawingContext.beginPath();
    this.drawingContext.moveTo(x, y);
  }

  private draw(event: MouseEvent): void {
    if (!this.isDrawing || !this.drawingContext) return;
    
    const rect = this.pdfCanvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    this.drawingContext.lineTo(x, y);
    this.drawingContext.stroke();
  }

  private stopDrawing(): void {
    this.isDrawing = false;
  }

  private renderAnnotations(context: CanvasRenderingContext2D): void {
    // Implementar renderização de anotações salvas
    this.annotations.forEach(annotation => {
      // Renderizar cada anotação
      context.strokeStyle = annotation.color || '#ff0000';
      context.lineWidth = annotation.width || 2;
      // ... código para renderizar diferentes tipos de anotações
    });
  }

  addTextAnnotation(event: MouseEvent): void {
    if (!this.isEditMode) return;
    
    const text = prompt('Digite o texto da anotação:');
    if (!text) return;

    const rect = this.pdfCanvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const context = this.drawingContext;
    if (!context) return;

    context.fillStyle = '#000000';
    context.font = '16px Arial';
    context.fillText(text, x, y);

    // Salvar anotação
    this.annotations.push({
      type: 'text',
      x: x,
      y: y,
      text: text,
      page: this.currentPage
    });
  }

  clearAnnotations(): void {
    this.annotations = this.annotations.filter(ann => ann.page !== this.currentPage);
    this.renderPage(this.currentPage);
  }

  downloadPdf(): void {
    // Salvar os dados do formulário
    this.saveFormData();
    console.log('Dados do formulário salvos:', this.getFormData());
    alert('Dados do formulário salvos! (Em desenvolvimento: exportação para PDF)');
  }

  saveFormData(): void {
    const formData = this.getFormData();
    localStorage.setItem(`pdf_form_${this.pdfId}`, JSON.stringify(formData));
    console.log('Dados salvos no localStorage');
  }

  loadFormData(): void {
    const saved = localStorage.getItem(`pdf_form_${this.pdfId}`);
    if (saved) {
      const formData = JSON.parse(saved);
      this.formFields.forEach(field => {
        if (formData[field.id]) {
          field.value = formData[field.id];
        }
      });
      
      // Atualizar os elementos na tela
      setTimeout(() => this.updateFormFieldElements(), 100);
    }
  }

  getFormData(): any {
    const data: any = {};
    this.formFields.forEach(field => {
      data[field.id] = field.value;
    });
    return data;
  }

  updateFormFieldElements(): void {
    this.formFields.forEach(field => {
      const element = document.getElementById(field.id) as HTMLInputElement;
      if (element) {
        element.value = field.value;
      }
    });
  }

  clearForm(): void {
    this.formFields.forEach(field => {
      field.value = '';
    });
    this.updateFormFieldElements();
    localStorage.removeItem(`pdf_form_${this.pdfId}`);
    console.log('Formulário limpo');
  }
}
