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
Cypress.Commands.add("login", (email, password) => {
  if (email) {
    cy.get("#mail").type(email);
  }
  if (password) {
    cy.get("#pass").type(password);
  }
  cy.contains("Submit").click();
});

Cypress.Commands.add("addBook", (title, description, authors) => {
  cy.contains("Books list").click();
  cy.contains("Add new").click();
  if (title) {
    cy.get("#title").type(title);
  }
  if (description) {
    cy.get("#description").type(description);
  }
  if (authors) {
    cy.get("#authors").type(authors);
  }
  cy.contains("Submit").click();
});

Cypress.Commands.add("addBookWithFavourite", (title, description, authors) => {
  cy.contains("Books list").click();
  cy.contains("Add new").click();
  if (title) {
    cy.get("#title").type(title);
  }
  if (description) {
    cy.get("#description").type(description);
  }
  if (authors) {
    cy.get("#authors").type(authors);
  }
  cy.get("#favorite").click();
  cy.contains("Submit").click();
});

Cypress.Commands.add("deleteBookFromFavourite", (title) => {
  cy.contains(title).contains("Delete from favorite").click();
});

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
