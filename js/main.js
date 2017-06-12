var cargarPagina = function () {
    cargarPersonajes();
    $(document).on("click", ".personaje", mostarDetallePersonaje);
};

var cargarPersonajes = function () {
    var url = "http://pokeapi.co/api/v2/pokemon-species/";
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
        $li.text(personaje.name); /*Aqui le puedo concatenar las propiedades*/
        $li.addClass("personaje");
        $li.attr("data-url", personaje.url);
        $ul.append($li);
        console.log(personaje.name + "  --  "+ personaje.url);
    });
}


/*------------Plantilla--------------*/
var $areaImpresion = $("#modal");

var plantillaPlaneta = "<section class='modal'>"+
    "<h2>Pokemon</h2>" +
    "<p><strong>Nombre:</strong>__name__ </p>" +
    "<p><strong>Colo:</strong>__color__</p>"+
    "<p><strong>Forma:</strong>__shape__</p>"+
    "<p><strong>Habitad:</strong>__habitat__</p>"+
    "<p><strong>Genera:</strong>__genera__</p>" +
"</section>"  
    ;

/*
$(plantillaPlaneta).addClass("modal");
*/

var mostarDetallePersonaje = function () {
    var url = $(this).data("url");
    var $planetacontenedor = $("#planeta");
    $.getJSON(url, function (response) {
        var name= response.name;
        var color= response.color.name;
        var shape= response.shape.name;
        var habitat= response.habitat.name;
        var genera= response.genera[0].genus;
        $planetacontenedor.html(
            plantillaPlaneta.replace("__name__", name).replace("__color__", color).replace("__shape__", shape) .replace("__habitat__", habitat).replace("__genera__", genera)
        );
        $areaImpresion.html(plantillaPlaneta);
    });

};

$(document).ready(cargarPagina);
