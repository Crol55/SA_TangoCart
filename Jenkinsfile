/*Archivo necesario para que jenkins sepa que pasos tomar cuando 
se haga un commit a una rama deseada
CONSIDERACIONES: 
    * Para ejecutar en steps, haciendo el uso de la consola, colocar 'sh' antes de la instruccion
*/

pipeline{
    agent any 
    stages {

        stage('Dockerfiles'){
            steps{ /*Se ejecuta en la computadora host*/
                echo 'Ejecutar los dockerfiles'
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



