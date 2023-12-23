// Raw JavaScript
var appAgentReceiverEndpoint = document.getElementById("variables").dataset.appAgentReceiverEndpoint;
console.log(appAgentReceiverEndpoint);

const webSdkScript = document.createElement('script');

webSdkScript.src = 'https://unpkg.com/@grafana/faro-web-sdk@^1.0.0/dist/bundle/faro-web-sdk.iife.js';

webSdkScript.onload = () => {
  window.GrafanaFaroWebSdk.initializeFaro({
    url: appAgentReceiverEndpoint,
    app: {
      name: 'web-shop-browser',
      version: '1.6.0',
      environment: 'production',
    },
  });

  const webTracingScript = document.createElement('script');
  webTracingScript.src = 'https://unpkg.com/@grafana/faro-web-tracing@^1.0.0/dist/bundle/faro-web-tracing.iife.js';
  webTracingScript.onload = () => {
    window.GrafanaFaroWebSdk.faro.instrumentations.add(new window.GrafanaFaroWebTracing.TracingInstrumentation({
      // Optional, if you want to add custom attributes to the resource
      resourceAttributes: {
        "service.name": "web-shop-browser",
        "team.name": "browser"
      },
    }));
  };
  document.head.appendChild(webTracingScript);
};

document.head.appendChild(webSdkScript);


//export const {trace, context} = faro.api.getOTEL();

//Accordion 
function myAccFunc() {
    var x = document.getElementById("demoAcc");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
      console.log("accordeon opened")
      var rand = Math.random();
      faro.api.pushMeasurement({
        type: "accordeon measurments",
        values: {
          accordeon_pressure: rand,
        },
      });
      faro.api.pushLog(['accordeon opened, faro']);
    } else {
      x.className = x.className.replace(" w3-show", "");
      console.log("accordeon closed")
      faro.api.pushLog(['accordeon closed, faro']);
    }
  }
  
 // document.getElementById("myBtn").click(); 
  
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
  }
   
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
  }

function buy_now(product_name, person_name){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/shop?product=" + product_name + "&name=" + person_name, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    "product_name": product_name,
    "person": person_name
  }));
  //window.alert('Successfully added item to shopping cart. Add more items or pay the shopping cart (right upper corner)')
}

function empty_cart(person_name){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/cart?name=" + person_name, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    "person": person_name
  }));
  window.alert('shopping cart emptied');
  location.reload();
}

function checkout_cart(person_name){
  var xhr = new XMLHttpRequest();
  var rand = Math.random();
  if (rand < 0.7){
      xhr.open("POST", "/cart?name=" + person_name + "&checkout=true", true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({
        "person": person_name,
        "checkout": true
      }));
      console.log("Successfully checked out.");
      window.alert("Successfully checked out. Please come again and buy some more stuff.");
  }
  else if (rand < 0.8) {
      faro.api.pushError(new Error("ERROR CODE 9999: Mainframe on fire!"));
      window.alert("ERROR CODE 999: Mainframe on fire! Please try again in a few seconds.");
  }
  else if (rand < 0.9) {
      faro.api.pushError(new Error("ERROR CODE 2023: Happy new year!"));
      window.alert("ERROR CODE 2023: Happy new year! Please try again in a few seconds.");
  }
  else if (rand <= 1) {
      faro.api.pushError(new Error("ERROR CODE 2412: Feliz Navidad."));
      window.alert("ERROR CODE 24.12: Feliz Navidad. Please try again in a few seconds.");
  }
      location.reload();
}

function apply_discount(person_name){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/cart?name=" + person_name + "&discount=true", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    "person": person_name,
    "discount": true
  }));
  window.alert("You're too cheap to be eligible for a discount! Please go to amazon to buy your stuff.");
  location.reload();
}



  window.myAccFunc = myAccFunc;
  window.w3_open = w3_open;
  window.w3_close = w3_close;
  window.buy_now = buy_now;
  window.empty_cart = empty_cart;
  window.checkout_cart = checkout_cart;
  window.apply_discount = apply_discount;
