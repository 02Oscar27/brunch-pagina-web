import { Card, Image } from 'semantic-ui-react'

function PlatoCard({ nombre, precio, imagen }) {

    const precioFormateado = new Intl.NumberFormat(
        'es-CO',
        {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0
        }
    ).format(precio)

    return (
        <Card fluid>
            <div className="plato-imagen-contenedor">
            <Image 
                src={imagen}
                alt={nombre}
                className="imagen-plato"
            
            />
            </div>
   
           

            <Card.Content>
                <Card.Header>{nombre}</Card.Header>

                <Card.Description>
                    {precioFormateado}
                </Card.Description>
            </Card.Content>
        </Card>
    )
    
}

export default PlatoCard
