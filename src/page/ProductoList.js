import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil} from 'react-icons/fa6';

function ProductoList() {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState({});
  const [formData, setFormData] = useState({
    Nombre_Producto: '',
    Descripcion: '',
    Precio: '',
    Existencia: '',
    Id_Categoria: '',
    imagen: ''
  });

  const handleImagenChange = (event) => {
    const file = event.target.files[0]; // Obtener el primer archivo seleccionado

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result; // Obtener la imagen en formato base64
      setFormData({
        ...formData,
        imagen: base64String
      });
    }; 
    if (file) {
      reader.readAsDataURL(file); // Lee el contenido del archivo como base64
    }
  };


  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProductos = productos.filter((producto) => {
    // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
    const Id_Producto = producto.Id_Producto;
    const Nombre_Producto = producto.Nombre_Producto.toLowerCase();
    const Descripcion = producto.Descripcion.toLowerCase();
    const Precio = producto.Precio;
    const Existencia = producto.Existencia;
    const Id_Categoria = producto.Id_Categoria;
    const search = searchQuery.toLowerCase();
  
    // Verifica si la cadena de búsqueda se encuentra en algún campo
    return (
      Id_Producto === (search) ||
      Nombre_Producto.includes(search) ||
      Descripcion.includes(search) ||
      Precio === (search) ||
      Existencia === (search) ||
      Id_Categoria === (search)
    );
  });


  // Función para abrir el modal y pasar los datos del docente seleccionado
  const openModal = (producto) => {
    setSelectedProducto(producto);

    setFormData({
      Nombre_Producto: producto.Nombre_Producto,
      Descripcion: producto.Descripcion,
      Precio: producto.Precio,
      Existencia: producto.Existencia,
      Id_Categoria: producto.Id_Categoria,
      imagen: producto.imagen
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
      .then((data) => setProductos(data))
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
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  }, []);

  return (
    <div>
      <Header />

      <Card className="margen-contenedor">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Producto</Card.Title>
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
                <th>ID Producto</th>
                <th>Nombre Producto</th>
                <th>Descripcion</th>
                <th>Precio</th>
                <th>Existencia</th>
                <th>Id Categoria</th>
                <th>Imagen</th>
              </tr>
            </thead>
            <tbody>
            {filteredProductos.map((producto) => (
                <tr key={producto.Id_Producto}>
                  <td>{producto.Id_Producto}</td>
                  <td>{producto.Nombre_Producto}</td>
                  <td>{producto.Descripcion}</td>
                  <td>C${producto.Precio}</td>
                  <td>{producto.Existencia}</td>
                  <td>{producto.Id_Categoria}</td>
                  <td>
                  
                    <img src={producto.imagen} alt={producto.nombre} style={{width: '50px'}} />
                  </td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(producto)}><FaPencil /></Button>
                    <Button variant="danger" onClick={() => handleDelete(producto.Id_Producto)}><FaTrashCan /></Button>
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

                            
                            <Col sm="12" md="6" lg="6">
                                <FloatingLabel controlId="Existencia" label="Existencia">
                                    <Form.Control 
                                    type="number" 
                                    placeholder="Ingrese la existencia del producto"
                                    value={formData.Existencia}
                                    name="Existencia"
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

                            <Col sm="12" md="12" lg="12">
                              <Form.Group controlId="imagen" className="" >
                                <Form.Control 
                                  type="file" 
                                  accept=".jpg, .png, .jpeg"
                                  size="lg"
                                  name="imagen"
                                  onChange={handleImagenChange}
                                />
                              </Form.Group>
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