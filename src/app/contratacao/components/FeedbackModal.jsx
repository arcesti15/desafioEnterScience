import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function FeedbackModal({ show, onClose }) {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Contratação Realizada!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Sua contratação foi realizada. Entraremos em contato em breve!</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
