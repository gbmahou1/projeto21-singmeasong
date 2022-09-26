import { faker } from '@faker-js/faker'

describe('Crete Recomendation and vote', () => {

  beforeEach(() => {
    cy.request("POST", "http://localhost:5000/e2e/reset", {})
  });

  it('Trying to create a recomendation and test the voting', () => {
    
    const name = `${faker.lorem.words(2)}`;
    const link = 'https://www.youtube.com/watch?v=kZcFPuXMyUg&list=RDkZcFPuXMyUg&start_radio=1';
    
    cy.visit('localhost:3000')

    cy.get('input[placeholder="Name"]').type(name);
    cy.get('input[placeholder="https://youtu.be/..."]').type(link);

    cy.intercept("POST", "http://localhost:5000/recommendations").as("createRecommendation");
    cy.get("button").click();
    cy.wait("@createRecommendation");

    cy.contains(name);
    for (let i = 0; i < 5; i++)
    {
      cy.get('.upVote').click();
    }
    cy.get('.score').should("have.text", "5");

    for (let i = 0; i < 2; i++)
    {
      cy.get('.downVote').click();
    }
    cy.get('.score').should("have.text", "3");

  });
});