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
				sh "sudo systemctl restart certgo.service"
			}
			
	}


	}



}
