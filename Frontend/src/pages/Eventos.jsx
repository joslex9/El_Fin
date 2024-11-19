import { useState, useEffect } from 'react';
import api from '../services/api';
import Modal from '../components/Modal';
import Boton from '../components/Boton';

function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  useEffect(() => {
    api.get('/eventos')
      .then((res) => setEventos(res.data))
      .catch((error) => console.error('Error al obtener los eventos:', error));
  }, []);

  const abrirModal = (evento) => {
    setEventoSeleccionado(evento);
    setMostrarModal(true);
  };

  return (
    <div>
      <h2>Lista de Eventos</h2>
      {eventos.length > 0 ? (
        eventos.map(evento => (
          <div key={evento.id}>
            <h3>{evento.nombre}</h3>
            <p>Fecha: {evento.fecha}</p>
            <Boton texto="Ver Detalles" onClick={() => abrirModal(evento)} />
          </div>
        ))
      ) : (
        <p>No hay eventos disponibles.</p>
      )}

      {mostrarModal && (
        <Modal
          titulo="Detalles del Evento"
          contenido={
            <div>
              <p><strong>Nombre:</strong> {eventoSeleccionado.nombre}</p>
              <p><strong>Fecha:</strong> {eventoSeleccionado.fecha}</p>
              <p><strong>Descripción:</strong> {eventoSeleccionado.descripcion}</p>
            </div>
          }
          onClose={() => setMostrarModal(false)}
        />
      )}
    </div>
  );
}

export default Eventos;



  