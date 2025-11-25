import React from 'react'
import { useState } from "react";

const CurdUser:React.FC = () => {

       const[name,setName]=useState("");
    const [email,setEmail]=useState("");

    const guardar=async(e: React.FormEvent)=>{
        e.preventDefault();
        
        try {
            const response = await fetch("https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users",{
                method:"POST",
                headers: {
                    "Content-Type":"application/json",
                    apikey:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb2pyeWF4YnF1cXR3dnV5aGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ0MTUsImV4cCI6MjA3MzA5MDQxNX0.nZMSWKNIve_UmSe1KEehy9ocL2FIR25QflnccDRQ998",
                    authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb2pyeWF4YnF1cXR3dnV5aGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ0MTUsImV4cCI6MjA3MzA5MDQxNX0.nZMSWKNIve_UmSe1KEehy9ocL2FIR25QflnccDRQ998",
                    "Prefer": "return=representation"
                },
                body:JSON.stringify({name,email})
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log("Usuario creado:", data);
                setName("");
                setEmail("");
            } else {
                const errorData = await response.json();
                console.error("Error al crear usuario:", errorData);
                console.error("Status:", response.status);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }




  return (
    <div>
            <h1>Crear Usuarios</h1>
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
                <button type="submit">Crear</button>
            </form>
        </div>
  )
}

export default CurdUser