import { useState } from "react";

function FormularioMascota({ onMascotaAgregada }) {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    const nuevaMascota = { name: nombre, type: tipo };

    try {
      const response = await fetch("http://127.0.0.1:5000/mascotas/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaMascota),
      });

      if (!response.ok) {
        throw new Error("Error al agregar la mascota");
      }

      const data = await response.json();
      onMascotaAgregada(data); // Notifica al componente padre
      setNombre("");
      setTipo("");
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="card shadow p-4 mb-4">
      <h3 className="text-center">Agregar Nueva Mascota</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <input
            type="text"
            className="form-control"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={cargando}>
          {cargando ? "Guardando..." : "Agregar Mascota"}
        </button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </div>
  );
}
