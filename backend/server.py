import uvicorn, os

if __name__ == '__main__':
    use_https = os.environ.get("USE_HTTPS", "False").lower() == "true"
    if use_https:
        uvicorn.run("api.main:netapi",
                    host="0.0.0.0",
                    port=8432,
                    reload=True,
                    ssl_keyfile="/etc/ssl/api-key.pem",
                    ssl_certfile="/etc/ssl/api-cert.pem"
                    )
    else:
        uvicorn.run("api.main:netapi", 
                    host="0.0.0.0", 
                    port=8432, 
                    reload=True)
