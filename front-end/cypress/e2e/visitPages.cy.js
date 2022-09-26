describe("Go to /top", () => {
    it("should visit /top", () => {
        cy.visit('localhost:3000')
        cy.intercept("GET", "/recommendations/top/*").as("getTop");
        cy.get('.toTop').click();
        cy.wait("@getTop");
  
        cy.url().should("equal", "http://localhost:3000/top");
    });
  });
  
  describe("Go to /random", () => {
    it("should visit the pages correctly", () => {
        cy.visit('localhost:3000')
        cy.intercept("GET", "/recommendations/random").as("getRandom");
        cy.get('.toRandom').click();
        cy.wait("@getRandom");
  
        cy.url().should("equal", "http://localhost:3000/random");
    });
  });

  describe("Go to /home", () => {
    it("should visit the pages correctly", () => {
        cy.visit('localhost:3000/random')
        cy.intercept("GET", "/recommendations").as("getHome");
        cy.get('.toHome').click();
        cy.wait("@getHome");
  
        cy.url().should("equal", "http://localhost:3000/");
    });
  });