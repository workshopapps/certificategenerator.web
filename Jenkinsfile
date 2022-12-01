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
				sh "sudo cp -rf backend /home/sean/certgo/backend"
				sh "sudo cp -fr ${WORKSPACE}/frontend/build/* /home/sean/certgo/frontend"
				sh "sudo su - sean && whoami"
                //sh "sudo pm2 stop certgo"
				//sh "sudo pm2 stop index"
				sh "sudo pm2 serve /home/sean/frontend/build --port 3077"
				sh "sudo pm2 start /home/sean/backend/index.js"
			}
			
	}


	}



}