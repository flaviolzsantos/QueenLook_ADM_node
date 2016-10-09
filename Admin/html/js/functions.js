$().ready(function(){
    carregarHome(true); 
});


/*****HOME******/
function carregarHome(naoAcionaMenu){
    $.post("/home/carregaHome/",function(dados){
        carregarTemplate('../pages/home.html', dados, naoAcionaMenu);
    });
};


/*****CLIENTE******/
function carregarCliente(naoAcionaMenu, dadosPesquisa){
        
    $.post("/cliente/listarClientes/", dadosPesquisa,function(dados){
        carregarTemplate('../pages/clienteListar.html', dados, naoAcionaMenu);
    });
};
function carregaClienteCadastroOuEditar(id){
    
    $.post("/cliente/editarCliente/", {id:id},function(dados){        
        carregarTemplate('../pages/clienteCadastrarEditar.html', dados, true);
    });
};
function excluirCadastro(id){
    bootbox.confirm("Confirma exclusão?", function (confirmou) {
        if (!confirmou)
            return;

        $.post("/cliente/deletarCliente/", {id:id}, function(){        
            carregarCliente(true);
        });
    });
};


/*****AGENDAMENTO******/
function carregaAgendamentoCadastroOuEditar(id){
    
    $.post("/agendamento/BuscarAgendamento/", {id:id}, function(dados){        
        carregarTemplate('../pages/agendamentoCadastrarEditar.html', dados, true);
    });
};
function listarAgendamento(naoAcionaMenu, dadosPesquisa){
        
    //$.post("/cliente/listarClientes/", dadosPesquisa, function(dados){
        carregarTemplate('../pages/agendamentoListar.html', null, naoAcionaMenu);
    //});
};


/*****GENÉRICOS******/
function carregarTemplate(urlTemplate, dados, naoAcionaMenu){
    
    if(!naoAcionaMenu)
        $("#btnMenu").click();

    $.ajax(urlTemplate).done(function(result){

        var compiled = Handlebars.compile(result);
        $('#conteudo').html(compiled(dados));
    });    
};