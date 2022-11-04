import { initializeGrafanaAgent } from '@grafana/agent-web';

const agent = initializeGrafanaAgent({
  url: 'https://agent.myapp/collect',
  apiKey: 'secret',
  app: {
    name: 'frontend',
    version: '1.0.0',
  },
});

// send a log message
agent.api.pushLog(['hello world']);

// will be captured
throw new Error('oh no');

// push error manually
agent.api.pushError(new Error('oh no'));


// Accordion 
function myAccFunc() {
    var x = document.getElementById("demoAcc");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
      console.log("accordeon pressed")
    } else {
      x.className = x.className.replace(" w3-show", "");
    }
  }
  
  document.getElementById("myBtn").click();
  
  
  function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
  }
   
  function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
  }