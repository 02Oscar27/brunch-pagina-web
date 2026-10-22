import { Container, Grid, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import brunchPrincipal from '../assets/images/brunch-principal.png'
import './Bienvenida.css'



function Bienvenida() {

    return (

        <section className="bienvenida-texto">
            <Container fluid>
                <Grid columns={2} stackable>


                    <Grid.Column>
                        <div className="bienvenida-texto">
                            <h1>DISFRUTA UN BRUNCH DIFERENTE</h1>

                            <p>
                            Un espacio para disfurtar desayunos, 
                            café  y buenos momentos.
                            </p>
                            <div className="bienvenida-botones">

                                <Button 
                                as={Link}
                                to="/menu"
                                className="boton-menu">
                                    Ver menú
                                </Button>

                                <Button 
                                as={Link}
                                to="/reservas"
                                className="boton-reserva">
                                    Reservar
                                </Button>
                            </div>
                        </div>
                    </Grid.Column>

                    <Grid.Column>
                        <div className="bienvenida-imagen">
                            <img
                                src={brunchPrincipal}
                                alt="Mesa con diferentes platos de brunch"
                                className="imagen-principal"
                            />
                        </div>
                    </Grid.Column>

                </Grid>
            </Container>
        </section>

    )
    
}

export default Bienvenida
