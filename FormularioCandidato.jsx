import { useState } from 'react';

export default function FormularioCandidato({ onRegistrar }) {
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(evento) {
    evento.preventDefault();
    const limpio = nombre.trim();
    if (limpio.length < 2) {
      setError('Escribe al menos dos caracteres.');
      return;
    }
    onRegistrar(limpio);
    setNombre('');
    setError('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nombre">Nombre del candidato</label>
      <input id="nombre" value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        aria-describedby="error" />
      <p id="error" role="alert">{error}</p>
      <button type="submit">Registrar</button>
    </form>
  );
}
