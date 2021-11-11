describe.skip('Click Single Address Tab and lookupByAddress', () => {
  //visit website and login before each test
  beforeEach(() => {
    cy.visit('/')
    cy.login(Cypress.env('userId'), Cypress.env('password'))
    cy.wait(2000)
    cy.clickNavIcon('Agent')
  })

  //logout from website after each test
  afterEach(() => {
    cy.clickNavIcon('Sign Out')
  })

  //Address lookup by Address
  it('should look up address', () => {
    cy.wait(1000)
    cy.get('button').contains('Single Address Lookup').click()
    cy.wait(1000)
    cy.lookupByAddress('400 OWSLEY FORK RD', 'Berea', '40403', '30')
    cy.wait(100)
  })
})
