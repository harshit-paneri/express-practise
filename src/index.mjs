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
  res.send(mockUserData);
});

//route parameter
app.get("/api/users/:id",(req,res)=>{
  console.log(req.params);
  const ParseID = parseInt(req.params.id);
  console.log(ParseID);
  if(isNaN(ParseID)) return response.status(400).send({msg : "bad Request. Invalid ID"});
  const findUser = mockUserData.find((user)=>user.id===ParseID);
  if(!findUser) return response.status(404).send({msg : "User not found"});
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
