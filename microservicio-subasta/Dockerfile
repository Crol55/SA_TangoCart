# Archivo docker para construir una nueva 'imagen' a partir del microservicio 

FROM node:latest

WORKDIR /micro-subasta
# Copia un archivo externo, adentro de la nueva imagen (build) COPY (source, destination)
copy . .
# RUN: Se ejecuta exclusivamente al  construir la imagen
RUN npm install
# Exponer el puerto donde escuchara nuestro servidor
EXPOSE 4080
#CMD: Se ejecuta cada vez que se inicie el contenedor
CMD npm start