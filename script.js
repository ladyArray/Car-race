// Creamos los elementos HTML para referenciar a través del DOM
const containerOne = document.querySelector(".container");
const iniciar = document.createElement("button");
const reiniciar = document.createElement("button");
const sendNumber = document.createElement("button");
const changeCars = document.createElement("button");
const menu = document.createElement("div");

// Creamos las arrays donde guardaremos los elementos DOM del HTML y las posiciones finales, nulls por ahora
let playersArray = [];
let positionsArray = [];
let finalResults = [];

//Función del menú principal
const mainMenu = () => {

  // Creamos el título del menú principal
  menu.classList.add("menu");
  menu.innerHTML = "<h1 id='menuTitle'>Forza horizon 6</h1>";

  // Creamos la selección del número de corredores usando un select
  const selectPlayers = document.createElement("div");
  selectPlayers.innerHTML = `
                            <h2>Selecciona el número de participantes:</h2>
                                <select class="selector" id="jugadores" name="jugadores">
                                    <!-- Selección de la cantidad de coches -->
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                </select>
                            `;

  // Botón para iniciar el juego
  sendNumber.innerText = "Jugar";
  sendNumber.classList.add("btn-send");

  // Eventos para el botón de Jugar
  sendNumber.addEventListener("click", (event) => {
    const prueba = document.querySelector(".selector").value;
    menu.style.display = "none"; //Escondemos el menú principal
    return startRace(prueba); // Llamamos a la función principal
  });

  //Añadimos los elementos del número del select y del botón de inicio al contenedor principal
  menu.appendChild(selectPlayers);
  menu.appendChild(sendNumber);
  containerOne.appendChild(menu);
};
  //Creamos la constante de la función de carrera
const startRace = (players) => {

  //Creamos otra función que será el div donde se colocarán los elementos de la carrera
  const menuCarrera = document.createElement("div");

  /*Con este bucle for recorreremos el número de corredores que hayamos seleccionado
  en el select y crearemos para cada uno el coche con su calle y su dorsal*/
  for (let x = 0; x < players; x++) {
    let dorsal = document.createElement("div");
    dorsal.innerHTML = `<p>${x + 1}</p>`;
    dorsal.classList.add("dorsal");
    // Añadiremos la carretera
    let position = document.createElement("div");
    position.classList.add("road");
    // Añadimos los coches
    let car = document.createElement("img");
    car.classList.add("vehicles");
    car.classList.add(`jquery-race${x}`);
    car.src = `./img/car${x + 1}.png`;
    car.name = x + 1; // Añadimos una propiedad para identificar la posición del coche
    playersArray.push(car);

    //Añadimos el coche dentro de la carretera
    position.appendChild(car);
    containerOne.appendChild(dorsal);
    containerOne.appendChild(position);
  }

  //Eventos del botón iniciar
  iniciar.classList.add("btn-send");
  iniciar.innerText = "Iniciar";
  iniciar.id = "race-btn";
  iniciar.style.display = "initial";

  //Botón del número de coches
  changeCars.classList.add("btn-send");
  changeCars.innerText = "Menú";
  changeCars.style.display = "initial";
  changeCars.onclick = () => location.reload();

  //Eventos del botón de reiniciar
  reiniciar.classList.add("btn-send");
  reiniciar.id = "restart-race";
  reiniciar.innerText = "Reiniciar";
  reiniciar.style.display = "none";


  // ***********************************************************
  
  // Función para reiniciar la carrera

  $(document).ready(function () {
    $("#restart-race").click(function () {
      for (let p = 0; p < playersArray.length; p++) {

        //Detenemos y devolvemos a la posición inicial a cada elemento al parar
        $(`.jquery-race${p}`).stop();
        $(`.jquery-race${p}`).animate({ marginLeft: "0px" }, 50);
      }

      //Mostramos y ocultamos los botones
      reiniciar.style.display = "none";
      iniciar.style.display = "initial";
      changeCars.style.display = "initial";
    });
  });
  // ******************************************************************

  // Elemento donde colocar los botones
  menuCarrera.classList.add("menu-carrera");
  menuCarrera.appendChild(iniciar);
  menuCarrera.appendChild(reiniciar);
  menuCarrera.appendChild(changeCars);
  //Añadimos al container principal el elemento
  containerOne.appendChild(menuCarrera);


  // ********************** A partir de aquí arranca el juego **************************************
  $(document).ready(function () {
    $("#race-btn").click(function () {
      /* Escondemos el botón iniciar y mostramos el de reiniciar cuando comience la carrera */
      setTimeout(() => {
        iniciar.style.display = "none";
        changeCars.style.display = "none";
        reiniciar.style.display = "initial";
      }, 100);
      //Creamos el elemento de las tablas de posiciones
      const tablePositions = document.createElement("div");
      tablePositions.innerHTML = "<h1 id='positionsTitle'>Posiciones</h1>";

      // Usamos el bucle for para asignar las animaciones de movimiento
      // playersArray.Length determinará la meta y entonces se detendrá el for
      for (let y = 0; y < playersArray.length; y++) {
        // La duración del coche en pista es aleatoria
        let duration = Math.random() * (10 - 1) + 1;
        duration = Math.round(duration) * 1000;

        //Aplicamos .animate a cada vehículo con la duración aleatoria que asignamos anteriormente
        $(`.jquery-race${y}`).animate(
          { marginLeft: "90%" },
          duration,
          null,
          function () {
            positionsArray.push(this.name); //Conforme vayan llegando los coches los añadimos a un array
            console.log(positionsArray);

            if (positionsArray.length == playersArray.length) {
              //Esta condición se ejecuta cuando llegan todos a la meta
              //Si la longitud de posición es la misma que la longitud de la calle, se cumple esta condición
              reiniciar.style.display = "none";
              iniciar.style.display = "initial";
              //Pasamos las posiciones al array final donde los mostraremos...
              finalResults = positionsArray;
              //...Y limpiamos el array para la siguiente partida
              positionsArray = [];
              //Ocultamos los coches y la pista para mostrar los resultados
              let coches = document.querySelectorAll(".road");
              let dorsales = document.querySelectorAll(".dorsal");
              coches.forEach((coche) => {
                coche.style.display = "none";
              });
              //Ocultamos también los números dorsales de cada calle
              dorsales.forEach((drsl) => {
                drsl.style.display = "none";
              });
              /*Aqui construimos la lista de posiciones, recorriendo con un for hasta 
              el último resultado y en orden de posición usando la x como referencia*/
              for (let x = 0; x < finalResults.length; x++) {
                let pos = document.createElement("div");
                pos.classList.add("posiciones");
                pos.innerHTML = `<p><u>Posicion ${x + 1} :</u> Coche ${
                  finalResults[x]
                }</p></br>`;
                tablePositions.appendChild(pos);
              }
              iniciar.style.display = "none"; //Ocultamos el botón en los resultados
              containerOne.appendChild(tablePositions); //Mostramos por pantalla la tabla de posiciones

              //Mostraremos la tabla de resultados 8 segundos y luego volverá a la pantalla de inicio
              setTimeout(() => {
                window.location.reload();
              }, 8000);
            }
          }
        );
      }
    });
  });

  // **********************************************************************
};

//Ejecutamos la función al cargar el archivo .js con el método main
mainMenu();
