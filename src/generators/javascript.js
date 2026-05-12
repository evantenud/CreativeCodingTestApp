/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {Order} from 'blockly/javascript';
import '@blockly/field-colour-hsv-sliders';

// Order enum Referenz aus Blockly / generators / javascript / javascript_generator.ts
/*export enum Order {
  ATOMIC = 0,            // 0 "" ...
  NEW = 1.1,             // new
  MEMBER = 1.2,          // . []
  FUNCTION_CALL = 2,     // ()
  INCREMENT = 3,         // ++
  DECREMENT = 3,         // --
  BITWISE_NOT = 4.1,     // ~
  UNARY_PLUS = 4.2,      // +
  UNARY_NEGATION = 4.3,  // -
  LOGICAL_NOT = 4.4,     // !
  TYPEOF = 4.5,          // typeof
  VOID = 4.6,            // void
  DELETE = 4.7,          // delete
  AWAIT = 4.8,           // await
  EXPONENTIATION = 5.0,  // **
  MULTIPLICATION = 5.1,  // *
  DIVISION = 5.2,        // /
  MODULUS = 5.3,         // %
  SUBTRACTION = 6.1,     // -
  ADDITION = 6.2,        // +
  BITWISE_SHIFT = 7,     // << >> >>>
  RELATIONAL = 8,        // < <= > >=
  IN = 8,                // in
  INSTANCEOF = 8,        // instanceof
  EQUALITY = 9,          // == != === !==
  BITWISE_AND = 10,      // &
  BITWISE_XOR = 11,      // ^
  BITWISE_OR = 12,       // |
  LOGICAL_AND = 13,      // &&
  LOGICAL_OR = 14,       // ||
  CONDITIONAL = 15,      // ?:
  ASSIGNMENT = 16,       // = += -= **= *= /= %= <<= >>= ...
  YIELD = 17,            // yield
  COMMA = 18,            // ,
  NONE = 99,             // (...)
}*/

export const forBlock = Object.create(null);

forBlock['altSetup'] = function(block, generator) {
      const testInput = generator.statementToCode(block, 'testInput');
      return `
      let osc;\n
      let zeichnungX;
      let zeichnungY;
      let randNum;
      function setup() {\n
            createCanvas(windowWidth, windowHeight);\n
            angleMode(DEGREES);\n
            osc = new p5.Oscillator('sine');\n
            ${testInput}\n
      }\n`;
}

forBlock['mouseClick'] = function(block, generator){
      const mausStatements = generator.statementToCode(block, 'mausStatements');
      return `
            function mouseClicked() {
                  ${mausStatements}
            }`;
}
forBlock['keyClicked'] = function (block, generator) {
      const keysClicked = generator.statementToCode(block, 'keysClicked');
      return `
            function keyPressed(){
                  ${keysClicked}
            }
      `;
}
forBlock['keyClickFixed'] = function(block, generator){
      const keyPressed = block.getFieldValue('keyPressed');
      return [`keyCode === ${keyPressed}`, Order.EQUALITY];

}
forBlock['keyClickString'] = function(block, generator) {
      const keyPressed = generator.valueToCode(block, 'keyPressed', Order.COMMA) || 'no';

      return [`key === ${keyPressed}`, Order.EQUALITY];
}

forBlock['funktion'] = function(block, generator) {
      const nameFunktion = block.getFieldValue('nameFunktion');
      const funktionsStatements = generator.statementToCode(block, 'funktionsStatements');
      return `function ${nameFunktion}() {\n ${funktionsStatements}};\n`;
}

