/// <reference path="jquery.d.ts" />
/**
 * Representa un jugador
 */
var App;
var Jugador = (function () {
    /**
     * Constructor del objeto Jugador
     * @param {number} letra - letra del jugador en numero 0 = O, 1 = X
     * @constructor
     */
    function Jugador(letra) {
        this.partidasGanadas = 0;
        this.partidasPerdidas = 0;
        this.partidasEmpatadas = 0;
        this.caracter = letra;
    }
    Object.defineProperty(Jugador.prototype, "PartidasGanadas", {
        get: function () {
            return this.partidasGanadas;
        },
        set: function (cantidad) {
            this.partidasGanadas = cantidad;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jugador.prototype, "PartidasEmpatadas", {
        get: function () {
            return this.partidasEmpatadas;
        },
        set: function (partidasEmp) {
            this.partidasEmpatadas = partidasEmp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jugador.prototype, "PartidasPerdidas", {
        get: function () {
            return this.partidasPerdidas;
        },
        set: function (partidasPer) {
            this.partidasPerdidas = partidasPer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jugador.prototype, "Caracter", {
        get: function () {
            return this.caracter;
        },
        enumerable: true,
        configurable: true
    });
    Jugador.prototype.ganar = function () {
        this.partidasGanadas++;
    };
    Jugador.prototype.perder = function () {
        this.partidasPerdidas++;
    };
    Jugador.prototype.empatar = function () {
        this.partidasEmpatadas++;
    };
    Jugador.prototype.estadisticasATexto = function () {
        var estadisticas = "Partidas Ganadas: " + this.partidasGanadas + "\n";
        estadisticas += ("Partidas Empatadas: " + this.partidasEmpatadas + "\n");
        estadisticas += ("Partidas Perdidas: " + this.partidasPerdidas);
        return estadisticas;
    };
    return Jugador;
}());
// class Jugador extends Jugador{
//     public realizarJugada(tablero: number[][]) : number[]{
//         var jugadaValida = false;
//         while(!jugadaValida){
//             var fila = Math.floor((Math.random() * 10)) % 3;
//             var columna = Math.floor((Math.random() * 10)) % 3;
//             if(tablero[fila][columna] == 2){
//                 jugadaValida = true;
//                 tablero[fila][columna] = this.Caracter
//             }  
//         }
//         return [fila,columna];
//     }
// }
var Partida = (function () {
    function Partida() {
        this.tablero = [[2, 2, 2], [2, 2, 2,], [2, 2, 2]];
        this.oponente = new Jugador(0);
        this.persona = new Jugador(1);
    }
    Partida.prototype.inicio = function (partida_activa, nodo) {
        this.tablero = [[2, 2, 2], [2, 2, 2,], [2, 2, 2]];
        this.partidaActiva = partida_activa;
        this.nodo = nodo;
        console.log(nodo);
    };
    Object.defineProperty(Partida.prototype, "PartidaActiva", {
        get: function () {
            return this.partidaActiva;
        },
        enumerable: true,
        configurable: true
    });
    Partida.prototype.dibujarJugada = function (ctx, caracter) {
        if (caracter == Partida.CARACTER_O) {
            var centerX = ctx.canvas.width / 2;
            var centerY = ctx.canvas.height / 2;
            var radius = 60;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'green';
            ctx.fill();
            ctx.lineWidth = 5;
            ctx.strokeStyle = '#003300';
            ctx.stroke();
        }
        if (caracter == Partida.CARACTER_X) {
            ctx.beginPath();
            ctx.lineWidth = 20;
            ctx.moveTo(0, 0);
            ctx.lineTo(120, 120);
            ctx.moveTo(120, 0);
            ctx.lineTo(0, 120);
            ctx.strokeStyle = "rgb(220,20,60)";
            ctx.stroke();
        }
    };
    Partida.prototype.hacerMovimiento = function (idCanvas) {
        var caracter = this.oponente.Caracter;
        if (this.partidaActiva) {
            caracter = this.persona.Caracter;
        }
        var numero = parseInt(idCanvas.charAt(1));
        $('#' + idCanvas).unbind('click');
        var canvas = $('#' + idCanvas)[0];
        var ctx = canvas.getContext('2d');
        this.dibujarJugada(ctx, caracter);
        //alert(idCanvas);
        switch (numero) {
            case 0:
                this.tablero[0][0] = caracter;
                break;
            case 1:
                this.tablero[0][1] = caracter;
                break;
            case 2:
                this.tablero[0][2] = caracter;
                break;
            case 3:
                this.tablero[1][0] = caracter;
                break;
            case 4:
                this.tablero[1][1] = caracter;
                break;
            case 5:
                this.tablero[1][2] = caracter;
                break;
            case 6:
                this.tablero[2][0] = caracter;
                break;
            case 7:
                this.tablero[2][1] = caracter;
                break;
            case 8:
                this.tablero[2][2] = caracter;
                break;
            default:
                break;
        }
        ;
        if (this.partidaActiva) {
            this.nodo.room.make_move(idCanvas);
        }
        this.partidaActiva = !this.partidaActiva;
        this.verSiTerminoPartida();
    };
    // public revisarMovimiento(idCanvas : string){
    //     if(this.partidaActiva){
    //         var caracter = this.persona.Caracter;
    //         var numero =  parseInt(idCanvas.charAt(1));
    //         $('#'+idCanvas).unbind('click');
    //         var canvas = <HTMLCanvasElement>$('#'+idCanvas)[0];
    //         var ctx = canvas.getContext('2d');
    //         this.dibujarJugada(ctx,caracter);
    //         //alert(idCanvas);
    //         switch(numero){
    //             case 0:
    //                 this.tablero[0][0] = caracter;
    //                 break;
    //             case 1:
    //                 this.tablero[0][1] = caracter;
    //                 break;
    //             case 2:
    //                 this.tablero[0][2] = caracter;
    //                 break;
    //             case 3:
    //                 this.tablero[1][0] = caracter;
    //                 break;
    //             case 4:
    //                 this.tablero[1][1] = caracter;
    //                 break;
    //             case 5:
    //                 this.tablero[1][2] = caracter;
    //                 break;
    //             case 6:
    //                 this.tablero[2][0] = caracter;
    //                 break;
    //             case 7:
    //                 this.tablero[2][1] = caracter;
    //                 break;
    //             case 8:
    //                 this.tablero[2][2] = caracter;
    //                 break;
    //             default:
    //                 break;
    //         };
    //         if(!this.verSiTerminoPartida()){
    //             var jugadaJugador: number[] = this.oponente.realizarJugada(this.tablero);
    //             var etiqueta = Partida.tableroEtiquetas[jugadaJugador[0]][jugadaJugador[1]];
    //             $('#'+etiqueta).unbind('click');
    //             canvas = <HTMLCanvasElement> $('#'+etiqueta)[0];
    //             var ctx = canvas.getContext('2d');
    //             caracter = this.oponente.Caracter;
    //             this.dibujarJugada(ctx,caracter);
    //             if(this.verSiTerminoPartida()){
    //                 this.partidaActiva = false;
    //             }
    //         }else{
    //             this.partidaActiva = false;
    //         }
    //     }
    // }
    Partida.prototype.ganaJugador = function () {
        mostrarGanador("El oponente");
        this.oponente.ganar();
        this.persona.perder();
        actualizarPuntuaciones(this.persona.estadisticasATexto(), this.oponente.estadisticasATexto());
    };
    Partida.prototype.ganaPersona = function () {
        mostrarGanador("La Persona");
        this.oponente.perder();
        this.persona.ganar();
        actualizarPuntuaciones(this.persona.estadisticasATexto(), this.oponente.estadisticasATexto());
    };
    Partida.prototype.empate = function () {
        mostrarGanador("Nadie, hay un empate");
        this.oponente.empatar();
        this.persona.empatar();
        actualizarPuntuaciones(this.persona.estadisticasATexto(), this.oponente.estadisticasATexto());
    };
    Partida.prototype.reiniciar = function () {
        limpiarCanvas();
        cargarListeners(this);
    };
    Partida.prototype.verSiTerminoPartida = function () {
        for (var comparador = 0; comparador < 2; comparador++) {
            //Primera linea horizontal
            if (this.tablero[0][0] == comparador && this.tablero[0][1] == comparador && this.tablero[0][2] == comparador) {
                if (comparador == 0) {
                    //oponente
                    this.ganaJugador();
                }
                else {
                    //Persona
                    this.ganaPersona();
                }
                return true;
            }
            //Segunda linea horizontal
            if (this.tablero[1][0] == comparador && this.tablero[1][1] == comparador && this.tablero[1][2] == comparador) {
                if (comparador == 0) {
                    //oponente
                    this.ganaJugador();
                }
                else {
                    //Persona
                    this.ganaPersona();
                }
                return true;
            }
            //Tercera linea horizontal
            if (this.tablero[2][0] == comparador && this.tablero[2][1] == comparador && this.tablero[2][2] == comparador) {
                if (comparador == 0) {
                    //oponente
                    this.ganaJugador();
                }
                else {
                    //Persona
                    this.ganaPersona();
                }
                return true;
            }
            //Primera linea vertical
            if (this.tablero[0][0] == comparador && this.tablero[1][0] == comparador && this.tablero[2][0] == comparador) {
                if (comparador == 0) {
                    //oponente
                    this.ganaJugador();
                }
                else {
                    //Persona
                    this.ganaPersona();
                }
                return true;
            }
            //Segunda linea vertical
            if (this.tablero[0][1] == comparador && this.tablero[1][1] == comparador && this.tablero[2][1] == comparador) {
                if (comparador == 0) {
                    //oponente
                    this.ganaJugador();
                }
                else {
                    //Persona
                    this.ganaPersona();
                }
                return true;
            }
            //tercera linea vertical
            if (this.tablero[0][2] == comparador && this.tablero[1][2] == comparador && this.tablero[2][2] == comparador) {
                if (comparador == 0) {
                    //oponente
                    this.ganaJugador();
                }
                else {
                    //Persona
                    this.ganaPersona();
                }
                return true;
            }
            //diagonal de izquierda a derecha
            if (this.tablero[0][0] == comparador && this.tablero[1][1] == comparador && this.tablero[2][2] == comparador) {
                if (comparador == 0) {
                    //oponente
                    this.ganaJugador();
                }
                else {
                    //Persona
                    this.ganaPersona();
                }
                return true;
            }
            //diagonal de derecha a izquierda
            if (this.tablero[0][2] == comparador && this.tablero[1][1] == comparador && this.tablero[2][0] == comparador) {
                if (comparador == 0) {
                    //oponente
                    this.ganaJugador();
                }
                else {
                    //Persona
                    this.ganaPersona();
                }
                return true;
            }
        }
        //Revisar si se lleno la matriz
        for (var i = 0; i < this.tablero.length; i++) {
            for (var j = 0; j < this.tablero[0].length; j++) {
                if (this.tablero[i][j] == 2) {
                    return false;
                }
            }
        }
        this.empate();
        return true;
    };
    Partida.tableroEtiquetas = [['c0', 'c1', 'c2'], ['c3', 'c4', 'c5'], ['c6', 'c7', 'c8']];
    Partida.CARACTER_O = 0;
    Partida.CARACTER_X = 1;
    return Partida;
}());
function mostrarGanador(ganador) {
    var snackbarContainer = $('#demo-toast-example')[0];
    var data = { message: 'El ganador es ' + ganador, timeout: 5000 };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}
function actualizarPuntuaciones(textoPersona, textoJugador) {
    var txJugador = $('#datos-oponente')[0];
    txJugador.value = textoJugador;
    var txPersona = $('#datos-persona')[0];
    txPersona.value = textoPersona;
}
/**
 * Inicio de Listeners
 */
function limpiarCanvas() {
    $('.canvas-seleccion').each(function (index, elem) {
        var can = elem;
        var context = can.getContext('2d');
        context.clearRect(0, 0, can.width, can.height);
    });
}
function cargarListeners(juego) {
    $('.canvas-seleccion').unbind('click');
    $('.canvas-seleccion').bind('click', function (eventoJQuery) {
        //TODO
        if (juego.PartidaActiva) {
            juego.hacerMovimiento(eventoJQuery.target.id);
        }
    });
    $('#reiniciar').unbind('click');
    $('#reiniciar').bind('click', juego.reiniciar);
}
/**
 * Inicio de partida
*/
//export var juego : Partida = new Partida();
//juego.inicio();
// cargarListeners(); 
