// Cypress._.times(5, () => {
describe('login to Agent through the navigation button', () => {
  //visit website and login before each test
  beforeEach(() => {
    cy.visit('/')
    cy.wait(2000)
    cy.login(Cypress.env('userId'), Cypress.env('password'))
  })

  //logout from website after each test
  afterEach(() => {
    cy.clickNavIcon('Sign Out')
  })

  //navigate to Agent landing pager from Navigation Icon
  it('should be able to navigate to Agent', () => {
    cy.wait(1000)
    cy.clickNavIcon('Agent')
    cy.wait(1000)
  })

  //navigate to Agent landing page from navigation card
  it('should be able to navigate to Agent', () => {
    cy.wait(1000)
    cy.clickNavCard('Agent')
    cy.wait(1000)
  })
})
//})
