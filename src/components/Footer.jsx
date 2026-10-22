import { Container, Icon } from 'semantic-ui-react'
import './Footer.css'

function Footer() {

    return (
        <footer className="footer-brunch">
            <Container>
                <div className="footer-contenido">
                    <h3>BRUNCH</h3>
                
            
                    <div className="footer-redes">
                        <Icon name="instagram" size="large" />
                        <Icon name="facebook" size="large" />
                        <Icon name="whatsapp" size="large" />
                    
                    </div>

                    <p>Contacto | © 2026 Brunch</p>

                </div>
            </Container>
        </footer>


    )
    
}

export default Footer