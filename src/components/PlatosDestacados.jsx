import { Container, Grid } from 'semantic-ui-react'
import PlatoCard from './PlatoCard.jsx'
import { platos } from '../data/platos.js'
import './PlatosDestacados.css'

function PlatosDestacados() {
    return(
        <section className="platos-destacados">
            <Container>
                <h2>Platos destacados</h2>

                <Grid columns ={3} stackable>
                    {platos.map((plato)=>(
                    <Grid.Column key={plato.id}>
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