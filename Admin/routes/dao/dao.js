var Datastore = require('nedb')
  , dbCliente = new Datastore({ filename: 'data/dbCliente', autoload: true })
  , dbUsuario = new Datastore({ filename: 'data/dbUsuario', autoload: true })
  , dbAgendamento = new Datastore({ filename: 'data/dbAgendamento', autoload: true })
  , dbErro = new Datastore({ filename: 'data/dbErro', autoload: true })
  ,mensagemDeErro = "Deu erro, por favor, avise o admistrador do sistema";


exports.insertError = function(erro, metodo){
    var erro = {
        "dadosDoErro": erro,
        "metodo": metodo,
        "data": getDate()
    };
    dbErro.insert(erro);
};

exports.insert = function(objeto){
	
	getDb(objeto.entidade).insert(objeto, function(err, collection) {
        if(err != undefined){			
			dbErro.insert(err);
			return err;
		}else{
			return collection;
		}
    });	
};

exports.update = function(objeto){
        
	getDb(objeto.entidade).update({_id:objeto._id}, objeto,{ multi: true }, function(err, collection) {
        if(err != undefined){			
			dbErro.insert(err);
			return err;
		}else{
			return collection;
		}
    });
	
};

exports.find = function(objeto, fn){
    objeto.excluido = false;
	getDb(objeto.entidade).find(objeto, function (err, collection) {
	
	  if(err != null){		
			err.dadosDoErro = { metodo : "find", objeto : objeto, data : getDate()};
			dbErro.insert(err);
			throw new Error(mensagemDeErro);
		}else{	
			fn(collection);
		}
	});
};

exports.findOne = function(objeto, fn){
    objeto.excluido = false;
	getDb(objeto.entidade).findOne(objeto, function (err, doc) {
	
	  if(err != null){		
			err.dadosDoErro = { metodo : "findOne", objeto : objeto, data : getDate()};
			dbErro.insert(err);
			throw new Error(mensagemDeErro);
		}else{	
			fn(doc);
		}
	});
};


exports.listAll = function(nomeEntidade, fn){

    getDb(nomeEntidade).find({"entidade":nomeEntidade, "excluido":false}, function (err, collection) {
	
	  if(err != null){		
			err.dadosDoErro = { metodo : "find", objeto : objeto, data : getDate()};
			dbErro.insert(err);
			res.send(mensagemDeErro);
		}else{            
			fn(collection);
		}
	});
};

exports.count = function(nomeEntidade,fn){
    getDb(nomeEntidade).count({"entidade":nomeEntidade, "excluido":false},function(err,count){
        fn(count);
    });
}

function getDate(){

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd
} 
if(mm<10){
    mm='0'+mm
} 
var today = dd+'/'+mm+'/'+yyyy;
return today;

};

function getDb(nomeModulo){

    if(nomeModulo == "cliente")
        return dbCliente;

    if(nomeModulo == "usuario")
        return dbUsuario;
	
	if(nomeModulo == "agendamento")
		return dbAgendamento;

    return dbUsuario;
};