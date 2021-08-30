pipeline {
   agent any
   stages{
      stage('Build'){
         timeout(unit: 'SECONDS', time: 120) { 
         steps{
            sh '''
            docker-compose build
            docker image prune -f
            docker images
            docker-compose up -d
            '''
         }
      }
      } 
      stage('Test'){
         steps{
            echo 'testing appliacion' 
            sh ''' docker exec testing npm install
                   docker exec testing npm run test
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