import mongoose from "mongoose"

const AppSchema = mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  texto: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
    default: 'geral',
    required: true,
  }],
  data: {
    type: Date,
    default: new Date,
  },
  ativo: {
    type: Boolean,
    default: true,
  },
  coisa: Object,
})

export default mongoose.model("Pagina", AppSchema)