pipeline {
   agent any
   stages{
      stage('Build'){
         steps{
            sh '''
            docker stop $(docker ps -a -q)    
            docker rm $(docker ps -a -q)      
            docker rmi $(docker images -a -q) 
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
