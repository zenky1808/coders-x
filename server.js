
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

var todoList = [
  {id: 1, todo:'Đi chợ'},
  {id: 2, todo:'Nấu cơm'},
  {id: 3, todo:'Rửa bát'},
  {id: 4, todo:'Học tại Coders-X'}
]
// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.send('I love CodersX');
});

app.get('/todos', (req, res)=>{
    res.render('index',{
    todoList: todoList
  });
})
app.get('/todo', (req, res) => {
  
  var q = req.query.q;
  var matchTodo = todoList.filter((todos) => {
    return todos.todo.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('index',{
    todoList: matchTodo
  })
});

app.get('/todo/create',(req, res) =>{
  res.render('create');
});
app.post('/todo/create',(req, res) =>{
  todoList.push(req.body)
  res.redirect('/todos')
})


// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
