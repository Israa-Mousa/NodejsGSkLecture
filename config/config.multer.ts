import multer from "multer";
import path from "path";


const desDirectory=path.join(__dirname,'../uploads');

const fileUpload=multer(
    {
      dest:desDirectory,
      limits:{
        fileSize:1024*1024*5    
      },
      fileFilter:(req,file,cb) => {
        if(file.mimetype.startsWith('/image') ){
        cb(null,true);
        }
        else{
            cb(new Error('the type not suport'))
        }
      }
    }
)