import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil} from 'react-icons/fa6';

function DetalleList({ rol }) {
  const [detalle, setDetalle] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDetalle, setSelectedDetalle] = useState({});
  const [formData, setFormData] = useState({
    Cantidad: '',
    Id_Producto: '',
    Id_Pedido: '',
  });

  // Función para abrir el modal y pasar los datos del docente seleccionado
  const openModal = (detalle) => {
    setSelectedDetalle(detalle);

    setFormData({
      Cantidad: detalle.Cantidad,
      Id_Producto: detalle.Id_Producto,
      Id_Pedido: detalle.Id_Pedido,
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

  const loadDetalle = () => {
    fetch('http://localhost:5000/crud/readDetalle')
      .then((response) => response.json())
      .then((data) => setDetalle(data))
      .catch((error) => console.error('Error al obtener detalles:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateDetalle/${selectedDetalle.Id_Detalle}`, {
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
          loadDetalle(); // Cargar la lista de docentes actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un docente
  const handleDelete = (Id_Detalle) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este detalle?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el docente
      fetch(`http://localhost:5000/crud/deleteDetalle/${Id_Detalle}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de docentes
            loadDetalle();
          }
        })
        .catch((error) => console.error('Error al eliminar el detalle:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener los docentes
  useEffect(() => {
    fetch('http://localhost:5000/crud/readDetalle')
      .then((response) => response.json())
      .then((data) => setDetalle(data))
      .catch((error) => console.error('Error al obtener los detalles:', error));
  }, []);

  return (
    <div>
      <Header />

      <Card className="margen-contenedor">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Detalle</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID Detalle</th>
                <th>Cantidad</th>
                <th>Id Producto</th>
                <th>Id Pedido</th>
              </tr>
            </thead>
            <tbody>
              {detalle.map((Detalle) => (
                <tr key={Detalle.Id_Detalle}>
                  <td>{Detalle.Id_Detalle}</td>
                  <td>{Detalle.Cantidad}</td>
                  <td>{Detalle.Id_Producto}</td>
                  <td>{Detalle.Id_Pedido}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(Detalle)}><FaPencil /></Button>
                    <Button variant="danger" onClick={() => handleDelete(Detalle.Id_Detalle)}><FaTrashCan /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Detalle</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>Actualizar Detalle</Card.Title>
                    <Form className="mt-3">
                        <Row className="g-3">

                            <Col sm="6" md="6" lg="6">
                                <FloatingLabel controlId="Cantidad" label="Cantidad">
                                    <Form.Control
                                    type="number"
                                    placeholder="Ingrese la cantidad"
                                    value={formData.Cantidad}
                                    name="Cantidad"
                                    onChange={handleFormChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col sm="6" md="6" lg="6">
                                <FloatingLabel controlId="Id_Producto" label="Id Producto">
                                    <Form.Control
                                    type="number"
                                    placeholder="Ingrese el id producto"
                                    value={formData.Id_Producto}
                                    name="Id_Producto"
                                    onChange={handleFormChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col sm="12" md="6" lg="6">
                                <FloatingLabel controlId="Id_Pedido" label="Id Pedido">
                                    <Form.Control 
                                    type="number" 
                                    placeholder="Ingrese el id pedido"
                                    value={formData.Id_Pedido}
                                    name="Id_Pedido"
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

export default DetalleList;