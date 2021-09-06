pipeline {
   agent any
   stages{
      stage('Build'){
         steps{
            sh '''
              
            docker rmi $(docker images -a -q) -f
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
