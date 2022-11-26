#! / bin / bash
ssh -o "StrictHostKeyChecking no" ubuntu@ec2-34-195-230-138.compute-1.amazonaws.com "\
sudo su
cd /home/ubuntu
sudo docker login
sudo docker stop $ (docker ps -a -q)
docker rm $ (docker ps -a -q)
sudo docker pull codak77/certificategeneratorwebfrontend:frontend
sudo docker pull codak77/certificategeneratorwebbackend:backend
sudo docker run -d -p 3000:3000 codak77/certificategeneratorwebfrontend:frontend
sudo docker run -d -p 5000:5000 codak77/certificategeneratorwebbackend:backend
sudo docker system prune -af && exit"