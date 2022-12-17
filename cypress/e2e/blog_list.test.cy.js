describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing')
    cy.createUser({
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

      it('successfully add new blog', function() {
        cy.contains('new blog').click()
        cy.get('#title').type('a new blog')
        cy.get('#author').type('George RR Martin')
        cy.get('#url').type('www.justablog.com')
        cy.get('#create-blog').click()

        cy.contains('a new blog')
        cy.contains('George RR Martin')
      })

      describe('a blog is created', function() {
        beforeEach(function() {
          cy.createBlog({ title: 'a new blog', author: 'George RR Martin', url: 'www.justablog.com' })
        })

        it('successfully likes a blog', function() {
          cy.get('.expand-blog').click()
          cy.get('.like-btn').click()
          cy.contains('a new blog').parent().contains('likes 1')
        })
      })

      describe('blog deletion', function() {
        beforeEach(function() {
          cy.createUser({
            username: 'Mark',
            name: 'Mark',
            password: 'password'
          })

          cy.getToken({ username: 'Mark', password: 'password' })
            .then(data => {
              cy.createBlog({ title: 'Chheang submit', author: 'George RR Martin', url: 'www.justablog.com' })
              cy.createBlog({ title: 'Mark submit', author: 'George RR Martin', url: 'www.justablog.com', token: data.token })
            })
        })

        it('successfully delete own blog', function() {
          cy.contains('Chheang submit').parent().as('chheangBlog')
          cy.get('@chheangBlog').find('.expand-blog').click()
          cy.get('@chheangBlog').find('.remove-btn').click()

          cy.get('html').should('not.contain', 'Chheang submit')
        })

        it('fail to find delete button on other\'s blog', function() {
          cy.contains('Mark submit').parent().as('markBlog')
          cy.get('@markBlog').find('.expand-blog').click()
          cy.get('@markBlog').should('not.contain', 'remove')
        })
      })

      describe('multiple blog', function() {
        beforeEach(function() {
          cy.createBlog({ title: 'Blog with second least like', author: 'George RR Martin', url: 'www.justablog.com' })
          cy.createBlog({ title: 'Blog with least like', author: 'George RR Martin', url: 'www.justablog.com' })
          cy.createBlog({ title: 'Blog with most like', author: 'George RR Martin', url: 'www.justablog.com' })

          cy.visit('http://localhost:3000/')
          
          cy.likeBlog('Blog with least like', 5)
          cy.likeBlog('Blog with second least like', 7)
          cy.likeBlog('Blog with most like', 10)

          cy.visit('http://localhost:3000/')
        })

        it('blogs are ordered correctly', function() {
          cy.get('.blog').eq(0).contains('Blog with most like')
          cy.get('.blog').eq(1).contains('Blog with second least like')
          cy.get('.blog').eq(2).contains('Blog with least like')
        })
      })
    })
  })
})