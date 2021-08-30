pipeline {
   agent any
   stages{
      stage('Build'){
         steps{
            sh 'echo Paso 1'
         }
      }
      stage('Verificando Docker'){
         steps{
            sh 'docker images'
         }
      }
      stage('Construir imagenes'){
         steps{
            sh 'docker-compose down'
            sh 'docker image prune -f'
            sh 'docker-compose build'
            sh 'docker images'
         }
      }
      stage('Servicios Up'){
         steps{
            sh 'docker-compose up -d'
         }
      }
   }
}