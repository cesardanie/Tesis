import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap';
import '../Estilos/MovilidadInternGerente.css';
import { useHistory } from "react-router";
import ServicioMovilidadInterna from '../../../Tesis/src/Services/ServiciodeMovilidadInterna';

const OfertaMovilidadInterna = () => {
    const [oferta, setofertas] = useState([]);
    const [newOffer, setNewOffer] = useState({
        TituloOferta: '',
        Descripcion: '',
        Estado: true, // Cambiado de 'Activo' a 'Estado'
        idUsuario: null // Inicialmente null
    });
    let history = useHistory();

    useEffect(() => {
        const cargarOfertas = async () => {
            try {
                const data = await ServicioMovilidadInterna.GetOfertas();
                if (Array.isArray(data)) {
                    setofertas(data);
                } else {
                    console.error('La respuesta no es un array:', data);
                    setofertas([]);
                }
            } catch (error) {
                console.error('Error al cargar ofertas:', error.message);
            }
        };

        cargarOfertas();
    }, []);

    const handleApply = (offer) => {
        console.log(`Aplicar a la oferta: ${offer.TituloOferta}`);
        // Agrega tu lógica para aplicar a la oferta
    };

    const handleReject = (offer) => {
        console.log(`Rechazar la oferta: ${offer.TituloOferta}`);
        // Agrega tu lógica para rechazar la oferta
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewOffer({ ...newOffer, [name]: type === 'checkbox' ? checked : value });
    };

    const handleCreateOffer = async (e) => {
        e.preventDefault();
        const sessionString = localStorage.getItem('session');
        const sessionObject = JSON.parse(sessionString);
        const idUsuario = sessionObject.id; // Obtén el idUsuario del localStorage

        try {
            const response = await ServicioMovilidadInterna.PostOferta({ ...newOffer, idUsuario });
            if (response.success) {
                const updatedOffers = await ServicioMovilidadInterna.GetOfertas();
                setofertas(updatedOffers);
                setNewOffer({ TituloOferta: '', Descripcion: '', Estado: true, idUsuario });
            } else {
                console.error('Error al crear la oferta:', response.message);
            }
        } catch (error) {
            console.error('Error al crear la oferta:', error.message);
        }
    };

    const RedireccionarMenu = () => {
        history.push('/Gerente');
        window.location.reload();
    };

    return (
        <Container className="movilidad-container">
            <h1 className="text-center my-4">Ofertas de Movilidad Interna</h1>
            <Row>
                {oferta?.map((offer) => (
                    <Col key={offer.Id} md={6} lg={4} className="mb-4">
                        <Card className="offer-card">
                            <Card.Body>
                                <Card.Title>{offer.TituloOferta}</Card.Title>
                                <Card.Text>{offer.Descripcion}</Card.Text>
                                <Card.Text>
                                    Estado: {offer.Estado ? 'Activa' : 'Inactiva'}
                                </Card.Text>
                                <div className="button-container">
                                    <Button variant="primary" className="me-2 apply-button" onClick={() => handleApply(offer)}>
                                        Aplicar
                                    </Button>
                                    <Button variant="danger" className="reject-button" onClick={() => handleReject(offer)}>
                                        Rechazar
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <h2 className="text-center my-4">Crear Nueva Oferta</h2>
            <Form onSubmit={handleCreateOffer} className="create-offer-form">
                <Form.Group controlId="formTituloOferta">
                    <Form.Label>Título de la Oferta</Form.Label>
                    <Form.Control
                        type="text"
                        name="TituloOferta"
                        value={newOffer.TituloOferta}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formDescripcion">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="Descripcion"
                        value={newOffer.Descripcion}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formActivo">
                    <Form.Check
                        type="checkbox"
                        label="Activa"
                        name="Estado"
                        checked={newOffer.Estado}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant="success" type="submit" className="mt-3 create-button">
                    Crear Oferta
                </Button>
            </Form>
            <br />
            <br />
            <Button variant="secondary" className="mt-3" onClick={RedireccionarMenu}>
                Menu Principal
            </Button>
            <br />
            <br />
        </Container>
    );
};

export default OfertaMovilidadInterna;
