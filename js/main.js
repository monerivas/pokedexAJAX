

var cargarPagina = function () {
    cargarPersonajes();
    $(document).on("click", ".personaje", mostarDetallePersonaje);
    $('.modal').modal();
};

var cargarPersonajes = function () {
    var url = "https://pokeapi.co/api/v2/pokemon-species/";
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
var contadorImagen=1;

var mostrarPersonajes = function (personajes) {
    var $ul = $("#personajes");
    $ul.addClass("center");

    personajes.forEach(function (personaje) {
        var $img= $("<img/>");
        var $li = $("<li/>");
        var $p=($("<p />").text(personaje.name));
        

        $li.attr("data-target", "modal1");
        $li.addClass("personaje left");
        $li.attr("data-url", personaje.url);

        $img.attr("src","img/" + contadorImagen + ".jpg");
        $img.addClass("responsive-img center-align"); //poner clase de edicion propia
        contadorImagen++;
        
        $li.append($p);
        $li.append($img);
        $ul.append($li);
        console.log(personaje.name + "  --  "+ personaje.url);
    });
}


/*------------Plantilla--------------*/
/*var plantillaPlaneta = "<section id='modal1' class='modal'>"+
    "<h2>Pokemon</h2>" +
    "<p><strong>Nombre:</strong>__name__ </p>" +
    "<p><strong>Colo:</strong>__color__</p>"+
    "<p><strong>Forma:</strong>__shape__</p>"+
    "<p><strong>Habitad:</strong>__habitat__</p>"+
    "<p><strong>Genera:</strong>__genera__</p>" +
"</section>";*/

/*$(plantillaPlaneta).addClass("modal");*/

var mostarDetallePersonaje = function () {
    var url = $(this).data("url");
/*    var $planetacontenedor = $("#planeta");*/
    $.getJSON(url, function (response) {
        var name= response.name;
        var color= response.color.name;
        var shape= response.shape.name;
        var habitat= response.habitat.name;
        var genera= response.genera[0].genus;

        $("#idname").text(name);
        $("#idcolor").text(color);
        $("#idshape").text(shape);
        $("#idhabitat").text(habitat);
        $("#idgenera").text(genera);
        /*$("#foto").text();*/

/*        $planetacontenedor.html(
            plantillaPlaneta.replace("__name__", name).replace("__color__", color).replace("__shape__", shape) .replace("__habitat__", habitat).replace("__genera__", genera)
        );*/
    });
};

$(document).ready(cargarPagina);
