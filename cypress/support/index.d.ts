/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    calculateDice(input: string): Chainable<Subject>
  }
}
