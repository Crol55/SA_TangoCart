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
             docker built -t testing:v1
             docker run -d --name testingf testing:v1
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