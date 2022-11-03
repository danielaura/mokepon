const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar-juego')
const botonMascotaJugador = document.getElementById('boton-mascota')

const botonReiniciar = document.getElementById('boton-reiniciar')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const spanMascotaJugador = document.getElementById('mascota-jugador')
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const sectionMensajeResultado = document.getElementById('resultado')
const sectionAtaqueJugador = document.getElementById('ataque-jugador')
const sectionAtaqueEnemigo = document.getElementById('ataque-enemigo')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorTarjetasAtaque = document.getElementById(
  'contenedor-tarjetas-ataque',
)
const sectionMostrarMapa = document.getElementById('mostrar-mapa')
const mapa = document.getElementById('mapa')
let lienzo = mapa.getContext('2d')

let mokepones = []
let mokeponesEnemigo = []
let ataqueEnemigo = []
let ataqueJugador = []
let jugadorId
let enemigoId
let enemigos = []

let ataquesJugador
let ataquesEnemigo
let opcionAtaquesJugador
let opcionAtaquesEnemigo

let resultado
let opcionMokepones

let botonAtaqueFuego
let botonAtaqueAgua
let botonAtaqueTierra
let botones = []
// let botonesMovimiento = []

let mascotaHipodoge
let mascotaCapipepo
let mascotaRatigueya

let indexAtaqueEnemigo
let indexAtaqueJugador

let victoriasJugador = 0
let victoriasEnemigo = 0
let huboColision=false

let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.webp'
const anchoMaximo=700
mapa.width = window.innerWidth-100
const anchoAtoMascota=50

if(mapa.width<=anchoMaximo){
    mapa.height =  mapa.width*500/600
} else{
    mapa.width = anchoMaximo
    mapa.height =  mapa.width*500/600
}

class Mokepon {
  constructor(nombre, foto, vida, mapafoto, x=aleatorio(0,mapa.width-anchoAtoMascota) , y=aleatorio(0,mapa.height-anchoAtoMascota), id = null) {
    this.id=id
    this.nombre = nombre
    this.foto = foto
    this.mapafoto = new Image()
    this.mapafoto.src = mapafoto
    // this.mapafoto = mapafoto
    this.vida = vida
    this.ataques = []
    this.ancho = anchoAtoMascota
    this.alto = anchoAtoMascota
    this.x = x
    this.y = y
    this.movimiento = 10
  }
    dibujarMascota() {
        lienzo.drawImage(
            this.mapafoto    ,
            this.x,
            this.y,  
            this.alto,   
            this.ancho,
        )
    }
}
let hipodoge = new Mokepon('Hipodoge', './assets/1.png', 5, './assets/hipodoge.webp')
let capipepo = new Mokepon('Capipepo', './assets/2.png', 5, './assets/capipepo.webp')
let ratigueya = new Mokepon('Ratigueya', './assets/3.png', 5, './assets/ratigueya.webp')

const HIPODOGE_ATAQUES = [
  { nombre: '💧', id: 'boton-agua', texId: 'AGUA', puntaje: 1 },
  { nombre: '💧', id: 'boton-agua', texId: 'AGUA', puntaje: 1 },
  { nombre: '💧', id: 'boton-agua', texId: 'AGUA', puntaje: 1 },
  { nombre: '🔥', id: 'boton-fuego', texId: 'FUEGO', puntaje: 2 },
  { nombre: '🌱', id: 'boton-tierra', texId: 'TIERRA', puntaje: 3 },
]
const CAPIPEPO_ATAQUES = [
  { nombre: '🌱', id: 'boton-tierra', texId: 'TIERRA', puntaje: 3 },
  { nombre: '🌱', id: 'boton-tierra', texId: 'TIERRA', puntaje: 3 },
  { nombre: '🌱', id: 'boton-tierra', texId: 'TIERRA', puntaje: 3 },
  { nombre: '🔥', id: 'boton-fuego', texId: 'FUEGO', puntaje: 2 },
  { nombre: '💧', id: 'boton-agua', texId: 'AGUA', puntaje: 1 },
]
const RATIGUEYA_ATAQUES = [
  { nombre: '🔥', id: 'boton-fuego', texId: 'FUEGO', puntaje: 2 },
  { nombre: '🔥', id: 'boton-fuego', texId: 'FUEGO', puntaje: 2 },
  { nombre: '🔥', id: 'boton-fuego', texId: 'FUEGO', puntaje: 2 },
  { nombre: '💧', id: 'boton-agua', texId: 'AGUA', puntaje: 1 },
  { nombre: '🌱', id: 'boton-tierra', texId: 'TIERRA', puntaje: 3 },
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)
capipepo.ataques.push(...CAPIPEPO_ATAQUES)
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)
  
