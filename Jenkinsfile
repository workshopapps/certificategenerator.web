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
				sh "sudo cp -fr ${WORKSPACE}/frontend/* /home/sean/certgo/frontend"
				sh "sudo su - sean && whoami"
                		sh "sudo pm2 stop static-page-server-3077 "
				sh "sudo pm2 stop index"
				sh "sudo pm2 serve /home/sean/certgo/frontend/build --port 3077"
				sh "sudo pm2 start /home/sean/certgo/backend/ecosystem.config.js"
			}
			
	}


	}



}
