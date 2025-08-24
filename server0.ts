import { error } from 'console';
import express,{Request,Response,NextFunction} from 'express';
import path from 'path';

const PORT = 4000;
const app = express();
 app.use(express.json()); 
 app.use(express.urlencoded());
//app.use(express.static(path.join(__dirname,'public')))
//console.log(path.join(__dirname,'public'));

app.use(express.static(path.join(__dirname,'public'),{
setHeaders:(res,path)=>{
res.setHeader('cache-control',`public max-age=${60*60}`);
}
})
);

app.use((req,res,next)=>{
console.log(`iam first mid`);
res.setHeader('cache-control','public max-age=3600');
req.body = {name:'israa',age:29};
// reqssd.israa=2;
next();
});

app.use((req:Request<{},{},{name:string}>,res,next)=>{
console.log(`iam second mid`);
console.log(req.body.name);

// res.send(`Hello from Express!`);
next()
})
app.get('/profile',async(req,res,next)=>{
    try {
        console.log(`iam third mid`); 
        const profileData=await fetch('profile');
            res.json({success:true,data:{name:'Israa'}})
      
    }   catch (error) {
        console.log('ereror in third middleware:', error);
        res.status(400).send('Error fetching profile data');
       }
    next()
})
// app.get('/profile',(req,res,next)=>{
//     res.json({success:true,data:{name:'mazara'}})
//     next()
// })
app.use((error:Error,req:Request,res:Response,next:NextFunction)=>{
    console.error(error);       
    res.status(500).json({sucess:false,message:'Internal Server Error'});
});
app.use((req,res)=>{
   const path= req.path;
    res.status(404).send(`this path ${path} does not exist`);
})
app.listen(PORT,()=> {
    console.log(`Server is running on port ${PORT}`);  
 }
);