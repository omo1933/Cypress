const buttons = [
  'Primary',
  'Success',
  'Info',
  'Warning',
  'Danger',
  'Link',
  'Left',
  'Middle',
  'Right',
  '1',
  '2',
  'Dropdown'
]

const checkboxes = ['#checkbox-1', '#checkbox-2', '#checkbox-3']

const dates = ['12', '13', '14', '15', '16']

Cypress._.times(5, () => {
  describe('Formy practice page', () => {
    beforeEach(() => {
      cy.visit('https://formy-project.herokuapp.com/')
    })
    specify('Buttons', () => {
      cy.get('.btn').contains('Buttons').should('exist').click()
      buttons.map((button) => {
        if (button === 'Dropdown') {
          cy.get('#btnGroupDrop1').should('exist').click()
          cy.contains('Dropdown link 1')
            .should('exist')
            .and('have.text', 'Dropdown link 1')
            .click()
        } else {
          cy.contains(button).should('exist').and('have.text', button).click()
        }
      })
    })

    specify('Checkboxes', () => {
      cy.get('.btn').contains('Checkbox').should('exist').click()
      checkboxes.map((checkbox) => {
        cy.get(checkbox).should('exist').check()
      })
    })

    specify('Datepicker', () => {
      cy.get('.btn').contains('Datepicker').should('exist').click()
      dates.map((date) => {
        cy.get('#datepicker').should('exist').click()
        cy.get('.day').contains(date).click()
      })
    })

    specify('Form', () => {
      cy.get('.nav-link').contains('Form').should('exist').click()
      cy.get('#first-name').should('exist').click()
      cy.get('#first-name').should('exist').type('Santa')
      cy.get('#last-name').should('exist').type('Clause')
      cy.get('#job-title').should('exist').type('Father Christmas')
      cy.get('#radio-button-3').should('exist').click()
      cy.get('#checkbox-3').should('exist').click()
      cy.get('#select-menu').should('exist').select('4')
      cy.get('#datepicker').should('exist').click()
      cy.get('.day').contains(dates[1]).click()
      cy.contains('Submit').should('exist').click()
      cy.url('https://formy-project.herokuapp.com/thanks')
      cy.get('.alert')
        .invoke('text')
        .should('contain', 'The form was successfully submitted!')
    })
  })
})
