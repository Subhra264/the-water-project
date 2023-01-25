FROM python:3.11

LABEL version="0.1"
LABEL description="docker container for the-water-project server"

ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY ./requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000