import {render,screen} from "@testing-library/react";
import ListaUsuario from "./ListaUsuario";
import {server} from "../test/msw/server"
import {http,HttpResponse} from "msw"

test(
    "muestra usuarios desde Api",()=>{
        render(<ListaUsuario></ListaUsuario>)
        const tabla=(screen.findAllByRole("table",{name:/usuarios/i}))
        expect(tabla).toBeInTheDocument()
        expect(screen.getByText("Ada Lovelace")).toBeInTheDocument()
        expect(screen.findAllByAltText("Alexandra")).toBeInTheDocument()
    }
)