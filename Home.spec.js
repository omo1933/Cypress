describe('Agent Home', () => {
  //visit website and login before each test
  beforeEach(() => {
    cy.visit('/')
    cy.login(Cypress.env('userId'), Cypress.env('password'))
    cy.wait(3000)
    cy.clickNavIcon('Agent')
    cy.wait(3000)
  })

  //logout from website after each test
  afterEach(() => {
    cy.clickNavIcon('Sign Out')
  })

  //navigate to Agent Home Page
  it('should contain total clicks purchased, total clicks used, toal clicks remaining, and contact account representative', () => {
    cy.get('[ng-reflect-router-link="agent/,"] > .igx-button--outlined').should(
      'exist'
    )
    cy.contains('Total Clicks Purchased for 2021').should('exist')
    cy.contains('Total Clicks Used during 2021').should('exist')
    cy.contains('Total Clicks Remaining for 2021').should('exist')
  })
})
