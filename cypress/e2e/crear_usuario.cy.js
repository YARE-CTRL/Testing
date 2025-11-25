describe("Crear Usuario", () => {
    it("Debería crear un nuevo usuario exitosamente", () => {
        cy.intercept('POST', 'https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users').as('createUser');
        
        cy.visit("http://localhost:5174/");
        cy.get('input').eq(0).type("NuevoUsuario");
        cy.get('input').eq(1).type("admin@test.com");
        cy.contains('Crear Usuario').click();
        cy.get("button[type='submit']").click();

        cy.wait('@createUser').its('request.body').should('deep.equal', {
            name: "NuevoUsuario",
            email: "admin@test.com"
        });
    });
});