mokepones.push(hipodoge, capipepo, ratigueya)


function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = 'none'
  sectionReiniciar.style.display = 'none'
  sectionMostrarMapa.style.display = 'none'

  mokepones.forEach((abc) => {
    opcionMokepones = `
        <input type="radio" name="mascota" id=${abc.nombre} />
        <label class='tarjeta-de-mokepon' for=${abc.nombre}>
          <p>${abc.nombre}</p>
          <img src=${abc.foto} alt=${abc.nombre}>
        </label>
        `
        // <img src=${abc.mapafoto} style="display:none"> ----Anadir a texto para insertar al HTML y solucionar "mapafoto".----

    contenedorTarjetas.innerHTML += opcionMokepones

    mascotaHipodoge = document.getElementById('Hipodoge')
    mascotaCapipepo = document.getElementById('Capipepo')
    mascotaRatigueya = document.getElementById('Ratigueya')
  })

  botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

  botonReiniciar.addEventListener('click', reiniciarJuego)

  unirseAlJuego()
}
function unirseAlJuego() {
  fetch('http://192.168.0.7:8080/unirse')
  .then(function (res) {
    if(res.ok) {
      res.text()
          .then(function (respuesta) {
            console.log(respuesta)
            jugadorId=respuesta
          })
    }
  })
}
function iniciarMapa() {
    document.addEventListener('keydown', moverMascotaSeleccionada)
      intervalo= setInterval(dibujarCanvas, 50)
} 
function seleccionarMascotaJugador() {
  sectionSeleccionarMascota.style.display = 'none'
  sectionMostrarMapa.style.display = 'flex'

  if (mascotaHipodoge.checked) {
    spanMascotaJugador.innerHTML = mokepones[0].nombre
    mascotaJugador = mokepones[0]
  } else if (mascotaCapipepo.checked) {
    spanMascotaJugador.innerHTML = mokepones[1].nombre
    mascotaJugador = mokepones[1]
  } else if (mascotaRatigueya.checked) {
    spanMascotaJugador.innerHTML = mokepones[2].nombre
    mascotaJugador = mokepones[2]
  } else {
    alert('selecciona una mascota')
    sectionSeleccionarAtaque.style.display = 'none'
    sectionSeleccionarMascota.style.display = 'flex'
    sectionMostrarMapa.style.display = 'none'
  }
  mascotaJugador.id = jugadorId
  seleccionarMokepon(mascotaJugador.nombre)

  ataquesDeJugadorDisponibles()
  iniciarMapa()  
  dibujarCanvas()
}
function seleccionarMokepon(mascotaJugador) {
  fetch(`http://192.168.0.7:8080/mokepon/${jugadorId}`,{
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      mokepon:mascotaJugador
    })
  })
}
function dibujarCanvas() {
    lienzo.drawImage(
      mapaBackground,
      0,
      0,
      mapa.width,
      mapa.height
    )
      mascotaJugador.dibujarMascota()

      enviarPosicion(mascotaJugador.x, mascotaJugador.y)

      mokeponesEnemigo.forEach(function(mokepon){
        mokepon.dibujarMascota()         
        if(huboColision==false){
          colision(mokepon)
        }
      })
}

