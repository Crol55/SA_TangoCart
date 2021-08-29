/*Archivo necesario para que jenkins sepa que pasos tomar cuando 
se haga un commit a una rama deseada
CONSIDERACIONES: 
    * Para ejecutar en steps, haciendo el uso de la consola, colocar 'sh' antes de la instruccion
     echo "1. Detener los contenedores"
                    docker-compose stop
                    echo "1. Reiniciar los contenedores con una nueva version"
                    docker-compose up --build -d
                    echo "3. Eliminar los antiguos contenedores"
                    docker image prune -f
*/

pipeline{
    agent any 
    stages {

        stage('Build'){
            steps{ /*Se ejecuta en la computadora host*/
                echo 'Paso 1) Construir las imagenes de los microservicios'
                sh '''
                    echo "1. Reiniciar los contenedores con una nueva version ( Solo detiene el contenedor que recibio los cambios)"
                    docker-compose up --build -d
                    echo "2. Eliminar los antiguos contenedores"
                    docker image prune -f
                    echo "3. Impresion de docker luego de limpieza"
                    docker images
                '''

            }
        }

        stage('CI'){
            steps{ /*Se ejecuta en la computadora host*/
                sh 'ls -a' 
                echo 'Continuous integration'
                /*testeando la conexion*/
            }
        }

        stage('Test'){ /*Se ejecuta en la computadora host*/
            steps{
                echo 'prueba de testeo'
            }
        }
    }
}



