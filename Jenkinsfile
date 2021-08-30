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
             docker build -t testing .
             docker run -d testing
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