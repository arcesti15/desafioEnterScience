"use client"

import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsSearch } from "react-icons/bs";
import SpotifySearch from './resultSearch';

function NavBar() {
  // State to hide or show input
  const [showInput, setShowInput] = useState(false);
  return (
    <Navbar expand="md" bg="dark" data-bs-theme="dark" className="px-3">
      <Container >
        <Navbar.Brand href="/">Show Time</Navbar.Brand>
        <div className="d-md-none d-flex me-auto">
          <p style={{ color: "#fff" }}>Busque por um artista ou banda</p>
          <BsSearch
            size={20}
            className="text-white cursor-pointer"
            onClick={() => setShowInput(!showInput)}
          />
          {showInput && (
            <SpotifySearch />
          )}
        </div>
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Início</Nav.Link>
            <Nav.Link href="/contratacoes">Contratações</Nav.Link>
          </Nav>
          <div className="d-none d-md-flex align-items-center">
            {
              !showInput && 
            <p className='d-flex m-2' style={{ color: "#fff" }}>Busque por um artista ou banda</p>
            }
            {showInput && (
              <SpotifySearch />
            )}
            <BsSearch
              style={{ minWidth: "20px", minHeight: "20px" }}
              size={20}
              className="text-white cursor-pointer"
              onClick={() => setShowInput(!showInput)}
            />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;