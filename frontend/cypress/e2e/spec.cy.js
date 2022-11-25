import react from 'react';

describe('complete e to e test', () => {
  it('e to e test', () => {
    cy.visit('localhost:3002/')
    cy.contains('Create and download your professional certificates for free')
    cy.contains('Create a certificate now')
    cy.contains('Create your certificate with ease')
    cy.contains('Single')
    cy.contains('Bulk')
    cy.contains('Certificate Title')
    cy.contains('Create Certificate')
    cy.contains('Create bulk Certificates in 3 easy steps')
    cy.contains('Create Bulk Certificates')
    cy.contains('Testimonials')
  })
})