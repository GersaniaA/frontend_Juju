import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import Navbar from 'react-bootstrap/Navbar'; // Importa el componente Navbar de Bootstrap
import Nav from 'react-bootstrap/Nav'; // Importa el componente Nav de Bootstrap
import Offcanvas from 'react-bootstrap/Offcanvas'; // Importa el componente Offcanvas de Bootstrap
import Button from 'react-bootstrap/Button'; // Importa el componente Button de Bootstrap
import NavDropdown from 'react-bootstrap/NavDropdown'; // Importa el componente NavDropDown de Bootstrap
import Container from 'react-bootstrap/Container'; // Importa el componente Container de Bootstrap
import { Link } from 'react-router-dom';

function Header({ rol }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
    {'admin' === 'admin' && ( 
      <div>      
        {/* Navbar principal */}
      <Navbar className="navbar-color" variant="dark" expand="md" fixed='top'>
      <Container>
        <Navbar.Brand href="#home">Juju_Jewels</Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav"
          style={{ display: 'none' }}
          className="d-sm-none d-xs-none"
        />
           

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">

          <Nav.Link>
          <Link to="/" className="link-unstyled">Inicio</Link>
        </Nav.Link>

       
            <NavDropdown title="Clientes" id="Cliente">
              <NavDropdown.Item href="/Cliente" className="link-unstyled">Registrar Cliente</NavDropdown.Item>              
              <NavDropdown.Item>
                <Link to="/ClienteList" className="link-unstyled">Listar Clientes</Link>
              </NavDropdown.Item>
            </NavDropdown>
             
            <NavDropdown title="Categoria" id="Categoria">
              <NavDropdown.Item href="/Categorias">Registrar Categoria</NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/CategoriasList" className="link-unstyled">Listar Categorias</Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Producto" id="Producto">
              <NavDropdown.Item href="/Producto">Registrar Producto</NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/ProductoList" className="link-unstyled">Listar Producto</Link>
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link>
                    <Link to="/galeria" className="link-unstyled">Galeria</Link>
                  </Nav.Link>

            <Nav.Link>
              <Link to="/pedido" className="link-unstyled">Pedido</Link>
            </Nav.Link>

            <NavDropdown title="Detalle" id="Detalle">
              <NavDropdown.Item href="/Detalle">Registrar Detalle</NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/DetalleList" className="link-unstyled">Listar Detalle</Link>
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link>
              <Link to="/estadisticas" className="link-unstyled">Estadísticas</Link>
            </Nav.Link>

            <Nav.Link>
                    <Link to="/" className="link-unstyled">Cerrar sesión</Link>
                  </Nav.Link>

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
          

        <Nav.Link>
            <Link to="/" className="link-unstyled">Inicio</Link>
          </Nav.Link>

          <Nav.Link>
            <Link to="/about" className="link-unstyled">About</Link>
          </Nav.Link>

          <NavDropdown title="Cliente" id="Cliente">
            <NavDropdown.Item>
              <Link to="/Cliente" className="link-unstyled">Registrar Cliente</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/ClienteList" className="link-unstyled">Actualizar Cliente</Link>
            </NavDropdown.Item>
          </NavDropdown>


          <NavDropdown title="Categoria" id="Categoria">
            <NavDropdown.Item>
              <Link to="/Categorias" className="link-unstyled">Registrar Categoria</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
            <Link to="/CategoriasList" className="link-unstyled">Actualizar Categorias</Link>
            </NavDropdown.Item>
          </NavDropdown>


          <NavDropdown title="Producto" id="Producto">
            <NavDropdown.Item>
              <Link to="/Producto" className="link-unstyled">Registrar Producto</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/ProductoList" className="link-unstyled">Actualizar Producto</Link>
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Pedido" id="Pedido">
            <NavDropdown.Item href="/Pedido">Registrar Pedido</NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/PedidoList" className="link-unstyled">Actualizar Pedido</Link>
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Detalle" id="Detalle">
            <NavDropdown.Item href="/Detalle">Registrar Detalle</NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/DetalleList" className="link-unstyled">Actualizar Detalle</Link>
            </NavDropdown.Item>
          </NavDropdown>

        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
    </div>
       )}

     </div>
   );



}

export default Header;