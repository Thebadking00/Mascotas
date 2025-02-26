import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para el formulario
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const API_URL = "https://3.129.250.115/mascotas/";

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setFilteredData(data);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  // Filtrar por nombre
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredData(data.filter((mascota) => mascota.name.toLowerCase().includes(term)));
  };

  // Agregar nueva mascota con POST
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !type) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const nuevaMascota = { name, type };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaMascota),
      });

      if (!response.ok) {
        throw new Error("Error al agregar la mascota");
      }

      const mascotaAgregada = await response.json();
      setData([...data, mascotaAgregada]);
      setFilteredData([...filteredData, mascotaAgregada]);
      setName("");
      setType("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Lista de Mascotas</h1>

      {/* Buscador */}
     

      {/* Formulario para agregar mascotas */}
      <div className="card p-4 mb-4">
        <h2 className="text-center">Agregar Nueva Mascota</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Nombre"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Tipo"
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Agregar</button>
        </form>
      </div>

      {/* Mensajes de carga y error */}
      {loading && <p className="text-center">Cargando mascotas...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={handleSearch}
        className="form-control mb-4"
      />

      {/* Tabla de mascotas */}
      {!loading && !error && (
        <div className="card shadow p-4">
          {filteredData.length > 0 ? (
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((mascota) => (
                  <tr key={mascota.id}>
                    <td>{mascota.id}</td>
                    <td>{mascota.name}</td>
                    <td>{mascota.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No se encontraron mascotas.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
