import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';


// Raw JavaScript
var appAgentReceiverEndpoint = document.getElementById("variables").dataset.appAgentReceiverEndpoint;
console.log(appAgentReceiverEndpoint);

const faro = initializeFaro({
  url: appAgentReceiverEndpoint + '/collect',
  apiKey: 'secret',
  instrumentations: [...getWebInstrumentations()],
  app: {
    name: 'web-shop-frontend',
    version: '1.4.0',
  },
});
faro.api.pushLog(['Hello, Faro!']);

//export const {trace, context} = faro.api.getOTEL();

//Accordion 
function myAccFunc() {
    var x = document.getElementById("demoAcc");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
      console.log("accordeon pressed")
      faro.api.pushLog(['accordeon pressed faro']);
    } else {
      x.className = x.className.replace(" w3-show", "");
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

    // send a log message
    faro.api.pushLog(['hello faro!']);
    // will be captured
  //  throw new Error('oh no');

    // push error manually
    faro.api.pushError(new Error('oh no'));
  }

  window.myAccFunc = myAccFunc;
  window.w3_open = w3_open;
  window.w3_close = w3_close;
