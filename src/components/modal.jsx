"use client"
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import styles from './style/modal.module.css'

function ModalSearch(props) {
    const [mounted, setMounted] = useState(false);
    const handleClose = () => props.setShowModal(false);
    
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // prevent rendering before mount or when modal is closed
    if (!mounted || !props.showModal) return null;
    
    return createPortal(
        <>
            <div 
                className={styles.backdrop}
                onClick={handleClose}
            />
            
            <div className={styles.modalWrapper}>
                <Modal.Dialog className={styles.modalDialog}>
                    <Modal.Header className={styles.modalHeader}>
                        <Modal.Title className={styles.modalTitle}>
                            Artistas encontrados
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={styles.modalBody}>
                        {props.results.map((artist) => (
                            <Link 
                                className={styles.link}
                                href={`/contratacao?name=${artist.name}&genre=${artist.genres[0]}&popularity=${artist.popularity}&image=${artist.images[0]?.url}`}
                                key={artist.id}
                                onClick={handleClose}
                            >
                                <div className={styles.item}>
                                    <img src={artist.images[0]?.url} alt={artist.name} width="50" />
                                    {artist.name}
                                </div>
                            </Link>
                        ))}
                    </Modal.Body>
                    <Modal.Footer className={styles.modalFooter}>
                        <Button variant="secondary" onClick={handleClose}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </>,

        // portal used to render modal outside component tree
        document.body
    );
}

export default ModalSearch;