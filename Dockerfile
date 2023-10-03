FROM circleci/node:8.11.2-stretch
MAINTAINER "Manojvv" "manojv@ilimi.in"
USER root
COPY src /opt/content/
WORKDIR /opt/content/
RUN npm install --unsafe-perm

FROM node:8.11-slim
MAINTAINER "Manojvv" "manojv@ilimi.in"
# Use a local mirror for Debian Jessie
RUN echo "deb http://archive.debian.org/debian/ jessie main" > /etc/apt/sources.list
RUN echo "deb-src http://archive.debian.org/debian/ jessie main" >> /etc/apt/sources.list
RUN echo "deb http://archive.debian.org/debian-security/ jessie/updates main" >> /etc/apt/sources.list
RUN echo "deb-src http://archive.debian.org/debian-security/ jessie/updates main" >> /etc/apt/sources.list
RUN apt update -y
RUN apt install openssl --force-yes && apt install imagemagick --force-yes \
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
