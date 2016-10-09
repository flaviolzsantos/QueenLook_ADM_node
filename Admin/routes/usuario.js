var dao = require('./dao/dao');
var nomeEntidade = "usuario";

var Usuario = function(){
    this.entidade = nomeEntidade;
    this.nome = "";
    this.login = "";
    this.senha = "";
    this.excluido = false;
};

exports.PopulaUsuario = function(){

    var usuarioMel =  new Usuario();
    usuarioMel.nome = "Melissa"
    usuarioMel.login = "mel";
    usuarioMel.senha = "123";

    var usuarioTalita = new Usuario();
    usuarioTalita.nome = "Talita";
    usuarioTalita.login = "tal";
    usuarioTalita.senha = "123"

    exports.CadastrarUsuario(usuarioMel);
    exports.CadastrarUsuario(usuarioTalita);
};

exports.CadastrarUsuario = function(objeto){
	return dao.insert(objeto);	
};

exports.Logar = function(req, res){    
    var usuario = new Usuario();
    usuario.login = req.body.login;
    usuario.senha = req.body.senha;
    delete usuario.nome;
    
    dao.find(usuario,function(ret){
        res.send(ret);
    });    
    
};

exports.BuscaUsuarioPorId = function(req, res){
	var id = req.params.id;
	var usuario = {
		nome: "usuario",
		_id: id
	};	
	dao.find(usuario, res);
};



/*exports.findById = function(req, res) {
    dao.findById(req, res, nomeEntidade);
};

exports.findAll = function(req, res) {
    dao.findAll(req, res, nomeEntidade);
};
*/
/*exports.addWine = function(req, res) {
    var usuario = req.body;
    console.log('Adding wine: ' + JSON.stringify(usuario));
    db.collection('usuarios', function(err, collection) {
        collection.insert(usuario, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateWine = function(req, res) {
    var id = req.params.id;
    var usuario = req.body;
    console.log('Updating usuario: ' + id);
    console.log(JSON.stringify(usuario));
    db.collection('usuarios', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, usuario, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating usuario: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(usuario);
            }
        });
    });
}

exports.deleteWine = function(req, res) {
    var id = req.params.id;
    console.log('Deleting usuario: ' + id);
    db.collection('usuarios', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}


*/