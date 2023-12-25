# https://chromium.googlesource.com/chromium/src/+/main/docs/linux/build_instructions.md

FROM ubuntu:jammy

RUN apt-get update && apt-get install -y \
    curl \
    git \
    lsb-release \
    python3 \
    sudo \
&& rm -rf /var/lib/apt/lists/*

WORKDIR /chromium/

RUN \
    mkdir -p /chromium/tools/depot_tools && \
    git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git /chromium/tools/depot_tools
ENV PATH="/chromium/tools/depot_tools:${PATH}"

RUN fetch --nohooks --no-history chromium

#$ cd src
#$ ./build/install-build-deps.sh
#$ gclient runhooks
#$ gn gen out/Default
#Include fewer debug symbols
