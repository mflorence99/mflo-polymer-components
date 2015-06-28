sed "s/__proxy__/$PROXY/g" Dockerfile > Dockerfile.tmp
docker build -t mflo999/polymer-components-builder -f Dockerfile.tmp .
