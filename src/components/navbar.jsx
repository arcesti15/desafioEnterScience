"use client"

import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsSearch } from "react-icons/bs";
import SpotifySearch from './resultSearch';
import styles from './style/navbar.module.css';

function NavBar() {
  // State to hide or show input
  const [showInput, setShowInput] = useState(false);
  
  return (
    <Navbar expand="md" className={styles.navbar}>
      <Container>
        <Navbar.Brand href="/" className={styles.brand}>
          Show Time
        </Navbar.Brand>
        
        <div className="d-md-none d-flex align-items-center gap-2">
          {!showInput && (
            <p className={styles.searchText}>Busque por um artista</p>
          )}
          <BsSearch
            size={20}
            className={styles.searchIcon}
            onClick={() => setShowInput(!showInput)}
          />
        </div>
        
        {showInput && (
          <div className="d-md-none w-100 mt-2">
            <SpotifySearch />
          </div>
        )}
        
        <Navbar.Toggle aria-controls="navbar-nav" className={styles.toggler} />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className={styles.navLink}>
              Início
            </Nav.Link>
            <Nav.Link href="/contratacoes" className={styles.navLink}>
              Contratações
            </Nav.Link>
          </Nav>
          
          <div className="d-none d-md-flex align-items-center gap-3">
            {!showInput && (
              <p className={styles.searchText}>Busque por um artista ou banda</p>
            )}
            {showInput && (
              <div className={styles.searchWrapper}>
                <SpotifySearch />
              </div>
            )}
            <BsSearch
              size={20}
              className={styles.searchIcon}
              onClick={() => setShowInput(!showInput)}
            />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;