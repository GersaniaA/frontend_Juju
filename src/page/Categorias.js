import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Categorias({ rol }) {

  // Crear un estado para cada campo del formulario
  const [Nombre_Categoria, setNombre_Categoria] = useState('');
 

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      Nombre_Categoria
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createCategorias', {
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
        setNombre_Categoria('');
        
      } else {
        alert('Insertar datos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  const handleNombreCategoriaChange = (e) => {
    const nuevoNombre = e.target.value.replace(/[^a-zA-Z ]/g, '');
    setNombre_Categoria(nuevoNombre);
  
  };

  return(
    <div>
      <Header rol={rol}/>
      
      <Container>
        <Card className="margen-contenedor">
          <Card.Body>
            <Card.Title>Registrar Categorias</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="12" md="21" lg="12">
                  <FloatingLabel controlId="nombre_categoria" label="Nombre categoría">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre de categoria"
                      value={Nombre_Categoria}
                      onChange={ handleNombreCategoriaChange}
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

export default Categorias;