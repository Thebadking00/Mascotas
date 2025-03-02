import { useState } from "react";

function FormularioMascota({ onMascotaAgregada }) {
  const [mascota, setMascota] = useState({ name: "", type: "" });

  const handleChange = (e) => {
    setMascota({ ...mascota, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://3.129.250.115/mascotas/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mascota),
    });

    if (response.ok) {
      const nuevaMascota = await response.json();
      onMascotaAgregada(nuevaMascota);
      setMascota({ name: "", type: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow">
      <h2 className="mb-3">Agregar Mascota</h2>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={mascota.name}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="type" className="form-label">Tipo</label>
        <input
          type="text"
          id="type"
          name="type"
          value={mascota.type}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">Agregar</button>
    </form>
  );
}

export default FormularioMascota;
