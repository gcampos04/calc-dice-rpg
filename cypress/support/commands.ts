/// <reference types="cypress" />

// Custom command for D10Roll Calculator
Cypress.Commands.add('calculateDice', (input: string) => {
  // Check if input contains special characters that need parseSpecialCharSequences: false
  const hasSpecialChars = input.includes('{') || input.includes('[') || input.includes('(')
  const typeOptions = hasSpecialChars ? { parseSpecialCharSequences: false } : {}
  
  cy.get('input[placeholder*="Digite o lance"]')
    .clear()
    .type(input, typeOptions)
  
  cy.get('button').contains('Enviar').click()
})
