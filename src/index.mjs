import express, { response } from 'express'

const app = express()

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
  if(!filter && !value)
  return req.send(mockUserData);
if(filter && value)
  return res.send(
    mockUserData.filter((user)=> user[filter].includes(value))
  );
  // res.send(mockUserData);
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

app.get("/api/products",(req,res)=>{
  res.send([
    { id: 1, Name: 'Mobile', Price: 10000 },
    { id: 2, Name: 'Laptop', Price: 50000 },
    { id: 3, Name: 'TV', Price: 20000 }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
