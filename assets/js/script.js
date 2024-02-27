$(document).ready(function () {

    //función al hacer click en el botón
    function hacerPeticionAjax(urlCompleta) {
        //ajax que conecta con la api
        $.ajax({
            type: "GET",
            url: urlCompleta,
            dataType: "json",
            success: function (response) {
                console.log(response);

                if (response.error) {
                    alert(" La solicitud no es válida, recuerde ingresar sólo números del 1 al 732 ");
                }

                // Llamar a una función para procesar la respuesta
                mostrarCard(response);

                //Llamar a una función para procesar gráfico
                mostrarGrafico(response.powerstats);

                console.log(response.powerstats);

            },

            error: function (error) {
                alert(" Ha ocurrido un error con la página: error " + error.status);

                console.log(error);
            },

        });

    }


    function mostrarGrafico(datosGrafico) {
        let dataPoints = [];

        // Iterar sobre las propiedades de datosGrafico
        for (const dato in datosGrafico) {
            // Convertir el valor a un número, si es "null" lo convierte a 0
            let valor = (datosGrafico[dato] === "null") ? 0 : Number(datosGrafico[dato]);

            // Agregar el punto de datos al arreglo
            dataPoints.push({
                label: dato,
                y: valor
            });
        }

        //función de flecha y el método every() para verificar si todos los valores en dataPoints son iguales a 0.
        let todosCeros = dataPoints.every(punto => punto.y === 0);

        // Si todos los valores son 0, imprimir un mensaje en la pantalla
        if (todosCeros) {
            console.log("Los poderes no tienen información detallada");
            $("#Grafico").html("<h2> No existe información suficiente sobre sus poderes o varios poderes no tienen información detallada </h2>");


        } else {
            // Si hay datos suficientes, generar el gráfico
            let options = {
                animationEnabled: true,
                theme: "light2",
                title: { text: "Super Powers" },
                data: [{
                    type: "pie",
                    startAngle: 45,
                    showInLegend: true,
                    legendText: "{label}",
                    indexLabel: "{label} ({y})",
                    yValueFormatString: "#,##0.#",
                    dataPoints: dataPoints
                }]
            };
            $("#Grafico").CanvasJSChart(options);
            console.log("Data points:", dataPoints); // Verificar los data points antes de mostrar el gráfico
        }
    }






    // Función para mostrar la tarjeta con la información del superhéroe
    function mostrarCard(superheroe) {
        // Construir la estructura de la tarjeta con los datos del superhéroe
        let cardHtml =
            `<div class="card mb-3 mw-100 d-flex " >   
            <div class="row g-0" d-flex>
                <div class="col-3">
                <img src="${superheroe.image.url}"  class="img-fluid mw-100 position-absolute top-50 start-0 translate-middle-y" alt="${superheroe.name}" > 
                </div>
                    <div class="col-9 d-flex flex-column justify-content-start">
                        <div class="card-body">
                            <h5 class="card-title"><strong>Nombre: </strong>${superheroe.name}</h5>
                            <p class="card-text"><strong>Altura: </strong> ${superheroe.appearance.height[0]}</p>
                            <p class="card-text"><strong>Peso: </strong> ${superheroe.appearance.weight[0]}</p>
                            <p class="card-text"><strong>Ocupación: </strong> ${superheroe.work.occupation}</p>
                            <p class="card-text"><strong>Conexiones: </strong> ${superheroe.connections['group-affiliation']}</p>
                            <p class="card-text"><strong>Alianzas: </strong> ${superheroe.biography.aliases}</p>
                            <p class="card-text"><strong>Primera aparición: </strong> ${superheroe.biography['first-appearance']}</p>
                            <p class="card-text"><strong>Publicado por: </strong> ${superheroe.biography.publisher}</p>
                        </div> 
                    </div>
            </div>
        </div>`;



        // Mostrar la tarjeta en el contenedor
        $("#cardContainer").html(cardHtml);
    }



    //concatenar el url con el valor de superheroe ingresado
    $("#formulario").submit(function (event) {
        // Evita que se envíe el formulario de manera predeterminada
        event.preventDefault();

        // Obtiene el valor del ID ingresado en el formulario
        const id = $("#idSuperHeroe").val();
        //Expresion regular que valida ingresar un número dentro del rango
        let regex = /[1-732]/gim;
        // let regex = /^(?:[1-9]|[1-9]\d|72\d|[1-6]\d{2}|7[0-2]\d|73[0-2]|732)$/;     //sugerida por chat gpt


        if (regex.test(id)) {
            // URL base
            const baseUrl = "https://www.superheroapi.com/api.php/10161210046726760/";

            // Concatena el ID con el URL base para formar la URL completa
            const urlCompleta = baseUrl + id;

            // Llama a la función para realizar la petición AJAX
            hacerPeticionAjax(urlCompleta);
        }
        else {

            // Muestra un mensaje de error si el ID no es un número
            alert("El ID debe ser un número válido del 1 al 732");

        }



        // Redirige a la URL completa
        // window.location.href = urlCompleta;
    });


});

