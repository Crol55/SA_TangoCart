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
            dir('frontend/tangoCart'){
            echo 'testing appliacion'
            sh ''' 
             docker build -t testing -f dockerfile.test .
             docker run -d  testing
             docker logs testing
            ''' 
            } 
         }
      }
      stage('Deploy'){
         steps{
            dir('frontend/tangoCart'){
                  echo 'deploy appliacion'
                  sh ''' 
                  docker build -t deploy -f dockerfile.production .
                  docker run -d  deploy
                  ''' 
            }     
         }
      }  
   }
      
}
