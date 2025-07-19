# 🎲 D10Roll Calc - Calculadora de Dados RPG

<div align="center">

![RPG Dice Calculator](https://img.shields.io/badge/RPG-Dice%20Calculator-blueviolet?style=for-the-badge&logo=dice)
![Angular](https://img.shields.io/badge/Angular-15.2-red?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Cypress](https://img.shields.io/badge/Cypress-14.5-green?style=for-the-badge&logo=cypress)

**Uma calculadora web especializada para sistemas personalizados de RPG**

**👨‍💻 Desenvolvido por [gcampos04](https://github.com/gcampos04)**

[🚀 **Testar Online**](https://calc-dice-rpg.vercel.app) | [📖 **Documentação**](#como-usar) | [🛠️ **Desenvolvimento**](#desenvolvimento) | [🐙 **GitHub**](https://github.com/gcampos04)

</div>

---

## 📖 Sobre o Projeto

**D10Roll Calc** é uma aplicação web desenvolvida especificamente para calcular resultados de dados em sistemas personalizados de RPG. A ferramenta implementa regras únicas de processamento onde números específicos podem "consumir" outros números, simulando mecânicas avançadas de jogo.

### 🎯 **Principais Recursos:**
- ⚡ **Processamento Inteligente**: Sistema único onde números 1 e 2 podem consumir outros números
- 🎲 **Múltiplos Formatos**: Suporte a parênteses `()`, chaves `{}` e colchetes `[]`
- 📊 **Cálculo de Médias**: Resultados automáticos com precisão de uma casa decimal
- 🚨 **Detecção de Falha Crítica**: Identifica quando todos os dados são consumidos
- 📱 **Design Responsivo**: Interface otimizada para desktop e mobile
- 🧪 **Totalmente Testado**: Cobertura completa com Cypress E2E

---

## 🚀 Demonstração Online

**🌐 [https://calc-dice-rpg.vercel.app](https://calc-dice-rpg.vercel.app)**

### 🎮 **Experimente alguns exemplos:**
- `{7 8 9}` - Números simples
- `1 10` - O número 1 consome o 10 (resultado: 0)
- `2 8 7` - O número 2 consome o 8 (resultado: 7)
- `1 2 8 10` - Todos consumidos = **Falha Crítica**

---

## ⚙️ **Como Funciona o Sistema**

### 📋 **Regras de Processamento:**

#### **Número 1:**
- 🎯 **Prioridade:** 10 → 9 → 8 → 7 → 6 → 5 → 4 → 3 → 2
- 🔄 **Comportamento:** Remove a si mesmo e o número de maior valor disponível
- ✅ **Exemplo:** `1 9 10` → `1` consome `10`, sobra `9`

#### **Número 2:**
- 🎯 **Prioridade:** 8 → 7 → 6 → 5 → 4 → 3 → 1
- 🔄 **Comportamento:** Remove a si mesmo e o número de maior valor disponível
- ✅ **Exemplo:** `2 7` → `2` consome `7`, resultado = `0`

#### **Outros Números:**
- ✨ **Permanecem inalterados** e participam do cálculo da média final

### 📊 **Resultado Final:**
- 🧮 **Média Aritmética** dos números restantes
- 🎯 **Precisão:** Inteiros ou uma casa decimal
- ⚠️ **Falha Crítica:** Quando todos os números são consumidos

---

## 🛠️ Tecnologias Utilizadas

### **Frontend:**
- ![Angular](https://img.shields.io/badge/Angular-15.2.11-DD0031?logo=angular) **Angular 15** - Framework principal
- ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript) **TypeScript** - Linguagem de desenvolvimento
- ![SCSS](https://img.shields.io/badge/SCSS-1.69-CF649A?logo=sass) **SCSS** - Estilização avançada
- ![RxJS](https://img.shields.io/badge/RxJS-7.8-B7178C?logo=reactivex) **RxJS** - Programação reativa

### **Testes:**
- ![Cypress](https://img.shields.io/badge/Cypress-14.5.2-17202C?logo=cypress) **Cypress** - Testes E2E
- ![Jasmine](https://img.shields.io/badge/Jasmine-4.3-8A4182?logo=jasmine) **Jasmine** - Framework de testes unitários
- ![Karma](https://img.shields.io/badge/Karma-6.4-FBC314?logo=karma) **Karma** - Test runner

### **DevOps & Deploy:**
- ![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?logo=vercel) **Vercel** - Hospedagem e deploy
- ![GitHub](https://img.shields.io/badge/GitHub-Actions-181717?logo=github) **GitHub** - Controle de versão
- ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js) **Node.js 18+** - Ambiente de desenvolvimento

---

## 🚀 Como Executar o Projeto

### **📋 Pré-requisitos:**
```bash
Node.js 18+ 
npm ou yarn
```

### **⚡ Instalação Rápida:**
```bash
# Clone o repositório
git clone https://github.com/gcampos04/calc-dice-rpg.git
cd calc-dice-rpg

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm start
```

🌐 **Acesse:** `http://localhost:4200`

### **🧪 Executar Testes:**
```bash
# Testes E2E interativos
npm run cypress:open

# Testes E2E em linha de comando
npm run cypress:run

# Testes unitários
npm test
```

### **🏗️ Build para Produção:**
```bash
npm run build
```

---

## 📱 Como Usar

### **1. 📝 Digite sua Rolagem:**
- Use qualquer formato: `5 6 7`, `{7+8}`, `[1,10]`, `(2 9)`
- Números, símbolos e espaços são automaticamente processados

### **2. 🎯 Clique em "Enviar":**
- Veja os números extraídos na primeira seção
- Acompanhe o processamento na segunda seção
- Confira o resultado final na terceira seção

### **3. 📊 Interprete os Resultados:**
- **Números Informados:** Lista original extraída
- **Números Editados:** Após aplicar as regras de consumo
- **Resultado:** Média final ou "Falha Crítica"

---

## 🧪 Cobertura de Testes

### **✅ Testes Implementados:**
- 🎲 **Lógica de Dados:** Todas as regras de consumo
- 🖥️ **Interface:** Elementos visuais e interações
- ⚡ **Performance:** Cargas pesadas e múltiplas operações
- 🔧 **Edge Cases:** Caracteres especiais e entradas inválidas
- 📊 **Data-Driven:** Testes baseados em fixtures JSON

### **📈 Estatísticas:**
- **40+ cenários de teste** automatizados
- **Cobertura completa** das regras de negócio
- **Testes visuais** para UI/UX
- **Validação cross-browser**

---

## 🌟 Funcionalidades Especiais

### **🎯 Sistema Inteligente:**
- **Auto-detecção** de formatos de entrada
- **Processamento otimizado** para performance
- **Validação robusta** de dados

### **🎨 Interface Moderna:**
- **Design responsivo** para todos os dispositivos
- **Tema RPG** com elementos visuais temáticos
- **Feedback visual** em tempo real

### **🔧 Desenvolvedor-Friendly:**
- **Código limpo** e bem documentado
- **Arquitetura modular** Angular
- **Testes automatizados** com CI/CD
- **SEO otimizado** para descoberta

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. **🍴 Fork** o projeto
2. **🌿 Crie** uma branch: `git checkout -b minha-feature`
3. **💾 Commit** suas mudanças: `git commit -m 'Adiciona nova feature'`
4. **📤 Push** para a branch: `git push origin minha-feature`
5. **📋 Abra** um Pull Request

### **🐛 Reportar Bugs:**
Use as [Issues do GitHub](https://github.com/gcampos04/calc-dice-rpg/issues) para reportar problemas.

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

## 👨‍💻 Autor

**Desenvolvido com ❤️ para a comunidade RPG**

**🧑‍💻 [gcampos04]** - *Desenvolvedor Full Stack*

- 🌐 **Website/Demo:** [calc-dice-rpg.vercel.app](https://calc-dice-rpg.vercel.app)
- 🐙 **GitHub:** [@gcampos04](https://github.com/gcampos04)
- 📧 **Contato:** [gabriel.campos@exemplo.com](mailto:gabriel.campos@exemplo.com)

### 🚀 **Sobre o Desenvolvedor:**
Este projeto foi desenvolvido como demonstração de habilidades em:
- ✅ **Angular & TypeScript** - Framework moderno e tipagem forte
- ✅ **Testes E2E com Cypress** - Garantia de qualidade
- ✅ **Clean Code** - Código limpo e documentado
- ✅ **Deploy & DevOps** - CI/CD e hospedagem moderna
- ✅ **UX/UI Design** - Interface intuitiva e responsiva

### 🎯 **Outros Projetos:**
Confira outros projetos no meu [GitHub](https://github.com/gcampos04)!

---

## 🏆 **Destaque para Recrutadores**

Este projeto demonstra competências técnicas em:

### **🎨 Frontend Development:**
- **Angular 15** com TypeScript para aplicações robustas
- **SCSS** para estilização moderna e responsiva
- **Componentização** e arquitetura modular
- **Reactive Programming** com RxJS

### **🧪 Quality Assurance:**
- **Test-Driven Development** (TDD)
- **Cypress E2E Testing** com 40+ cenários
- **Cross-browser compatibility**
- **Performance testing** e otimização

### **🚀 DevOps & Deploy:**
- **CI/CD Pipeline** com GitHub Actions
- **Deploy automatizado** no Vercel
- **SEO optimization** e meta tags
- **Production-ready** com build otimizada

### **💼 Soft Skills:**
- **Documentação técnica** completa
- **Código limpo** seguindo boas práticas
- **Problem solving** com sistema complexo de regras
- **UX thinking** para interface intuitiva

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)
![RPG Community](https://img.shields.io/badge/For%20RPG-Community-purple?style=for-the-badge&logo=dice)

</div>
