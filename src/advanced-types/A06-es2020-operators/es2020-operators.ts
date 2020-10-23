type Documento = {
  title: string
  text: string
  date?: Date
}

const documento: Documento = {
  text: 'Texto',
  title: 'Titulo',
  date: new Date()
}

console.log(documento.date?.toDateString())
