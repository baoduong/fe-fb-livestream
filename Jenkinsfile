pipeline{
    agent{
        docker {
            image 'node:16.13.1-alpine'
        }
    }
    stages{
        stage('Initialize'){
            def dockerHome = tool 'Docker_build'
            env.PATH = "${dockerHome}/bin:${env.PATH}"
        }

        stage("build"){
            steps{
                echo "========executing A========"
                sh "node --version"
            }
            post{
                always{
                    echo "========always========"
                }
                success{
                    echo "========A executed successfully========"
                }
                failure{
                    echo "========A execution failed========"
                }
            }
        }
    }
    post{
        always{
            echo "========always========"
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}