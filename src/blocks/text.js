/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */


import * as Blockly from 'blockly';
import '@blockly/field-colour-hsv-sliders';
import {FieldSlider} from '@blockly/field-slider';
import { Wrench } from 'lucide-react';

// Die Klasse um Töne hochladen zu können
/*class SoundUpload extends Blockly.Field {
  constructor(value, opt_validator){
    super(value || '', opt_validator);
    this.SERIALIZABLE = true;
    this.size_ = new Blockly.utils.Size(80,60);
  }
  static fromJson(options) {
    return new SoundUpload(options['value']);
  }
  showEditor_() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'sound/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.setValue(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }
}*/
//Die Klasse um Bilder hochladen zu können
class FieldImageUpload extends Blockly.Field {
  // constructor ist eine Methode, die jede Klasse braucht
  constructor(value, opt_validator) {
    // super greift auf die constructor Methode von dem parent der Klasse zurück, das ist in diesem Fall Blockly.Field
    super(value || '', opt_validator);
    // setzt die property SERIALIZABLE auf true
    this.SERIALIZABLE = true;
    // setzt die property size_auf 80 Breite und 60 Höhe, erstellt dafür eine neue instance von der Size Klasse
    this.size_ = new Blockly.utils.Size(80, 60);
  }

  static fromJson(options) {
    return new FieldImageUpload(options['value']);
  }

  // Das ist mehrheitlich um die Vorschau zu schaffen
  initView() {
    this.imageElement_ = Blockly.utils.dom.createSvgElement('image', {
      'height': '60px',
      'width': '80px',
      'preserveAspectRatio': 'xMidYMid slice'
    }, this.fieldGroup_);
    
    // Das Bild, das angezeigt wird setzen, mit einem Bild von der Quelle
    const initialValue = this.getValue() || 'https://cdn.pixabay.com/photo/2016/11/30/20/58/programming-1873854_1280.png';
    this.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', initialValue);
    
    this.rectElement_ = Blockly.utils.dom.createSvgElement('rect', {
      'height': '60px',
      'width': '80px',
      'fill': 'transparent',
      'cursor': 'pointer'
    }, this.fieldGroup_);
  }

