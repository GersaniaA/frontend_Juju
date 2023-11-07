import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil} from 'react-icons/fa6';

function PedidoList() {
  const [pedido, setPedido] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState({});
  const [formData, setFormData] = useState({
      Fecha_Pedido: '',
      Direccion: '',
      Estado_Pedido: '',
      Id_Cliente: '',
  });

  function formatDateForInput(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Agregar ceros iniciales
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Función para abrir el modal y pasar los datos del docente seleccionado
  const openModal = (pedido) => {
    setSelectedPedido(pedido);

    setFormData({
      Fecha_Pedido: formatDateForInput(pedido.Fecha_Pedido),
      Direccion: pedido.Direccion,
      Estado_Pedido: pedido.Estado_Pedido,
      Id_Cliente: pedido.Id_Cliente,
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

  const loadPedido = () => {
    fetch('http://localhost:5000/crud/readPedido')
      .then((response) => response.json())
      .then((data) => setPedido(data))
      .catch((error) => console.error('Error al obtener pedidos:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updatePedido/${selectedPedido.Id_Pedido}`, {
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
          loadPedido(); // Cargar la lista de docentes actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un docente
  const handleDelete = (Id_Pedido) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este pedido?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el docente
      fetch(`http://localhost:5000/crud/deletePedido/${Id_Pedido}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de docentes
            loadPedido();
          }
        })
        .catch((error) => console.error('Error al eliminar el pedido:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener los docentes
  useEffect(() => {
    fetch('http://localhost:5000/crud/readPedido')
      .then((response) => response.json())
      .then((data) => setPedido(data))
      .catch((error) => console.error('Error al obtener los pedidos:', error));
  }, []);

  return (
    <div>
      <Header />

      <Card className="margen-contenedor">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Pedido</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Fecha Pedido</th>
                <th>Direccion</th>
                <th>Estado Pedido</th>
                <th>Id Cliente</th>
              </tr>
            </thead>
            <tbody>
              {pedido.map((Pedido) => (
                <tr key={Pedido.Id_Pedido}>
                  <td>{Pedido.Id_Pedido}</td>
                  <td>{formatDateForInput(Pedido.Fecha_Pedido)}</td>
                  <td>{Pedido.Direccion}</td>
                  <td>{Pedido.Estado_Pedido}</td>
                  <td>{Pedido.Id_Cliente}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(Pedido)}><FaPencil /></Button>
                    <Button variant="danger" onClick={() => handleDelete(Pedido.Id_Pedido)}><FaTrashCan /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>Actualizar Pedido</Card.Title>
                    <Form className="mt-3">
                        <Row className="g-3">

                            <Col sm="6" md="6" lg="6">
                                <FloatingLabel controlId="Fecha_Pedido" label="Fecha Pedido">
                                    <Form.Control
                                    type="date"
                                    placeholder="Ingrese la fecha del pedido"
                                    value={formData.Fecha_Pedido}
                                    name="Fecha_Pedido"
                                    onChange={handleFormChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col sm="6" md="6" lg="6">
                                <FloatingLabel controlId="Direccion" label="Direccion">
                                    <Form.Control
                                    type="text"
                                    placeholder="Ingrese la direccion del pedido"
                                    value={formData.Direccion}
                                    name="Direccion"
                                    onChange={handleFormChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col sm="12" md="6" lg="6">
                                <FloatingLabel controlId="Estado_Pedido" label="Estado_Pedido">
                                    <Form.Control 
                                    type="text" 
                                    placeholder="Ingrese el estado del pedido"
                                    value={formData.Estado_Pedido}
                                    name="Estado_Pedido"
                                    onChange={handleFormChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col sm="12" md="12" lg="6">
                                <FloatingLabel controlId="Id_Cliente" label="Id Cliente">
                                    <Form.Control 
                                    type="number" 
                                    placeholder="Ingrese el id cliente" 
                                    value={formData.Id_Cliente}
                                    name="Id_Cliente"
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

export default PedidoList;