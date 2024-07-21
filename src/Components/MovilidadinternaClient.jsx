import React, { useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import '../Estilos/MovilidadinternaClient.css';
import { useHistory } from "react-router";

const ofertas = [
    { id: 1, titulo: "Oferta 1", descripcion: "Descripción de la oferta 1" },
    { id: 2, titulo: "Oferta 2", descripcion: "Descripción de la oferta 2" },
    // Agrega más ofertas según sea necesario
];

const MovilidadinternaClient = () => {
    let history = useHistory();
    const handleApply = (offer) => {
        console.log(`Aplicar a la oferta: ${offer.titulo}`);
        // Agrega tu lógica para aplicar a la oferta
    };

    const handleReject = (offer) => {
        console.log(`Rechazar la oferta: ${offer.titulo}`);
        // Agrega tu lógica para rechazar la oferta
    };
    const RedireccionarMenu = () => {
        history.push('/Home');
        window.location.reload();
    };

    return (
        <Container className="movilidad-container">
            <h1 className="text-center my-4">Ofertas de Movilidad Interna</h1>
            <Row>
                {ofertas.map((offer) => (
                    <Col key={offer.id} md={6} lg={4} className="mb-4">
                        <Card className="offer-card">
                            <Card.Body>
                                <Card.Title>{offer.titulo}</Card.Title>
                                <Card.Text>{offer.descripcion}</Card.Text>
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
            <button type="button" onClick={RedireccionarMenu}>Menu Principal</button>
            <br />
            <br />
        </Container>

    );
};

export default MovilidadinternaClient;
