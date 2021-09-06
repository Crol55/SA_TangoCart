pipeline {
   agent any
   stages{
      stage('Build'){
         steps{
            sh '''
            docker-compose build
            docker image prune -f
            docker images
            '''
         }
      } 
   }
      
}
