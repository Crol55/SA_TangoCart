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
             docker run -d  testing
             docker logs
            ''' 
            } 
         }
      }
      stage('Deploy'){
         steps{
            dir('frontend/tangoCart'){
                  echo 'deploy appliacion'
                  sh ''' 
                  docker build -t deploy .
                  docker run -d  deploy

                  ''' 
            }     
         }
      }  
   }
      
}
