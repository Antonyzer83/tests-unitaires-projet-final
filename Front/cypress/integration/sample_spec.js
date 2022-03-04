describe('Marketplace', () => {
  it('Go on one product', () => {
    cy.visit('http://localhost:3000/');

    cy.get('.product-div').click();
  });
});