forBlock['repeatForever'] = function(block, generator) {
      const repeatables = generator.statementToCode(block, 'repeatables');
      return `function draw() {\n ${repeatables}};\n `;
}
forBlock['vorbereiten'] = function(block, generator) {
      const vorbereiteteBilder = generator.statementToCode(block, 'vorbereiteteBilder');
      return `function preload() {
            ${vorbereiteteBilder}
      }`;
}
forBlock['bildLaden'] = function(block, generator) {
      //vorher war noch varName = block.getFieldvalue und unten keine '' um den varName, eventuell muss man zuerst die Variable noch zum Variablennamensetzten
  const varName = generator.valueToCode(block, 'VAR_NAME', Order.COMMA) || 'no';
  const imageData = block.getFieldValue('IMAGE_DATA');
  
  //generator.definitions_['var_' + varName] = `let '${varName}';`;

  return `${varName} = loadImage('${imageData}');\n`;
};
forBlock['bildAnzeigen'] = function(block, generator) {
  const varName = generator.valueToCode(block, 'VAR_NAME', Order.COMMA) || 'no';
  const x = generator.valueToCode(block, 'X', Order.COMMA) || '0';
  const y = generator.valueToCode(block, 'Y', Order.COMMA) || '0';
  const w = generator.valueToCode(block, 'W', Order.COMMA) || '0';
  const h = generator.valueToCode(block, 'H', Order.COMMA) || '0';
  if (w === '0' && h === '0') {
    return `image(${varName}, ${x}, ${y});\n`;
  }
  return `image(${varName}, ${x}, ${y}, ${w}, ${h});\n`;
};

forBlock['background'] = function(block, generator) {
      const backgroundr = block.getFieldValue('backgroundColorR');
      const backgroundg = block.getFieldValue('backgroundColorG');
      const backgroundb = block.getFieldValue('backgroundColorB');
      return `background(${backgroundr}, ${backgroundg}, ${backgroundb});\n`;
} 

forBlock['backgroundHSV'] = function(block, generator) {
      const backgroundPickHSV = block.getFieldValue('backgroundPickHSV');
      return `
            background('${backgroundPickHSV}');`;
}
forBlock['hoehe'] = function(block, generator) {
      return ['height', Order.ATOMIC];
}
forBlock['breite'] = function(block, generator) {
       return ['width', Order.ATOMIC];
}
forBlock['pmouseX'] = function(block, generator) {
      return ['pmouseX', Order.ATOMIC];
}
forBlock['pmouseY'] = function(block, generator) {
      return ['pmouseY', Order.ATOMIC];
}
forBlock['mouseX'] = function(block, generator) {
      return ['mouseX', Order.ATOMIC];
}

forBlock['mouseY'] = function(block, generator) {
      return ['mouseY', Order.ATOMIC];
}

forBlock['mausBewegt'] = function (block, generator) {
      const mausBewegtStatement = generator.statementToCode(block, 'mausBewegtStatement');
      return `function mouseDragged() {
            ${mausBewegtStatement}
      }`;
}

forBlock['zeichnen'] = function(block, generator) {
      return `line(pmouseX, pmouseY, mouseX, mouseY);`;
}


forBlock['textBlock'] = function(block, generator) {
      const textBlockText = block.getFieldValue('textBlockText');
      return [JSON.stringify(textBlockText), Order.ATOMIC];
}

forBlock['neueFigur'] = function(block, generator) {
      const neueFigurCode = generator.statementToCode(block, 'neueFigurCode');
      return `
            push();\n
            ${neueFigurCode}\n
            pop();\n
      `;
}
/*Das funktioniert noch nicht*/
forBlock['startPunktZeichnung'] = function (block, generator) {
      const zeichnungX = generator.valueToCode(block, 'zeichnungX', Order.COMMA) || '0';
      const zeichnungY = generator.valueToCode(block, 'zeichnungY', Order.COMMA) || '0';

      return `
            zeichnungX = ${zeichnungX};
            zeichnungY = ${zeichnungY};
            translate(zeichnungX, zeichnungY);\n
            point(0,0);
      `;
}
forBlock['pixelWeiter'] = function (block,generator) {
      const pixelWeiterAnzahl = generator.valueToCode(block, 'pixelWeiterAnzahl', Order.COMMA) || '0';

      return `
            zeichnungX = ${pixelWeiterAnzahl};
            zeichnungY = 0;
            for (var i = 0; i <= zeichnungX; i+= frameCount) {
                  point(zeichnungX, zeichnungY);
            }
      `;
}

forBlock['texte'] = function(block, generator) {
      const textOne = generator.valueToCode(block, 'textOne', Order.COMMA) || '0';
      const xValueText = generator.valueToCode(block, 'xPosT', Order.COMMA) || '0';
      const yValueText = generator.valueToCode(block, 'yPosT', Order.COMMA) || '0';
      const textsize = generator.valueToCode(block, 'textsize', Order.COMMA) || '0';
      return `textSize(${textsize});\n text(${JSON.stringify(textOne)}, ${xValueText}, ${yValueText});\n`;
}

