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