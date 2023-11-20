import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Cliente({ rol }) {

  // Crear un estado para cada campo del formulario
  const [Nombre, setNombre] = useState('');
  const [Apellido, setApellido] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [Correo, setCorreo] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      Nombre,
      Apellido,
      Direccion,
      Telefono,
      Correo
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createCliente', {
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
        setNombre('');
        setApellido('');
        setDireccion('');
        setTelefono('');
        setCorreo('');
      } else {
        alert('Insertar datos en campos vacios');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  return(
    <div>
      <Header rol={ rol }/>
      <Container>
        <Card className="margen-contenedor">
          <Card.Body>
            <Card.Title>Registrar Cliente</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      value={Nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="apellido" label="Apellido">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el apellido"
                      value={Apellido}
                      onChange={(e) => setApellido(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="telefono" label="Telefono">
                    <Form.Control 
                      type="number" 
                      placeholder="Ingrese el telefono"
                      value={Telefono}
                      onChange={(e) => setTelefono(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="correo" label="correo">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingrese el correo" 
                      value={Correo}
                      onChange={(e) => setCorreo(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="12" lg="12">
                  <FloatingLabel controlId="direccion" label="Direccion">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingrese la direccion"
                      value={Direccion}
                      onChange={(e) => setDireccion(e.target.value)} 
                    />
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

export default Cliente;