pipeline {

	agent any
	stages {
		
		

		stage("build frontend"){

			steps {
				sh "cd frontend"
				sh "cd frontend && npm i --force && CI=false npm run build"
			} 
        }
        stage("build backend"){

			steps {
				sh "cd backend"
				sh "cd backend && npm i --force"
			} 
        }
		stage("deploy") {
		
			steps {
				sh "sudo cp -rf ${WORKSPACE}/backend/* /home/sean/certgo/backend"
				sh "sudo cp -fr ${WORKSPACE}/frontend/build/* /var/www/certgo.hng.tech/html"
				sh "sudo su - sean && whoami"
				sh "sudo pm2 start /home/sean/certgo/backend/ecosystem.config.js --name certgo"
			}
			
		}

		stage("Performance test"){

			steps{
				echo 'Installing k6'
                // sh 'sudo chmod +x setup_k6.sh'
                // sh 'sudo ./setup_k6.sh'
                echo 'Running K6 performance tests...'
				sh 'ls -a'
				sh "pwd"
                sh 'k6 run Performance_Test_Certgof.js'
			}
		}


	}



}
