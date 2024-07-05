import express from "express";
import dotenv from "dotenv";
import users from "./database.js";


dotenv.config();
const PORT = Number(process.env.PORT || 8000);
const app = express ();

const user_id = users.reduce((acc, current) => {
    acc[current.id] = current;
    return acc;
}, {});




app.use(express.json());

app.get('/' , (request, response, next ) => {
    return response.status(200).json({
        status: true,
        message:'This is home',
        data: {
          name: 'Express API DEMO',
          url: request.url
        },
    });
}); 

app.get('/users' , (request, response, next ) => {
    return response.status(200).json({
        status: true,
        message:'Users Retrieved',
        data: users,
        
    });
}); 


app.get('/users/:id' , (request, response, next ) => {
  const id = request.params.id;
  const user = user_id[id];

  if (user === undefined ){
    response.status(404).json({
        status: false,
        message: 'user not found',
        data: null,
    });
  } else {
  response.status(200).json({
    status: true,
    message: 'user retrieved',
    data: user,
  });

}
return response;
});

app.listen(PORT, () => {
        console.log(`Server listening on: http://localhost:${PORT}`);
    });

