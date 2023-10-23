import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';

function ProductoList() {
  const [producto, setProducto] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState({});
  const [formData, setFormData] = useState({
    Nombre_Producto: '',
    Descripcion: '',
    Precio: '',
    Id_Categoria: '',
  });

  // Función para abrir el modal y pasar los datos del docente seleccionado
  const openModal = (producto) => {
    setSelectedProducto(producto);

    setFormData({
      Nombre_Producto: producto.Nombre_Producto,
      Descripcion: producto.Descripcion,
      Precio: producto.Precio,
      Id_Categoria: producto.Id_Categoria,
    });
    setShowModal(true);
  };


  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadProducto = () => {
    fetch('http://localhost:5000/crud/readProducto')
      .then((response) => response.json())
      .then((data) => setProducto(data))
      .catch((error) => console.error('Error al obtener productos:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateProducto/${selectedProducto.Id_Producto}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de docentes
          setShowModal(false);
          loadProducto(); // Cargar la lista de docentes actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un docente
  const handleDelete = (Id_Producto) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este producto?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el docente
      fetch(`http://localhost:5000/crud/deleteProducto/${Id_Producto}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de docentes
            loadProducto();
          }
        })
        .catch((error) => console.error('Error al eliminar el producto:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener los docentes
  useEffect(() => {
    fetch('http://localhost:5000/crud/readProducto')
      .then((response) => response.json())
      .then((data) => setProducto(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  }, []);

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Producto</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID Producto</th>
                <th>Nombre Producto</th>
                <th>Descripcion</th>
                <th>Precio</th>
                <th>Id Categoria</th>
              </tr>
            </thead>
            <tbody>
              {producto.map((Producto) => (
                <tr key={Producto.Id_Producto}>
                  <td>{Producto.Id_Producto}</td>
                  <td>{Producto.Nombre_Producto}</td>
                  <td>{Producto.Descripcion}</td>
                  <td>{Producto.Precio}</td>
                  <td>{Producto.Id_Categoria}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(Producto)}>Actualizar</Button>
                    <Button variant="danger" onClick={() => handleDelete(Producto.Id_Producto)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>Actualizar Producto</Card.Title>
                    <Form className="mt-3">
                        <Row className="g-3">

                            <Col sm="6" md="6" lg="6">
                                <FloatingLabel controlId="Nombre" label="Nombre Producto">
                                    <Form.Control
                                    type="text"
                                    placeholder="Ingrese el nombre del producto"
                                    value={formData.Nombre_Producto}
                                    name="Nombre Producto"
                                    onChange={handleFormChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col sm="6" md="6" lg="6">
                                <FloatingLabel controlId="Descripcion" label="Descripcion">
                                    <Form.Control
                                    type="text"
                                    placeholder="Ingrese la descripcion del producto"
                                    value={formData.Descripcion}
                                    name="Descripcion"
                                    onChange={handleFormChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col sm="12" md="6" lg="6">
                                <FloatingLabel controlId="Precio" label="Precio">
                                    <Form.Control 
                                    type="number" 
                                    placeholder="Ingrese el precio del producto"
                                    value={formData.Precio}
                                    name="Precio"
                                    onChange={handleFormChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col sm="12" md="12" lg="6">
                                <FloatingLabel controlId="Id_Categoria" label="Id Categoria">
                                    <Form.Control 
                                    type="number" 
                                    placeholder="Ingrese el id categoria" 
                                    value={formData.Id_Categoria}
                                    name="Id_Categoria"
                                    onChange={handleFormChange}
                                    />
                                </FloatingLabel>
                            </Col>

                        </Row>
                    </Form>
                </Card.Body>
            </Card>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default ProductoList;