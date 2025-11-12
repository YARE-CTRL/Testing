

const UserList:React.FC=()=>{
    const guardar=()=>[
        fetch("https://skojryaxbquqtwvuyhfv.supabase.co",{
            method:"POST",
               headers: {
                "Content-Type":"application/json",
              apikey:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb2pyeWF4YnF1cXR3dnV5aGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ0MTUsImV4cCI6MjA3MzA5MDQxNX0.nZMSWKNIve_UmSe1KEehy9ocL2FIR25QflnccDRQ998",
              authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb2pyeWF4YnF1cXR3dnV5aGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ0MTUsImV4cCI6MjA3MzA5MDQxNX0.nZMSWKNIve_UmSe1KEehy9ocL2FIR25QflnccDRQ998",
            },
        })
    ]
    return(
        <div>
            <h1>Crear Usuarios</h1>
            <form onSubmit ={guardar()}>
                <label htmlFor="name">Nombre</label>
                <input type="text" id="name" name="name" />
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" />
                <button type="submit">Crear</button>
            </form>
        </div>

    )
}
export default UserList;