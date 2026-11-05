/* Demostración educativa. React.createElement permite usar React sin JSX.
   Los candidatos y sus postulaciones de ejemplo existen solo en memoria. */
'use strict';
if (typeof React !== 'undefined' && typeof ReactDOM !== 'undefined') {
  const h = React.createElement;
  function App() {
    const [nombre, setNombre] = React.useState('');
    const [filtro, setFiltro] = React.useState('');
    const [filas, setFilas] = React.useState([]);
    const [ayuda, setAyuda] = React.useState('');
    const [error, setError] = React.useState('');
    const [evento, setEvento] = React.useState('Todavía no has realizado una acción.');
    const siguienteId = React.useRef(1);
    function registrar(e) {
      e.preventDefault(); // Evita la navegación predeterminada del formulario.
      const limpio = nombre.trim();
      if (limpio.length < 2) {
        setError('Escribe al menos dos caracteres.');
        setEvento('onSubmit: el nombre no superó la validación.');
        return;
      }
      const id = siguienteId.current++;
      setFilas(previas => [...previas, {id, nombre: limpio, estado: 'En proceso'}]);
      setNombre(''); setError('');
      setEvento('onSubmit: candidato registrado en memoria para la vacante Operario/a de limpieza.');
    }
    function seleccionar(id) {
      // Se crea una lista nueva: no se modifica directamente el estado.
      setFilas(previas => previas.map(fila => fila.id === id ? {...fila, estado: 'Seleccionado'} : fila));
      setEvento('onClick: estado de la postulación actualizado a Seleccionado.');
    }
    const visibles = filas.filter(fila => fila.nombre.toLocaleLowerCase('es').includes(filtro.toLocaleLowerCase('es')));
    return h(React.Fragment, null,
      h('section', null, h('h2', null, '1. Registra un candidato de prueba'),
        h('form', {onSubmit: registrar},
          h('label', {htmlFor: 'nombre'}, 'Nombre del candidato'),
          h('input', {id:'nombre',value:nombre,maxLength:100,'aria-describedby':'ayuda error',
            onChange:e=>{setNombre(e.target.value);setEvento('onChange: se actualizó el nombre.');},
            onFocus:()=>{setAyuda('Usa un nombre ficticio de al menos dos caracteres.');setEvento('onFocus: campo de nombre activo.');},
            onBlur:()=>{setAyuda('El campo perdió el foco.');setEvento('onBlur: saliste del campo de nombre.');}}),
          h('button',{type:'submit'},'Registrar'),
          h('p',{id:'ayuda',className:'help'},ayuda),h('p',{id:'error',className:'error',role:'alert'},error))),
      h('section',null,h('h2',null,'2. Consulta y actualiza una postulación'),
        h('label',{htmlFor:'filtro'},'Buscar por nombre'),
        h('input',{id:'filtro',value:filtro,placeholder:'Escribe un nombre; Escape limpia el filtro',
          onChange:e=>{setFiltro(e.target.value);setEvento('onChange: filtro actualizado.');},
          onKeyDown:e=>{if(e.key==='Escape'){setFiltro('');setEvento('onKeyDown: Escape limpió el filtro.');}}}),
        h('p',{className:'muted'},'Vacante de ejemplo: Operario/a de limpieza. Seleccionado no significa contratado.'),
        h('table',null,h('thead',null,h('tr',null,...['Candidato','Estado','Acción'].map(t=>h('th',{key:t,scope:'col'},t)))),
          h('tbody',null,...visibles.map(fila=>h('tr',{key:fila.id},h('td',null,fila.nombre),h('td',null,fila.estado),h('td',null,h('button',{type:'button',disabled:fila.estado==='Seleccionado',onClick:()=>seleccionar(fila.id),'aria-label':'Seleccionar a '+fila.nombre},'Seleccionar')))))),
        visibles.length===0?h('p',null,'No hay resultados para mostrar.'):null),
      h('section',null,h('h2',null,'3. Observa el último evento'),h('p',{id:'log',role:'status'},evento)));
  }
  ReactDOM.createRoot(document.getElementById('root')).render(h(App));
}
