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
      stage('Test'){
         steps{
            dir('testing/frontend/tangoCart'){
            echo 'testing appliacion'
            sh ''' 
             docker build -t testing:v1
             docker run -d --name testing-karm testing:v1
            ''' 
            } 
         }
      }
      stage('Deploy'){
         steps{
            echo 'deploy' 
         }
      }

      


   }
}