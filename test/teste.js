const axios = require('axios');
const expect = require('chai').expect;

describe('POST /denuncia', () => {
 it('Status de funcionamento deve ser 200', (done) => {
 axios.post('http://localhost:5000/denuncia',
    [
        {
          "dataocorrencia": "2023-11-09",
          "frequencia": "r6utre67",
          "bairro": "rdfjhur6j",
          "cidade": "rsyju5sryj",
          "endereco": "rstujhryj",
          "cep": "rsj465j465j",
          "complemento": "rsdgaed",
          "numcasa": "2453",
          "numdenunciado": "(25) 85989-8478",
          "idade": "eyh4jhu",
          "corpele": "",
          "corolhos": "",
          "corcabelo": "",
          "tipocabelo": "",
          "tatuagem": false,
          "cicatriz": false,
          "deficiencia": false,
          "oculos": false,
          "estatura": "",
          "fisico": "",
          "tornozeleira": "",
          "arma": "",
          "textarea": "",
          "files": [
            
          ],
          "naoseiendereco": false,
          "nome": "",
          "sexo": "",
          "id": "1"
        }
      ])
  .then((response) => {
    expect(response.status).to.equal(200);
    done();
  })
  .catch((error) => {
    console.log(error.message);
    console.log(error.response);
    done(error);
   });
 });
});