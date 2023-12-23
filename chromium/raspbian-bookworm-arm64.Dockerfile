# https://hub.docker.com/r/anonomous/raspbian-bookworm-arm64
FROM anonomous/raspbian-bookworm-arm64

WORKDIR /app/

# https://forums.raspberrypi.com/viewtopic.php?t=275603#p1669916
RUN apt-get update && apt-get install -y \
    devscripts lld clang ninja-build python-jinja2 flex yasm xvfb gperf bison nodejs valgrind x11-apps xfonts-base libglewmx-dev libgl1-mesa-dev libglu1-mesa-dev libegl1-mesa-dev libgles2-mesa-dev mesa-common-dev libva-dev libxt-dev libre2-dev libgbm-dev libxss-dev libelf-dev libvpx-dev libpci-dev libcap-dev libdrm-dev libicu-dev libffi-dev libkrb5-dev libexif-dev libflac-dev libudev-dev libopus-dev libwebp-dev libxtst-dev libjpeg-dev libxml2-dev libgtk-3-dev libxslt1-dev liblcms2-dev libpulse-dev libpam0g-dev libsnappy-dev libavutil-dev libavcodec-dev libavformat-dev libglib2.0-dev libasound2-dev libjsoncpp-dev libspeechd-dev libminizip-dev libhunspell-dev libharfbuzz-dev libusb-1.0-0-dev libopenjp2-7-dev libmodpbase64-dev libnss3-dev libnspr4-dev libcups2-dev libevent-dev libjs-jquery libjs-jquery-flot libgcrypt20-dev fonts-ipafont-gothic fonts-ipafont-mincho
&& rm -rf /var/lib/apt/lists/*

RUN apt source chromium
RUN cd chromium-* && debuild
