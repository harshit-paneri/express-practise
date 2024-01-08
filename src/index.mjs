import express, { response } from 'express'

const app = express()
app.use(express.json());
const PORT = process.env.PORT || 3000;

const mockUserData = [
  { id: 1, username: 'harshit', Name: 'Harshit Paneri' },
  { id: 2, username: 'jack', Name: 'Jack Tem' },
  { id: 3, username: 'ram', Name: 'Ram Chandra' }
];

app.get("/", (req, res) => {
    res.status(202).send("Hello bro!!!");
})

app.get("/api/users",(req,res)=>{
  const {
    query: {filter,value},
  } = req;
if(filter && value)
  return res.send(
    mockUserData.filter((user)=> user[filter].includes(value))
  );
  return res.send(mockUserData);
});

//route parameter
app.get("/api/users/:id",(req,res)=>{
  console.log(req.params);
  const parseID = parseInt(req.params.id);
  if(isNaN(parseID)) {
    return response.status(400).send({msg : "bad Request. Invalid ID"})
  } 
  const findUser = mockUserData.find(user=>user.id===parseID);
  if(!findUser)  { 
    return res.status(404).send({msg : 'User not found'})
  }
  return res.send(findUser);
})

// Post request
app.post("/api/users", (req,res)=>{
  console.log(req.body);
  const {body} = req;
  const newUser = {id : mockUserData[mockUserData.length - 1].id+1, ...body};
  mockUserData.push(newUser)
  return res.status(201).send(mockUserData);
})

app.get("/api/products",(req,res)=>{
  res.send([
    { id: 1, Name: 'Mobile', Price: 10000 },
    { id: 2, Name: 'Laptop', Price: 50000 },
    { id: 3, Name: 'TV', Price: 20000 }
  ]);
});


app.put("/api/users/:id",(req,res)=>{
  const {
    body,
    params: {id},
  } = req;
  const parseID = parseInt(id);
  if(isNaN(parseID)) return res.sendStatus(400);
  const findUserId = mockUserData.findIndex((user)=>user.id === parseID);
  if(findUserId===-1)  return res.sendStatus(404);
  mockUserData[findUserId]={id:parseID, ...body};
  console.log(mockUserData[findUserId]);
  return res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
