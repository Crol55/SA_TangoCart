/*Archivo necesario para que jenkins sepa que pasos tomar cuando 
se haga un commit a una rama deseada*/

pipeline{
    agents any 
    stages {

        stage('Dockerfiles'){
            steps{ /*Se ejecuta en la computadora host*/
                echo 'Ejecutar los dockerfiles'
            }
        }

        stage('CI'){
            steps{ /*Se ejecuta en la computadora host*/
                cat ls -a 
                echo 'Continuous integration'
            }
        }

        stage('Test'){ /*Se ejecuta en la computadora host*/
            steps{
                echo 'prueba de testeo'
            }
        }
    }
}

