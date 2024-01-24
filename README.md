# Express JS Practice

## Get Request :
``` 
app.get("/",  (req, res) => {
  res.status(202).send("Hello bro!!!");
})
```


## Get Request with params :
``` 
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
```

## Post Request with body :
```
app.post("/api/users", (req,res)=>{
  console.log(req.body);
  const {body} = req;
  const newUser = {id : mockUserData[mockUserData.length - 1].id+1, ...body};
  mockUserData.push(newUser)
  return res.status(201).send(mockUserData);
})
```
## Put Request with body :
```
app.put("/api/users/:id",(req,res)=>{
  const {
    body,
    params: {id},
  } = req;
  const parseID = parseInt(id);
  if(isNaN(parseID)) return res.sendStatus(400);
  const findUserId = mockUserData.findIndex((user)=>user.id === parseID);
  if(findUserId===-1)  return res.sendStatus(404);
  mockUserData[findUserId]={id:parseID, ...body};  console.log(mockUserData[findUserId]);
  return res.sendStatus(200);
});
```

## Patch Request with params :
```
app.patch("/api/users/:id", (req,res)=>{
  const {
    body,
    params : {id},
  }= req;
  const parseID = parseInt(id);
  if(isNaN(parseID)) return res.sendStatus(400);
  const findUserId = mockUserData.findIndex((user)=>user.id == parseID);
  if(findUserId===-1) return res.sendStatus(404);
  mockUserData[findUserId] = {...mockUserData[findUserId], ...body};  console.log(mockUserData[findUserId]);
  return res.sendStatus(200);
})
```
## Delete Request with params :
```
app.delete("/api/users/:id", (req,res)=>{
  const {
    params : {id},
  } = req;
  const parseID = parseInt(id);
  if (isNaN(parseID)) return res.sendStatus(400)
  const findUserId = mockUserData.findIndex(user => user.id == parseID)
  if (findUserId === -1) return res.sendStatus(404)  mockUserData.splice(findUserId,1 );
  return res.sendStatus(200);  
})
```
