# Archivo docker para construir una nueva 'imagen' a partir del microservicio 

FROM node:latest

WORKDIR /micro-listadeseos
# Copia un archivo externo, adentro de la nueva imagen (build) COPY (source, destination)
COPY . .
# RUN: Se ejecuta exclusivamente al  construir la imagen
RUN npm install
# Exponer el puerto donde escuchara nuestro servidor
EXPOSE 5001
#CMD: Se ejecuta cada vez que se inicie el contenedor
CMD npm start