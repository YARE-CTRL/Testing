import { useEffect, useState } from "react";

type Usuario = {
  id: number;
  name: string;
  email?: string;
};

const ListaUsuario = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const traerDatos = async () => {
      try {
        const res = await fetch(
          "https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users?select=*",
          {
            headers: {
              apikey:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb2pyeWF4YnF1cXR3dnV5aGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ0MTUsImV4cCI6MjA3MzA5MDQxNX0.nZMSWKNIve_UmSe1KEehy9ocL2FIR25QflnccDRQ998",
              authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb2pyeWF4YnF1cXR3dnV5aGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ0MTUsImV4cCI6MjA3MzA5MDQxNX0.nZMSWKNIve_UmSe1KEehy9ocL2FIR25QflnccDRQ998",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Error al traer los datos");
        }

        const data = await res.json();
        setUsuarios(data);
      } catch (err) {
        console.error(err);
        setError("Hubo un problema");
      }
    };

    traerDatos();

    // listener para recargar la lista cuando se crea un usuario desde otro componente
    const onUserCreated = () => {
      traerDatos();
    };

    window.addEventListener('user:created', onUserCreated);

    return () => {
      window.removeEventListener('user:created', onUserCreated);
    };
  }, []);

  if (error) {
    return <div role="alert">{error}</div>;
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar usuario?')) return;
    try {
      const res = await fetch(
        `https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users?id=eq.${id}`,
        {
          method: 'DELETE',
          headers: {
            apikey:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb2pyeWF4YnF1cXR3dnV5aGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ0MTUsImV4cCI6MjA3MzA5MDQxNX0.nZMSWKNIve_UmSe1KEehy9ocL2FIR25QflnccDRQ998',
            authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb2pyeWF4YnF1cXR3dnV5aGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ0MTUsImV4cCI6MjA3MzA5MDQxNX0.nZMSWKNIve_UmSe1KEehy9ocL2FIR25QflnccDRQ998',
          },
        }
      );

      if (res.ok) {
        // refrescar lista
        const refreshed = await fetch(
          'https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users?select=*',
          {
            headers: {
              apikey:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb2pyeWF4YnF1cXR3dnV5aGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ0MTUsImV4cCI6MjA3MzA5MDQxNX0.nZMSWKNIve_UmSe1KEehy9ocL2FIR25QflnccDRQ998',
              authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb2pyeWF4YnF1cXR3dnV5aGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ0MTUsImV4cCI6MjA3MzA5MDQxNX0.nZMSWKNIve_UmSe1KEehy9ocL2FIR25QflnccDRQ998',
            },
          }
        );
        if (refreshed.ok) {
          const data = await refreshed.json();
          setUsuarios(data);
        }
      } else {
        console.error('Error al eliminar', res.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <table aria-label="usuarios">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email ?? '-'}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaUsuario;
