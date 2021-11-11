describe('Usage Report', () => {
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

  //montly Usage Report
  it('should have a copyright message at the button of the page', () => {
    cy.get('footer').should(
      'have.text',
      ' Copyright © 2021 TriTech Software. All rights reserved. This firm is not a CPA firm -  Open Source Software'
    )
    cy.get('footer>div>a').click()
  })
})
