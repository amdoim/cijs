import App from "../model/app.model.js"


// Create and Save a new Messagesx
function AppController(){  


  const index = (req, res) => {
    console.log('[app.controller.index] done')
    const dados = {
      locals:{
        eu: 'junior'
      }
    }
    res.render('index', dados)
  }

  const create = (req, res) => {
    const message = new App({
      titulo: req.body.titulo,
      tags: req.body.tags,
      texto: req.body.texto
    });
    message
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Message.",
        });
      });
  };

  // Retrieve all messages from the database.
  const findAll = (req, res) => {
    App.find()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving messages.",
        });
      });
  };

  // Find a single message with a messageId
  const findOne = (req, res) => {
    App.findById(req.params.messageId)
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: "Message not found with id " + req.params.messageId,
          });
        }
        res.send(data);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Message not found with id " + req.params.messageId,
          });
        }
        return res.status(500).send({
          message: "Error retrieving message with id " + req.params.messageId,
        });
      });
  };
  // Find a single message with a STRING
  //'^' +search + '$', 'i'  busca exata sem case sensitive
  const find = (req, res) => {
    const queryx = req.params.messageId ? 
      { regI: new RegExp(decodeURI(req.params.messageId.replace(/\+/g, " ")), 'i') } : 
      { regI: new RegExp(`^${decodeURI(req.params.nomeGiria.replace(/\+/g, " "))}\$`, 'i') }
    //console.log(queryx)
    const temp = req.params.messageId ? { texto : queryx.regI } : { titulo : queryx.regI }
    App.find( temp )
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: "Message not found with id " + req.params.messageId,
          });
        }
        const newdata = (data.length > 0) ? data : {message: "vazio"}
        res.send(newdata);
        //console.log(queryx)
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Message not found with id " + req.params.messageId,
          });
        }
        return res.status(500).send({
          message: "Error retrieving message with id " + req.params.messageId,
        });
      });
  };

  // Update a message identified by the messageId in the request
  const update = (req, res) => {
    App.findByIdAndUpdate(
      req.params.messageId,
      {
        titulo: req.body.titulo,
        texto: req.body.texto,
        tags: req.body.tags,
      },
      { new: true }
    )
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: "Message not found with id " + req.params.messageId,
          });
        }
        res.send(data);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Message not found with id " + req.params.messageId,
          });
        }
        return res.status(500).send({
          message: "Error updating message with id " + req.params.messageId,
        });
      });
  };

  // Delete a message with the specified messageId in the request
  const deleta = (req, res) => {
    App.findByIdAndRemove(req.params.messageId)
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: "Message not found with id " + req.params.messageId,
          });
        }
        res.send({ message: "Message deleted successfully!" });
      })
      .catch((err) => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(404).send({
            message: "Message not found with id " + req.params.messageId,
          });
        }
        return res.status(500).send({
          message: "Could not delete message with id " + req.params.messageId,
        });
      });
  };

  return {
    index,
    create,
    find,
    findOne,
    findAll,
    deleta,
    update,
  }
  
}

export default AppController