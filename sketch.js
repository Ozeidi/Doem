let ar = [];
let r = 3.5;
let nLeaves = 8;
let a = 0;
let ra = 0;
let ca = 0;
let cas = 0;
let w = 0;
var h = 0;
let Total_Height =0;
let y = 0;
let wall = 0.5;
let center = [0, 0];
let scl = 10;
//let a = math.zeros(90);
let table;
function setup() {
  createCanvas(600, 3000).parent("canvasposition");
  txtchk = createCheckbox("Use textbox as input").parent("txtchk");
  rSlider = createSlider(0, 20, 5.9, 0.1).parent("diameter");
  txtR = createInput("7").parent("diameter");
  
  wSlider = createSlider(0, 4, 1.3,0.05).parent("wall");
  txtW = createInput("").parent("wall");
  pSlider = createSlider(4, 50, 22).parent("petals");
  txtP = createInput("").parent("petals");
  tSlider = createSlider(0, 5, 1,0.01).parent("domeTop");
  txtT = createInput("").parent("domeTop");
  
  txtR.value(rSlider.value());
  txtW.value(wSlider.value());
  txtP.value(pSlider.value());
  txtT.value(tSlider.value());

  txtR.size(30,10);
  txtW.size(30,10);
  txtP.size(30,10);
  txtT.size(30,10);
  //noLoop();

}


function draw() {
  table = new p5.Table();
  table.addColumn("id");
  table.addColumn("y");
  table.addColumn("w");

  background(0);

  if (txtchk.checked()==true){
    //console.log("HI")
    rSlider.value(txtR.value());
    wSlider.value(txtW.value());
    pSlider.value(txtP.value());
    tSlider.value(txtT.value());
    
  }else{
    txtR.value(rSlider.value());
    txtW.value(wSlider.value());
    txtP.value(pSlider.value());
    txtT.value(tSlider.value());
  }


  changeText("diameter_value", rSlider.value())
  changeText("petals_value", pSlider.value())
  changeText("wall_value", wSlider.value())
  changeText("domeTop_value", tSlider.value())
  r = rSlider.value() / 2;
  wall = wSlider.value();
  nLeaves = pSlider.value();
  t = tSlider.value();
  w = round(2 * PI * r / nLeaves, 2);
  h = round(r * 2 * PI / 4, 6);
  Total_Height = round(h+wall,2)


  for (let i = 0; i <= 90; i=i+0.05) {
    a = i * PI / 180;
    ra = cos(a) * r;  
    ca = ra * 2 * PI;
    cas = round(ca / nLeaves,2);
    y = round(h * (i / 90) + wall,2);
    if (y>=h+wall-t){
      break;
    }
    x1 = map(cas, 0, scl, 0, width) + width / 2;
    y1 = map(y, 0, scl, height, 0);

    strokeWeight(2);
    stroke(255, 0, 0)
    point(x1, y1);

    x2 = -1 * map(cas, 0, scl, 0, width) + width / 2;
    y2 = map(y, 0, scl, height, 0);
    strokeWeight(2);
    stroke(255, 0, 0)
    point(x2, y2);
    
    if(i==90){
    //console.log("Draw Y = " + y);
    strokeWeight(10);
    stroke(255, 0, 0)
    point(x1, y1);
    }
    
    
    if (round(y1) % 5 == 0) {
      //console.log("HI");
      strokeWeight(1);
      stroke(255);
      line(x1, y1, x2, y2);
      textSize(12);
      noStroke();
      fill(0, 102, 153);
      text("Cut @ = " + round(cas/2+0.04,2), x1 , y1);
      //text("w = " + cas, x1 + 80, y1);
      text("From Center w = " + cas/2, x1 + 100, y1);
      text("h = " + y, x2 - 60, y1);

    }

    let newRow = table.addRow();
    newRow.setNum("id", table.getRowCount()-1);
    newRow.setString("y", y);
    newRow.setString("w", w);


  }
  
  changeText("summary", "Base Width = " + round(w, 2) + ", Height = " + Total_Height)
  straightWall();
  drawArrow('cyan');
}

function changeText(id, text) {
  document.getElementById(id).innerHTML = text;
}

//Function to Draw Straight Wall Section
function straightWall() {
  x1 = map(w, 0, scl, 0, width) + width / 2;
  x2 = -1 * map(w, 0, scl, 0, width) + width / 2;
  y1 = map(height + wall, 0, scl, 0, height, 0);
  y2 = map(wall, 0, scl, height, 0);
  stroke(0, 255, 0);
  line(x1, y1, x1, y2);

  
  strokeWeight(1);
  stroke(0, 255, 0);
  line(x2, y1, x2, y2);
  stroke(255);
  
  line(x1, y1, x2, y1);
  
  textSize(12);
  //fill(0, 102, 153);
  noStroke();
  text("wall Width= " + round(w, 2), x2 + 15, y2+15);
  text("Wall Height = " + round(wall, 2), x2+15 , y2+30);

}

// draw an arrow for a vector at a given base position
function drawArrow(myColor) {
  var t = h+wall

  x2 = -1 * map(w, 0, scl, 0, width) + width / 2 -80;
  y1 = map(t, 0, scl,  height, 0);
  y2 = map(0, 0, scl, height, 0);
  stroke(myColor);
  line(x2, y1, x2, y2);
  triangle(x2+5, y1, x2-5,y1, x2,y1-5);
  triangle(x2+5, y2-5, x2-5,y2-5, x2,y2);
  
  textSize(12);
  //fill(0, 102, 153);
  noStroke();
  text("Petal Height = " + round(t, 2), x2-110 , (y2+y1)/2);
  
}