function revisarMovimiento(caso) {
    if(huboColision==false){
        switch (caso) {
            case 'ArrowUp':
                mascotaJugador.y = mascotaJugador.y - mascotaJugador.movimiento
                break
            case 'ArrowDown':
                mascotaJugador.y = mascotaJugador.y + mascotaJugador.movimiento
                break
            case 'ArrowLeft':
                mascotaJugador.x = mascotaJugador.x - mascotaJugador.movimiento
                break
            case 'ArrowRight':
                mascotaJugador.x = mascotaJugador.x + mascotaJugador.movimiento
                break
            default:
                break
        }    
    }
    dibujarCanvas()
}
function moverMascotaSeleccionada(evento) {
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    revisarMovimiento(evento.key)
}  
function colision(enemigo) {
    let enemigoUp= enemigo.y
    let enemigoDown=enemigo.y+enemigo.alto
    let enemigoLeft=enemigo.x
    let enemigoRight=enemigo.x+enemigo.ancho

    let jugadorUp= mascotaJugador.y
    let jugadorDown=mascotaJugador.y+mascotaJugador.alto
    let jugadorLeft=mascotaJugador.x
    let jugadorRight=mascotaJugador.x+mascotaJugador.ancho

    if (jugadorDown<=enemigoUp || jugadorUp>=enemigoDown || jugadorRight<=enemigoLeft || jugadorLeft>=enemigoRight){
    } else {
        mascotaEnemigoCoalision(enemigo)
        alert('tendras que luchar con '+mascotaEnemigo.nombre)

        huboColision=true
        clearInterval(intervalo)

        sectionMostrarMapa.style.display = 'none'
        sectionSeleccionarAtaque.style.display='flex'
        enemigoUp 
    }
}
function mascotaEnemigoCoalision(enemigo) {
    mascotaEnemigo = enemigo
    enemigoId = enemigo.id
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesEnemigo = enemigo.ataques
    alert(enemigoId)
}
function enviarPosicion(x,y) {
  fetch(`http://192.168.0.7:8080/mokepon/${jugadorId}/posicion`,{
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      x:x,
      y:y,
    })
  })
  .then(function (res) {
    if(res.ok){
      res.json()
      .then(function ({enemigos}) {
        // enemigos.forEach(function (enemigo) {
        mokeponesEnemigo = enemigos.map(function (enemigo) {
          let mokeponEnemigo=null
          const mokeponNombre = enemigo.mokepon.nombre || ''
          let x = enemigo.x
          let y = enemigo.y
          if(mokeponNombre=='Hipodoge'){
            mokeponEnemigo = new Mokepon('Hipodoge', './assets/1.png', 5, './assets/hipodoge.webp',x ,y, enemigo.id)
          } else if (mokeponNombre=='Capipepo'){
            mokeponEnemigo = new Mokepon('Capipepo', './assets/2.png', 5, './assets/capipepo.webp',x ,y, enemigo.id)
          } else if (mokeponNombre=='Ratigueya'){
            mokeponEnemigo = new Mokepon('Ratigueya', './assets/3.png', 5, './assets/ratigueya.webp',x ,y, enemigo.id)
          }
          return mokeponEnemigo
        })
      })
    }
  })
}
function enviarAtaques() {
  fetch(`http://192.168.0.7:8080/mokepon/${jugadorId}/ataques`,{
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ataques:ataqueJugador
    })
  })

  intervalo= setInterval(obtenerAtaquesEnemigo, 50)
}
function obtenerAtaquesEnemigo(){
  fetch(`http://192.168.0.7:8080/mokepon/${enemigoId}/ataques`)
    .then(function(res){
      if(res.ok){
        res.json()
          .then(function({ataques}){
            if(ataques.length==5){
              ataqueEnemigo=ataques
              alert(ataques)
              iniciarPelea()
            }
          })
      }
    })
}

