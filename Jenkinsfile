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
            sh ''' 
               docker start testing
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