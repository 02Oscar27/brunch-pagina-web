import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar () {
    return (
        <Menu className="navbar-brunch">

            <Menu.Item
                as={NavLink}
                to="/"
                end
                header
                className="navbar-logo"
            >
            <span className="marca-brunch">
                Brunch<span className="marca-acento">.</span>
            </span>
            </Menu.Item>

            <Menu.Item as={NavLink} to="/" end>
                Inicio
            </Menu.Item>

            <Menu.Item as={NavLink} to="/menu">
                Menú
            </Menu.Item>

            <Menu.Item as={NavLink} to="/reservas">
                Reservas
            </Menu.Item>

            <Menu.Item as={NavLink} to="/nosotros">
                Nosotros
            </Menu.Item>

            <Menu.Item as={NavLink} to="/ubicacion">
                Ubicación
            </Menu.Item>

        </Menu>



    )
    
}

export default Navbar