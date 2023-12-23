IMAGE_NAME=condla/shopping-cart
VERSION=1.5
docker build . -t $IMAGE_NAME:$VERSION
docker build . -t $IMAGE_NAME:latest
docker push $IMAGE_NAME:$VERSION
docker push $IMAGE_NAME:latest

