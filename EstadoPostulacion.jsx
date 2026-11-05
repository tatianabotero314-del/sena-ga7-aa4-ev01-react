import { Component } from 'react';

export default class EstadoPostulacion extends Component {
  state = { estado: 'En proceso' };

  seleccionar = () => {
    // Se solicita la actualización; no se modifica state.
    this.setState({ estado: 'Seleccionado' });
  };

  render() {
    return (
      <section>
        <h2>{this.props.nombre}</h2>
        <p>Estado: {this.state.estado}</p>
        <button type="button" onClick={this.seleccionar}>
          Seleccionar
        </button>
      </section>
    );
  }
}
