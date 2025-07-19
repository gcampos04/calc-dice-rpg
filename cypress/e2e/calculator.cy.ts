describe('D10Roll Calculator', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the main title', () => {
    cy.contains('D10Roll Calc 🎲').should('be.visible')
  })

  it('should calculate dice roll correctly', () => {
    // Test basic input
    cy.get('input[placeholder*="Digite o lance"]').type('10+9+5')
    cy.get('button').contains('Enviar').click()
    
    // Check if results are displayed
    cy.contains('Números informados:').should('be.visible')
    cy.contains('Números editados:').should('be.visible')
    cy.contains('Resultado:').should('be.visible')
  })

  it('should handle parentheses input', () => {
    cy.get('input[placeholder*="Digite o lance"]').type('{(7+10)}')
    cy.get('button').contains('Enviar').click()
    
    // Verify the numbers are extracted
    cy.get('.result').first().should('contain', '7')
    cy.get('.result').first().should('contain', '10')
  })

  it('should show results after calculation', () => {
    cy.get('input[placeholder*="Digite o lance"]').type('5+6+7')
    cy.get('button').contains('Enviar').click()
    
    // Check all result sections exist
    cy.get('.result').should('have.length', 3)
    cy.get('.area-info').should('be.visible')
  })

  it('should clear input and allow new calculation', () => {
    // First calculation
    cy.get('input[placeholder*="Digite o lance"]').type('1+2+3')
    cy.get('button').contains('Enviar').click()
    
    // Clear and new calculation
    cy.get('input[placeholder*="Digite o lance"]').clear().type('8+9+10')
    cy.get('button').contains('Enviar').click()
    
    // Should show new results
    cy.get('.result').first().should('contain', '8')
  })
})
