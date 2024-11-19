import Boton from '../componentes/Boton';

function Reservas() {
  return (
    <div>
      <h2>Reservas</h2>
      <p>Aquí se mostrarán las reservas realizadas.</p>
      <Boton texto="Agregar Reserva" onClick={() => alert('Formulario de reserva')} />
    </div>
  );
}

export default Reservas;




