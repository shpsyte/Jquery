var botaoFrase = $("#botao-frase").click(fraseAleatoria);
 
function fraseAleatoria() {
    $("#spinner").show();
    var frase = $(".frase");
    var fraseAnterior = frase.text();
    frase.text("");


    //efetuar um get na url especifica
    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(function () { //quando houver falha

        //so mostra o erro durante um tempo
        $("#erro").show();
        frase.text(fraseAnterior);
        setTimeout(function() {

           $("#erro").fadeOut();
        }, 2000);
    })
    .always(function () { //sempre vai ser executado
        $("#spinner").toggle();
    });
    
}

function trocaFraseAleatoria(data) {
    var frase = $(".frase");
    var tamanhoTotal = data.length;
    var aleatorio = Math.floor(Math.random() * tamanhoTotal);
    var fraseAleatoria = data[aleatorio];
    frase.text(fraseAleatoria.texto);
 

    atualizaFrase();
    atualizaTempoInicial(fraseAleatoria.tempo);
}
