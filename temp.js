app.get('/api/users/:id', (req, res) => {
  console.log(req.params)
  const parseID = parseInt(req.params.id)
  if (isNaN(parseID)) {
    return res.status(400).send({ msg: 'Bad Request. Invalid ID' })
  }
  const findUser = mockUserData.find(user => user.id === parseID)
  if (!findUser) {
    return res.status(404).send({ msg: 'User not found' })
  }
  return res.send(findUser)
})
