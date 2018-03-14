# blog-graphql-api
---

A simple api for a simple blog :)

To run this project you need to create a `docker-compose.yml` file one level higher on the file tree. *(or just rewrite the file)*

```docker
version: '3'

services:
  api:
    container_name: blog-api
    build: ./blog-graphql-api
    ports:
      - 3000:3000
    volumes:
      - ./api:/usr/src/app
    links:
      - mongo

  mongo:
    container_name: blog-mongo
    image: mongo
    ports:
      - 27017:27017
```