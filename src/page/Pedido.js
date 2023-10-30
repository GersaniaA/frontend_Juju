import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Pedido() {

  // Crear un estado para cada campo del formulario
  const [Fecha_Pedido, setFecha_Pedido] = useState('');
  const [Direccion, setDireccion] = useState('');

  const [estados, setEstado_Pedidos] = useState([]); // Estado para almacenar las especialidades
  const [Estado_Pedido, setEstado_Pedido] = useState('');

  const [clientes, setClientes] = useState([]); // Estado para almacenar las especialidades
  const [Id_Cliente, setId_Cliente] = useState('');
  

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      Fecha_Pedido,
      Direccion,
      Estado_Pedido,
      Id_Cliente
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createPedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // El registro se creó exitosamente
        alert('Registro exitoso');
        // Reiniciar los campos del formulario
        setFecha_Pedido('');
        setDireccion('');
        setEstado_Pedido('');
        setId_Cliente('');
        
      } else {
        alert('Error al registrar el pedido');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  useEffect(() => {
    // Realiza una solicitud a tu ruta para obtener las especialidades
    fetch('http://localhost:5000/crud/readPedido')
      .then(response => response.json())
      .then(data => {
        // Actualiza el estado con las especialidades obtenidas
        setEstado_Pedidos(data);
      })
      .catch(error => {
        console.error('Error al obtener los pedidos', error);
      });
  }, []);

  useEffect(() => {
    // Realiza una solicitud a tu ruta para obtener las especialidades
    fetch('http://localhost:5000/crud/readCliente')
      .then(response => response.json())
      .then(data => {
        // Actualiza el estado con las especialidades obtenidas
        setClientes(data);
      })
      .catch(error => {
        console.error('Error al obtener los clientes', error);
      });
  }, []);


  return(
    <div>
      <Header />
      
      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Registrar Pedido</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="fecha_pedido" label="Fecha Pedido">
                    <Form.Control
                      type="date"
                      placeholder="Ingrese la fecha del pedido"
                      value={Fecha_Pedido}
                      onChange={(e) => setFecha_Pedido(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="direccion" label="Direccion">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la direccion"
                      value={Direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="estado_Pedido" label="Estado Pedido">
                    <Form.Select
                      aria-label="Estado Pedido"
                      value={Estado_Pedido}
                      onChange={(e) => setEstado_Pedido(e.target.value)}
                    >
                      <option>Seleccione el estado del pedido</option>
                      {estados.map((pedido) => (
                        <option key={pedido.Id_Pedido} value={pedido.Estado_Pedido}>
                          {pedido.Estado_Pedido}
                        </option>
                      ))}
                      </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="id_cliente" label="Cliente">
                    <Form.Select
                      aria-label="Cliente"
                      value={Id_Cliente}
                      onChange={(e) => setId_Cliente(e.target.value)}
                    >
                      <option>Seleccione el cliente</option>
                      {clientes.map((cliente) => (
                        <option key={cliente.Id_Cliente} value={cliente.Id_Cliente}>
                          {cliente.Nombre} {cliente.Apellido}
                        </option>
                      ))}
                      </Form.Select>
                  </FloatingLabel>
                </Col>


              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3" size="lg">
                  Registrar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

    </div>
  );
}

export default Pedido;