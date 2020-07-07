<p align="center">
  <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/avs/docs/ux/branding/mark1._TTH_.png">
  <br/>
  <h1 align="center">💻 Skill Alexa Task Automation 🖥</h1>

  <p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/luanyata/Skill-Alexa-Task-Automation?color=%2304D361">

  <a href="https://www.linkedin.com/in/luanyata/">
    <img alt="Made by Luan Yata" src="https://img.shields.io/badge/made%20by-LuanYata-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/luanyata/Skill-Alexa-Task-Automation/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/luanyata/Skill-Alexa-Task-Automation?style=social">
  </a>
</p>

Skill Alexa para controle de PC / Mac por voz.


## 🖥 Tecnologias:
- NodeJs
- Google Firestore
- Amazon S3
- Alexa Cloud

#
## 🛠 Feature:

- ✅ Abrir programa grafico (Mac)
- ✅ Fechar programa grafico (Mac)
- ❌ Abrir programa terminal (Mac)
- ❌ Fechar programa terminal (Mac)
- ❌ Controle do play de música (Mac)
- ❌ Transmisão de tela (Mac)
- ❌ Criar Rotina (Mac)
- ❌ Abrir um site (Mac)


#
## 📃 Estrutura do documento no Firestore
- Collection User
  - Document UserId
    - Commands
      - DocumentId
        - Fields:
           ```
           {
             program: nameProgram,
             type: typeOperation,
             dateExecute: nameCommand
            }
          ```
#
## Comandos
Abrir: 
```
"Abrar o {nome_do_programa}",
"Abra {nome_do_programa}",
"Abrir o {nome_do_programa}",
"Abrir {nome_do_programa}"
```

Fechar:
```
"Destruir {program}",
"Finalizar {program}",
"Encerrar {program}",
"Fechar {program}"
```

# 

## 📕 Consulta Rapida de funções e operações no Firestore

### Snapshots:

- **Snapshot.docs( )** : Todos os documentos daquela coleção
- **Snapshot.empty** : Verifica se o snapshot está vazio
- **Snapshot.metadata** : Metadata do snapshot
- **snapshot.query** : Retorna a query utilizada na consulta do snapshot
- **Snapshot.size** : Retorna o numero de documentos do snapshot
- **snapshot.docChanges( )** : Retorna o array com as mudanças que o Snapshot sofreu


### Docs:
  - **Doc.data()** : Dado o documento
  - **Doc.id** : ID do documento
  - **doc.isEqual(other_doc)** : Verifica se um doc é igual a outro (exeto ID)
