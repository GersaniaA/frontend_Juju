import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Detalle() {

  // Crear un estado para cada campo del formulario
  const [Cantidad, setCantidad] = useState('');
  const [Id_Producto, setId_Producto] = useState('');
  const [Id_Pedido, setId_Pedido] = useState('');
  

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      Cantidad,
      Id_Producto,
      Id_Pedido
     
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createDetalle', {
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
        setCantidad('');
        setId_Producto('');
        setId_Pedido('');
    
        
      } else {
        alert('Error al registrar el detalle');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  return(
    <div>
      <Header />
      
      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Registrar Detalle</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="cantidad" label="Cantidad">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la cantidad"
                      value={Cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="id_producto" label="Id Producto">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el Id_Producto"
                      value={Id_Producto}
                      onChange={(e) => setId_Producto(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="id_pedido" label="Id Pedido">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingrese el Id_Pedido"
                      value={Id_Pedido}
                      onChange={(e) => setId_Pedido(e.target.value)} 
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

export default Detalle;