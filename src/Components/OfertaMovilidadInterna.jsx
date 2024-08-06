import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap';
import '../Estilos/MovilidadInternGerente.css';
import { useHistory } from "react-router";
import ServicioMovilidadInterna from '../../../Tesis/src/Services/ServiciodeMovilidadInterna';

const OfertaMovilidadInterna = () => {
    const [aplicaciones, setAplicaciones] = useState([]); // Cambiado de 'oferta' a 'aplicaciones'
    const [newOffer, setNewOffer] = useState({
        TituloOferta: '',
        Descripcion: '',
        Estado: true, 
        idUsuario: null
    });
    let history = useHistory();

    useEffect(() => {
        const cargarAplicaciones = async () => {
            try {
                const data = await ServicioMovilidadInterna.GetAplicaciones(); // Se llama a GetAplicaciones
                if (Array.isArray(data)) {
                    setAplicaciones(data); // Cambiado de 'setofertas' a 'setAplicaciones'
                } else {
                    console.error('La respuesta no es un array:', data);
                    setAplicaciones([]);
                }
            } catch (error) {
                console.error('Error al cargar aplicaciones:', error.message);
            }
        };

        cargarAplicaciones();
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
        const idUsuario = sessionObject.id;

        try {
            const response = await ServicioMovilidadInterna.PostOferta({ ...newOffer, idUsuario });
            if (response.success) {
                const updatedOffers = await ServicioMovilidadInterna.GetAplicaciones(); // Se actualiza con GetAplicaciones
                setAplicaciones(updatedOffers);
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
                {aplicaciones.map((aplicacion, index) => (
                    <Col key={index} md={6} lg={4} className="mb-4">
                        <Card className="offer-card">
                            <Card.Body>
                                {/* Mostrar información de la oferta */}
                                <Card.Title>{aplicacion.movilidadInfo[0].TituloOferta}</Card.Title>
                                <Card.Text>{aplicacion.movilidadInfo[0].Descripcion}</Card.Text>
                                <Card.Text>
                                    Estado: {aplicacion.movilidadInfo[0].Estado ? 'Activa' : 'Inactiva'}
                                </Card.Text>

                                {/* Mostrar información del usuario */}
                                <hr />
                                <Card.Text><strong>Usuario:</strong> {aplicacion.usuarioInfo[0].Nombre}</Card.Text>
                                <Card.Text><strong>Correo:</strong> {aplicacion.usuarioInfo[0].Correo}</Card.Text>
                                <Card.Text><strong>Puesto:</strong> {aplicacion.usuarioInfo[0].Puesto}</Card.Text>

                                <div className="button-container">
                                    <Button variant="primary" className="me-2 apply-button" onClick={() => handleApply(aplicacion.movilidadInfo[0])}>
                                        Activar
                                    </Button>
                                    <Button variant="danger" className="reject-button" onClick={() => handleReject(aplicacion.movilidadInfo[0])}>
                                        Desactivar
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
                        onChange={(e) => setNewOffer({ ...newOffer, Estado: e.target.checked })}
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