  showEditor_() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.setValue(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  render_() {
    super.render_();
    if (this.imageElement_) {
      const val = this.getValue() || 'https://cdn.pixabay.com/photo/2016/11/30/20/58/programming-1873854_1280.png';
      this.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', val);
    }
  }

  updateSize_() {
    this.size_.width = 80;
    this.size_.height = 60;
  }
}

//Blockly.fieldRegistry.register('field_sound_upload', SoundUpload);
Blockly.fieldRegistry.register('field_image_upload', FieldImageUpload);


// 2D und 3D Blöcke gemischt, 3D gekennzeichnet am Namen
// Kategorie Funktionen
const vorbereiten = {
  type: 'vorbereiten', 
  message0: '☑️ Bilder und Töne vorbereiten\n %1', 
  args0: [
    {
      type: 'input_statement',
      name: 'vorbereiteteBilder'
    },
  ],
  style: 'startfunktionen_blocks',
  inputsInline: true,
};
const altSetup = {
  type: 'altSetup',
  message0: '🚩 Starten \n %1',
  args0: [
    {
      type: 'input_statement',
      name: 'testInput',
    }
  ],
  style: 'startfunktionen_blocks',
  inputsInline: true,
  tooltip: 'Wiederholt den Code einmal',
};
const altSetup3D = {
  type: 'altSetup3D',
  message0: '🚩 Starten \n %1',
  args0: [
    {
      type: 'input_statement',
      name: 'testInput3D',
    }
  ],
  style: 'startfunktionen_blocks',
  inputsInline: true,
  tooltip: 'Wiederholt den Code einmal',
};
const repeatForever = {
  type: 'repeatForever',
  message0: '🔁 Zeichnen \n %1',
  args0: [
    {
      type: 'input_statement',
      name: 'repeatables',
    }
  ],
  style: 'startfunktionen_blocks',
  inputsInline: true,
  tooltip: 'Wiederholt den Code unendlich oft',
};

// Kategorie Eingabe
const mouseClick = {
  type: 'mouseClick',
  message0: '🖱️ Wenn die Maus geklickt wird\n %1',
  args0: [
    {
      type: 'input_statement',
      name: 'mausStatements',
    }, 
  ],
  style: 'eingabe_blocks',
  inputsInline: true,
};
const keyClicked = {
  type: 'keyClicked',
  message0: '⌨️ Wenn eine Taste gedrückt wird\n %1',
  args0: [
    {
      type: 'input_statement',
      name: 'keysClicked',
    }
  ],
  style: 'eingabe_blocks',
  inputsInline: true,
};
const keyClickFixed = {
  type: 'keyClickFixed',
  message0: 'Taste %1',
  args0: [
    {
      type: 'field_dropdown',
      name: 'keyPressed',
      options: [
        ['Leertaste', '32'],
        ['Enter', '13'],
        ['Löschen', '8'],
        ['Pfeil hoch', '38'],
        ['Pfeil unten', '40'],
        ['Pfeil links', '37'],
        ['Pfeil rechts', '39'],
      ],
    },
  ],
  style: 'eingabe_blocks',
  inputsInline: true,
  output: 'Boolean',
};
const keyClickString = {
  type: 'keyClickString',
  message0: 'Taste %1',
  args0: [
    {
      type: 'input_value',
      name: 'keyPressed',
    },
  ],
  style: 'eingabe_blocks',
  inputsInline: true,
  output: 'Boolean',
};
const mausBewegt = {
  type: 'mausBewegt', 
  message0: 'Wenn die Maus bewegt wird\n %1',
  args0: [
    {
      type: 'input_statement',
      name: 'mausBewegtStatement',
    },
  ],
  style: 'eingabe_blocks',
};
const pmouseX = {
  type: 'pmouseX',
  message0: 'vorherige x Position der Maus',
  output: 'number',
  style: 'eingabe_blocks',
};
const pmouseY = {
  type: 'pmouseY',
  message0: 'vorherige y Position der Maus',
  output: 'number',
  style: 'eingabe_blocks',
};
const mouseX = {
  type: 'mouseX',
  message0: 'x Position der Maus',
  output: 'number',
  style: 'eingabe_blocks',
}; 
const mouseY = {
  type: 'mouseY',
  message0: 'y Position der Maus',
  output: 'number',
  style: 'eingabe_blocks',
};

// Kategorie Leinwand
const background = {
  type: 'background',
  message0: 'Hintergrundfarbe RGB\n r %1 g %2 b %3',
  args0: [
    {
      type: 'field_number',
      name: 'backgroundColorR',
    },
    {
      type: 'field_number',
      name: 'backgroundColorG',
    },
    {
      type: 'field_number',
      name: 'backgroundColorB',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  style: 'leinwand_blocks',
};
const backgroundHSV = {
  type: 'backgroundHSV',
  message0: 'Hintergrundfarbe HSB %1',
  args0: [
    {
      type: 'field_colour_hsv_sliders',
      name: 'backgroundPickHSV',
      colour: '#2bfbc5',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  style: 'leinwand_blocks',
};
const hoehe = {
  type: 'hoehe',
  message0: 'Höhe',
  output: 'number', 
  style: 'leinwand_blocks',
};
const breite = {
  type: 'breite',
  message0: 'Breite',
  output: null, 
  style: 'leinwand_blocks',
};
const frameRateVar = {
  type: 'frameRateVar',
  message0: 'Frame Rate %1',
  args0: [
    {
      type: 'input_value',
      name: 'frameRateStatement'
    }
  ],
  previousStatement: null, 
  nextStatement: null,
  style: 'leinwand_blocks',
};
const frameCountVar = {
  type: 'frameCountVar',
  message0: 'Frame Count',
  output: 'number',
  style: 'leinwand_blocks',
};


// Kategorie Objekte
const neueFigur = {
  type: 'neueFigur', 
  message0: 'Neue Zeichnungsgruppe erstellen\n %1',
  args0: [
    {
      type: 'input_statement',
      name: 'neueFigurCode',
    },
  ],
  inputsInline: true, 
  previousStatement: null,
  nextStatement: null, 
  style: 'objekte_blocks',
};
const stiftFarbe = {
  type: 'stiftFarbe',
  message0: 'RGB Farbe des Stiftes\n r %1 g %2 b %3',
  args0: [
    {
      type: 'field_number',
      name: 'stiftFarbeR'
    },
    {
      type: 'field_number',
      name: 'stiftFarbeG'
    },
    {
      type: 'field_number',
      name: 'stiftFarbeB'
    }
  ],
  previousStatement: null,
  nextStatement: null, 
  style: 'objekte_blocks',
};
const stiftFarbeHSB = {
  type: 'stiftFarbeHSB',
  message0: 'HSB Farbe des Stiftes %1',
  args0: [
    {
      type: 'field_colour_hsv_sliders',
      name: 'stiftFarbeHSBPicked',
      colour: '#2bfbc5',
    },
  ],
  previousStatement: null,
  nextStatement: null, 
  style: 'objekte_blocks',
};
const textBlock = {
  type: 'textBlock',
  message0: '%1',
  args0: [
    {
      type: 'field_input',
      name: 'textBlockText',
      text: 'Schreibe hier deinen Text'
    },
  ],
  output: null,
  style: 'objekte_blocks',
};
const texte = {
  type: 'texte',
  message0: '💬 Text %1\n bei x %2 und y %3\n mit Grösse %4',
  args0: [
    {
      type: 'input_value',
      name: 'textOne',
    },
    {
      type: 'input_value',
      name: 'xPosT',
    },
    {
      type: 'input_value',
      name: 'yPosT',
    },
    {
      type: 'input_value',
      name: 'textsize',
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  style: 'objekte_blocks',
};
const point = {
  type: 'point',
  message0: '⚫ Punkt\n bei x %1 und y %2',
  args0: [
    {
      type: 'input_value',
      name: 'xValuePoint',
    },
    {
      type: 'input_value',
      name: 'yValuePoint',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  style: 'objekte_blocks',
};
const line = {
  type: 'line',
  message0: '➖ Linie\n von x %1 y %2\n bis x %3 y %4',
  args0: [
    {
      type: 'input_value',
      name: 'xValueLineOne',
    },
    {
      type: 'input_value',
      name: 'yValueLineOne',
    },
    {
      type: 'input_value',
      name: 'xValueLineTwo',
    },
    {
      type: 'input_value',
      name: 'yValueLineTwo',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  style: 'objekte_blocks',
};
const point3D = {
  type: 'point3D',
  message0: '⚫ Punkt\n bei x %1 y %2 und z %3',
  args0: [
    {
      type: 'input_value',
      name: 'xValuePoint3D',
      check: 'number',
    },
    {
      type: 'input_value',
      name: 'yValuePoint3D',
      check: 'number',
    },
    {
      type: 'input_value',
      name: 'zValuePoint3D',
      check: 'number',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  style: 'objekte_blocks',
};
const line3D = {
  type: 'line3D',
  message0: '➖ Linie\n von x %1 y %2 z%3\n bis x %4 y %5 z %6',
  args0: [
    {
      type: 'input_value',
      name: 'xValueLineOne3D',
      check: 'number',
    },
    {
      type: 'input_value',
      name: 'yValueLineOne3D',
      check: 'number',
    },
    {
      type: 'input_value',
      name: 'zValueLineOne3D',
      check: 'number',
    },
    {
      type: 'input_value',
      name: 'xValueLineTwo3D',
      check: 'number',
    },
    {
      type: 'input_value',
      name: 'yValueLineTwo3D',
      check: 'number',
    },
    {
      type: 'input_value',
      name: 'zValueLineTwo3D',
      check: 'number',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  style: 'objekte_blocks',
};
const color = {
  type: 'color',
  message0: 'RGB Farbe\n r %1 g %2 b %3',
  args0: [
    {
      type: 'field_number',
      name: 'colorR'
    },
    {
      type: 'field_number',
      name: 'colorG'
    },
    {
      type: 'field_number',
      name: 'colorB'
    },
  ],
  previousStatement: null,
  nextStatement: null, 
  style: 'objekte_blocks',
};
const colorHSV = {
  type: 'colorHSV',
  message0: 'HSB Farbe %1',
  args0: [
    {
      type: 'field_colour_hsv_sliders',
      name: 'COLOUR',
      colour: '#2bfbc5',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  style: 'objekte_blocks',
};
//TODO
const structure3D = {
  type: 'structure3D', 
  message0: 'Wähle eine Oberflächenstruktur aus %1', 
  args0: [
    {
      type: 'field_dropdown', 
      name: 'structureChoice',
      options: [
        ['keine', 'NONE'],
        ['Aluminium', 'ALUMINUM'],
      ],
    },
  ],
  previousStatement: null,
  nextStatement: null,
};
const circle = {
  type: 'circle',
  message0: '⭕ Kreis\n mit x %1 y %2 \n und Grösse %3',
  args0: [
    {
      type: 'input_value',
      name: 'xValue',
    },
    {
      type: 'input_value',
      name: 'yValue',
    },
    {
      type: 'input_value',
      name: 'dValue',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  style: 'objekte_blocks',
}; 
const rect = {
  type: 'rect',
  message0: '⬛ Viereck\n bei x %1 und y %2\n mit Höhe %3 und Breite %4',
  args0: [
    {
      type: 'input_value',
      name: 'xValueRect',
    },
    {
      type: 'input_value',
      name: 'yValueRect',
    },
    {
      type: 'input_value',
      name: 'hValueRect',
    },
    {
      type: 'input_value',
      name: 'wValueRect',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  style: 'objekte_blocks',
};
const triangle = {
  type: 'triangle',
  message0: '🔼 Dreieck zwischen\n Punkt 1: x %1 y %2\n Punkt 2: x %3 y %4\n Punkt 3: x %5 y %6',
  args0: [
    {
      type: 'input_value',
      name: 'xTriOne',
    },
    {
      type: 'input_value',
      name: 'yTriOne',
    },
    {
      type: 'input_value',
      name: 'xTriTwo',
    },
    {
      type: 'input_value',
      name: 'yTriTwo',
    },
    {
      type: 'input_value',
      name: 'xTriThree',
    },
    {
      type: 'input_value',
      name: 'yTriThree',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  style: 'objekte_blocks',
};
const ellipsoid3D = {
  type: 'ellipsoid3D',
  message0: '⭕ Ball\n mit dem Radius x %1 Radius y %2\n und Radius z %3',
  args0: [
    {
      type: 'input_value',
      name: 'xValueEllipsoid',
    },
    {
      type: 'input_value',
      name: 'yValueEllipsoid',
    },
    {
      type: 'input_value',
      name: 'zValueEllipsoid',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  style: 'objekte_blocks',
}; 
const box3D = {
  type: 'box3D',
  message0: '⬛ Quader\n mit Breite %1 Höhe %2 und Tiefe %3',
  args0: [
    {
      type: 'input_value',
      name: 'widthBox3D',
    },
    {
      type: 'input_value',
      name: 'heightBox3D',
    },
    {
      type: 'input_value',
      name: 'depthBox3D',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  style: 'objekte_blocks',
};
const rect3D = {
  type: 'rect3D',
  message0: '⬛ Viereck\n mit Breite %1 Höhe %2 und Detail %3',
  args0: [
    {
      type: 'input_value',
      name: 'rectWidth3D',
      check: 'number',
    },
    {
      type: 'input_value',
      name: 'rectHeight3D',
      check: 'number',
    },
    {
      type: 'input_value',
      name: 'rectDetail3D',
      check: 'number',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  style: 'objekte_blocks',
};
const cylinder3D = {
  type: 'cylinder3D',
  message0: 'Zylinder\n mit Radius %1 Höhe %2',
  args0: [
    {
      type: 'input_value',
      name: 'cylinderRadius3D',
    },
    {
      type: 'input_value',
      name: 'cylinderHeight3D',
    },
  ],
  inputsInline: true,
  previousStatement: null, 
  nextStatement: null,
  style: 'objekte_blocks',
};
const ring3D = {
  type: 'ring3D',
  message0: 'Ring\n mit Aussenradius %1 Innenradius %2',
  args0: [
    {
      type: 'input_value',
      name: 'torusOuterRadius3D',
    },
    {
      type: 'input_value',
      name: 'torusInnerRadius3D',
    },
  ],
  inputsInline: true,
  previousStatement: null, 
  nextStatement: null,
  style: 'objekte_blocks',
};
const kegel3D = {
  type: 'kegel3D',
  message0: 'Kegel\n mit Radius %1 Höhe %2',
  args0: [
    {
      type: 'input_value',
      name: 'coneRadius3D',
    },
    {
      type: 'input_value',
      name: 'coneHeight3D',
    },
  ],
  inputsInline: true,
  previousStatement: null, 
  nextStatement: null,
  style: 'objekte_blocks',
};
const bildLaden = {
  type: 'bildLaden',
  message0: 'Bild hochladen %1 mit Name %2',
  args0: [
    {
      type: 'field_image_upload', 
      name: 'IMAGE_DATA',
    }, 
    {
      type: 'input_value',
      name: 'VAR_NAME',
      text: 'meinBild',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  style: 'objekte_blocks',
};
const bildAnzeigen = {
  type: 'bildAnzeigen',
  message0: 'Bild %1 anzeigen bei X %2 Y %3 Breite %4 Höhe %5',
  args0: [
    {
      type: 'input_value',
      name: 'VAR_NAME',
      text: 'meinBild'
    },
    {
      type: 'input_value',
      name: 'X',
    },
    {
      type: 'input_value',
      name: 'Y',
    },
    {
      type: 'input_value',
      name: 'W',
    },
    {
      type: 'input_value',
      name: 'H',
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  style: 'objekte_blocks',
};
// Das Funktioniert, aber nur wenn beide Sache in Preload stehen
const videoStarten = {
  type: 'videoStarten',
  message0: 'Stream von der Kamera starten und als Variable %1 speichern',
  args0: [
    {
      type: 'field_variable',
      name: 'videoStartenVar',
      variable: 'video',
    },
  ],
  style: 'objekte_blocks',
  previousStatement: null,
  nextStatement: null,
};
const videoGrosse = {
  type: 'videoGrosse',
  message0: 'Videos %1 bei x %2 y %3 platzieren\n mit Breite %4 und Höhe %5',
  args0: [
    {
      type: 'input_value',
      name: 'videoGrosseVideo',
    },
    {
      type: 'input_value',
      name: 'videoGrosseX',
    },
    {
      type: 'input_value',
      name: 'videoGrosseY',
    },
    {
      type: 'input_value',
      name: 'videoGrosseBreite',
    },
    {
      type: 'input_value',
      name: 'videoGrosseHohe',
    },
  ],
  previousStatement: null, 
  nextStatement: null,
  style: 'objekte_blocks',
};
const ton = {
  type: 'ton', 
  message0: 'Ton spielen',
  previousStatement: null,
  nextStatement: null,
  style: 'objekte_blocks',
};
const tonfrequenz = {
  type: 'tonfrequenz',
  message0: 'Tonfrequenz %1',
  args0: [
    {
      type: 'field_slider',
      name: 'frequenzValue',
      value: 440,
      min: 60,
      max: 1200,
      precision: 20,
    },
  ],
  previousStatement: null,
  nextStatement: null,
  style: 'objekte_blocks',
};
const tonAmplitude = {
  type: 'tonAmplitude',
  message0: 'Ton Lautstärke %1',
  args0: [
    {
      type: 'field_slider',
      name: 'ampValue',
      value: 0.5,
      min: 0,
      max: 1,
      precision: 0.01,
    },
  ],
  previousStatement: null,
  nextStatement: null,
  style: 'objekte_blocks',
};
// Kategorie Variablen
// Kategorie Veränderungen
const scale = {
  type: 'scale',
  message0: '%1 Mal vergrössern oder verkleinern',
  args0: [
    {
      type: 'field_slider',
      name: 'largerNum',
      value: 1,
      min: 0.2,
      max: 5,
      precision: 0.2,
    },
  ],
  previousStatement: null,
  nextStatement: null,
  style: 'veranderungen_blocks',
};
const translate = {
  type: 'translate',
  message0: 'Verschieben um x %1 und y %2',
  args0: [
    {
      type: 'input_value',
      name: 'transX',
    },
    {
      type: 'input_value',
      name: 'transY',
    },
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  style: 'veranderungen_blocks',
};
const rotate = {
  type: 'rotate',
  message0: 'Drehen um %1 Grad\n beim Drehpunkt x %2 y %3',
  args0: [
    {
      type: 'input_value',
      name: 'rotateDeg',
    },
    {
      type: 'input_value',
      name: 'rotateX',
    },
    {
      type: 'input_value', 
      name: 'rotateY',
    },
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  style: 'veranderungen_blocks',
};
const mirrorY = {
  type: 'mirrorY',
  message0: 'Spiegeln an der y-Achse',
  previousStatement: null,
  nextStatement: null,
  style: 'veranderungen_blocks',
};
const mirrorX = {
  type: 'mirrorX',
  message0: 'Spiegeln an der x-Achse',
  previousStatement: null,
  nextStatement: null,
  style: 'veranderungen_blocks',
};
const freidrehen3D = {
  type: 'freidrehen3D',
  message0: 'Figuren frei drehen',
  previousStatement: null,
  nextStatement: null,
  style: 'veranderungen_blocks',
};
const translate3D = {
  type: 'translate3D',
  message0: 'Verschieben um x %1 y %2 und z %3',
  args0: [
    {
      type: 'input_value',
      name: 'transX3D',
      check: 'number',
    },
    {
      type: 'input_value',
      name: 'transY3D',
      check: 'number',
    },
    {
      type: 'input_value',
      name: 'transZ3D',
      check: 'number',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  style: 'veranderungen_blocks',
};
const rotate3D = {
  type: 'rotate3D',
  message0: 'Drehen um %1 Grad\n beim Drehpunkt x %2 y %3 z%4',
  args0: [
    {
      type: 'input_value',
      name: 'rotateDeg3D',
    },
    {
      type: 'input_value',
      name: 'rotateX3D',
    },
    {
      type: 'input_value', 
      name: 'rotateY3D',
    },
    {
      type: 'input_value', 
      name: 'rotateZ3D',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  style: 'veranderungen_blocks',
};
const transparenz = {
  type: 'transparenz',
  message0: 'Bild durchsichtiger machen um %1',
  args0: [
    {
      type: 'field_slider',
      name: 'transparenzValue',
      value: 0.5,
      min: 0.1,
      max: 1,
      precision: 0.1,
    }
  ],
  previousStatement: null,
  nextStatement: null,
  inputsInline: true, 
  style: 'veranderungen_blocks',
};
const filterBild = {
  type: 'filterBild',
  message0: 'Farbfilter über das Bild legen mit R %1 G %2 B %3',
  args0: [
    {
      type: 'field_slider',
      name: 'rValueFilter',
      value: 0,
      min: 0,
      max: 255,
      precision: 5,
    },
    {
      type: 'field_slider',
      name: 'gValueFilter',
      value: 0,
      min: 0,
      max: 255,
      precision: 5,
    },
    {
      type: 'field_slider',
      name: 'bValueFilter',
      value: 0,
      min: 0,
      max: 255,
      precision: 5,
    }
  ],
  previousStatement: null, 
  nextStatement: null, 
  inputsInline: true,
  style: 'veranderungen_blocks',
};
const filterAuswahlBild = {
  type: 'filterAuswahlBild',
  message0: 'Filter %1 über Bild %2 legen',
  args0: [
    {
      type: 'field_dropdown',
      name: 'filterOptions',
      options: [
        ['Negativ Filter', 'INVERT'],
        ['Graufilter', 'GRAY'],
        ['Schwarz-Weiss', 'THRESHOLD'],
        ['Limitiert', 'POSTERIZE'],
        ['Verschwimmen', 'BLUR'],
        ['Dunkler', 'ERODE'],
        ['Heller', 'DILATE'],
      ],
    },
    {
      type: 'input_value',
      name: 'VAR_NAME',
    }
  ],
  previousStatement: null, 
  nextStatement: null, 
  inputsInline: true,
  style: 'veranderungen_blocks',
};
// Kategorie Logik
const wennDann = {
  type: 'wennDann',
  message0: 'Wenn %1\n dann %2',
  args0: [
    {
      type: 'input_value',
      name: 'bedingung',
      check: 'Boolean',
    },
    {
      type: 'input_statement',
      name: 'dannStatement',
    },
  ],
  style: 'logik_blocks',
  inputsInline: true,
  nextStatement: null,
  previousStatement: null,
};
const sonst = {
  type: 'sonst', 
  message0: 'Sonst\n %1',
  args0: [
    {
      type: 'input_statement',
      name: 'sonstStatement',
    }
  ], 
  style: 'logik_blocks',
  previousStatement: null,
};
const wiederholeSolange = {
  type: 'wiederholeSolange',
  message0: 'Wiederhole %1 Mal\n %2',
  args0: [
    {
      type: 'input_value',
      name: 'solangeStatement',
    },
    {
      type: 'input_statement',
      name: 'wiederholeStatement',
    }
  ],
  style: 'logik_blocks',
  previousStatement: null, 
  nextStatement: null,
};
const randomNum = {
  type: 'randomNum',
  message0: 'zufällige Nummer zwischen %1 und %2', 
  args0: [
    {
      type: 'input_value',
      name: 'randomMin',
      check: 'null',
    },
    {
      type: 'input_value',
      name: 'randomMax',
      check: 'null',
    },
  ],
  output: 'null',
  inputsInline: true,
  style: 'logik_blocks',
};
const numb = {
  type: 'numb',
  message0: '%1',
  args0: [
    {
      type: 'field_number',
      name: 'numbr',
      value: 0,
    }
  ],
  output: null,
  style: 'logik_blocks',
};
const wahr = {
  type: 'wahr',
  message0: 'wahr',
  output: 'Boolean',
  style: 'logik_blocks',
};
const falsch = {
  type: 'falsch',
  message0: 'falsch',
  output: 'Boolean',
  style: 'logik_blocks',
};
const plus = {
  type: 'plus',
  message0: '%1 + %2', 
  args0: [
    {
      type: 'input_value',
      name: 'ersteZahlplus',
    },
    {
      type: 'input_value',
      name: 'zweiteZahlplus'
    },
  ],
  style: 'logik_blocks',
  inputsInline: true,
  output: null,
};
const minus = {
  type: 'minus',
  message0: '%1 - %2', 
  args0: [
    {
      type: 'input_value',
      name: 'ersteZahlminus',
    },
    {
      type: 'input_value',
      name: 'zweiteZahlminus'
    },
  ],
  style: 'logik_blocks',
  inputsInline: true,
  output: null,
};
const mal = {
  type: 'mal',
  message0: '%1 * %2', 
  args0: [
    {
      type: 'input_value',
      name: 'ersteZahlmal',
    },
    {
      type: 'input_value',
      name: 'zweiteZahlmal'
    },
  ],
  style: 'logik_blocks',
  inputsInline: true,
  output: null,
};
const geteilt = {
  type: 'geteilt',
  message0: '%1 / %2', 
  args0: [
    {
      type: 'input_value',
      name: 'ersteZahlgeteilt',
    },
    {
      type: 'input_value',
      name: 'zweiteZahlgeteilt'
    },
  ],
  style: 'logik_blocks',
  inputsInline: true,
  output: null,
};
const rest = {
  type: 'rest',
  message0: 'Rest von %1 / %2', 
  args0: [
    {
      type: 'input_value',
      name: 'ersteZahlrest',
    },
    {
      type: 'input_value',
      name: 'zweiteZahlrest'
    },
  ],
  style: 'logik_blocks',
  inputsInline: true,
  output: null,
};
const grosserAls = {
  type: 'grosserAls',
  message0: '%1 > %2',
  args0: [
    {
      type: 'input_value',
      name: 'ersteZahlgrosser',
    },
    {
      type: 'input_value', 
      name: 'zweiteZahlgrosser',
    },
  ],
  style: 'logik_blocks',
  inputsInline: true,
  output: 'Boolean',
};
const kleinerAls = {
  type: 'kleinerAls',
  message0: '%1 < %2',
  args0: [
    {
      type: 'input_value',
      name: 'ersteZahlkleiner',
    },
    {
      type: 'input_value', 
      name: 'zweiteZahlkleiner',
    },
  ],
  style: 'logik_blocks',
  inputsInline: true,
  output: 'Boolean',
}; 
const gleich = {
  type: 'gleich',
  message0: '%1 = %2',
  args0: [
    {
      type: 'input_value',
      name: 'ersteZahlgleich',
    },
    {
      type: 'input_value', 
      name: 'zweiteZahlgleich',
    },
  ],
  style: 'logik_blocks',
  inputsInline: true,
  output: 'Boolean',
};
const und = {
  type: 'und',
  message0: '%1 und %2',
  args0: [
    {
      type: 'input_value',
      name: 'ersteZahlund',
    },
    {
      type: 'input_value', 
      name: 'zweiteZahlund',
    },
  ],
  style: 'logik_blocks',
  inputsInline: true,
  output: 'Boolean',
};
const oder = {
  type: 'oder',
  message0: '%1 oder %2',
  args0: [
    {
      type: 'input_value',
      name: 'ersteZahloder',
    },
    {
      type: 'input_value', 
      name: 'zweiteZahloder',
    },
  ],
  style: 'logik_blocks',
  inputsInline: true,
  output: 'Boolean',
};
const nicht = {
  type: 'nicht',
  message0: 'Nicht %1',
  args0: [
    {
      type: 'input_value',
      name: 'ersteZahlnicht',
    },
  ],
  style: 'logik_blocks',
  inputsInline: true,
  output: 'Boolean',
};


//Kategorie Ausgabe
const saveGif = {
  type: 'saveGif',
  message0: 'GIF speichern\n Dauer %1 Sekunden \n Name %2',
  args0: [
    {
      type: 'input_value',
      name: 'gifDauer',
    },
    {
      type: 'input_value',
      name: 'nameGif',
    },
  ],
  previousStatement: null,
  style: 'ausgabe_blocks',
};
const saveImg = {
  type: 'saveImg',
  message0: 'Bild speichern als %1 .jpg',
  args0: [
    {
      type: 'input_value',
      name: 'saveImgName',
    }
  ],
  previousStatement: null,
  inputsInline: true,
  style: 'ausgabe_blocks',
};
const test = {
  type: 'test', 
  message0: 'Test \n %1', 
  args0: [
    {
      type: 'input_value',
      name: 'testStatement'
    }
  ],
  style: 'start_blocks',
};

// Mehr als Beispiel nutzen, weil das auch wirklich eine Variable erstellt
const funktion = {
  type: 'funktion',
  message0: 'Funktion %1 \n %2',
  args0: [
    {
      type: 'field_variable',
      name: 'nameFunktion',
      variable: 'nameFunktion'
    },
    {
      type: 'input_statement',
      name: 'funktionsStatements',
    }
  ],
  style: 'start_blocks',
  inputsInline: true,
};
/*const variablesGet = {
  type: 'variablesGet',
  message0: '%1',
  args0: [
    {
      type: 'field_variable',
      name: 'VAR',
      variable: '%{BKY_VARIABLES_DEFAULT_NAME}',
      variableTypes: ['video', 'ton'],
      defaultType: 'ton',
    }
  ],
  output: 'ton',
};

const variablesSet = {
  type: 'variablesSet',
  message0: '%{BKY_VARIABLES_SET}',
  args0: [
    {
      type: 'field_variable',
      name: 'VAR',
      variable: '%{BKY_VARIABLES_DEFAULT_NAME}',
      variableTypes: ['video', 'ton'],
      defaultType: 'ton',
    },
    {
      defaultType: 'input_value',
      name: 'VALUE',
      check: 'ton'
    },
  ],
  previousStatement: null,
  nextStatement: null,
};
*/
// Funktioniert noch nicht, sonst in Objekte
const startPunktZeichnung = {
  type: 'startPunktZeichnung',
  message0: 'Neue Zeichnung starten\n mit Startpunkt x %1 y %2',
  args0: [
    {
      type: 'input_value',
      name: 'zeichnungX',
      check: 'number',
    },
    {
      type: 'input_value',
      name: 'zeichnungY',
      check: 'number',
    }
  ],
  previousStatement: null,
  nextStatement: null,
  style: 'shape_blocks',
}

const pixelWeiter = {
  type: 'pixelWeiter',
  message0: '%1 Pixel nach vorne laufen',
  args0: [
    {
      type: 'input_value',
      name: 'pixelWeiterAnzahl',
      check: 'number'
    },
  ],
  previousStatement: null,
  nextStatement: null,
  style: 'shape_blocks',
}


export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  ton, tonfrequenz, tonAmplitude, test, altSetup, repeatForever, vorbereiten, mouseClick, keyClicked, keyClickFixed, keyClickString, funktion, bildLaden, bildAnzeigen, hoehe, breite, pmouseX, pmouseY, mouseX, mouseY, mausBewegt, startPunktZeichnung, pixelWeiter, stiftFarbe, stiftFarbeHSB, colorHSV, textBlock, texte, neueFigur, circle, line, point, rect, triangle, color, frameRateVar, frameCountVar, saveGif, videoStarten, videoGrosse, scale, translate, rotate, transparenz, filterBild, filterAuswahlBild, mirrorX, mirrorY, numb, randomNum, wahr, falsch, backgroundHSV, background, wennDann, sonst, wiederholeSolange, plus, minus, mal, geteilt, rest, grosserAls, kleinerAls, gleich, und, oder, nicht, altSetup3D, structure3D, ellipsoid3D, box3D, point3D, line3D, rect3D, cylinder3D, ring3D, kegel3D, translate3D, rotate3D, freidrehen3D, saveImg
]);
