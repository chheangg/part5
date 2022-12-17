// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createUser', ({ username, name, password }) => {
  cy.request('POST', 'http://localhost:3003/api/users/register', {
    username, name, password
  })
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/users/login', {
    username, password
  }).then(response => {
    localStorage.setItem('BlogLoggedinUser', JSON.stringify(response.body))
    cy.visit('http://localhost:3000/')
  })
})

Cypress.Commands.add('getToken', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/users/login', {
    username, password
  }).then(response => {
    return response.body
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url, token }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: {
      title,
      author,
      url
    },
    headers: {
      'Authorization': `bearer ${ token ? token : JSON.parse(localStorage.getItem('BlogLoggedinUser')).token}`
    }
  })
  cy.visit('http://localhost:3000/')
})

Cypress.Commands.add('likeBlog', (blogTitle, likes) => {
  cy.contains(blogTitle).parent().as('blogComponent')
  cy.get('@blogComponent').find('.expand-blog').click()

  for (let i = likes; i > 0; i--) {
    setTimeout(() => cy.get('@blogComponent').find('.like-btn').click(), i * 100)
  }
})