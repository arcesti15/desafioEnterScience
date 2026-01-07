"use client"
import Modal from 'react-bootstrap/Modal';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import styles from './style/modal.module.css'
function ModalSearch(props) {
    const handleClose = () => props.setShowModal(false);
    return (
        <>
            {
                props.showModal && (
                    <div
                        className="modal show"
                        style={{ display: 'block', position: 'fixed' }}
                    >
                        <Modal.Dialog className={styles.modalDialog}>
                            <Modal.Header className={styles.modalHeader} closeButton onClick={handleClose}>
                                <Modal.Title className={styles.modalTitle} style={{ color: "#fff" }}>Artistas encontrados</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className={styles.modalBody}>
                                {
                                    props.results.map((artist) => (
                                        <Link className={styles.link} href={`/contratacao?name=${artist.name}&genre=${artist.genres[0]}&popularity=${artist.popularity}&image=${artist.images[0]?.url}`}>
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
                )
            }
        </>
    );

}

export default ModalSearch;