forBlock['freidrehen3D'] = function (block, generator) {
      return `
            orbitControl();\n
      `;
}

forBlock['circle'] = function(block, generator) {  
      const xValue = generator.valueToCode(block, 'xValue', Order.COMMA) || '0';
      const yValue = generator.valueToCode(block, 'yValue', Order.COMMA) || '0';
      const dValue = generator.valueToCode(block, 'dValue', Order.COMMA) || '0';
      return `
            circle(${xValue}, ${yValue}, ${dValue});\n`;
}

forBlock['point'] = function(block, generator) {
      const xValuePoint = generator.valueToCode(block, 'xValuePoint', Order.COMMA) || '0';
      const yValuePoint = generator.valueToCode(block, 'yValuePoint', Order.COMMA) || '0';
      return `
            point(${xValuePoint}, ${yValuePoint});\n`;
}

forBlock['line'] = function(block, generator) {  
      const xValueLineOne = generator.valueToCode(block, 'xValueLineOne', Order.COMMA) || '0';
      const xValueLineTwo = generator.valueToCode(block, 'xValueLineTwo', Order.COMMA) || '0';
      const yValueLineOne = generator.valueToCode(block, 'yValueLineOne', Order.COMMA) || '0';
      const yValueLineTwo = generator.valueToCode(block, 'yValueLineTwo', Order.COMMA) || '0';
      return `
            line(${xValueLineOne}, ${yValueLineOne}, ${xValueLineTwo}, ${yValueLineTwo});\n`;
}

forBlock['rect'] = function(block, generator) {  
      const xValueRect = generator.valueToCode(block, 'xValueRect', Order.COMMA) || '0';
      const yValueRect = generator.valueToCode(block, 'yValueRect', Order.COMMA) || '0';
      const wValueRect = generator.valueToCode(block, 'wValueRect', Order.COMMA) || '0';
      const hValueRect = generator.valueToCode(block, 'hValueRect', Order.COMMA) || '0';
      return `
            rect(${xValueRect}, ${yValueRect}, ${wValueRect}, ${hValueRect});\n`;
}

forBlock['triangle'] = function(block, generator) {  
      const xTriOne = generator.valueToCode(block, 'xTriOne', Order.COMMA) || '0';
      const yTriOne = generator.valueToCode(block, 'yTriOne', Order.COMMA) || '0';
      const xTriTwo = generator.valueToCode(block, 'xTriTwo', Order.COMMA) || '0';
      const yTriTwo = generator.valueToCode(block, 'yTriTwo', Order.COMMA) || '0';
      const xTriThree = generator.valueToCode(block, 'xTriThree', Order.COMMA) || '0';
      const yTriThree = generator.valueToCode(block, 'yTriThree', Order.COMMA) || '0';
      return `triangle(${xTriOne}, ${yTriOne}, ${xTriTwo}, ${yTriTwo}, ${xTriThree}, ${yTriThree});\n`;
}

forBlock['color'] = function(block, generator) {
      const colorR = block.getFieldValue('colorR');
      const colorG = block.getFieldValue('colorG');
      const colorB = block.getFieldValue('colorB');
      return `fill(${colorR}, ${colorG}, ${colorB});\n`;
}

forBlock['colorHSV'] = function (block, generator) {
      const hsvFarbe = block.getFieldValue('COLOUR');
      return `fill('${hsvFarbe}');`;
}

forBlock['stiftFarbe'] = function (block, generator) {
      const stiftFarbeR = block.getFieldValue('stiftFarbeR');
      const stiftFarbeG = block.getFieldValue('stiftFarbeG');
      const stiftFarbeB = block.getFieldValue('stiftFarbeB');
      return `stroke(${stiftFarbeR}, ${stiftFarbeG}, ${stiftFarbeB});`;
}

forBlock['stiftFarbeHSB'] = function (block, generator) {
      const stiftFarbeHSBPicked = block.getFieldValue('stiftFarbeHSBPicked');
      return `
            stroke('${stiftFarbeHSBPicked}');`;
}

