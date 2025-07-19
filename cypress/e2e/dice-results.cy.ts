describe('D10Roll Calculator - Specific Dice Results', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Basic Number Processing', () => {
    it('should process simple numbers correctly', () => {
      cy.get('input[placeholder*="Digite o lance"]').type('5 6 7')
      cy.get('button').contains('Enviar').click()
      
      // Verify input numbers are shown
      cy.get('.result').eq(0).should('contain', '5')
      cy.get('.result').eq(0).should('contain', '6')
      cy.get('.result').eq(0).should('contain', '7')
      
      // Verify result calculation (5+6+7=18, average=6.0)
      cy.get('.result').eq(2).should('contain', '6')
    })

    it('should handle numbers with brackets', () => {
      cy.get('input[placeholder*="Digite o lance"]').type('{7 8 9}', { parseSpecialCharSequences: false })
      cy.get('button').contains('Enviar').click()
      
      cy.get('.result').eq(0).should('contain', '7')
      cy.get('.result').eq(0).should('contain', '8')
      cy.get('.result').eq(0).should('contain', '9')
    })

    it('should handle numbers with parentheses', () => {
      cy.get('input[placeholder*="Digite o lance"]').type('(4 5 6)')
      cy.get('button').contains('Enviar').click()
      
      cy.get('.result').eq(0).should('contain', '4')
      cy.get('.result').eq(0).should('contain', '5')  
      cy.get('.result').eq(0).should('contain', '6')
    })
  })

  describe('Number 1 Processing Logic', () => {
    it('should process 1 with 10 correctly', () => {
      cy.get('input[placeholder*="Digite o lance"]').type('1 10')
      cy.get('button').contains('Enviar').click()
      
      // According to logic: 1 removes 10, both are consumed
      cy.get('.result').eq(1).should('not.contain', '1')
      cy.get('.result').eq(1).should('not.contain', '10')
      
      // Result should be 0 (empty array)
      cy.get('.result').eq(2).should('contain', '0')
    })

    it('should process 1 with 9 correctly', () => {
      cy.get('input[placeholder*="Digite o lance"]').type('1 9')
      cy.get('button').contains('Enviar').click()
      
      // 1 removes 9, both consumed
      cy.get('.result').eq(1).should('not.contain', '1')
      cy.get('.result').eq(1).should('not.contain', '9')
      cy.get('.result').eq(2).should('contain', '0')
    })

    it('should process 1 with 8 correctly', () => {
      cy.get('input[placeholder*="Digite o lance"]').type('1 8')
      cy.get('button').contains('Enviar').click()
      
      cy.get('.result').eq(1).should('not.contain', '1')
      cy.get('.result').eq(1).should('not.contain', '8')
      cy.get('.result').eq(2).should('contain', '0')
    })

    it('should keep 1 when no higher numbers present', () => {
      cy.get('input[placeholder*="Digite o lance"]').type('1')
      cy.get('button').contains('Enviar').click()
      
      // Only 1, should remain
      cy.get('.result').eq(1).should('contain', '1')
      cy.get('.result').eq(2).should('contain', '1')
    })
  })

  describe('Number 2 Processing Logic', () => {
    it('should process 2 with 8 correctly', () => {
      cy.get('input[placeholder*="Digite o lance"]').type('2 8')
      cy.get('button').contains('Enviar').click()
      
      // 2 removes 8, both consumed
      cy.get('.result').eq(1).should('not.contain', '2')
      cy.get('.result').eq(1).should('not.contain', '8')
      cy.get('.result').eq(2).should('contain', '0')
    })

    it('should process 2 with 7 correctly', () => {
      cy.get('input[placeholder*="Digite o lance"]').type('2 7')
      cy.get('button').contains('Enviar').click()
      
      cy.get('.result').eq(1).should('not.contain', '2')
      cy.get('.result').eq(1).should('not.contain', '7')
      cy.get('.result').eq(2).should('contain', '0')
    })

    it('should process 2 with 1 correctly', () => {
      cy.get('input[placeholder*="Digite o lance"]').type('2 1')
      cy.get('button').contains('Enviar').click()
      
      // 2 removes 1, both consumed
      cy.get('.result').eq(1).should('not.contain', '2')
      cy.get('.result').eq(1).should('not.contain', '1')
      cy.get('.result').eq(2).should('contain', '0')
    })

    it('should keep 2 when no valid targets present', () => {
      cy.get('input[placeholder*="Digite o lance"]').type('2')
      cy.get('button').contains('Enviar').click()
      
      // Only 2, should remain
      cy.get('.result').eq(1).should('contain', '2')
      cy.get('.result').eq(2).should('contain', '2')
    })
  })

  describe('Complex Scenarios', () => {
    it('should handle multiple 1s and 10s', () => {
      cy.get('input[placeholder*="Digite o lance"]').type('1 1 10 10')
      cy.get('button').contains('Enviar').click()
      
      // Should process pairs: 1-10, 1-10, all consumed
      cy.get('.result').eq(2).should('contain', '0')
    })

    it('should handle mixed numbers correctly', () => {
      cy.get('input[placeholder*="Digite o lance"]').type('3 4 5')
      cy.get('button').contains('Enviar').click()
      
      // No 1s or 2s to process, numbers remain
      cy.get('.result').eq(1).should('contain', '3')
      cy.get('.result').eq(1).should('contain', '4')
      cy.get('.result').eq(1).should('contain', '5')
      
      // Average: (3+4+5)/3 = 4.0
      cy.get('.result').eq(2).should('contain', '4')
    })

    it('should handle priority processing (1 takes 10 over 9)', () => {
      cy.get('input[placeholder*="Digite o lance"]').type('1 9 10')
      cy.get('button').contains('Enviar').click()
      
      // 1 should take 10 first, leaving 9
      cy.get('.result').eq(1).should('contain', '9')
      cy.get('.result').eq(1).should('not.contain', '1')
      cy.get('.result').eq(1).should('not.contain', '10')
      cy.get('.result').eq(2).should('contain', '9')
    })

    it('should show "Falha Crítica" when all numbers are consumed', () => {
      cy.get('input[placeholder*="Digite o lance"]').type('1 2 8 10')
      cy.get('button').contains('Enviar').click()
      
      // All should be consumed: 1-10, 2-8
      cy.get('.result').eq(1).should('contain', 'Falha Crítica')
      cy.get('.result').eq(2).should('contain', '0')
    })

    it('should handle brackets with parseSpecialCharSequences disabled', () => {
      cy.get('input[placeholder*="Digite o lance"]').type('{(7+10)}', { parseSpecialCharSequences: false })
      cy.get('button').contains('Enviar').click()
      
      cy.get('.result').eq(0).should('contain', '7')
      cy.get('.result').eq(0).should('contain', '10')
    })
  })

  describe('Average Calculations', () => {
    it('should calculate integer averages correctly', () => {
      cy.get('input[placeholder*="Digite o lance"]').type('6 6 6')
      cy.get('button').contains('Enviar').click()
      
      // (6+6+6)/3 = 6
      cy.get('.result').eq(2).should('contain', '6')
      cy.get('.result').eq(2).should('not.contain', '6.0')
    })

    it('should calculate decimal averages correctly', () => {
      cy.get('input[placeholder*="Digite o lance"]').type('5 6 7')
      cy.get('button').contains('Enviar').click()
      
      // (5+6+7)/3 = 6.0 (should show as integer)
      cy.get('.result').eq(2).should('contain', '6')
    })

    it('should handle decimal results with one decimal place', () => {
      cy.get('input[placeholder*="Digite o lance"]').type('5 6')
      cy.get('button').contains('Enviar').click()
      
      // (5+6)/2 = 5.5
      cy.get('.result').eq(2).should('contain', '5.5')
    })
  })
})
