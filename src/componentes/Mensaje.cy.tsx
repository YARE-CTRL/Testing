
import Mensaje from "./Mensaje";

describe(
    "Mensaje",()=>{
        it("muestra saludo",()=>{
            
            cy.mount(<Mensaje></Mensaje>);
            cy.contains("COMPONENTE PRUEBA")
        })
    }
)