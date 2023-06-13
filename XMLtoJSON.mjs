import { Parser } from 'xml2js';
import { readFile } from 'fs';

// Leitura do arquivo XML
readFile( './biblioteca.xml', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo:', err);
    return;
  }

  // Parser do XML
  const parser = new Parser();
  parser.parseString(data, (err, result) => {
    if (err) {
      console.error('Erro ao analisar o XML:', err);
      return;
    }

    // Acessando os valores
    const endereco = result.biblioteca.endereco[0];
    const livros = result.biblioteca.livros[0];


    console.table(result)
    console.log('Endereço:', endereco);
    console.log('Livros:', livros.livro);
  });
});
