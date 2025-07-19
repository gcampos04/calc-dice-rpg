import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calc-dice-rpg';
  
  inputString: string = '';
  findNumbs: string | string[] = '';
  arrayEdit: string | string[] = '';
  result: string | number = '';
  resultEmoji: string = '';

  constructor() {
    console.log('iniciou');
  }

  cleanString(str: string): string {
    let cleanedStr = str.replace(/[{}\[\]+()]/g, ' ').replace(/\s+/g, ' ').trim();
    return cleanedStr;
  }

  transformInArray(editString: string): string[] {
    let array = editString.split(' ').filter(Boolean);
    return array;
  }

  processArray(arr: string[]): string[] {
    // Função auxiliar para remover um número específico do array
    const removeNumber = (arr: string[], num: string): void => {
      const index = arr.indexOf(num);
      if (index !== -1) {
        arr.splice(index, 1);
      }
    };

    // Verificação do número 1
    while (arr.includes("1")) {
      let index1 = arr.indexOf("1");
      if (index1 !== -1) {
        arr.splice(index1, 1); // Remove o número 1 encontrado
        if (arr.includes("10")) {
          removeNumber(arr, "10");
        }
        else if (arr.includes("9")) {
          removeNumber(arr, "9");
        }
        else if (arr.includes("8")) {
          removeNumber(arr, "8");
        }
        else if (arr.includes("7")) {
          removeNumber(arr, "7");
        }
        else if (arr.includes("6")) {
          removeNumber(arr, "6");
        }
        else if (arr.includes("5")) {
          removeNumber(arr, "5");
        }
        else if (arr.includes("4")) {
          removeNumber(arr, "4");
        }
        else if (arr.includes("3")) {
          removeNumber(arr, "3");
        }
        else if (arr.includes("2")) {
          removeNumber(arr, "2");
        }
        else {
          arr.splice(index1, 0, "1"); // Reinsere o número 1 se não houver outros números
          break;
        }
      }
    }

    // Verificação do número 2
    while (arr.includes("2")) {
      let index2 = arr.indexOf("2");
      if (index2 !== -1) {
        arr.splice(index2, 1); // Remove o número 2 encontrado
        if (arr.includes("8")) {
          removeNumber(arr, "8");
        }
        else if (arr.includes("7")) {
          removeNumber(arr, "7");
        }
        else if (arr.includes("6")) {
          removeNumber(arr, "6");
        }
        else if (arr.includes("5")) {
          removeNumber(arr, "5");
        }
        else if (arr.includes("4")) {
          removeNumber(arr, "4");
        }
        else if (arr.includes("3")) {
          removeNumber(arr, "3");
        }
        else if (arr.includes("1")) {
          removeNumber(arr, "1");
        }
        else {
          arr.splice(index2, 0, "2"); // Reinsere o número 2 se não houver outros números
          break;
        }
      }
    }

    return arr;
  }

  calcularMedia(array: string[]): string {
    let somaTotal = 0;
    let numeroDeItens = array.length;

    // Soma os elementos do array
    somaTotal = array.reduce((acc, num) => acc + parseInt(num), 0);

    // Calcula a média
    let media = somaTotal / numeroDeItens;

    if (isNaN(media)) {
      return '0';
    } else {
      return media % 1 === 0 ? media.toFixed(0) : media.toFixed(1);
    }
  }

  getResultEmoji(arrayEdit: string[] | string, originalArray: string[]): string {
    // Falha Crítica - todos os dados foram consumidos
    if (Array.isArray(arrayEdit) && arrayEdit.length === 0) {
      return '😈'; // Demoninho para falha crítica
    }
    
    // Se não é array, é falha crítica (string 'Falha Crítica')
    if (typeof arrayEdit === 'string') {
      return '😈'; // Demoninho para falha crítica
    }

    // Acerto Crítico - quando sobram apenas números altos (8, 9, 10)
    const highNumbers = arrayEdit.filter(num => parseInt(num) >= 8);
    if (arrayEdit.length > 0 && highNumbers.length === arrayEdit.length && arrayEdit.length >= 2) {
      return '🥳'; // Festa para acerto crítico
    }

    // Resultado muito bom (média >= 8)
    const media = parseFloat(this.calcularMedia(arrayEdit));
    if (media >= 7) {
      return '😄'; // Muito feliz para resultados excelentes
    }

    // Resultado normal
    return '🎲'; // Neutro - dado para resultado normal
  }

  sendString(): void {
    console.log(this.inputString);
    let editString = this.cleanString(this.inputString);
    console.log(editString);
    let array = this.transformInArray(editString);
    console.log(array);
    this.findNumbs = array;
    let editArray = this.processArray([...array]); // Cria uma cópia do array para não modificar o original
    console.log('editArray: ', editArray);
    this.arrayEdit = editArray.length === 0 ? 'Falha Crítica' : editArray;
    let media = this.calcularMedia(editArray);
    console.log(media);
    this.result = media;
    
    // Define o emoji baseado no resultado
    this.resultEmoji = this.getResultEmoji(editArray.length === 0 ? 'Falha Crítica' : editArray, array);
  }
}
