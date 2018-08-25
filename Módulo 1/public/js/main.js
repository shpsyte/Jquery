var tempoInicial = $("#tempo-digitacao").text();
var botao = $("#botao-reiniciar");
var $this = jQuery(this);


//executa o que estea dentro da funcçaõ depois que a página é carregada
// ou podemos usar o atalho da função $
//$(document).ready(function () {
$(function(){

   atualizaFrase();
   inicializaContadores();
   inicializaCronometro();
   inicializaMarcador();
   
    
    // outra maneira de atributir evento usanto atalho do Jquery
    botao.click(reiniciaJogo);

});


//Aula 1
// A versão slim no JQuery não possui animações nem chamadas Ajax

/* Objetivo pegar a quantidade de palavras e ao span*/

//  Pegar element com Jqeur jQuery() ou $()
//  Retorna um objeto com diversas caracteristicas
// usamos então a função text para retonar o texto do elemento
function atualizaFrase() {
    var frase = $(".frase").text();
    var tamanhoFrase = $("#tamanho-frase");
    
    //split para contar quantas palavras tem
    var numeroFrase = frase.split(" ").length;
    
    //troca o valor do span
    //funcao sem parametro funciona como GET e com parametro funciona como "post"
    tamanhoFrase.text(numeroFrase);
    
}



//Aula 2
/* Alterar a quantidade de palavras e caracteres */
var campo = $(".campo-digitacao");

  
 

// acao digitar
/* val() pega o valor do input no campo*/
function inicializaContadores()
{ 
    campo.on("input", function () {
    let conteudo = campo.val();
    
    // let totalPalavras = conteudo.split(" ").length;
    //trocamos " " por /\S+/ para não ter bug para contar as palavras
    let totalPalavras = conteudo.split(/\S+/).length -1 ;

    $("#contador-palavras").text(totalPalavras);
    $("#contador-caracteres").text(conteudo.length);
    });
}



//Aula 3
/** Fazer o tempo descrescer... */
// Quando ele entra no campo comeca a descrescer o campo
// nao deixar o usuario digitar


function inicializaCronometro()
{
        var tempoRestante = $("#tempo-digitacao").text();
        
        /**
         * A função ONE é diferente da Funcao ON pois ele escuta apenas 1 vez o evento, enquanto a funcao ON escuta e executa 
         * várias vezes o evento.
         */
        campo.one("input", function(){
            // funcao do javascrityp que executa uma funcao de x em x tempo
        var cronometroId = setInterval(function(){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante <= 0)
            {
                //faz o setinterval parar de funcionar
                clearInterval(cronometroId);
                finalizaJogo();

            }
        },1000);
        });
}


function finalizaJogo(params) {
    //funnção do Jquery que muda ou os atributos de um elemento
    /** a funcao attr pode setar valor de atributos, basta enviar o valor como segundo parametro
     * atributos que não tem valor como disabled usar true ou false para incluir ou retirar
        */
        campo.attr("disabled", true);

        //funcao css parecido com a funcao attr, ou seja, pode atribuir o valor
        //campo.css("background-color", "lightgray");
        //O Jquery possui uma funcao chamada toggleClass, que se a classe existe ele retira e se não existe ele coloca
        campo.toggleClass("campo-desativado");
        inserePlacar();
}

//Aula 4
/**Adicionar botão para reiniciar o "jogo" 
 * adicionado funcoes
*/

function reiniciaJogo() {
    
    //reabilita o campo
    campo.attr("disabled", false);

    //limpa o que o usuário escreveu
    campo.val("");
    

    //reinica o contador de palavras e caracteres
    $("#contador-caracteres").text("0");
    $("#contador-palavras").text("0");

    //adiciona os 10 seg novamente
    $("#tempo-digitacao").text(tempoInicial);
    //campo.removeClass("campo-desativado");
    //O Jquery possui uma funcao chamada toggleClass, que se a classe existe ele retira e se não existe ele coloca
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");

    //reinicia o cronometro
    inicializaCronometro();
    
}



//Aula 5
//comparar se o texto digitado é igual ao esperado


function inicializaMarcador() {
    var frase = $(".frase").text();
    campo.on("input", function () {
        var digitado = campo.val();
        var comparavel = frase.substr(0,digitado.length);

        // mudando para ECMA 6
        var digitouCorreto  = frase.startsWith(digitado);
        
        //if (digitado == comparavel)
        if (digitouCorreto)
        {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        }else
        {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
    
}


//aula 7 
/**Criando um placar para o nosso jogo e adicionando botao remover*/
/** Html fefetuado! */


function removeLinha(event) {
    event.preventDefault();
    $(this).parent().parent().remove();
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
    corpoTabela.append(linha);

  
    //adiciona ao final
    //corpoTabela.append(linha);
    //adiciona antes
    corpoTabela.prepend(linha);
    


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