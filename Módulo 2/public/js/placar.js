// Modulo 2 Aula 1
// escondendo o placar

$("#botao-placar").click(function () {
    exibePlacar();
});


// Modulo e aula 10 
// syncronicazao

$("#botao-sync").click(sincronicaPlacar);


function exibePlacar() {
    // esconde ou mostra o elemento
    //$(".placar").toggle();

    //mas para adicionar um estilo podemos usar a slideToggle
    $(".placar").stop().slideToggle(600);

    // a funcao stop para a animacao corrente para não ficar empilhado

    //slideDown, slideUp

}


function sincronicaPlacar() {
    var placar = [];
    var linha = $("tbody>tr");
    linha.each(function () {
        //nth-chlid(1) pega o primeiro elemento no caso TD
      var usuario = $(this).find("td:nth-child(1)").text();
      var palavras =  $(this).find("td:nth-child(2)").text();
      var obj = {
          usuario: usuario,
          pontos: palavras
      };
      placar.push(obj);
    });

    var dados = { 
            placar: placar
    };

    // faz um post para a url especifica
    $.post("http://localhost:3000/placar", dados, function () {
      console.log("Dados salvo com sucesso");
    });
}



function atualizaPlacar() {
   
    $.get("http://localhost:3000/placar", function (data) {
        $(data).each(function() {
            
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha);
            //adiciona antes
            $("tbody").prepend(linha);
        });
    });
}
 

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