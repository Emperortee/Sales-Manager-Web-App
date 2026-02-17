describe('Sales Flow App', () => {
  it('Should open dialog when clicking add button', () => {
    cy.visit('http://localhost:3000')
    
    // Now you can use the data-testid
    cy.get('[data-testid="add-sale-button"]').click()
    cy.contains('New Sale').should('be.visible')
  })

  it('Should search for sales', () => {
    cy.visit('http://localhost:3000')
    
    // Use the search input data-testid
    cy.get('[data-testid="search-input"]').type('John Doe')
  })
})