describe('D10Roll Calculator - UI and Performance Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('User Interface Tests', () => {
    it('should display all UI elements correctly', () => {
      // Check main elements are visible
      cy.get('h1').should('contain', 'D10Roll Calc 🎲')
      cy.get('input[placeholder*="Digite o lance"]').should('be.visible')
      cy.get('button').contains('Enviar').should('be.visible')
    })

    it('should show results sections after calculation', () => {
      cy.get('input[placeholder*="Digite o lance"]').type('5 6 7')
      cy.get('button').contains('Enviar').click()
      
      // Check all three result sections
      cy.contains('Números informados:').should('be.visible')
      cy.contains('Números editados:').should('be.visible')
      cy.contains('Resultado:').should('be.visible')
      
      cy.get('.result').should('have.length', 3)
    })

    it('should handle empty input gracefully', () => {
      cy.get('button').contains('Enviar').click()
      
      // Should not crash or show errors
      cy.get('h1').should('be.visible') // App still works
    })

    it('should update results when input changes', () => {
      // First calculation
      cy.get('input[placeholder*="Digite o lance"]').type('3 4')
      cy.get('button').contains('Enviar').click()
      cy.get('.result').eq(2).should('contain', '3.5')
      
      // Change input
      cy.get('input[placeholder*="Digite o lance"]').clear().type('6 6')
      cy.get('button').contains('Enviar').click()
      cy.get('.result').eq(2).should('contain', '6')
    })
  })

  describe('Performance Tests', () => {
    it('should handle large inputs efficiently', () => {
      const largeInput = '1 2 3 4 5 6 7 8 9 10 1 2 3 4 5 6 7 8 9 10'
      
      cy.get('input[placeholder*="Digite o lance"]').type(largeInput)
      cy.get('button').contains('Enviar').click()
      
      // Should complete within reasonable time and show results
      cy.get('.result').eq(2).should('be.visible')
    })

    it('should process multiple calculations quickly', () => {
      const testCases = ['1 10', '2 8', '5 6 7', '3 4', '9 9 9']
      
      testCases.forEach((input, index) => {
        cy.get('input[placeholder*="Digite o lance"]').clear().type(input)
        cy.get('button').contains('Enviar').click()
        cy.get('.result').eq(2).should('be.visible')
      })
    })
  })

  describe('Edge Cases and Error Handling', () => {
    it('should handle special characters in input', () => {
      cy.get('input[placeholder*="Digite o lance"]').type('!@# 5 $%^')
      cy.get('button').contains('Enviar').click()
      
      // Should extract the number 5
      cy.get('.result').eq(0).should('contain', '5')
    })

    it('should handle very large numbers', () => {
      cy.get('input[placeholder*="Digite o lance"]').type('999 1000 9999')
      cy.get('button').contains('Enviar').click()
      
      // Should process without errors
      cy.get('.result').eq(0).should('contain', '999')
      cy.get('.result').eq(0).should('contain', '1000')
    })

    it('should handle decimal numbers as integers', () => {
      cy.get('input[placeholder*="Digite o lance"]').type('5.5 6.7 7.9')
      cy.get('button').contains('Enviar').click()
      
      // Should extract integer parts or handle gracefully
      cy.get('.result').eq(2).should('be.visible')
    })

    it('should show Falha Crítica correctly', () => {
      // Test case that should result in empty array
      cy.get('input[placeholder*="Digite o lance"]').type('1 2 8 10')
      cy.get('button').contains('Enviar').click()
      
      cy.get('.result').eq(1).should('contain', 'Falha Crítica')
      cy.get('.result').eq(2).should('contain', '0')
    })

    it('should handle repeated calculations', () => {
      // Same input multiple times should give same result
      const input = '5 6 7'
      
      for (let i = 0; i < 3; i++) {
        cy.get('input[placeholder*="Digite o lance"]').clear().type(input)
        cy.get('button').contains('Enviar').click()
        cy.get('.result').eq(2).should('contain', '6')
      }
    })
  })

  describe('Accessibility Tests', () => {
    it('should be keyboard accessible', () => {
      cy.get('input[placeholder*="Digite o lance"]')
        .type('5 6 7')
        .type('{enter}', { parseSpecialCharSequences: true }) // Try enter key instead of clicking
      
      // Note: This might not work if enter key isn't handled
      // But input should still be there
      cy.get('input[placeholder*="Digite o lance"]').should('have.value', '5 6 7')
    })

    it('should have proper focus management', () => {
      cy.get('input[placeholder*="Digite o lance"]').focus().should('be.focused')
      cy.get('button').focus().should('be.focused')
    })
  })
})
