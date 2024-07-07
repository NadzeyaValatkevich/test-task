import jsonServer from "json-server";
import path from "path";
import { generateData } from "./db.js";
import checkAuth from "./checkAuth.js";

import * as UserController from "./controllers/UserController.js";
import * as ProductController from "./controllers/ProductController.js";
import * as ManufacturersController from "./controllers/ManufacturersController.js";
import * as BreadcrumbsController from "./controllers/BreadcrumbsController.js";
import multer from "multer";

const server = jsonServer.create();
const router = jsonServer.router(generateData());
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public"); // Директория для сохранения изображений
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Генерация уникального имени файла
  },
});

const upload = multer({ storage: storage });

//авторизация
server.post("/login", UserController.login);
server.get("/me", checkAuth, UserController.getMe);

//пример пагинации
//products?_limit=10&_page=2&q=п - 10 товаров, вторая страница,
//вывод всех товаров где в названии присутсвует "п"

//пагинация и поиск товаров
server.get("/products", checkAuth, ProductController.getAllProducts);
//получение одного товара по id
server.get("/products/:id", checkAuth, ProductController.getOneProductById);
//добавление товара
server.post(
  "/products",
  upload.single("image"),
  checkAuth,
  ProductController.addProduct
);
//обновление товара по id
server.patch("/products/:id", checkAuth, ProductController.updateProductById);
//удаление товара по id
server.delete("/products/:id", checkAuth, ProductController.deleteProductById);

//получение всех хлебных крошек
server.get("/breadcrumbs", checkAuth, BreadcrumbsController.getAllBreadcrumbs);
//получение конечной хлебной крошки
server.get(
  "/random_breadcrumb",
  checkAuth,
  BreadcrumbsController.getFinalBreadcrumb
);

//получение всех производителей
server.get(
  "/manufacturers",
  checkAuth,
  ManufacturersController.getAllManufacturers
);

server.use(router);
server.listen(3002, () => {
  console.log("server start on http://localhost:3002");
});
