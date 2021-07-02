FROM python:3.8-alpine

ENV PYTHONUNBUFFERED 1

RUN mkdir /code

WORKDIR /code

COPY requirements.txt /code/

RUN pip3 install --upgrade pip

RUN apk add gcc musl-dev python3-dev libffi-dev openssl-dev cargo

RUN pip3 install -r requirements.txt

COPY . /code/
