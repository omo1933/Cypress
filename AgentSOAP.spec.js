//PO Box Addresses
const Address1 = {
  SourceStreet: 'P O BOX 313',
  SourceCity: 'BARLOW',
  SourceState: 'KY',
  SourceZip: '42024',
  LOB: 'L'
}
const Address2 = {
  SourceStreet: 'RT 2 BOX 323',
  SourceCity: 'BARDWELL',
  SourceState: 'KY',
  SourceZip: '42023',
  LOB: 'L'
}
const Address3 = {
  SourceStreet: 'PO BOX 317',
  SourceCity: 'BONNYMAN',
  SourceState: 'KY',
  SourceZip: '41719',
  LOB: 'L'
}
const Address4 = {
  SourceStreet: 'P O BOX 612',
  SourceCity: 'MCDOWELL',
  SourceState: 'KY',
  SourceZip: '41647',
  LOB: 'L'
}

const addressToAllocate = [Address1, Address2, Address3, Address4]

//function to allocate address
export const allocateAddress = (URL, filePath) => {
  addressToAllocate.map((address) => {
    cy.visit(URL)
    cy.get('#CompanyID').type(Cypress.env('Companyname'))
    cy.get('#Password').type(Cypress.env('SOAPPassword'))
    cy.get('#SourceStreet').type(address['SourceStreet'])
    cy.get('#SourceCity').type(address['SourceCity'])
    cy.get('#SourceState').type(address['SourceState'])
    cy.get('#SourceZipCode').type(address['SourceZip'])
    cy.get('#LineOfBusiness').type(address['LOB'])
    cy.get('#EffectiveDate').type('2021-11-08')
    cy.get('#allocate').click()
    cy.wait(1000)
    cy.readFile(filePath).should('exist')
  })
}

//Cypress Tests
describe('Agent SOAP', () => {
  it('Get Request1: Should allocate an Address', () => {
    allocateAddress(
      'https://omo1933.github.io/9jas_Mandela/UI/TestAgent.html',
      'cypress/downloads/download'
    )
  })

  it('Get Request2: Should allocate an Address', () => {
    allocateAddress(
      'https://omo1933.github.io/9jas_Mandela/UI/TestAgent1.html',
      'cypress/downloads/download'
    )
  })

  it('Get Request3: Should allocate an Address', () => {
    allocateAddress(
      'https://omo1933.github.io/9jas_Mandela/UI/TestAgent2.html',
      'cypress/downloads/AllocateAddress'
    )
  })

  it('Get Request4: Should allocate an Address', () => {
    allocateAddress(
      'https://omo1933.github.io/9jas_Mandela/UI/TestAgent3.html',
      'cypress/downloads/f.txt'
    )
  })
})
