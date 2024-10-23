const express = require('express');
const { randomUUID } = require('crypto');
const app = express();

app.use(express.json()); 

const pessoas = [
    {
        "id": 1,
        "nome": "kayke",
        "celular": "996607254"
    }
];

app.get('/pessoas', (req, res) => {
    return res.json(pessoas);
});

app.get('/pessoas/:id', (req, res) => {
    const {id} = req.params;

    const pessoa = pessoas.find(p => p.id == id);
    
    return res.json(pessoa)
});




app.post('/pessoas', (req, res) => {
    const { nome, celular } = req.body;


    const novaPessoa = {
         id: randomUUID(),
        nome,
        celular,
    };

pessoas.push(novaPessoa);
    return res.json({ mensagem: 'Pessoa acionada com sucesso'});
});

app.put('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    const { nome, celular } = req.body;

    let pessoa = pessoas.find(p => p.id == id);
    pessoa.nome = nome;
    pessoa.celular = celular

    return res.json(pessoa);
});

app.delete('/pessoas/:id', (req, res) => {
    const { id } = req.params;

    const pessoaIndex = pessoas.findIndex(p => p.id === id);
    const removerPessoa = pessoas.splice(pessoaIndex, 1);

    return res.json({ mensagem: 'Pessoa removida com sucesso', removerPessoa });
});

const PORT = 3000;
app.listen(PORT, () => {console.log(`Servidor rodando na porta ${PORT}`);

});
