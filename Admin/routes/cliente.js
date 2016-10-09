var dao = require('./dao/dao');
var nomeEntidade = "cliente";


var TipoTelefone = {
    residencial : 'Residencial',
    celular : 'Celular',
    comercial : 'Comercial',
    whatsApp : 'WhatsApp'
};

var TipoIndicacao = {
    indicacao : 'Indicação',
    facebook : 'Facebook',
    instagram : 'Instagram',
    sala : 'Sala',
};

var Cliente = function(){
    this.codigo = "";
    this.entidade = nomeEntidade;
    this.nome = "";
    this.email = "";
    this.rua = "";
    this.numero = "";
    this.bairro = "";
    this.nascimento = "";
    this.instagram = "";
    this.telefones = new Array();
    this.tipoTelefone = TipoTelefone;
    this.tipoIndicacao = "";
    this.listaIndicacao = TipoIndicacao;
    this.facebook = "";
    this.excluido = false;
    
};
var Telefone = function(){
    this.numero = 0;
    this.tipo = TipoTelefone;
};

exports.BuscaCliente = function(req, res){    
    if(req.body.nome == undefined){        
        res.send({});
    }else{
                
        dao.listAll("cliente",function(dados){
            var lista = {};
            lista.itens = [];
            lista.nome = req.body.nome;
            lista.telefone = req.body.telefone; 
            if(req.body.nome != ""){
                for (var i = 0, l = dados.length; i < l; i++){
                    if (dados[i].nome.toLowerCase().indexOf(req.body.nome.toLowerCase()) !== -1) {
                        lista.itens.push(dados[i]);
                    }
                };

                if(req.body.telefone == ""){
                    res.send(lista);
                    return;
                };
            };

            if(req.body.telefone != ""){

                for (var i = 0, l = dados.length; i < l; i++){
                    
                    if(dados[i].telefones != undefined){                        
                        for(var a = 0; a < dados[i].telefones.length; a++){                            
                            if (dados[i].telefones[a].numero.indexOf(req.body.telefone) !== -1) {
                                
                                if(lista.itens.map(function(e){return e._id;}).indexOf(dados[i]._id) === -1)
                                    lista.itens.push(dados[i]);
                            }
                        }
                    }
                };
                res.send(lista);
                return;
            };
            
            lista.itens = dados;
            res.send(lista);
        });
    }
};

exports.EditarCliente = function(req, res){
    var cliente = new Cliente();

    if(req.body.id == undefined){
        res.send(cliente);
    }else{       
        
        dao.findOne({_id:req.body.id, entidade:nomeEntidade},function(collections){
            res.send(collections);
        });
    }
};

exports.AdicionaCliente = function(req, res){
    try{
        var cliente = new Cliente();
        if(req.body._id != ""){
            
            dao.findOne({_id:req.body._id, entidade:nomeEntidade},function(cliente){
                
                cliente.codigo = req.body.codigo;        
                cliente.nome = req.body.nome;
                cliente.email = req.body.email;
                cliente.rua = req.body.rua;
                cliente.numero = req.body.numero;
                cliente.bairro = req.body.bairro;
                cliente.cidade = req.body.cidade;
                cliente.nascimento = req.body.nascimento;
                cliente.instagram = req.body.instagram;
                cliente.telefones = req.body.telefones;
                cliente.tipoIndicacao = req.body.tipoIndicacao;
                cliente.facebook = req.body.facebook;

                dao.update(cliente)
            });
        }else{

            cliente.codigo = req.body.codigo;        
            cliente.nome = req.body.nome;
            cliente.email = req.body.email;
            cliente.rua = req.body.rua;
            cliente.numero = req.body.numero;
            cliente.bairro = req.body.bairro;
            cliente.cidade = req.body.cidade;
            cliente.nascimento = req.body.nascimento;
            cliente.instagram = req.body.instagram;
            cliente.telefones = req.body.telefones;
            cliente.tipoIndicacao = req.body.tipoIndicacao;
            cliente.facebook = req.body.facebook;


            dao.count("cliente",function(qtd){
                cliente.codigo = ++qtd;    
            });

            dao.insert(cliente);
        }           

        res.send("ok");
    }catch(e){        
        dao.insertError(e.message,'Adiciona Cliente');
        res.send("nok");
    }
};

exports.DeletarCliente = function(req, res){
    var cliente = new Cliente();
        if(req.body.id != ""){
            
            dao.findOne({_id:req.body.id, entidade:nomeEntidade},function(cliente){
                
                cliente.excluido = true;
                dao.update(cliente);
                res.send("ok");
            });
        }

};



