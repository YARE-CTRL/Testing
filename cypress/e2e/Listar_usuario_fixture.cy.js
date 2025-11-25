describe("listar datoas de usuario con fixture",()=>{
    it("listar usuario correctamente usando fixture",()=>{
        cy.fixture('ListarUsuarios').then((mock) => {
            cy.intercept('GET',
                 'https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users*',
                 mock
            ).as('listarmockUsers');
           
            cy.visit("http://localhost:5174/")
            cy.wait('@listarmockUsers');

            mock.forEach((user) =>  {
                cy.contains(user.name)
            });

            cy.get("table tbody tr").should("exist");
            cy.get("table tbody tr").its("length").should("be.gte", mock.length)
        });
    })
})