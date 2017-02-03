sudo docker stop BOT
sudo docker rm BOT
sudo docker run -ti --name BOT -p 80:80 -v /vagrant/apps/healthylinkx-bot:/myapp bot /bin/bash