import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaPencil} from 'react-icons/fa6';

function CategoriaList() {
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState({});
  const [formData, setFormData] = useState({
    Nombre_Categoria: '',
  });

  // Función para abrir el modal y pasar los datos de la promoción seleccionada
  const openModal = (categoria) => {
    setSelectedCategoria(categoria);

    setFormData({
      Nombre_Categoria: categoria.Nombre_Categoria,
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

  const loadCategorias = () => {
    fetch('http://localhost:5000/crud/readCategorias')
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error('Error al obtener las Categorias:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateCategorias/${selectedCategoria.Id_Categoria}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de promociones
          setShowModal(false);
          loadCategorias(); // Cargar la lista de docentes actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar una promoción
  const handleDelete = (Id_Categoria) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar esta Categoría?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar la promoción
      fetch(`http://localhost:5000/crud/deleteCategorias/${Id_Categoria}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de promociones
            loadCategorias();
          }
        })
        .catch((error) => console.error('Error al eliminar la Categoría:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener las promociones
  useEffect(() => {
    fetch('http://localhost:5000/crud/readCategorias')
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error('Error al obtener las Categorías:', error));
  }, []);

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Descuentos</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID Categoria</th>
                <th>Nombre Categoria</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((categoria) => (
                <tr key={categoria.Id_Categoria}>
                  <td>{categoria.Id_Categoria}</td>
                  <td>{categoria.Nombre_Categoria}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(categoria)}><FaPencil /></Button>                    
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <Card className="mt-3">
          <Card.Body>

            <Form className="mt-3">
              <Row className="g-3">

                <Col sm="12" md="21" lg="12">
                  <FloatingLabel controlId="nombre_categoria" label="Nombre categoría">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre de categoria"
                      value={formData.Nombre_Categoria}
                      name='Nombre_Categoria'
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

export default CategoriaList;