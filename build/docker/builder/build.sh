sed "s/__proxy__/$_PROXY/g" Dockerfile > Dockerfile.tmp
docker build -t mflo999/polymer-components-builder -f Dockerfile.tmp .
