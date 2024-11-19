import { useState } from 'react';
import Modal from '../components/Modal';

function PaginaConModal() {
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <div>
      <h1>Demostración de Modal</h1>
      <button onClick={() => setMostrarModal(true)}>Abrir Modal</button>

      {mostrarModal && (
        <Modal
          titulo="¡Hola!"
          contenido={<p>Este es el contenido del modal.</p>}
          onClose={() => setMostrarModal(false)}
        />
      )}
    </div>
  );
}

export default PaginaConModal;

