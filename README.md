El objetivo de este proyecto es poder crear ordenes de comida para un restaurant

Las ordenes estan conformadas por los siguientes campos:

- orderID : es el identificador unico de la orden
- username: es la persona encargada de atender esta orden
- orderType: tipo de orden, puede ser de dos valores "mesa" o "delivery"
- description: este valor va a depender del tipo de orden. Si es de tipo "mesa" el valor de dicho campo es el numero de mesa. Caso contrario, "delivery", este campo queda vacio
- dateOrder: fecha en la cual se efectuo la orden, este campo se crea por default sin intervencion manual
- totalOder: es el valor total de la orden, este comienza vacio y una vez que se cierra la orden es calculado y populado
- detail: array que contiene los productos pedidos en la order. El formato de los productos es el siguiente:
  - idProduct: identificador unico del producto en cuestion
  - product: nombre del producto
  - price : precio por unidad de dicho producto
  - quantity: cantidad pedida de dicho producto

Solamente los usuarios logueados pueden interactuar con las ordenes.

La base de datos de usuarios esta conformada por los siguientes campos:

- username: nombre de usuario
- password: contraseña la cual se encuentra hasheada en la BD
- token: este campo se crea vacio y una vez que el usuario se loguea es populado
- rol: rol del usuario

A su vez se cuenta con un menu que puede ser accedido por cualquier persona sin necesidad de autenticacion. Este es un array anidado de objetos que se conforman de la siguiente manera:

- id: identificador unico del producto en cuestion
- category: categoria del producto este puede ser "food" o "drinks", se pueden agregar mas a futuro
- product: el nombre del producto
- price: precio unitario del producto

Las acciones que se pueden realizar son:
MENU (/api/menu)

- GET /api/menu/: trae toda la carta.
- PATCH /api/menu/:id : Permite actualizar un producto ya existente en la BD de Menu. Se debe estar autenticado para poder utilizar este endpoint, el token se pasa en el header bajo Authorization y a su vez se debe pasar el id del producto a modificar como un paramentro y los campos a actualizar en el body.
  ejemplo: /api/menu/2
  Headers:
  Authorization = ef2655ba-d25c-4546-86e8-7f9517610515
  Body:
  {
  "id": 1,
  "price": 2500
  }

- POST /api/menu/: permite crear un nuevo producto en la BD de Menu. Se debe estar autenticado para poder utilizar este endpoint, el token se pasa en el header bajo Authorization. En el body tienen que estar los datos del nuevo producto menos el id que se crea en sistema.
  Ejemplo:
  Headers:
  Authorization = ef2655ba-d25c-4546-86e8-7f9517610515
  Body:
  {
  "category": "drinks",
  "product": "Coca-Cola Light",
  "price": 800
  }

- DELETE /api/menu/:id : Permite eliminar un producto del menu.Se debe estar autenticado para poder utilizar este endpoint, el token se pasa en el header bajo Authorization. Se pasa como paramentro el ID del producto a eliminar.

USUARIOS (/api/users)

- POST /api/users/: permite crear un nuevo usuario.No se requiere autenticacion. En el body se deben colocar los siguientes campos:
  {
  "username": "Maria"
  "password": "Test"
  "rol": "admin"
  }

- POST api/users/login : Permite loguear un usuario. No se requiere authenticacion. en el body se debe pasar el username y password. El sistema se encarga de hashearla y compararla con la que esta guardada en la BD
  Ejemplo: - Body :
  {
  "username": "Solange",
  "password": "adasd44"
  }

- DELETE api/users/logout: desloguea un usuario. Requiere autenticacion, el token se pasa en el header bajo Authorization.
  Se debe pasar el username en el body.

- DELETE api/users/:username : Permite eliminar un usuario de la BD. Requiere autenticacion, el token se pasa en el header bajo Authorization. Se debe pasar el username como quey params.

- PATCH /api/users/:username: Permite actualizar un usuario de la BD. Requiere autenticacion, el token se pasa en el header bajo Authorization. Se debe pasar el username como quey params, y en el body los campos a actualizar.

ORDENES (/api/orders)
Se requiere autenticacion para todos los endpoints. el token se pasa en el header bajo Authorization.

- POST /api/orders/create : Permite crear una nueva orden. Se debe pasar la siguiente informacion en el body :
  {
  "username": "Solange",
  "orderType": "mesa",
  "description": "2",
  "dateOrder": "14/10",
  }
- POST /api/orders/create/:id : Permite cargar la informacion del pedido de la mesa o delivery. Esto se guardara en details.
  Se debe pasar el id de la orden como query params y en el body el pedido.
  Ejemplo: /api/orders/create/4 - Body:
  {
  idProduct: 3,
  amount: 3
  }

- POST /api/orders/close:id: Permite cerrar una mesa. Esto devolvera un ticket ( producto , cantidad , precio total y precio total de la orden). Se debe pasar como query params el id de la orden.

- PATCH api/orders/:id : permite editar una ordern. Se debe pasar el id de la orden como query params y en el body lo que se quiere editar.
  Ejemplo: api/orders/2
  body:
  {
  "username": "Mariana",
  "orderType": "delivery",
  "description": "",
  }

- PATCH api/orders/details/:id : Permite editar la cantidad de un producto pedido en la orden. Se debe pasar el id de la orden como query params y en el body el id del producto que se desea modificar junto con la nueva cantidad.
  Ejemplo: api/orders/details/2
  Body:
  {
  "idProduct": 1,
  "quantity": 5
  }

- DELETE api/orders/:id : Permite eliminar un producto de una orden.Se debe pasar el id de la orden como query params y el id del producto en el body ( idProduct).
