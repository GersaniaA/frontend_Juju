import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';


function Producto({ rol }) {

  // Crear un estado para cada campo del formulario
  const [Nombre_Producto, setNombre_Producto] = useState('');
  const [Descripcion, setDescripcion] = useState('');
  const [Precio, setPrecio] = useState('');
  const [Existencia, setExistencia] = useState('');

  const [categorias, setCategorias] = useState([]); // Estado para almacenar las especialidades
  const [Id_Categoria, setId_Categoria] = useState('');

  const [imagen, setImagen] = useState([]);

  const handleImagenChange = (event) => {
  const file = (event.target.files[0]);

  const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      setImagen(base64String);
    };
    if (file){
      reader.readAsDataURL(file);
    }
  };
  

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      Nombre_Producto,
      Descripcion,
      Precio,
      Existencia,
      Id_Categoria,
      imagen
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createProducto', {
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
        setNombre_Producto('');
        setDescripcion('');
        setPrecio('');
        setExistencia('');
        setId_Categoria('');
      } else {
        alert('Error al registrar el producto');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  useEffect(() => {
    // Realiza una solicitud a tu ruta para obtener las especialidades
    fetch('http://localhost:5000/crud/readCategorias')
      .then(response => response.json())
      .then(data => {
        // Actualiza el estado con las especialidades obtenidas
        setCategorias(data);
      })
      .catch(error => {
        console.error('Error al obtener las categorias', error);
      });
  }, []);

  return(
    <div>
      <Header rol={ rol } />
      <Container>
        <Card className="margen-contenedor">
          <Card.Body>
            <Card.Title>Registrar Producto</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre_producto" label="Nombre Producto">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre del producto"
                      value={Nombre_Producto}
                      onChange={(e) => setNombre_Producto(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="descripcion" label="Descripcion">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la descripcion"
                      value={Descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="precio" label="Precio">
                    <Form.Control 
                      type="number" 
                      placeholder="Ingrese el precio"
                      value={Precio}
                      onChange={(e) => setPrecio(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="existencia" label="Existencia">
                    <Form.Control 
                      type="number" 
                      placeholder="Ingrese la existencia "
                      value={Existencia}
                      onChange={(e) => setExistencia(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="id_categoria" label="Categoria">
                    <Form.Select
                      aria-label="Categoria"
                      value={Id_Categoria}
                      onChange={(e) => setId_Categoria(e.target.value)}
                    >
                      <option>Seleccione la categoría</option>
                      {categorias.map((categoria) => (
                        <option key={categoria.Id_Categoria} value={categoria.Id_Categoria}>
                          {categoria.Nombre_Categoria}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <Form.Group controlId="imagen" className="" >
                    <Form.Control 
                      type="file" 
                      accept=".jpg, .png, .jpeg"
                      size="lg"
                      onChange= {handleImagenChange} 
                    />
                  </Form.Group>
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

export default Producto;