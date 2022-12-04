import app from './app'

const server = app.listen(app.get('PORT'), () => {
  console.log(`Server on port ${app.get('PORT')}`)
})

export default server
