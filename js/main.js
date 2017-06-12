var cargarPagina = function () {
    cargarPersonajes();
    $(document).on("click", ".personaje", mostarDetallePersonaje);
};

var cargarPersonajes = function () {
    var url = "http://pokeapi.co/api/v2/pokemon-species/1/";
    $.getJSON(url, function (response) {
        var personajes = response.results;
        var total = response.count;
        mostrarTotalPersonajes(total);
        mostrarPersonajes(personajes);
    });

};

var mostrarTotalPersonajes = function (total) {
    $("#total").text(total);

}

var mostrarPersonajes = function (personajes) {
    var $ul = $("#personajes");
    personajes.forEach(function (personaje) {
        var $li = $("<li/>");
        $li.text(personaje.name + personaje.height + "cm");
        $li.addClass("personaje");
        $li.attr("data-url", personaje.homeworld);
        $ul.append($li);
        console.log(personaje.name);
    });
}


var plantillaPlaneta = "   <h2>Planeta</h2>" +
    "<p><strong>Nombre:</strong>__Nombre__ </p>" +
    "<p><strong>clima:</strong>__clima__</p>"

var mostarDetallePersonaje = function () {
    var url = $(this).data("url");
    var $planetacontenedor = $("#planeta");
    $.getJSON(url, function (response) {
            $planetacontenedor.html(
                plantillaPlaneta.replace("__Nombre__", response.name).replace("__clima__", response.climate)
            );
            });

};

$(document).ready(cargarPagina);
