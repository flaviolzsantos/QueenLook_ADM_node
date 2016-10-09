var dao = require('./dao/dao');
var nomeEntidade = "home";

var Home = function(){
    this.entidade = nomeEntidade;
    this.quantidadeDeCliente = "";
};

exports.Carregahome = function(req, res){
    var home = new Home();
    dao.count("cliente",function(qtd){
        home.quantidadeDeCliente = qtd;
        res.send(home);
    });
};