forBlock['frameRateVar'] = function (block, generator) {
      const frameRateStatement = generator.valueToCode(block, 'frameRateStatement', Order.COMMA) || '0';
      return `frameRate(${frameRateStatement});\n`;
}

forBlock['frameCountVar'] = function (block, generator) {
      return ['frameCount', Order.ATOMIC];
}

forBlock['saveGif'] = function(block, generator) {
      const gifDauer = generator.valueToCode(block, 'gifDauer', Order.COMMA) || '0';
      const nameGif = generator.valueToCode(block, 'nameGif', Order.COMMA) || '';
      return `saveGif('${nameGif}', ${gifDauer});\n`;
}
forBlock['videoStarten'] = function(block, generator) {
      return `video = createCapture(VIDEO);\n video.hide();\n`;
}
forBlock['videoGrosse'] = function(block, generator) {
      const videoGrosseX = generator.valueToCode(block, 'videoGrosseX', Order.COMMA) || '0';
      const videoGrosseY = generator.valueToCode(block, 'videoGrosseY', Order.COMMA) || '0';
      const videoGrosseVideo = generator.valueToCode(block, 'videoGrosseVideo', Order.COMMA) || '0';
      const videoGrosseBreite = generator.valueToCode(block, 'videoGrosseBreite', Order.COMMA) || '0';
      const videoGrosseHohe = generator.valueToCode(block, 'videoGrosseHohe', Order.COMMA) || '0';
      return `image(${videoGrosseVideo}, ${videoGrosseX}, ${videoGrosseY}, ${videoGrosseBreite}, ${videoGrosseHohe});\n`;
}

forBlock['scale'] = function(block, generator) {
      const largerNum = block.getFieldValue('largerNum');
      return `scale(${largerNum});\n`;
}


forBlock['translate'] = function(block, generator) {
      const transX = generator.valueToCode(block, 'transX', Order.COMMA) || '0';
      const transY = generator.valueToCode(block, 'transY', Order.COMMA) || '0';
      return `translate(${transX}, ${transY});\n`;
}

forBlock['rotate'] = function(block, generator) {
      const rotateX = generator.valueToCode(block, 'rotateX', Order.COMMA) || '0';
      const rotateY = generator.valueToCode(block, 'rotateY', Order.COMMA) || '0';
      const rotateDeg = generator.valueToCode(block, 'rotateDeg', Order.COMMA) || '0';
      return `
            translate(${rotateX}, ${rotateY})
            rotate(${rotateDeg});\n`;
}

forBlock['mirrorY'] = function(block, generator){
      // Spiegeln an der x-Achse
      return `
            translate(width, 0);\n
            scale(-1, 1);\n`;
}
forBlock['mirrorX'] = function (block, generator){
      return `
            translate(0, height);\n
            scale(1, -1);\n
      `;
}
forBlock['transparenz'] = function (block, generator) {
      const transparenzValue = block.getFieldValue('transparenzValue');
      return `tint(255, 255*${transparenzValue});\n`;
}
forBlock['filterBild'] = function (block, generator) {
      const rValueFilter = block.getFieldValue('rValueFilter');
      const gValueFilter = block.getFieldValue('gValueFilter');
      const bValueFilter = block.getFieldValue('bValueFilter');

      return `tint(${rValueFilter}, ${gValueFilter}, ${bValueFilter});\n`;
}
forBlock['filterAuswahlBild'] = function (block,generator) {
      const filterOptions = block.getFieldValue('filterOptions');
      const varName = generator.valueToCode(block, 'VAR_NAME', Order.COMMA) || '';
      return `${varName}.filter(${filterOptions});\n`;
}
// Das funktioniert noch nicht
forBlock['ton'] = function (block, generator) {
      return `osc.start();`;
}
forBlock['tonfrequenz'] = function (block, generator) {
      const frequenzValue = block.getFieldValue('frequenzValue');
      return `osc.freq(${frequenzValue});`;
}
forBlock['tonAmplitude'] = function(block, generator) {
      const ampValue = block.getFieldValue('ampValue');
      return`osc.amp(${ampValue});`;
}
forBlock['wennDann'] = function(block, generator) {
      const bedingung = generator.valueToCode(block, 'bedingung', Order.NONE) || 'false';
      const dannStatement = generator.statementToCode(block, 'dannStatement');
      return `if(${bedingung}) {\n${dannStatement}}\n`;
}

