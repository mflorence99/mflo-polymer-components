mkdir -p ~/temp/polymer-components-runner
docker run -it --rm -v ~/github/mflo-polymer-components:/source -v ~/temp/polymer-components-runner:/target mflo999/polymer-components-builder
