import {render,screen} from "@testing-library/react";
import Mensaje from "./Mensaje";

test(
    "muestra Mensaje por pantalla",() =>{
        render(<Mensaje></Mensaje>);
        expect(screen.getByRole("alert"))
        .toHaveTextContent("Hola")
    }
)