forBlock['sonst'] = function(block, generator) {
      const sonstStatement = generator.statementToCode(block, 'sonstStatement');
      return `else {\n${sonstStatement}}\n`;
}

forBlock['wiederholeSolange'] = function(block, generator) {
      const solangeStatement = generator.valueToCode(block, 'solangeStatement', Order.COMMA) || '0';
      const wiederholeStatement = generator.statementToCode(block, 'wiederholeStatement');
      return `for(let i = 0; i < ${solangeStatement}; i++){\n${wiederholeStatement}}\n`;
}

forBlock['numb'] = function(block, generator) {
      const numbr = block.getFieldValue('numbr');
      return [String(numbr), Order.ATOMIC];
}
forBlock['randomNum'] = function (block, generator) {
      const randomMin = generator.valueToCode(block, 'randomMin', Order.COMMA) || '0';
      const randomMax = generator.valueToCode(block, 'randomMax', Order.COMMA) || '100';
      return [`random(${min}, ${max})`, Order.ATOMIC];
}
forBlock['wahr'] = function (block, generator) {
      return ['true', Order.ATOMIC];
}
forBlock['falsch'] = function (block, generator) {
      return ['false', Order.ATOMIC];
}
forBlock['randomNum'] = function(block, generator) {
  const randomMin = generator.valueToCode(block, 'randomMin', Order.ATOMIC) || '0';
  const randomMax = generator.valueToCode(block, 'randomMax', Order.ATOMIC) || '100';
  
  const code = `(Math.random() * (${randomMax} - ${randomMin}) + Number(${randomMin}))`;
  return [code, Order.ATOMIC];
}

forBlock['plus'] = function (block, generator) {
      const ersteZahlplus = generator.valueToCode(block, 'ersteZahlplus', Order.ADDITION) || '0';
      const zweiteZahlplus = generator.valueToCode(block, 'zweiteZahlplus', Order.ADDITION) || '0';
      return [`${ersteZahlplus} + ${zweiteZahlplus}`, Order.ADDITION];
}

forBlock['minus'] = function (block, generator) {
      const ersteZahlminus = generator.valueToCode(block, 'ersteZahlminus', Order.SUBTRACTION) || '0';
      const zweiteZahlminus = generator.valueToCode(block, 'zweiteZahlminus', Order.SUBTRACTION) || '0';
      return [`${ersteZahlminus} - ${zweiteZahlminus}`, Order.SUBTRACTION];
}

forBlock['mal'] = function (block, generator) {
      const ersteZahlmal = generator.valueToCode(block, 'ersteZahlmal', Order.MULTIPLICATION) || '0';
      const zweiteZahlmal = generator.valueToCode(block, 'zweiteZahlmal', Order.MULTIPLICATION) || '0';
      return [`${ersteZahlmal} * ${zweiteZahlmal}`, Order.MULTIPLICATION];
}

forBlock['geteilt'] = function (block, generator) {
      const ersteZahlgeteilt = generator.valueToCode(block, 'ersteZahlgeteilt', Order.DIVISION) || '0';
      const zweiteZahlgeteilt = generator.valueToCode(block, 'zweiteZahlgeteilt', Order.DIVISION) || '0';
      return [`${ersteZahlgeteilt} / ${zweiteZahlgeteilt}`, Order.DIVISION];
}

forBlock['rest'] = function (block, generator) {
      const ersteZahlrest = generator.valueToCode(block, 'ersteZahlrest', Order.MODULUS) || '0';
      const zweiteZahlrest = generator.valueToCode(block, 'zweiteZahlrest', Order.MODULUS) || '0';
      return [`${ersteZahlrest} % ${zweiteZahlrest}`, Order.MODULUS];
}

forBlock['grosserAls'] = function(block, generator) {
      const ersteZahlgrosser = generator.valueToCode(block, 'ersteZahlgrosser', Order.RELATIONAL) || '0';
      const zweiteZahlgrosser = generator.valueToCode(block, 'zweiteZahlgrosser', Order.RELATIONAL) || '0';
      return [`${ersteZahlgrosser} > ${zweiteZahlgrosser}`, Order.RELATIONAL];
}

