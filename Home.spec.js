const year = 2021
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
    //Total Clicks
    cy.contains(`Total Clicks Purchased for ${year}`).should('exist')
    cy.wait(1000)
    cy.get('.usage-numbers').then(($usageNumbers) => {
      const clicksPurchased = $usageNumbers.first().text()
      const clicksUsed = $usageNumbers.eq(1).text()
      const clicksRemaining = $usageNumbers.eq(2).text()
      const expectedPurchased = parseInt(clicksUsed) + parseInt(clicksRemaining)
      const expectedClicksUsed =
        parseInt(clicksPurchased) - parseInt(clicksRemaining)
      const expectedClicksRemaining =
        parseInt(clicksPurchased) - parseInt(clicksUsed)
      cy.log(clicksRemaining)
      cy.log(clicksUsed)
      cy.log(clicksPurchased)
      expect(clicksPurchased).to.eq(expectedPurchased.toString())
      expect(clicksUsed).to.eq(expectedClicksUsed.toString())
      expect(clicksRemaining).to.eq(expectedClicksRemaining.toString())
    })
    cy.contains(`Total Clicks Used during ${year}`).should('exist')
    cy.contains(`Total Clicks Remaining for ${year}`).should('exist')
    //Quarterly Usage Summary Graphy
    cy.get('h3').invoke('text').should('eq', 'Quarterly Usage Summary')
    cy.get('.ig-chart-legend-item-text')
      .eq(0)
      .invoke('text')
      .should('eq', '2020')
    cy.get('.ig-chart-legend-item-text')
      .eq(1)
      .invoke('text')
      .should('eq', '2021')
    cy.get(
      '[style="position: absolute; top: 0px; left: 0px; touch-action: none; user-select: none; width: 600px; height: 425px; outline: 0px;"]'
    ).trigger('mouseover')
  })
})
