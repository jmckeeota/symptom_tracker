FROM python:alpine3.18

WORKDIR /api
RUN apk update
RUN apk add openssl
RUN apk add postgresql

# COPY requirements.txt .
# COPY entrypoint.sh .
# COPY insert_data.sql .
COPY . /api
RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt

RUN chmod 777 entrypoint.sh

RUN openssl req -newkey rsa:4096 -x509 -sha512 -days 365 -nodes -subj "/C=US/ST=CA/O=Jaycorp/CN=localhost" -addext "subjectAltName=DNS:localhost" -out /etc/ssl/api-cert.pem -keyout /etc/ssl/api-key.pem

CMD ["sh", "/api/entrypoint.sh"]
# CMD ["tail", "-f", "/dev/null"]