import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import Navbar from 'react-bootstrap/Navbar'; // Importa el componente Navbar de Bootstrap
import Nav from 'react-bootstrap/Nav'; // Importa el componente Nav de Bootstrap
import Offcanvas from 'react-bootstrap/Offcanvas'; // Importa el componente Offcanvas de Bootstrap
import Button from 'react-bootstrap/Button'; // Importa el componente Button de Bootstrap
import NavDropdown from 'react-bootstrap/NavDropdown'; // Importa el componente NavDropDown de Bootstrap
import Container from 'react-bootstrap/Container'; // Importa el componente Container de Bootstrap


function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      {/* Navbar principal */}
      <Navbar className="navbar-color" variant="dark" expand="md">
        <Container>
          <Navbar.Brand href="#home">Juju_Jewels</Navbar.Brand>
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav"
            style={{ display: 'none' }}
            className="d-sm-none d-xs-none"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#home">Inicio</Nav.Link>
              <NavDropdown title="Clientes" id="Cliente">
                <NavDropdown.Item href="#">Registrar Cliente</NavDropdown.Item>
                <NavDropdown.Item href="#">
                  Actualizar Cliente
                </NavDropdown.Item>
                <NavDropdown.Item href="#">Ver Cliente</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">
                  Eliminar Cliente
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Categorias" id="Categoria">
                <NavDropdown.Item href="#">Registrar Categorias</NavDropdown.Item>
                <NavDropdown.Item href="#">
                  Actualizar Categoria
                </NavDropdown.Item>
                <NavDropdown.Item href="#">Ver Categorias</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">
                  Eliminar Categoria
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Producto" id="Producto">
                <NavDropdown.Item href="#">Registrar Producto</NavDropdown.Item>
                <NavDropdown.Item href="#">
                  Actualizar Producto
                </NavDropdown.Item>
                <NavDropdown.Item href="#">Ver Producto</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">
                  Eliminar Producto
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Pedido" id="pedido">
                <NavDropdown.Item href="#">Registrar Pedido</NavDropdown.Item>
                <NavDropdown.Item href="#">
                  Actualizar Pedido
                </NavDropdown.Item>
                <NavDropdown.Item href="#">Ver Pedido</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">
                  Eliminar Pedido
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Detalle" id="Detalle">
                <NavDropdown.Item href="#">Registrar Detalle</NavDropdown.Item>
                <NavDropdown.Item href="#">
                  Actualizar Detalle
                </NavDropdown.Item>
                <NavDropdown.Item href="#">Ver Detalle</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">
                  Eliminar Detalle
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          {/* Botón para mostrar/ocultar el menú lateral */}
          <Button
            variant="outline-light"
            onClick={toggleMenu}
            className="d-md-none d-block"
            aria-controls="basic-navbar-nav"
            aria-expanded={showMenu ? 'true' : 'false'}
          >
            Menú
          </Button>
        </Container>
      </Navbar>


      {/* Menú lateral (Offcanvas) */}
      <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="#home">Inicio</Nav.Link>
            <NavDropdown title="Clientes" id="Cliente">
              <NavDropdown.Item href="#">Registrar Cliente</NavDropdown.Item>
              <NavDropdown.Item href="#">
                Actualizar Cliente
              </NavDropdown.Item>
              <NavDropdown.Item href="#">Ver Cliente</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                Eliminar Cliente
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Categorias" id="Categoria">
              <NavDropdown.Item href="#">Registrar Categorias</NavDropdown.Item>
              <NavDropdown.Item href="#">
                Actualizar Categoria
              </NavDropdown.Item>
              <NavDropdown.Item href="#">Ver Categorias</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                Eliminar Empleado
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Producto" id="Producto">
              <NavDropdown.Item href="#">Registrar Producto</NavDropdown.Item>
              <NavDropdown.Item href="#">
                Actualizar Producto
              </NavDropdown.Item>
              <NavDropdown.Item href="#">Ver Producto</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                Eliminar Producto
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Pedido" id="Pedido">
              <NavDropdown.Item href="#">Registrar Pedido</NavDropdown.Item>
              <NavDropdown.Item href="#">
                Actualizar Pedido
              </NavDropdown.Item>
              <NavDropdown.Item href="#">Ver Pedido</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                Eliminar Pedido
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Detalle" id="Detalle">
              <NavDropdown.Item href="#">Registrar Detalle</NavDropdown.Item>
              <NavDropdown.Item href="#">
                Actualizar Detalle
              </NavDropdown.Item>
              <NavDropdown.Item href="#">Ver Detalle</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                Eliminar Detalle
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Header;