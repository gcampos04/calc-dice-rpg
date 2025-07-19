describe('D10Roll Calculator - Data Driven Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should run basic tests from fixtures', () => {
    cy.fixture('test-data').then((data: any) => {
      data.basicTests.forEach((testCase: any) => {
        cy.log(`Testing: ${testCase.description}`)
        
        // Clear previous input and enter new test case
        cy.get('input[placeholder*="Digite o lance"]')
          .clear()
          .type(testCase.input)
        
        cy.get('button').contains('Enviar').click()
        
        // Verify expected numbers are shown
        testCase.expectedNumbers.forEach((num: any) => {
          cy.get('.result').eq(0).should('contain', num)
        })
        
        // Verify result
        cy.get('.result').eq(2).should('contain', testCase.expectedResult)
      })
    })
  })

  it('should run processing tests from fixtures', () => {
    cy.fixture('test-data').then((data: any) => {
      data.processTests.forEach((testCase: any) => {
        cy.log(`Testing: ${testCase.description}`)
        
        cy.get('input[placeholder*="Digite o lance"]')
          .clear()
          .type(testCase.input)
        
        cy.get('button').contains('Enviar').click()
        
        // Verify result
        cy.get('.result').eq(2).should('contain', testCase.expectedResult)
      })
    })
  })

  it('should run complex tests from fixtures', () => {
    cy.fixture('test-data').then((data: any) => {
      data.complexTests.forEach((testCase: any) => {
        cy.log(`Testing: ${testCase.description}`)
        
        cy.get('input[placeholder*="Digite o lance"]')
          .clear()
          .type(testCase.input)
        
        cy.get('button').contains('Enviar').click()
        
        if (testCase.expectedProcessed === 'Falha Crítica') {
          cy.get('.result').eq(1).should('contain', 'Falha Crítica')
        }
        
        if (testCase.expectedRemaining) {
          testCase.expectedRemaining.forEach((num: any) => {
            cy.get('.result').eq(1).should('contain', num)
          })
        }
        
        cy.get('.result').eq(2).should('contain', testCase.expectedResult)
      })
    })
  })

  it('should handle edge cases from fixtures', () => {
    cy.fixture('test-data').then((data: any) => {
      data.edgeCases.forEach((testCase: any) => {
        cy.log(`Testing: ${testCase.description}`)
        
        // Check if input contains special characters that need parseSpecialCharSequences: false
        const hasSpecialChars = testCase.input.includes('{') || testCase.input.includes('[')
        const typeOptions = hasSpecialChars ? { parseSpecialCharSequences: false } : {}
        
        cy.get('input[placeholder*="Digite o lance"]')
          .clear()
          .type(testCase.input, typeOptions)
        
        cy.get('button').contains('Enviar').click()
        
        if (testCase.expectedNumbers) {
          testCase.expectedNumbers.forEach((num: any) => {
            cy.get('.result').eq(0).should('contain', num)
          })
        }
        
        if (testCase.expectedResult) {
          cy.get('.result').eq(2).should('contain', testCase.expectedResult)
        }
      })
    })
  })
})
