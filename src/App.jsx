import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'


import Inicio from './pages/Inicio.jsx'
import Menu from './pages/Menu.jsx'
import Reservas from './pages/Reservas.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Ubicacion from './pages/Ubicacion.jsx'



function App() {
  

  return (
    <div>

      <Navbar />

      <main>
         <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/ubicacion" element={<Ubicacion />} />
        </Routes>
    
      </main>

     <Footer />
    </div>
    
  )
}

export default App
