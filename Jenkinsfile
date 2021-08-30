pipeline {
   agent any
   stages{
      stage('Build'){
          
         steps{
            sh '''
            docker-compose build
            docker image prune -f
            docker images
            docker-compose up -d
            '''
         }
      } 
      stage('Test'){
         steps{
            echo 'testing appliacion' 
            
         }
      }
      stage('Deploy'){
         steps{
            echo 'deploy' 
         }
      }

      


   }
}