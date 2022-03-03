import { client, base } from "./app.json";
import { IAppContext, IClientsContext, IBaseContext, IClient } from "~/utils";

const clients: IClientsContext = {
  vindicce: {
    pro: "http://localhost:3000",
    dev: "http://localhost:3000",
    socket: "http://localhost:3000",
    theme: "vindicce",
  },
};

const defineContext = (client: IClient, base: IBaseContext): IAppContext => {
  return {
    api: clients[client][base],
    socket: clients[client].socket,
    theme: clients[client].theme,
  };
};

export const appContext = defineContext(
  client as IClient,
  base as IBaseContext
);
