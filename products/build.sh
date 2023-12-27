IMAGE_NAME="condla/products"
VERSION="otel-1.9"
docker build . -t $IMAGE_NAME:$VERSION
docker build . -t $IMAGE_NAME:latest
docker push $IMAGE_NAME:$VERSION
docker push $IMAGE_NAME:latest
