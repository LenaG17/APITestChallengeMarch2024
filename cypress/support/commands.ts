/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare namespace Cypress {
  interface Chainable<Subject> {
    addNewProduct(product: any): Chainable<any>;
    updateProductById(id: any): Chainable<any>;
    deleteProductById(id: any): Chainable<any>;
  }
}
let productData;
let receivedId;
Cypress.Commands.add('addNewProduct', (product) => {
  cy.fixture('productInfo.json').then((productData) => {
    cy.request({
      method: 'POST',
      url: 'https://dummyjson.com/products/add',
      body: productData,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body.title).to.eq(productData.title);
      console.log('Just added product', response.body);
      receivedId = response.body.id;
    });
  });
});

Cypress.Commands.add('updateProductById', (id) => {
  cy.request({
    method: 'PUT',
    url: `https://dummyjson.com/products/${id}`,
    body: JSON.stringify({ title: 'Lena did it!' }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    console.log('Just updated product', response.body);
  });
});

Cypress.Commands.add('deleteProductById', (id) => {
  cy.request({
    method: 'DELETE',
    url: `https://dummyjson.com/products/${id}`,
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});
