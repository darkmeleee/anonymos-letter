const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const jsonParser = express.json();
var randtoken = require('rand-token');
const fs = require('fs');
const port = 3000;
var multer  = require('multer');
const { redirect } = require("express/lib/response");
var upload = multer()
var path1 = "text.json"

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname+'/form.html'));

})

app.get("/:url", function(req,res){

    const token = req.params.url;
    const jsonfile = fs.readFileSync(path1, "utf8");
    const links = JSON.parse(jsonfile);
    let redrict = null;

    for(var i=0; i<links.length; i++){
        if(links[i].token == token){
            redrict = links[i];
            break;
        }
    }

    if(redrict){
        res.send(`<head><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"> </head>

    
        <body class="d-flex h-100 text-center text-white bg-dark">
        
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <header class="mb-auto">
        <div>
          <nav class="nav nav-masthead justify-content-center float-md-end">
          </nav>
        </div>
      </header>
    
      <main class="px-3">
        <h1>Вам оставили записку.</h1>
        <p class="lead">${redrict.text}</p>
        <p class="lead">
        <a href="/" class="btn btn-lg btn-secondary fw-bold border-white bg-dark">Оставить ответ. </a>
        </p>
      </main>
    
      <footer class="mt-auto text-white-50">
        <p>Powered by <a href="https://getbootstrap.com/" class="text-white">Bootstrap</a>, by <a href="https:/vk.com/darkmeleee/" class="text-white">@darkmeleee</a>.</p>
      </footer>
    </div>
    
    
        
      
    
    </body>
        
        
        
        
        
        
        
        
        `);
    }
        else{
            res.redirect(".")
        }
        ;
    
    });




    


app.post('/profile', upload.array(), function (req, res, next) {
    
    const textlink = req.body.text;
    const token = randtoken.generate(8).toLocaleLowerCase();
    let link = {"token": token, "text": textlink};
    let data = fs.readFileSync(path1, "utf8");
    let links = JSON.parse(data);
     links.push(link);
    data = JSON.stringify(links);
    fs.writeFileSync("text.json", data);
    res.status(201).send(`<head><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"> </head>

    
    <body class="d-flex h-100 text-center text-white bg-dark">
    
<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
  <header class="mb-auto">
    <div>
      <nav class="nav nav-masthead justify-content-center float-md-end">
      </nav>
    </div>
  </header>

  <main class="px-3">
    <h1>Готово!</h1>
    <p class="lead">Ваша записка доступна по адресу: <a href="http://localhost:3000/${token}" class="text-white"> localhost:3000/${token}</a></p>
    <p class="lead">
    <a href="/" class="btn btn-lg btn-secondary fw-bold border-white bg-dark">Вернуться на главную. </a>
    </p>
  </main>

  <footer class="mt-auto text-white-50">
    <p>Powered by <a href="https://getbootstrap.com/" class="text-white">Bootstrap</a>, by <a href="https:/vk.com/darkmeleee/" class="text-white">@darkmeleee</a>.</p>
  </footer>
</div>


    
  

</body>
    
    
    
    
    
    
    
    
    `);
  })

app.listen(port, () => {
    console.log(`Connected`);
})
    
