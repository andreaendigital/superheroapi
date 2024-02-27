$(document).ready(function () {
    // Definir función para realizar la petición AJAX
    $("button").on("click", function () {

        // Obtiene el valor del ID ingresado en el formulario
        let id = $("#idSuperHeroe").val();

        // URL base
        let baseUrl = "https://www.superheroapi.com/api.php/10161210046726760/";

        // Concatena el ID con el URL base para formar la URL completa
        let urlCompleta = baseUrl + id;

        $.ajax({
            type: "GET",
            url: urlCompleta,
            dataType: "json",
            success: function (response) {
                console.log(response);
            },
            error: function (error) {
                console.log(error);
                alert(urlCompleta + " Ha ocurrido un error con la página: error " + error.status);
            }
        });
    });


    // Evitar que el formulario se envíe de manera predeterminada
    $("#formulario").submit(function (event) {
        // Evita que se envíe el formulario de manera predeterminada
        event.preventDefault();

        // Redirige a la URL completa
        // window.location.href = urlCompleta;
    });
});


//PRIMERA OPCION DE FUNCION MOSTRARGRAFICO

function mostrarGrafico(datosGrafico) {
    // crear objeto options como requiere la libreria para graficar

    let dataPoints = [];
    let hayValorNulo = false; //variable para verificar si hay valores nulos

    for (const dato in datosGrafico) {
        if (datosGrafico[dato] === null || datosGrafico[dato] === "null") {
            hayValorNulo = true;  //actualiza la variable

        }
        else {

            dataPoints.push(
                {
                    label: dato, // esta seria la propiedad, cada poder
                    y: (datosGrafico[dato])// este serie el value
                });
        };
    }

    // Si hay un valor nulo, muestra el mensaje apropiado
    if (hayValorNulo) {
        console.log("Se encontraron datos nulos en los powerstats.");
        // Imprime un mensaje indicando falta de datos:
        // alert("Se encontraron datos nulos en los powerstats.");
        $("#Grafico").html("<h2> No existe información suficiente sobre sus poderes o varios poderes no tienen información detallada </h2>");

    } else {
        console.log("No se encontraron datos nulos en los powerstats.");


        let options = {
            animationEnabled: true,
            theme: "light2",
            title: { text: "Super Powers" },
            data: [{
                type: "pie",
                startAngle: 45,
                showInLegend: "true",
                legendText: "{label}",
                indexLabel: "{label} ({y})",
                yValueFormatString: "#,##0.#" % "",
                dataPoints: dataPoints  // propiedad tomara los datos del arreglo
            }]
        };
        $("#Grafico").CanvasJSChart(options);

    }

    console.log("Data points:", dataPoints); // Verificar los data points antes de mostrar el gráfico




    // $("#Grafico").CanvasJSChart(options);
    //lo cambié arriba dentro del if, else.

}


// SEGUNDA OPCION DE FUNCION MOSTRAR GRAFICO

function mostrarGrafico(datosGrafico) {
    // crear objeto options como requiere la libreria para graficar

    let dataPoints = [];
    for (const dato in datosGrafico) {

        dataPoints.push(
            {
                label: dato, // esta seria la propiedad, cada poder
                y: (datosGrafico[dato] == "null") ? 0 : Number((datosGrafico[dato]))  // este serie el value
            });
        let options = {
            animationEnabled: true,
            theme: "light2",
            title: { text: "Super Powers" },
            data: [{
                type: "pie",
                startAngle: 45,
                showInLegend: "true",
                legendText: "{label}",
                indexLabel: "{label} ({y})",
                yValueFormatString: "#,##0.#" % "",
                dataPoints: dataPoints  // propiedad tomara los datos del arreglo
            }]
        };
        $("#Grafico").CanvasJSChart(options);
        console.log("Data points:", dataPoints); // Verificar los data points antes de mostrar el gráfico

    };


}
