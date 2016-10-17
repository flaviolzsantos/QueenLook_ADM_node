var dao = require('./dao/dao');
var nomeEntidade = "agendamento";

var Agendamento = function(){
    this.entidade = nomeEntidade;
    this.codigo = "";
    this.data = "";
    this.hora = "";
    this.idAtendente = "";
    this.idCliente = "";
    this.ListaAtendente = [];
    this.atendido = false;
};


exports.BuscarAgendamento = function(req, res){

    dao.listAll("usuario",function(dados){

        if(dados.length > 0){
            var dadosRetorno = [];
            var agendamento = new Agendamento();

            for(var a = 0; a < dados.length; a++){
                dadosRetorno.push({nome:dados[a].nome,valor:dados[a]._id});
            };

            agendamento.ListaAtendente = dadosRetorno;

            if(req.body.id != undefined){
                //Buscar do banco
                res.send(agendamento);
            }else{
                res.send(agendamento);
            }
        }else{
            res.send("Sem dados");
        }
    });
};

exports.SalvarAgendamento = function(req, res){
    
    if(req.body._id == ""){ //Novo
        var agendamento = new Agendamento();

        dao.count(nomeEntidade,function(qtd){
            agendamento.codigo = ++qtd;    
        });

        agendamento.data = req.body.data;
        agendamento.idAtendente = req.body.idAtendente;
        agendamento.idCliente = req.body.idCliente;
        agendamento.data = req.body.data;
        agendamento.hora = req.body.hora;
        
        dao.insert(agendamento);
        res.send("ok");
    }

    res.send("ok");
};