forBlock['kleinerAls'] = function(block, generator) {
      const ersteZahlkleiner = generator.valueToCode(block, 'ersteZahlkleiner', Order.RELATIONAL) || '0';
      const zweiteZahlkleiner = generator.valueToCode(block, 'zweiteZahlkleiner', Order.RELATIONAL) || '0';
      return [`${ersteZahlkleiner} < ${zweiteZahlkleiner}`, Order.RELATIONAL];
}

forBlock['gleich'] = function(block, generator) {
      const ersteZahlgleich = generator.valueToCode(block, 'ersteZahlgleich', Order.EQUALITY) || '0';
      const zweiteZahlgleich = generator.valueToCode(block, 'zweiteZahlgleich', Order.EQUALITY) || '0';
      return [`${ersteZahlgleich} === ${zweiteZahlgleich}`, Order.EQUALITY];
}

forBlock['und'] = function(block, generator) {
      const ersteZahlund = generator.valueToCode(block, 'ersteZahlund', Order.LOGICAL_AND) || 'false';
      const zweiteZahlund = generator.valueToCode(block, 'zweiteZahlund', Order.LOGICAL_AND) || 'false';
      return [`${ersteZahlund} && ${zweiteZahlund}`, Order.LOGICAL_AND];
}

forBlock['oder'] = function(block, generator) {
      const ersteZahloder = generator.valueToCode(block, 'ersteZahloder', Order.LOGICAL_OR) || 'false';
      const zweiteZahloder = generator.valueToCode(block, 'zweiteZahloder', Order.LOGICAL_OR) || 'false';
      return [`${ersteZahloder} || ${zweiteZahloder}`, Order.LOGICAL_OR];
}

forBlock['nicht'] = function (block, generator) {
      const ersteZahlnicht = generator.valueToCode(block, 'ersteZahlnicht', Order.LOGICAL_NOT) || 'false';
      return [`!${ersteZahlnicht}`, Order.LOGICAL_NOT];
}

forBlock['test'] = function (block, generator) {
      const testStatement = generator.valueToCode(block, 'testStatement', Order.NONE) || '""';
      return `console.log(${testStatement});\n`;
}
// 3D
forBlock['altSetup3D'] = function(block, generator) {
      const testInput3D = generator.statementToCode(block, 'testInput3D');
      return `
      let osc;\n 
      let zeichnungX;
      let zeichnungY;
      function setup() {\n
            createCanvas(windowWidth, windowHeight, WEBGL);\n
            osc = new p5.Oscillator('sine');\n
            angleMode(DEGREES);\n
            ${testInput3D}\n
      }\n`;
}

