
import { useRef } from 'react'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './AmbienteBrunch.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function AmbienteBrunch() {
  const seccionRef = useRef(null)

  useGSAP(() => {
    const reducirMovimiento = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducirMovimiento) return

    const contexto = seccionRef.current
    if (!contexto) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contexto,
        start: 'top 72%',
        once: true
      }
    })

    // Dibuja progresivamente la rama.
    tl.fromTo(
      '.ambiente-rama',
      { strokeDashoffset: 1 },
      {
        strokeDashoffset: 0,
        duration: 1.35,
        ease: 'power2.inOut'
      }
    )
      // Las hojas aparecen una por una.
      .fromTo(
        '.ambiente-hoja',
        { scale: 0, opacity: 0, rotate: -18 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 0.55,
          stagger: 0.09,
          ease: 'back.out(1.8)',
          transformOrigin: 'center'
        },
        '-=0.75'
      )
      // Entrada del texto.
      .fromTo(
        '.ambiente-brunch-etiqueta, .ambiente-brunch h2, .ambiente-brunch-descripcion',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.14,
          ease: 'power3.out'
        },
        '-=0.9'
      )

  }, { scope: seccionRef })

  return (
    <section
      className="ambiente-brunch"
      aria-labelledby="ambiente-titulo"
      ref={seccionRef}
    >
      <svg
        className="ambiente-botanica"
        viewBox="0 0 260 360"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="ambiente-rama"
          pathLength="1"
          d="M30 330 C72 274 74 222 112 174 C146 130 177 95 225 25"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        <g className="ambiente-hoja" fill="#A9B68A">
          <path d="M76 253 C35 251 24 224 28 199 C62 200 84 218 76 253Z" />
          <path d="M91 215 C90 179 112 160 139 158 C140 188 123 210 91 215Z" />
          <path d="M126 164 C91 148 86 120 98 97 C127 110 141 134 126 164Z" />
          <path d="M151 132 C154 99 179 82 205 85 C201 115 180 134 151 132Z" />
          <path d="M180 91 C157 63 165 37 184 20 C205 43 207 69 180 91Z" />
        </g>

        <g className="ambiente-hoja" fill="#D9A98D">
          <path d="M55 289 C25 282 13 260 17 241 C43 245 60 260 55 289Z" />
          <path d="M112 188 C137 162 164 166 181 184 C160 204 134 207 112 188Z" />
          <path d="M147 141 C171 114 198 118 215 137 C194 158 168 160 147 141Z" />
        </g>
      </svg>

      <div className="ambiente-brunch-contenido">
        <p className="ambiente-brunch-etiqueta">
          VIVE LA EXPERIENCIA BRUNCH
        </p>

        <h2 id="ambiente-titulo">
          Pequeños detalles,
          <span> grandes momentos.</span>
        </h2>

        <p className="ambiente-brunch-descripcion">
          Más que un desayuno, un espacio acogedor
          para compartir, disfrutar y crear recuerdos.
        </p>
      </div>
    </section>
  )
}

export default AmbienteBrunch
