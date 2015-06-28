docker stop polymer-components-runner
docker rm polymer-components-runner
mkdir -p ~/temp/polymer-components-runner
docker run -d -P -p 8080:80 -v ~/temp/polymer-components-runner:/usr/share/nginx/html --name polymer-components-runner mflo999/polymer-components-runner
