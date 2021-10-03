pipeline {
   agent any
   stages{
      stage('Build'){
         steps{
            sh ''' 
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
