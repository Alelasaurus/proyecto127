function setup(){
    canvas=createCanvas(650,350);
    canvas.center();
    background("#00F7DD");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
    }
    
    function preload(){
    classifier=ml5.imageClassifier('DoodleNet');
    }
    
    function clearCanvas(){
       background("#00F7DD"); 
    }
    
    function draw(){
    strokeWeight(13);
    stroke("#5400FE");
    //La siguien te line sirve para que nuestro mouse pueda dibujar cuando lo presionamos, cuando lo dejamos de presionar ya o va a dibujar
    if (mouseIsPressed) {
       line(pmouseX,pmouseY,mouseX,mouseY);
    }
    }
    
    function classifyCanvas(){
       classifier.classify(canvas,gotResult);
    }
    
    function gotResult(error,results){
       if (error){
          console.error(error);
       }
       else{
          console.log(results);
          document.getElementById('label').innerHTML="es un: "+results[0].label;
          document.getElementById('confidence').innerHTML="la probabilidad es: "+Math.round(results[0].confidence*100)+"%";
          utterThis=new SpeechSynthesisUtterance(results[0].label);
          synth.speak(utterThis);
       }
    }