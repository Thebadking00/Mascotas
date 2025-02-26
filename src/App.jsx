import { useFetch } from "./useFetch";
import FormularioMascota from "./components/FormularioMascota";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function App() {
  const { data, loading, error } = useFetch("http://127.0.0.1:5000/mascotas/");
  const [mascotas, setMascotas] = useState([]);

  const handleMascotaAgregada = (nuevaMascota) => {
    setMascotas((prevMascotas) => [...prevMascotas, nuevaMascota]);
  };

  return (
    <div className="container d-flex flex-column align-items-center vh-100 py-4">
      <h1 className="text-center mb-4">Lista de Mascotas</h1>


      <FormularioMascota onMascotaAgregada={handleMascotaAgregada} />

      <div className="card shadow p-4 w-100">
        {loading && <p className="text-center">Cargando mascotas...</p>}
        {error && <p className="text-center text-danger">Error: {error}</p>}

        {!loading && !error && (data.length > 0 || mascotas.length > 0) ? (
          <table className="table table-striped table-hover table-centered">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {[...data, ...mascotas].map((mascota) => (
                <tr key={mascota.id}>
                  <td>{mascota.id}</td>
                  <td>{mascota.name}</td>
                  <td>{mascota.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && !error && <p className="text-center">No hay mascotas disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default App;
