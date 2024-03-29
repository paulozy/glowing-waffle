import { adaptRoute } from '@middlewares/adapt-route.middleware'
import { bodyValidator } from '@middlewares/body-validator.middleware'
import { ensureAuthenticated } from '@middlewares/ensure-authenticated.middleware'
import { Router } from 'express'
import { middleware as query } from 'querymen'
import {
  createScenarioController,
  deleteManyScenariosController,
  deleteScenarioController,
  listScenariosController,
  showScenarioController,
  updateScenarioController,
} from '../controllers'
import { createScenarioDTO, deleteManyScenariosDTO, updateScenarioDTO } from '../dtos'

const scenarioRoutes: Router = Router()

scenarioRoutes.post(
  '/',
  ensureAuthenticated({ required: true }),
  bodyValidator(createScenarioDTO),
  adaptRoute(createScenarioController)
)

const reqSchema = {
  name: {
    type: [RegExp],
  },
}

scenarioRoutes.get('/', ensureAuthenticated({ required: true }), query(reqSchema), adaptRoute(listScenariosController))

scenarioRoutes.get('/:id', ensureAuthenticated({ required: true }), adaptRoute(showScenarioController))

scenarioRoutes.put(
  '/:id',
  ensureAuthenticated({ required: true }),
  bodyValidator(updateScenarioDTO),
  adaptRoute(updateScenarioController)
)

scenarioRoutes.delete('/:id', ensureAuthenticated({ required: true }), adaptRoute(deleteScenarioController))

scenarioRoutes.post(
  '/deleteMany',
  ensureAuthenticated({ required: true }),
  bodyValidator(deleteManyScenariosDTO),
  adaptRoute(deleteManyScenariosController)
)

export { scenarioRoutes }
