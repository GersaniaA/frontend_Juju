import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil} from 'react-icons/fa6';

function ClienteList() {
  const [clientes, setCliente] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState({});
  const [formData, setFormData] = useState({
    Nombre: '',
    Apellido: '',
    Direccion: '',
    Telefono: '',
    Correo: '',
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCliente = clientes.filter((cliente) => {
    // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
    const Id_Cliente = cliente.Id_Cliente;
    const Nombre = cliente.Nombre.toLowerCase();
    const Apellido = cliente.Apellido.toLowerCase();
    const Direccion = cliente.Direccion.toLowerCase();
    const Telefono = cliente.Telefono;
    const Correo = cliente.Correo;
    const search = searchQuery.toLowerCase();

    return (
      Id_Cliente === (search) ||
      Nombre.includes(search) ||
      Apellido.includes(search) ||
      Direccion.includes (search) ||
      Telefono.includes (search) ||
      Correo.includes (search)
    );
  });


  // Función para abrir el modal y pasar los datos del docente seleccionado
  const openModal = (Cliente) => {
    setSelectedCliente(Cliente);

    setFormData({
      Nombre: Cliente.Nombre,
      Apellido: Cliente.Apellido,
      Direccion: Cliente.Direccion,
      Telefono: Cliente.Telefono,
      Correo: Cliente.Correo,
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

  const loadCliente = () => {
    fetch('http://localhost:5000/crud/readCliente')
      .then((response) => response.json())
      .then((data) => setCliente(data))
      .catch((error) => console.error('Error al obtener clientes:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateCliente/${selectedCliente.Id_Cliente}`, {
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
          loadCliente(); // Cargar la lista de docentes actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un docente
  const handleDelete = (Id_Cliente) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este cliente?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el docente
      fetch(`http://localhost:5000/crud/deleteCliente/${Id_Cliente}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de docentes
            loadCliente();
          }
        })
        .catch((error) => console.error('Error al eliminar el cliente:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener los docentes
  useEffect(() => {
    fetch('http://localhost:5000/crud/readCliente')
      .then((response) => response.json())
      .then((data) => setCliente(data))
      .catch((error) => console.error('Error al obtener los clientes:', error));
  }, []);

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Cliente</Card.Title>
          <Row className="mb-3">
            <Col sm="12" md="6" lg="4">
              <FloatingLabel controlId="search" label="Buscar">
                <Form.Control
                  type="text"
                  placeholder="Buscar"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID Cliente</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Direccion</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredCliente.map((cliente) => (
                <tr key={cliente.Id_Cliente}>
                  <td>{cliente.Id_Cliente}</td>
                  <td>{cliente.Nombre}</td>
                  <td>{cliente.Apellido}</td>
                  <td>{cliente.Direccion}</td>
                  <td>{cliente.Telefono}</td>
                  <td>{cliente.Correo}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(cliente)}><FaPencil /></Button>
                    <Button variant="danger" onClick={() => handleDelete(cliente.Id_Cliente)}><FaTrashCan /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>Actualizar Cliente</Card.Title>
                    <Form className="mt-3">
                        <Row className="g-3">

                            <Col sm="6" md="6" lg="6">
                                <FloatingLabel controlId="Nombre" label="Nombre">
                                    <Form.Control
                                    type="text"
                                    placeholder="Ingrese el nombre del cliente"
                                    value={formData.Nombre}
                                    name="Nombre"
                                    onChange={handleFormChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col sm="6" md="6" lg="6">
                                <FloatingLabel controlId="Apellido" label="Apellido">
                                    <Form.Control
                                    type="text"
                                    placeholder="Ingrese el apellido del cliente"
                                    value={formData.Apellido}
                                    name="Apellido"
                                    onChange={handleFormChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col sm="12" md="6" lg="6">
                                <FloatingLabel controlId="Direccion" label="Direccion">
                                    <Form.Control 
                                    type="text" 
                                    placeholder="Ingrese la direccion del cliente"
                                    value={formData.Direccion}
                                    name="Direccion"
                                    onChange={handleFormChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col sm="12" md="12" lg="6">
                                <FloatingLabel controlId="Telefono" label="Telefono">
                                    <Form.Control 
                                    type="number" 
                                    placeholder="Ingrese el telefono del cliente" 
                                    value={formData.Telefono}
                                    name="Telefono"
                                    onChange={handleFormChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col sm="12" md="6" lg="12">
                                <FloatingLabel controlId="Correo" label="Correo">
                                    <Form.Control 
                                    type="text" 
                                    placeholder="Ingrese el correo del cliente"
                                    value={formData.Correo}
                                    name="Correo"
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

export default ClienteList;