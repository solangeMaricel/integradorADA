El objetivo de este proyecto es poder crear ordenes de un restaurant

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
