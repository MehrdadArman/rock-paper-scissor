import jsonServer from "json-server";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

// Get __dirname in ES module
const __dirname = dirname(fileURLToPath(import.meta.url));

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router(join(__dirname, "db.json"));
const port = 3000;

server.use(middlewares);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Use default router
server.use("/", router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
