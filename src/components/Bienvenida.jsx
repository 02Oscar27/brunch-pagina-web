import { Container, Grid, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import brunchPrincipal from '../assets/images/brunch-principal.png'
import './Bienvenida.css'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)



function Bienvenida() {

    
const seccionRef = useRef(null)

useGSAP(() => {

    const tl = gsap.timeline()

    // 1. Animar el título desde la izquierda   
    tl.fromTo(
        '.titulo-bienvenida',
    {
      x: -100,
      opacity: 0
    },
    {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out'
    }
    )
    // 2. Animar la imagen desde la derecha
    .fromTo(
    '.imagen-principal',
    {
      x: 100,
      opacity: 0
    },
    {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out'
    },
    '-=0.6'
    )


  
    }, { scope: seccionRef })


    return (

        <section 
        className="seccion-bienvenida"
        ref={seccionRef}
        >
            <Container fluid>
                <Grid columns={2} stackable>


                    <Grid.Column>
                        <div className="bienvenida-texto">
                            <h1 className="titulo-bienvenida">
                                DISFRUTA UN BRUNCH DIFERENTE
                            </h1>

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
