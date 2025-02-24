import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch("http://3.129.250.115/mascotas/")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      })
      .catch((error) => console.error("Error al obtener datos:", error));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = data.filter((mascota) =>
      mascota.name.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100" id="app">
      <div className="text-center">
        <h1 className="text-center mb-4">Lista de Mascotas</h1>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={handleSearch}
          className="form-control mb-4"
        />
        <div className="card shadow p-4">
          {filteredData.length > 0 ? (
            <table className="table table-striped table-hover table-centered">
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
            <p className="text-center">Cargando mascotas...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
