import { render, screen, waitFor } from "@testing-library/react";
import ListaUsuario from "./ListaUsuario";
import { server } from "../test/msw/server";
import { http, HttpResponse } from "msw";

test(
  "muestra usuarios desde Api",
  async () => {
    render(<ListaUsuario />);
    const tabla = await screen.findByRole("table", { name: /usuarios/i });
    expect(tabla).toBeInTheDocument();
    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
    expect(screen.getByText("Alexandra")).toBeInTheDocument();
  }
);

test(
  "muestra errores si la API falla",
  async () => {
    server.use(
      http.get(
        "https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users?select=*",
        () => HttpResponse.text("error", { status: 500 })
      )
    );

    render(<ListaUsuario />);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Hubo un problema");
    });
  }
);
