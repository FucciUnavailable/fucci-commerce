pipeline {
    agent any
    environment {
        DOCKER_IMAGE_BACKEND = 'queequegsail/backend-app'
        DOCKER_IMAGE_FRONTEND = 'queequegsail/frontend-app'
        BACKEND_PORT = '5000' // Adjust if needed
        FRONTEND_PORT = '3000'
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/FucciUnavailable/fucci-commerce.git'
            }
        }
        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t $DOCKER_IMAGE_BACKEND .'
                }
            }
        }
        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t $DOCKER_IMAGE_FRONTEND .'
                }
            }
        }
        stage('Push Images to DockerHub') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub-credentials-id', variable: 'DOCKER_PASSWORD')]) {
                    sh '''
                    echo "$DOCKER_PASSWORD" | docker login -u your-dockerhub-username --password-stdin
                    docker push $DOCKER_IMAGE_BACKEND
                    docker push $DOCKER_IMAGE_FRONTEND
                    '''
                }
            }
        }
        stage('Deploy Containers') {
            steps {
                sh '''
                docker stop backend-container || true
                docker rm backend-container || true
                docker stop frontend-container || true
                docker rm frontend-container || true
                
                docker run -d --name backend-container -p $BACKEND_PORT:$BACKEND_PORT $DOCKER_IMAGE_BACKEND
                docker run -d --name frontend-container -p $FRONTEND_PORT:$FRONTEND_PORT $DOCKER_IMAGE_FRONTEND
                '''
            }
        }
    }
    post {
        always {
            echo 'Deployment Pipeline Complete!'
        }
    }
}
