FROM ubuntu:latest
LABEL authors="pietrovassena"

ENTRYPOINT ["top", "-b"]