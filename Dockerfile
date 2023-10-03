FROM circleci/node:8.11.2-stretch
MAINTAINER "Manojvv" "manojv@ilimi.in"
USER root
COPY src /opt/content/
WORKDIR /opt/content/
RUN npm install --unsafe-perm

FROM node:8.11-slim
MAINTAINER "Manojvv" "manojv@ilimi.in"
RUN echo "deb [check-valid-until=no] http://cdn-fastly.deb.debian.org/debian jessie main" > /etc/apt/sources.list.d/jessie.list
RUN echo "deb [check-valid-until=no] http://archive.debian.org/debian jessie-backports main" > /etc/apt/sources.list.d/jessie-backports.list
RUN sed -i '/deb http:\/\/deb.debian.org\/debian jessie-updates main/d' /etc/apt/sources.list
RUN apt-get -o Acquire::Check-Valid-Until=false update
RUN apt update && apt install openssl imagemagick -y \
    && apt-get clean \
    && useradd -m sunbird
USER sunbird
#ADD ImageMagick-i386-pc-solaris2.11.tar.gz /home/sunbird
RUN wget --no-check-certificate "https://download.imagemagick.org/archive/binaries/ImageMagick-i386-pc-solaris2.11.tar.gz" /home/sunbird
ENV GRAPH_HOME "/home/sunbird/ImageMagick-6.9.3"
ENV PATH "$GRAPH_HOME/bin:$PATH"
ENV MAGICK_HOME "/home/sunbird/ImageMagick-6.9.3"
ENV PATH "$MAGICK_HOME/bin:$PATH"
COPY --from=0 --chown=sunbird /opt/content /home/sunbird/mw/content
WORKDIR /home/sunbird/mw/content/
CMD ["node", "app.js", "&"]
