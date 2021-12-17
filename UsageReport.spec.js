export const usageReport = (year, reportButtonUsed) => {
  cy.contains('Usage Report').should('exist').click()
  cy.wait(1000)
  cy.contains(`Total Clicks Purchased for ${year}`).should('exist')
  cy.contains(`Total Clicks Used during ${year}`).should('exist')
  cy.contains(`Total Clicks Remaining for ${year}`).should('exist')
  //click monthly button
  cy.get(`button[aria-label=${reportButtonUsed}]`).should('exist').click()
}

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
  it('should contain montly usage report', () => {
    usageReport(2021, 'Monthly')
    //how table should look like when you click montly button
    cy.get('igx-grid-header-group')
      .should('exist')
      .and('contain', 'Year')
      .and('contain', 'IP Address')
      .and('contain', 'Total Clicks')
      .and('contain', 'Total Used Clicks')
      .and('contain', 'Good Clicks')
      .and('contain', 'Bad Clicks')
      .and('contain', 'January')
      .and('contain', 'February')
      .and('contain', 'March')
      .and('contain', 'April')
      .and('contain', 'May')
    //click scroll bar to the right
    cy.get('.igx-vhelper--horizontal').scrollTo('right')
    cy.get('igx-grid-header-group')
      .should('exist')
      .and('contain', 'June')
      .and('contain', 'July')
      .and('contain', 'August')
      .and('contain', 'September')
      .and('contain', 'October')
      .and('contain', 'November')
      .and('contain', 'December')
  })

  //quarterly Usage Report
  it('should contain quarterly usage report', () => {
    usageReport(2021, 'Quarterly')
    //how table should look like when you click montly button
    cy.get('igx-grid-header-group')
      .should('exist')
      .and('contain', 'Year')
      .and('contain', 'IP Address')
      .and('contain', 'Total Clicks')
      .and('contain', 'Total Used Clicks')
      .and('contain', 'Good Clicks')
      .and('contain', 'Bad Clicks')
      .and('contain', 'Q1')
      .and('contain', 'Q2')
      .and('contain', 'Q3')
      .and('contain', 'Q4')
  })

  //do not show IP Address

  it('should not show IP address', () => {
    const year = 2021
    cy.contains('Usage Report').should('exist').click()
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
    //click monthly button
    cy.contains("Don't show IP").should('exist').click()
    cy.get('igx-grid-header-group')
      .should('exist')
      .and('not.contain', 'IP Address')
  })

  //show IP Address
  it('should show IP address', () => {
    const year = 2021
    cy.contains('Usage Report').should('exist').click()
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
    //click monthly button
    cy.contains('Show IP').should('exist').click()
    cy.get('igx-grid-header-group').should('exist').and('contain', 'IP Address')
  })

  //Export buttons exist
  it.only('should have export button. Export button downloads file when clicked', () => {
    cy.contains('Usage Report').should('exist').click()
    cy.wait(1000)
    //clicks export to csv button
    cy.contains('Export to CSV').should('exist').click()
    cy.wait(2000)
    // call the parseXlsx task we created above to parse the excel and return data as json
    cy.parseXlsx('cypress/downloads/UsageReport.csv').then((jsonData) => {
      // finally we write the assertion rule to check if that data matches the data we expected the excel file to have
      expect(jsonData[0].data[3][0]).to.eq('2021 - Total')
      //clicks purchased
      expect(jsonData[0].data[3][2]).to.eq(5000)
    })
  })
})
