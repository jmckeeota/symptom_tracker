import uvicorn

if __name__ == '__main__':
    uvicorn.run("api.main:netapi",
                host="0.0.0.0",
                port=8432,
                reload=True,
                ssl_keyfile="/etc/ssl/api-key.pem",
                ssl_certfile="/etc/ssl/api-cert.pem"
                )