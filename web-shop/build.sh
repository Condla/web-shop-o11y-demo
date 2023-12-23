IMAGE_NAME="condla/web-shop"
VERSION="2.3"
docker build . -t $IMAGE_NAME:$VERSION
docker build . -t $IMAGE_NAME:latest
docker push $IMAGE_NAME:$VERSION
docker push $IMAGE_NAME:latest
