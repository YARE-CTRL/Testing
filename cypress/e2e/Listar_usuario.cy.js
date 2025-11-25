describe("listar user",()=>{
it("listar usuario correctamente",()=>{
    cy.visit("http://localhost:5174/")
    cy.intercept('GET', 'https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users')
    .as('getUsersList');
    cy.get("table tbody tr").should("exist");
    cy.get("table tbody tr").its("length").should("be.gte",0)
    cy.get("table tbody tr").each(($tr)=>{
        cy.wrap($tr).find("td").eq(0).should("not.be.empty");
        cy.wrap($tr).find("td").eq(1).should("not.be.empty");

    })
})
})