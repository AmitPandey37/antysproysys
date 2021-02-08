const port = 3000;
var express = require('express');
    app =  express();
    bodyParser = require('body-parser')
    mongoose = require('mongoose')
    methodOverride = require('method-override')
    expressSanitizer = require('express-sanitizer')
    Ant = require('./models/ants')

mongoose.connect("mongodb://localhost:27017/ants",{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false})

app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer())
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(methodOverride("_method"));



app.get('/',function(req,res){
    res.render("landing");
})
app.get("/products",function(req,res){
    Ant.find({},function(err,antsdata){
            if(err){
                    console.log(err);
            }
            else{
               res.render('products',{antsdata:antsdata})
            }
        })
})

app.get('/products/new',function(req,res){
    res.render("./ant/form")
})

app.post("/products",function(req,res){
    Ant.create(req.body.products,function(err,newlyCreated){
        if(err){
            console.log(err)
        }
        else{
            res.redirect('/products');
        }
    })
})


app.get("/products/search",function(req,res){
   res.render("./ant/search");
})

app.post("/products/search/order_id",function(req,res){
    var order_id = req.body.order_id;
    Ant.find({order_id : order_id},function(err,product){
        if(err){
            console.log(err);
        }
        else{
            res.render('./ant/product',{product:product})
        }
    });
    
});

app.get("/products/:id/edit",function(req,res){
    
    Ant.findById(req.params.id, function(err,foundproduct){
            if(err){
                res.redirect("/products/search")
            } else{
                res.render("./ant/edit",{pro:foundproduct});
                
            }
    })
})

app.get("/products/:id",function(req,res){
    Ant.findById(req.params.id, function(err, Updatedproduct){
        if(err){
            console.log(err)
        }else{
            res.render("./ant/show",{product:Updatedproduct})
        }
    })
})

app.put("/products/:id",function(req,res){
    
    Ant.findByIdAndUpdate(req.params.id,req.body.product,function(err,updatedBlog){
            if(err){
                console.log(err);
            } else{
                // console.log(req.body.product)
                res.redirect("/products/"+req.params.id);
            }
    })
})

app.delete("/blogs/:id",function(req,res){
    Ant.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/products/search")
        }
        else{
            res.redirect("/products")
        }
    })
})


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})