var express = require('express'),
    bodyParser = require('body-parser'),
    
    usuario = require('./routes/usuario'),
    cliente = require('./routes/cliente'),
    agendamento = require('./routes/agendamento'),
    home = require('./routes/home');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.use(express.static('html'));

/******CLIENTE ******/
app.post('/cliente/addcliente/',cliente.AdicionaCliente);
app.post('/cliente/listarClientes/',cliente.BuscaCliente);
app.post('/cliente/editarCliente/',cliente.EditarCliente);
app.post('/cliente/deletarCliente/',cliente.DeletarCliente);

/******USUARIO ******/
app.post('/usuario/logar/',usuario.Logar);

/******HOME ******/
app.post('/home/Carregahome/',home.Carregahome);


/******AGENDAMENTO ******/
app.post('/agendamento/BuscarAgendamento/', agendamento.BuscarAgendamento);
app.post('/agendamento/SalvarAgendamento/', agendamento.SalvarAgendamento);

//usuario.PopulaUsuario();


/*app.get('/usuario', usuario.findAll);
app.get('/usuario/:id', usuario.findById);
*/
/*app.post('/usuario', usuario.addWine);
app.put('/usuario/:id', usuario.updateWine);
app.delete('/usuario/:id', usuario.deleteWine);*/



app.listen(3000);