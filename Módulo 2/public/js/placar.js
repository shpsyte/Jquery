
//aula 7 
/**Criando um placar para o nosso jogo e adicionando botao remover*/
/** Html fefetuado! */


function removeLinha(event) {
    event.preventDefault();
    //$(this).parent().parent().remove();

    //fade animacao para remover de forma suave
    var $linha = $(this).parent().parent();

    $linha.fadeOut(500, function() {
        $this.remove();
    });

}


function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Jose";
    var numPalavaras = $("#contador-palavras").text();
    var numCaracteres = $("#contador-caracteres").text();

    //aula 8 criando um elemento (na verdad é string)
    var botaoRemover = "<a href='#'class><i class='small material-icons'>delete</i></a>";

    var linha = novaLinha(usuario, numPalavaras);
    linha.find(".botao-remover").click(removeLinha);
    //corpoTabela.append(linha);

  
    //adiciona ao final
    //corpoTabela.append(linha);
    //adiciona antes
    corpoTabela.prepend(linha);
    $(".placar").slideDown(500);
    scrollPlacar();



    


}


function scrollPlacar() {
    var offset = $(".placar").offset();
    var top = offset.top;
    //funcao para animar, recebe 2 paramtros
    //A primeira é objeto javascrip com as propriedades que quer animar
    // left, right, hide, ....
    $("body").animate({ scrollTop: top + "px" }, 1000);
    
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");
    var link = $("<a>").addClass("botao-remover").attr("href","#");
    var icone = $("<i>").addClass("small material-icons").text("delete");

    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
 
}