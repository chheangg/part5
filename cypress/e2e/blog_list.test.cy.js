describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing')
    cy.visit('http://localhost:3000/')
  })

  it('show login form', function() {
    cy.contains('Log in to application')
  })
})