FROM node:latest
ENV HTTP_PROXY="http://__proxy__"
ENV HTTPS_PROXY="http://__proxy__"
ENV PATH=.:$PATH
RUN npm install -g gulp && \
    npm install -g bower
VOLUME ["/source", "/target"]
WORKDIR /source/build
CMD ["bash"]
