pipeline {
   agent any
   stages{
      stage('Build'){
         steps{
            sh '''
            docker-compose stop
            docker-compose rm
            docker-compose rmi
            docker-compose build
            '''
         }
      }
      stage('Up Services'){
         steps{
            sh '''
            docker-compose up -d
            
            '''
         }
      }
   }
      
}
