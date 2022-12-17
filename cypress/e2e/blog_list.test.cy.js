describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing')
    cy.request('POST', 'http://localhost:3000/api/users/register', {
      username: 'chheangg',
      name: 'chheang',
      password: 'password'
    })
    cy.visit('http://localhost:3000/')
  })

  it('show login form', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credential', function() {
      cy.get('#username').type('chheangg')
      cy.get('#password').type('password')
      cy.get('form').find('button').click()

      cy.contains('chheang logged in')
    })

    it('fails with wrong credential', function() {
      cy.get('#username').type('chhheangg')
      cy.get('#password').type('password')
      cy.get('form').find('button').click()

      cy.get('.notification').should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-color', 'rgb(255, 0, 0)')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'chheangg', password: 'password' })
      })

      it('successfully add new notes', function() {
        cy.contains('new blog').click()
        cy.get('#title').type('a new blog')
        cy.get('#author').type('George RR Martin')
        cy.get('#url').type('www.justablog.com')
        cy.get('#create-blog').click()

        cy.contains('a new blog')
        cy.contains('George RR Martin')
      })
    })
  })
})