function ataquesDeJugadorDisponibles() {
  for (i = 0; i < mokepones.length; i++) {
    if (mascotaJugador.nombre == mokepones[i].nombre) {
      ataquesJugador = mokepones[i].ataques
    }
  }
  mostrarAtaques()
}
function mostrarAtaques() {
  ataquesJugador.forEach((i) => {
    opcionAtaquesJugador = `<button class='botones-de-ataque BAtaque' id=${i.id}>${i.nombre}</button>`
    contenedorTarjetasAtaque.innerHTML += opcionAtaquesJugador
  })
  botones = document.querySelectorAll('.BAtaque')

  seleccionAtaqueJugador()
}
function seleccionAtaqueJugador() {
  botones.forEach((buton) => {
    buton.addEventListener('click', (e) => {
      for (i = 0; i < ataquesJugador.length; i++) {
        if (e.target.textContent == ataquesJugador[i].nombre) {
          ataqueJugador.push(ataquesJugador[i].texId)
          buton.style.background = '#3fa796'
          buton.disabled = true
          break
        }
      }
      if(ataqueJugador.length==5){
        enviarAtaques()
      }
      // ataqueEnemigoAleatorio()
    })
  })
}
// function ataqueEnemigoAleatorio(params) {
//   let pc = aleatorio(0, ataquesEnemigo.length - 1)
//   ataqueEnemigo.push(ataquesEnemigo[pc].texId)

//   iniciarPelea()
// }
function iniciarPelea(params) {
  clearInterval(intervalo)

  if (ataqueJugador.length == 5) {
    resultadoAtaque()
  }
}
function resultadoAtaque() {
  for (i = 0; i < ataqueJugador.length; i++) {
    if (ataqueJugador[i] == ataqueEnemigo[i]) {
      respuestaResultadoAtaque(i, i)
      resultado = 'EMPATE'
      crearMensaje(resultado)
    } else if (ataqueJugador[i] == 'AGUA' && ataqueEnemigo[i] == 'FUEGO') {
      respuestaResultadoAtaque(i, i)
      resultado = 'GANASTE'
      victoriasJugador++
      crearMensaje(resultado)
      spanVidasJugador.innerHTML = victoriasJugador
      spanVidasEnemigo.innerHTML = victoriasEnemigo
    } else if (ataqueJugador[i] == 'TIERRA' && ataqueEnemigo[i] == 'AGUA') {
      respuestaResultadoAtaque(i, i)
      resultado = 'GANASTE'
      victoriasJugador++
      crearMensaje(resultado)
      spanVidasJugador.innerHTML = victoriasJugador
      spanVidasEnemigo.innerHTML = victoriasEnemigo
    } else if (ataqueJugador[i] == 'FUEGO' && ataqueEnemigo[i] == 'TIERRA') {
      respuestaResultadoAtaque(i, i)
      resultado = 'GANASTE'
      victoriasJugador++
      crearMensaje(resultado)
      spanVidasJugador.innerHTML = victoriasJugador
      spanVidasEnemigo.innerHTML = victoriasEnemigo
    } else {
      respuestaResultadoAtaque(i, i)
      resultado = 'PERDISTE'
      victoriasEnemigo++
      crearMensaje(resultado)
      spanVidasJugador.innerHTML = victoriasJugador
      spanVidasEnemigo.innerHTML = victoriasEnemigo
    }
  }
  resultadoGanador()
}
function respuestaResultadoAtaque(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador]
  indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}
function crearMensaje() {
  sectionMensajeResultado.innerHTML += resultado

  let nuevoAtaqueJugador = document.createElement('p')
  let nuevoAtaqueEnemigo = document.createElement('p')
  nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
  nuevoAtaqueEnemigo.innerHTML += indexAtaqueEnemigo
  sectionAtaqueJugador.appendChild(nuevoAtaqueJugador)
  sectionAtaqueEnemigo.appendChild(nuevoAtaqueEnemigo)

  spanVidasJugador.innerHTML = victoriasJugador
  spanVidasEnemigo.innerHTML = victoriasEnemigo

  sectionMensajeResultado.style.display = 'flex'
}
function resultadoGanador() {
  let resultadoFinal

  if (victoriasJugador < victoriasEnemigo) {
    resultadoFinal = 'FIN DEL JUEGO! Perdiste :('
  } else if (victoriasJugador > victoriasEnemigo) {
    resultadoFinal = 'FIN DEL JUEGO! Ganaste! :)'
  } else {
    resultadoFinal = 'EMPATE'
  }
  crearMensajeFinal(resultadoFinal)
}
function crearMensajeFinal(resultadoFinal) {
  sectionMensajeResultado.innerHTML = resultadoFinal
  sectionReiniciar.style.display = 'flex'
}
function reiniciarJuego() {
  location.reload()
}
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
window.addEventListener('load', iniciarJuego)