describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  })

  it("should visit root", () => {
  });

  it("should navigate to Tuesday", () => {

    cy.contains("li", "Tuesday")
      .click()
      // .should("have.css", "background-color", "rgb(242, 242, 242)");
      .should("have.class", "day-list__item--selected")
  });
});

