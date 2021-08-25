# Documentacion Proyecto 1

## Aplicacion a desarrollar

Se realiza el desarrollo de una aplicacion que permita realizar un flujo de compras en linea.
Se basara en la facilidad de poder desarrollar las conecciones entre los proveedores y clientes, servicios que podran tener una interraccion entre la informacion proporcionada por los proveedores y las opciones que se les pueden ofrecer a los clientes a traves de un catalogo, en el cual los usuarios puedan verificar la informacion e imagenes detalladas de cada producto y tengan la oportundiad de agregar a un carrito de compras los productos y cantidad de los mismos, tomando en consideracion las opciones como disponibilidad en stack. 
Se centra en que se completara un servicio de ventas que su objetivo y prioridad es reducir costos, proporcionar al usuario una experiencia agradable y que en la cual no tenga que salir de su casa.

Cuenta con varias pantallas, entre las cuales se encuentran las funcionalidades basicas que serian registros y el ABC completo para clientes y productos. Tambien se cuentan con las pantallas donde se visualizar cada producto, informacion escencial, imagenes, cantidad, etc. Por otro lado se encuentra la pantalla donde se permite realizar y dar por finalizada la compra.

## Versionamiento del documento

Para el versionamiento del proyecto se estara utilizando la herramienta de Github. Se creo un repositorio que seria "SA_Poyecto2021".
En este se trabajo mediante las siguientes ramas :
    feature/testing: Rama en la cual se realizan las purebas, entre ellas validaciones de dependencias, inicios de sesion.
    feature/micro-cart : Rama en la cual se realiza la inicializacion del microservicio para la autenticacion de clientes, se definen controladores y rutas funcionales, se realiza la configuracion de envio y verificacion de token. Se realiza los modelos y conexiones a la BD
    feature/DB_clientes: Rama en la que se crea modelo/tabla y conexion de la base de datos para los clientes. Tambien se realizan validaciones de inserciones y consutlas.
    feature/auth_clientes: Rama en la que se realiza la validaciones, modelos, controladores, rutas y la configuracion de envio y verificacion de token para los clientes.
    feature/micro-producto: Rama en la que se encuentra los modulos, modelos, rutas de productos.
    feature/frontend_home : Rama en la que se traba el abc de productos, pagina de inicio.
    feature/frontend_producto : Rama en la que se encuentra la interfaz, serian los perfiles, creacion, abc productos.
    develop : Integracion de todos los procesos validados con anterioridad.

Para validar y realizar el versionamiento del proyecto se ralizan tres Tags a lo largo del desarrollo, estos son generados estrategicamente para llevar una continuidad funcional y en caso de problemas con despliegues que contentan fallas.

## Lenguaje de programación

Los lenguajes de programacion utilizados son los detallados acontinuacion:
    Node JS v. 12.18.3
    - ### cors v. 2.8.5
    - ### express v 4.17.1
    - ### jsonwebtoken v. 8.5.1
    - ### mongoose v. 5.13.7

## Herramientas de desarrollo
    - Jenkins
    - Docker
    - Ansible
    - free tier
    - AWS
        - ### EC2
        - ### S3


## Metodología

Se implementara el modelo incremental ya que este modelo permite a nuestro modelo de negocio avanzar de una forma mas efectivas por los avances que se pueden realizar sin completar por complento una funcionalidad y asi avanzar en varias tareas al mismo tiempo. Este modelo tambien nos permitara realizar la implemetancion de los feature, que serian las mejoras y actualizaciones de cada servicio en el que se este trabajando. Por lo que se trabajaran en simultaneo los roles de los clientes y proveedores, para luego continuar con los servicios de carritos, los cuales necesitan basarse en los registros proporcionados por clietnes proveedor, sin embargo no dependen que los servicios se encuentren terminados.




