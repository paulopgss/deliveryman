import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDeliveryController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";

const routes = Router();

const authenticateClientController = new AuthenticateClientController();
const authenticatedDeliverymanController =
  new AuthenticateDeliverymanController();
const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();

const createDeliveryController = new CreateDeliveryController();

routes.post("/client/authenticate", authenticateClientController.handle);
routes.post(
  "/deliveryman/authenticate",
  authenticatedDeliverymanController.handle
);

routes.post("/client", createClientController.handle);
routes.post("/deliveryman", createDeliverymanController.handle);

routes.post(
  "/delivery",
  ensureAuthenticateClient,
  createDeliveryController.handle
);

export { routes };
