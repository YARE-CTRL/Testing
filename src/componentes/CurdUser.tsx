import React from 'react'
import { useState, useEffect } from "react";

const CurdUser:React.FC = () => {

         const[name,setName]=useState("");
     const [email,setEmail]=useState("");
     const [users, setUsers] = useState<Array<{id: number; name: string; email?: string}>>([]);
     const [editingId, setEditingId] = useState<number | null>(null);
     const [loading, setLoading] = useState(false);

    const API_URL = "https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users";
    const HEADERS = {
        "Content-Type": "application/json",
        apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb2pyeWF4YnF1cXR3dnV5aGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ0MTUsImV4cCI6MjA3MzA5MDQxNX0.nZMSWKNIve_UmSe1KEehy9ocL2FIR25QflnccDRQ998",
        authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb2pyeWF4YnF1cXR3dnV5aGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ0MTUsImV4cCI6MjA3MzA5MDQxNX0.nZMSWKNIve_UmSe1KEehy9ocL2FIR25QflnccDRQ998",
        Prefer: "return=representation",
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}?select=*`, { headers: HEADERS });
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            } else {
                console.error("Error al obtener usuarios", res.status);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const guardar = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                // Update
                const res = await fetch(`${API_URL}?id=eq.${editingId}`, {
                    method: "PATCH",
                    headers: HEADERS,
                    body: JSON.stringify({ name, email }),
                });
                if (res.ok) {
                    await fetchUsers();
                    setName("");
                    setEmail("");
                    setEditingId(null);
                } else {
                    console.error("Error al actualizar", res.status);
                }
            } else {
                // Create
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: HEADERS,
                    body: JSON.stringify({ name, email }),
                });

                if (response.ok) {
                    await fetchUsers();
                    setName("");
                    setEmail("");
                } else {
                    const errorData = await response.json();
                    console.error("Error al crear usuario:", errorData);
                    console.error("Status:", response.status);
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleEdit = (user: { id: number; name: string; email?: string }) => {
        setEditingId(user.id);
        setName(user.name || "");
        setEmail(user.email || "");
    };

    const handleDelete = async (id: number) => {
        if (!confirm("¿Eliminar usuario?")) return;
        try {
            const res = await fetch(`${API_URL}?id=eq.${id}`, {
                method: "DELETE",
                headers: HEADERS,
            });
            if (res.ok) {
                await fetchUsers();
            } else {
                console.error("Error al eliminar", res.status);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setName("");
        setEmail("");
    };




    return (
        <div>
            <h1>{editingId ? "Actualizar Usuario" : "Crear Usuarios"}</h1>

            <form onSubmit={guardar}>
                <label htmlFor="name">Nombre</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">{editingId ? "Actualizar" : "Crear"}</button>
                {editingId && (
                    <button type="button" onClick={handleCancel} style={{ marginLeft: 8 }}>
                        Cancelar
                    </button>
                )}
            </form>

            <hr />

            <h2>Usuarios</h2>
            {loading ? (
                <p>Cargando...</p>
            ) : (
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
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email ?? "-"}</td>
                                <td>
                                    <button onClick={() => handleEdit(u)}>Editar</button>
                                    <button onClick={() => handleDelete(u.id)} style={{ marginLeft: 8 }}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default CurdUser