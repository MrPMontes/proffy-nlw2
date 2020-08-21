// Dados
const proffys = [
  {
    name: "Pedro Montes",
    avatar: "https://media-exp1.licdn.com/dms/image/C4D03AQHPaUXVbJym_A/profile-displayphoto-shrink_200_200/0?e=1603324800&v=beta&t=Rx3mu_BYNkmwPmGHbpaGPQUUtLP6xxar3ziRh5pKIyw",
    whatsapp: "34996838852",
    bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado pela ZUP e desenvolvimento web, adora jogar e já tentou ser um gamer hardcore, mas sua mãe não deixou. Mais de 200.000 pessoas já passaram por uma das minhas jogatinas.",
    subject: "Química",
    cost: "40",
    weekday: [0],
    time_from: [720],
    time_to: [1220]
  },
  {
    name: "Montes Pedro",
    avatar: "https://avatars0.githubusercontent.com/u/29560062?s=400&u=de8276f88e76cf89fa99644d6fb9ba3de6c417ee&v=4",
    whatsapp: "34996838852",
    bio: "Hackerman brabo invadindo os sistemas da NASA usando ondas mentais de Buda.",
    subject: "Matemática",
    cost: "999",
    weekday: [1],
    time_from: [620],
    time_to: [1120]
  }
]

const subjects = [
  "Artes",
  "Biologia",
  "Ciências",
  "Educação física",
  "Física",
  "Geografia",
  "História",
  "Matemática",
  "Português",
  "Química"
]

const weekdays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado"
]

// Funcionalidades
function getSubject(subjectNumber) {
  const position = +subjectNumber - 1
  return subjects[position]
}

function pageLanding(req, res) {
  return res.render("index.html")
}
function pageStudy(req, res) {
  const filters = req.query
  return res.render("study.html", { proffys, filters, subjects, weekdays })
}
function pageGiveClasses(req, res) {
  const data = req.query
  const isNotEmpty = Object.keys(data).length != 0

  // se tiver dados (data)
  if (isNotEmpty) {
    data.subject = getSubject(data.subject)
    //adicionar dados a lista de proffys
    proffys.push(data)
    return res.redirect("/study")
  }
  // se não, mostrar a página
  return res.render("give-classes.html", { subjects, weekdays })
}

// servidor
const express = require('express')
const server = express()

//configurar nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
})

// Inicio e configuração do servidor
server
  //configurar arquivos estaticos (css, scripts, imgs)
  .use(express.static("public"))
  //rotas da aplicação
  .get("/", pageLanding)
  .get("/study", pageStudy)
  .get("/give-classes", pageGiveClasses)
  // start servidor e porta
  .listen(5500)