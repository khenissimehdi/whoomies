# Movie Parse-server Instance

About run the server instance and all services needed

## Before
Be sure to have an .env file on the root folder

### Current Config  
The config is available on .env file, and plugged on regarding the parse server instance. 

.env
```
	# gobal
    PORT= 1337
    ENV= "dev"

    # Mongo
    DB_USERNAME=  "Whoomies-test-project"
    DB_CRED= "XD68hdMUeI84qjUe"
    DB_HOST= "cluster0.vcosv.mongodb.net"

    # parse config
    APPNAME= "Movie_rating"
    PARSE_APP_ID= "5a9427648b0beebeb6957a88"
    PARSE_MASTER_KEY= "abcdefegh"
    PARSE_CLIENT_KEY="abcdefegh0123456789"
    PARSE_FILE_KEY= 88F5A0DF-76F0-4723-BAD3-FB2F7B14DECC
    PARSE_JAVASCRIPT_KEY="abcdefegh0123456789"
    PARSE_REST_API_KEY="abcdefegh0123456789"
```

If you trouble with the config, please send a mail to pierre.houguet@whoomies.com

## Installation 

```  npm install ``` or yarn install
	
``` npm run start ``` or yarn run start_local (run with dotenv)

go on localhost:1337 (or other port if you had specify PORT on .env)
