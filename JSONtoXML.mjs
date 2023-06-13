import { create } from 'xmlbuilder';
import { writeFile } from 'fs/promises';
import empresaJson from "./empresa.json" assert { type: "json" };

// Criação do documento XML
const empresa = create('empresa');

// Função para converter o JSON para XML
const converterXML = (obj, elementoPai) => {
    for (let chave in obj) {
      if (typeof obj[chave] === 'object') {
        if (Array.isArray(obj[chave])) {
          const elementoArrayPai = elementoPai.ele(chave);
          for (let item of obj[chave]) {
              converterXML(item, elementoArrayPai);
          }
        } else {
          const elementoFilho = elementoPai.ele(chave);
          converterXML(obj[chave], elementoFilho);
        }
      } else {
        elementoPai.ele(chave, obj[chave]);
      }
    }
  };
  
converterXML(empresaJson, empresa);

// Conversão do XML para string
const xmlString = empresa.end({ pretty: true });

// Escrita do arquivo XML
writeFile('./empresa.xml', xmlString , 'utf8')
  .then(() => {
    console.log('Arquivo XML gerado!');
  })
  .catch((err) => {
    console.error('Erro:', err);
  });
