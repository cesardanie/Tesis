import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import '../Estilos/MovilidadinternaClient.css';
import { useHistory } from "react-router";
import ServicioMovilidad from '../../../Tesis/src/Services/ServiciodeMovilidadInterna';

const MovilidadinternaClient = () => {
    const [oferta, setofertas] = useState([]);
    let history = useHistory();

    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                const data = await ServicioMovilidad.GetOfertas();
                console.log(data)
                setofertas(data); // Asume que data es un array con las ofertas
            } catch (error) {
                console.error('Error al cargar usuarios:', error.message);
            }
        };

        cargarUsuarios();
    }, []); // El segundo argumento [] asegura que se ejecute solo al montar el componente

    const handleApply = (offer) => {
        console.log(`Aplicar a la oferta: ${offer.TituloOferta}`);
        // Agrega tu lógica para aplicar a la oferta
    };

    const handleReject = (offer) => {
        console.log(`Rechazar la oferta: ${offer.TituloOferta}`);
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
                {oferta.map((offer) => (
                    <Col key={offer.Id} md={6} lg={4} className="mb-4">
                        <Card className="offer-card">
                            <Card.Body>
                                <Card.Title>{offer.TituloOferta}</Card.Title>
                                <Card.Text>{offer.Descripcion}</Card.Text>
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
