import Boton from '../componentes/Boton';

function PaginaEjemplo() {
  return (
    <div>
      <h1>Bienvenido a la página</h1>
      <Boton texto="Haz clic aquí" onClick={() => alert('¡Botón presionado!')} />
    </div>
  );
}

export default PaginaEjemplo;


  
  