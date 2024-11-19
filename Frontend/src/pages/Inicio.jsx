import Boton from '../componentes/Boton';

function Inicio() {
  return (
    <div>
      <h1>Bienvenido al Sistema de Gestión de Eventos</h1>
      <p>Aquí puedes gestionar tus eventos y reservas.</p>
      <Boton texto="Ver Eventos" onClick={() => alert('Navegando a eventos...')} />
    </div>
  );
}

export default Inicio;



