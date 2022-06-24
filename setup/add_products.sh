#   desc: Load kittens into the product catalog
#   params:
#   return (status code/stdout):
load_kittens() {
  echo "Loading some kittens into the product catalog..."
  echo "   loading Meows"
  curl -X POST -H "Content-Type: application/json" -d '{"name": "Meows", "price": "29.99", "tag": "cool", "pic_ref": "https://placekitten.com/251/250"}' localhost:8080/products/ >& add_products.sh.log
  echo "   loading Loki"
  curl -X POST -H "Content-Type: application/json" -d '{"name": "Loki", "price": "39.99", "tag": "", "pic_ref": "https://placekitten.com/251/251"}' localhost:8080/products/ >& add_products.sh.log
  echo "   loading Charlie"
  curl -X POST -H "Content-Type: application/json" -d '{"name": "Charlie", "price": "19.50", "tag": "special", "pic_ref": "https://placekitten.com/250/251"}' localhost:8080/products/ >& add_products.sh.log
  echo "   loading Carla"
  curl -X POST -H "Content-Type: application/json" -d '{"name": "Carla", "price": "25.00", "tag": "special", "pic_ref": "https://placekitten.com/249/250"}' localhost:8080/products/ >& add_products.sh.log
  echo "Done!"
}

#   desc: Load smartphones into the product catalog
#   params:
#   return (status code/stdout):
load_phones() {
  echo "Loading some phones into the product catalog..."
  echo "   loading a XIAOMI phone"
  curl -X POST -H "Content-Type: application/json" -d '{"name": "XIAOMI", "price": "275.00", "tag": "5g", "pic_ref": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKBmH_aC5CmItXprFLTRKpev6HLiUesYoPIA&usqp=CAU"}' localhost:8080/products/ >& add_products.sh.log
  echo "   loading a ZTE phone"
  curl -X POST -H "Content-Type: application/json" -d '{"name": "ZTE", "price": "175.00", "tag": "4g", "pic_ref": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3wu0GHlwzpPPlh0KgQlMIxkY8h7zs7USPIw&usqp=CAU"}' localhost:8080/products/ >& add_products.sh.log
  echo "   loading a OPPO phone"
  curl -X POST -H "Content-Type: application/json" -d '{"name": "OPPO", "price": "255.00", "tag": "5g", "pic_ref": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO1kvevSM1v2ltBdB9ApnOU6GTYsVxT9jYLQ&usqp=CAU"}' localhost:8080/products/ >& add_products.sh.log
  echo "   loading a SAMSUNG phone"
  curl -X POST -H "Content-Type: application/json" -d '{"name": "SAMSUNG", "price": "155.00", "tag": "5g", "pic_ref": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmO3FEddg3lQD1s8f1xdSVselUhHc7ntRvEg&usqp=CAU"}' localhost:8080/products/ >& add_products.sh.log
  echo "Done!"
}

#   desc: display script's syntax
#   params:
#   return (status code/stdout):
usage() {
  echo "Usage: add_product.sh [VERTICAL]"
  echo 
  echo "Available verticals for add_product:"
  echo "  default            it loads some kittens" 
  echo "  phones             it loads some smartphones"
}

# eval_args
#   desc: evaluate the arguments provided to the script
#   params:
#     $1 - option to execute
#   return (status code/stdout):
#     0/ok message - the option is executed properly
#     1/ko message - display usage due to a syntax error
eval_args(){
  if [ $# -eq 1 ]
  then
    if [ "$1" == "default" ]
    then
      load_kittens
    elif [ "$1" == "phones" ]
    then
      load_phones
    else
      echo "Error: bad vertical"
      usage
      exit 1
    fi
  else
    echo "Error: bad number of arguments"
    usage
    exit 1
  fi
}

# Script's entry point
#
if ! [ -z "$*" ]
then
  eval_args $*
  exit 0
fi

usage
exit 1
