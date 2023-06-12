FROM circleci/node:8.11.2-stretch
MAINTAINER "Manojvv" "manojv@ilimi.in"
USER root
COPY src /opt/content/
WORKDIR /opt/content/
RUN npm install --unsafe-perm

FROM node:8.11-slim
MAINTAINER "Manojvv" "manojv@ilimi.in"
RUN echo "deb http://archive.debian.org/debian/ jessie main" >> /etc/apt/sources.list \
    && echo "deb-src http://archive.debian.org/debian/ jessie main" >> /etc/apt/sources.list \
    && echo "deb http://archive.debian.org/debian-security jessie/updates main"  >> /etc/apt/sources.list \
    && echo "deb-src http://archive.debian.org/debian/ jessie main" >> /etc/apt/sources.list \
    && apt update && apt install openssl imagemagick -y \
    && apt-get clean \
    && useradd -m sunbird
USER sunbird
ADD ImageMagick-i386-pc-solaris2.11.tar.gz /home/sunbird
ENV GRAPH_HOME "/home/sunbird/ImageMagick-6.9.3"
ENV PATH "$GRAPH_HOME/bin:$PATH"
ENV MAGICK_HOME "/home/sunbird/ImageMagick-6.9.3"
ENV PATH "$MAGICK_HOME/bin:$PATH"
COPY --from=0 --chown=sunbird /opt/content /home/sunbird/mw/content
WORKDIR /home/sunbird/mw/content/
CMD ["node", "app.js", "&"]


deb http://archive.debian.org/debian/ jessie main
deb-src http://archive.debian.org/debian/ jessie main

deb http://security.debian.org jessie/updates main
deb-src http://security.debian.org jessie/updates main
