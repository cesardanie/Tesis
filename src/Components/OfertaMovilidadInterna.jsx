import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap';
import '../Estilos/MovilidadInternGerente.css';
import { useHistory } from "react-router";
import ServicioMovilidad from '../../../Tesis/src/Services/ServiciodeMovilidadInterna';

const OfertaMovilidadInterna = () => {
    const [oferta, setOfertas] = useState([]);
    const [applications, setApplications] = useState({});
    const [newOffer, setNewOffer] = useState({
        TituloOferta: '',
        Descripcion: '',
        Activo: true // Estado inicial para el botón de activo/inactivo
    });
    let history = useHistory();

    useEffect(() => {
        const cargarOfertas = async () => {
            try {
                const data = await ServicioMovilidad.GetOfertas();
                setOfertas(data);
            } catch (error) {
                console.error('Error al cargar ofertas:', error.message);
            }
        };

        cargarOfertas();
    }, []);

    const handleGetApplications = async (offerId) => {
        try {
            const data = await ServicioMovilidad.GetApplicationsByOfferId(offerId);
            setApplications((prev) => ({ ...prev, [offerId]: data }));
        } catch (error) {
            console.error('Error al cargar aplicaciones:', error.message);
        }
    };

    const handleApply = (offer) => {
        console.log(`Aplicar a la oferta: ${offer.TituloOferta}`);
        // Lógica para aplicar a la oferta
    };

    const handleReject = (offer) => {
        console.log(`Rechazar la oferta: ${offer.TituloOferta}`);
        // Lógica para rechazar la oferta
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewOffer({ 
            ...newOffer, 
            [name]: type === 'checkbox' ? checked : value 
        });
    };

    const handleCreateOffer = async (e) => {
        e.preventDefault();
        try {
            // Llamar al servicio para crear una nueva oferta
            const response = await ServicioMovilidad.CreateOferta(newOffer);
            if (response.success) {
                // Si la oferta se creó exitosamente, recargar las ofertas
                const updatedOffers = await ServicioMovilidad.GetOfertas();
                setOfertas(updatedOffers);
                // Limpiar el formulario
                setNewOffer({ TituloOferta: '', Descripcion: '', Activo: true });
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
                                <div className="button-container">
                                    <Button 
                                        variant="primary" 
                                        className="me-2 apply-button" 
                                        onClick={() => handleApply(offer)}
                                    >
                                        Aplicar
                                    </Button>
                                    <Button 
                                        variant="danger" 
                                        className="reject-button" 
                                        onClick={() => handleReject(offer)}
                                    >
                                        Rechazar
                                    </Button>
                                </div>
                                <Button 
                                    variant="info" 
                                    className="mt-3" 
                                    onClick={() => handleGetApplications(offer.Id)}
                                >
                                    Ver Aplicaciones
                                </Button>
                                {applications[offer.Id] && (
                                    <div className="applications-section mt-3">
                                        <h5>Aplicaciones:</h5>
                                        <ul>
                                            {applications[offer.Id].map((app) => (
                                                <li key={app.Id}>{app.Nombre} - {app.Email}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
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
                        className="form-input"
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
                        className="form-input"
                    />
                </Form.Group>
                <Form.Group controlId="formActivo">
                    <Form.Label>Activo</Form.Label>
                    <Form.Check 
                        type="checkbox" 
                        name="Activo"
                        checked={newOffer.Activo} 
                        onChange={handleInputChange}
                        className="form-check"
                    />
                </Form.Group>
                <Button variant="success" type="submit" className="mt-3 create-button">
                    Crear Oferta
                </Button>
            </Form>
            <div className="d-flex justify-content-center mt-4">
                <Button variant="secondary" onClick={RedireccionarMenu}>
                    Menu Principal
                </Button>
            </div>
            <br />
            <br />
        </Container>
    );
};

export default OfertaMovilidadInterna;
