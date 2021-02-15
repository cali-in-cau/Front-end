# Auto-TA-Front

## Prerequisites

```bash
* python3 ( tested on 3.6.9 )
* vue-cli 2 ( tested on 2.6.12 )
* making a virtual environment
```

## Module Install

To install modules 

```bash
# ./vue_templates
$ npm install
```

## Execute

```bash
# ./vue_templates
$ npm run serve
```

## Warning

- If turned locally, the login function should not be used. To use the login function, you need to access the fully qualified domain. I'll update you later.
- Since it is connected to backend, another setting is required. I'll guide you below.

# Connect with backend

## Prerequisites

```bash

# Install it according to your operating system
* nginx/1.14.0(Ubunto)

# For more setting details, Check it from backend repository
* django (3.1.6) 
```

## 0. nginx proxy_pass setting

```bash

# Ubuntu, /etc/nginx/sites-enabled/default
server {
        listen 80;
        server_name [server_name]
        # Backed server
        location /back {
                proxy_pass http://127.0.0.1:[backend_port];
        }

        # Frontend server
        location / {
                proxy_pass http://127.0.0.1:[frontend_port];

        }

}
```

## 1. Turn on both servers

```bash
# Front 
$ npm run serve

# Back
$ python3 manage.py runserver
```
