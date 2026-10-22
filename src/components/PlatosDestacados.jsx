import { useRef } from 'react'
import { Container, Grid } from 'semantic-ui-react'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import PlatoCard from './PlatoCard.jsx'
import { platos } from '../data/platos.js'
import './PlatosDestacados.css'

// Registrar plugins de GSAP
gsap.registerPlugin(useGSAP, ScrollTrigger)

function PlatosDestacados() {

    const seccionRef = useRef(null)

    useGSAP(() => {

    gsap.fromTo(
      '.plato-destacado',
      {
        y: 60,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',

        scrollTrigger: {
          trigger: '.platos-destacados',
          start: 'top 50%',
          once: true
        }
      }
    )

    }, { scope: seccionRef })


    return(

        <section 
        className="platos-destacados"
        ref={seccionRef}
        >
            <Container>
                <h2>Platos destacados</h2>

                <Grid columns ={3} stackable>
                    {platos.map((plato)=>(
                    <Grid.Column 
                        key={plato.id}
                        className="plato-destacado"
                    >

                        <PlatoCard
                        nombre={plato.nombre}
                        precio={plato.precio}
                        imagen={plato.imagen}
                        />
                    </Grid.Column> 
                    ))}
                   
                </Grid>
            </Container>

        </section>
    )
}

export default PlatosDestacados