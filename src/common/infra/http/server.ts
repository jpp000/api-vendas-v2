import { env } from '../env'
import { dataSource } from '../typeorm'
import { app } from './app'
import '@/common/infra/container'

dataSource
  .initialize()
  .then(() => {
    console.log('Db initialized')

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`)
    })
  })
  .catch(err => {
    console.error('Error to initialize db: ', err)
  })
