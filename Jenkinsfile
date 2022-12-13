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
				//sh "sudo pm2 stop certgo"
				//sh "pm2 delete certgo"
				sh "sudo pm2 start /home/sean/certgo/backend/ecosystem.config.js"
				sh "sudo pm2 save"
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
	post{
        failure{
            emailext attachLog: true, 
            to: 'josepholukunle1107@gmail.com',
	    //to: 'hormorgboelahan@yahoo.com', 
	    //to: 'tobiolanitori@gmail.com',
	    //to: 'seanchi77@gmail.com',
            subject: '${BUILD_TAG} Build failed',
            body: '${BUILD_TAG} Build Failed \nMore Info can be found here: ${BUILD_URL} or in the log file below'
        }
    }

}
