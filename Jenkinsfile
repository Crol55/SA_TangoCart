pipeline {
   agent any
   stages{
      stage('Build'){
         steps{
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
      stage('Test'){
         steps{
            echo 'testing appliacion' 
            sh ''' docker-compose exec npm install
                   docker-compose exec npm run test
               '''
            
         }
      }
      stage('Deploy'){
         steps{
            echo 'deploy' 
         }
      }

      


   }
}