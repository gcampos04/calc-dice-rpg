/// <reference types="cypress" />

// Custom command for D10Roll Calculator
Cypress.Commands.add('calculateDice', (input: string) => {
  cy.get('input[placeholder*="Digite o lance"]').clear().type(input)
  cy.get('button').contains('Enviar').click()
})