forBlock['structure3D'] = function(block, generator) {
      const structureChoice = block.getFieldValue('structureChoice');
      return `
            if(${structureChoice} == 'ALUMINUM'){
                  image(img[0], 0, 0);
                  noFill();
            }
            `;
}
forBlock['ellipsoid3D'] = function (block, generator) {
      const xValueEllipsoid = generator.valueToCode(block, 'xValueEllipsoid', Order.COMMA) || '0';
      const yValueEllipsoid = generator.valueToCode(block, 'yValueEllipsoid', Order.COMMA) || '0';
      const zValueEllipsoid = generator.valueToCode(block, 'zValueEllipsoid', Order.COMMA) || '0';

      return `
            ellipsoid(${xValueEllipsoid}, ${yValueEllipsoid}, ${zValueEllipsoid});
      `;
}
forBlock['box3D'] = function (block, generator) {
      const widthBox3D = generator.valueToCode(block, 'widthBox3D', Order.COMMA) || '0';
      const heightBox3D = generator.valueToCode(block, 'heightBox3D', Order.COMMA) || '0';
      const depthBox3D = generator.valueToCode(block, 'depthBox3D', Order.COMMA) || '0';

      return `
            box(${widthBox3D}, ${heightBox3D}, ${depthBox3D});
      `;
}
forBlock['point3D'] = function (block, generator) {
      const xValuePoint3D = generator.valueToCode(block, 'xValuePoint3D', Order.COMMA) || '0';
      const yValuePoint3D = generator.valueToCode(block, 'yValuePoint3D', Order.COMMA) || '0';
      const zValuePoint3D = generator.valueToCode(block, 'zValuePoint3D', Order.COMMA) || '0';

      return `
            point(${xValuePoint3D}, ${yValuePoint3D}, ${zValuePoint3D});
      `;
}
forBlock['line3D'] = function (block, generator) {
      const xValueLineOne3D = generator.valueToCode(block, 'xValueLineOne3D', Order.COMMA) || '0';
      const yValueLineOne3D = generator.valueToCode(block, 'yValueLineOne3D', Order.COMMA) || '0';
      const zValueLineOne3D = generator.valueToCode(block, 'zValueLineOne3D', Order.COMMA) || '0';
      const xValueLineTwo3D = generator.valueToCode(block, 'xValueLineTwo3D', Order.COMMA) || '0';
      const yValueLineTwo3D = generator.valueToCode(block, 'yValueLineTwo3D', Order.COMMA) || '0';
      const zValueLineTwo3D = generator.valueToCode(block, 'zValueLineTwo3D', Order.COMMA) || '0';

      return `
            line(${xValueLineOne3D}, ${yValueLineOne3D}, ${zValueLineOne3D}, ${xValueLineTwo3D}, ${yValueLineTwo3D}, ${zValueLineTwo3D});
      `;
}
forBlock['rect3D'] = function (block, generator) {
      const rectWidth3D = generator.valueToCode(block, 'rectWidth3D', Order.COMMA) || '0';
      const rectHeight3D = generator.valueToCode(block, 'rectHeight3D', Order.COMMA) || '0';
      const rectDetail3D = generator.valueToCode(block, 'rectDetail3D', Order.COMMA) || '0';

      return `
            plane(${rectWidth3D}, ${rectHeight3D}, ${rectDetail3D});
      `;
}
forBlock['cylinder3D'] = function (block, generator) {
      const cylinderRadius3D = generator.valueToCode(block, 'cylinderRadius3D', Order.COMMA) || '0';
      const cylinderHeight3D = generator.valueToCode(block, 'cylinderHeight3D', Order.COMMA) || '0';

      return `
            cylinder(${cylinderRadius3D}, ${cylinderHeight3D});
      `;
}
forBlock['ring3D'] = function (block, generator) {
      const torusOuterRadius3D = generator.valueToCode(block, 'torusOuterRadius3D', Order.COMMA) || '0';
      const torusInnerRadius3D = generator.valueToCode(block, 'torusInnerRadius3D', Order.COMMA) || '0';

      return `
            torus(${torusOuterRadius3D}, ${torusInnerRadius3D});
      `;
}
forBlock['kegel3D'] = function (block, generator) {
      const coneRadius3D = generator.valueToCode(block, 'coneRadius3D', Order.COMMA) || '0';
      const coneHeight3D = generator.valueToCode(block, 'coneHeight3D', Order.COMMA) || '0';

      return `
            cone(${coneRadius3D}, ${coneHeight3D});
      `;
}
forBlock['translate3D'] = function (block, generator) {
      const transX3D = generator.valueToCode(block, 'transX3D', Order.COMMA) || '0';
      const transY3D = generator.valueToCode(block, 'transY3D', Order.COMMA) || '0';
      const transZ3D = generator.valueToCode(block, 'transZ3D', Order.COMMA) || '0';

      return `
            translate(${transX3D}, ${transY3D}, ${transZ3D});
      `;
}
forBlock['rotate3D'] = function (block, generator) {
      const rotateDeg3D = generator.valueToCode(block, 'rotateDeg3D', Order.COMMA) || '0';
      const rotateX3D = generator.valueToCode(block, 'rotateX3D', Order.COMMA) || '0';
      const rotateY3D = generator.valueToCode(block, 'rotateY3D', Order.COMMA) || '0';
      const rotateZ3D = generator.valueToCode(block, 'rotateZ3D', Order.COMMA) || '0';

      return `
            rotate(${rotateDeg3D}, ${rotateX3D}, ${rotateY3D}, ${rotateZ3D});
      `;
}
forBlock['saveImg'] = function (block, generator) {
      const saveImgName = generator.valueToCode(block, 'saveImgName', Order.COMMA) || '';

      return `
            saveCanvas('${saveImgName}', 'jpg');
      `;
}
