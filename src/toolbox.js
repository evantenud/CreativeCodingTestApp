export const toolbox2D = {
	kind: 'categoryToolbox',
	contents: [
		{
			kind: 'category', 
			name: 'Startfunktionen',
			categorystyle: 'startfunktionen_category',
			contents: [
				{
					kind: 'block',
					type: 'vorbereiten',
				},
				{
					kind: 'block',
					type: 'altSetup',
				},
				{
					kind: 'block', 
					type: 'repeatForever'
				},
			],
		},
		{
			kind: 'category', 
			name: 'Funktionen',
			custom: 'PROCEDURE',
			categorystyle: 'startfunktionen_category',
		},
		{
			kind: 'category',
			name: 'Eingabe',
			categorystyle: 'eingabe_category',
			contents: [
				{
					kind: 'block', 
					type: 'mouseClick'
				},
				{
					kind: 'block',
					type: 'keyClicked'
				},
				{
					kind: 'block', 
					type: 'keyClickFixed'
				},
				{
					kind: 'block',
					type: 'keyClickString',
					inputs: {
						keyPressed: { shadow: { type: 'textBlock', fields: { textBlockText: 's'}}},
					},
				},
				{
					kind: 'block', 
					type: 'mausBewegt'
				},
				{
					kind: 'block', 
					type: 'mouseX'
				},
				{
					kind: 'block',
					type: 'mouseY'
				},
				{
					kind: 'block', 
					type: 'pmouseX'
				},
				{
					kind: 'block',
					type: 'pmouseY'
				},
			],
		},
		{
			kind: 'category',
			name: 'Leinwand',
			categorystyle: 'leinwand_category',
			contents: [
				{
					kind: 'block',
					type: 'background'
				},
				{
					kind: 'block',
					type: 'backgroundHSV'
				},
				{
					kind: 'block',
					type: 'hoehe'
				},
				{
					kind: 'block',
					type: 'breite'
				},
				{
					kind: 'block',
					type: 'frameRateVar',
					inputs: {
						frameRateStatement: { shadow: { type: 'numb', fields: { numbr: 60}}},
					},
				},
				{
					kind: 'block',
					type: 'frameCountVar'
				},
			],
		},
		{
			kind: 'category',
			name: 'Objekte',
			categorystyle: 'objekte_category',
			contents: [
				{
					kind: 'block',
					type: 'neueFigur'
				},
				{
					kind: 'block',
					type: 'stiftFarbe'
				},
				{
					kind: 'block',
					type: 'stiftFarbeHSB'
				},
				{
					kind: 'block',
					type: 'textBlock'
				},
				{
					kind: 'block',
					type: 'texte',
					inputs : {
						textOne: { shadow: {type: 'textBlock'}},
						xPosT: { shadow: { type: 'numb', fields: { numbr: 0}}},
						yPosT: { shadow: { type: 'numb', fields: { numbr: 0}}},
						textsize: {shadow: { type: 'numb', fields: { numbr: 20}}},
					},
				},
				{
					kind: 'block',
					type: 'point',
					inputs: {
						xValuePoint: { shadow: { type: 'numb', fields: { numbr: 0}}},
						yValuePoint: { shadow: { type: 'numb', fields: { numbr: 0}}},
					},
				},
				{
					kind: 'block',
					type: 'line',
					inputs: {
						xValueLineOne: { shadow: { type: 'numb', fields: { numbr: 0}}},
						yValueLineOne: { shadow: { type: 'numb', fields: { numbr: 0}}},
						xValueLineTwo: { shadow: { type: 'numb', fields: { numbr: 0}}},
						yValueLineTwo: { shadow: { type: 'numb', fields: { numbr: 0}}},
					},
				},
				{
					kind: 'block', 
					type: 'color'
				},
				{
					kind: 'block',
					type: 'colorHSV'
				},
				{
					kind: 'block',
					type: 'circle',
					inputs : {
						xValue: { shadow: { type: 'numb', fields: { numbr: 0 }}},
						yValue: { shadow: { type: 'numb', fields: { numbr: 0 }}},
						dValue: { shadow: { type: 'numb', fields: { numbr: 20 }}},
					},
				},
				{
					kind: 'block',
					type: 'rect',
					inputs: {
						xValueRect: { shadow: { type: 'numb', fields: { numbr: 0}}},
						yValueRect: { shadow: { type: 'numb', fields: { numbr: 0}}},
						hValueRect: { shadow: { type: 'numb', fields: { numbr: 20}}},
						wValueRect: { shadow: { type: 'numb', fields: { numbr: 20}}},
					},
				},
				{
					kind: 'block',
					type: 'triangle',
					inputs: {
						xTriOne: { shadow: { type: 'numb', fields: { number: 1}}},
						yTriOne: { shadow: { type: 'numb', fields: { number: 1}}},
						xTriTwo: { shadow: { type: 'numb', fields: { number: 1}}},
						yTriTwo: { shadow: { type: 'numb', fields: { number: 1}}},
						xTriThree: { shadow: { type: 'numb', fields: { number: 1}}},
						yTriThree: { shadow: { type: 'numb', fields: { number: 1}}},
					},

				},
				{
					kind: 'block',
					type: 'bildLaden',
					inputs: {
						VAR_NAME: { shadow: { type: 'variables_get'}},
					},
				},
				{
					kind: 'block',
					type: 'bildAnzeigen',
					inputs: {
						VAR_NAME: { shadow: { type: 'variables_get'}},
						X: { shadow: { type: 'numb', fields: { numbr: 0}}},
						Y: { shadow: { type: 'numb', fields: { numbr: 0}}},
						W: { shadow: { type: 'numb', fields: { numbr: 100}}},
						H: { shadow: { type: 'numb', fields: { numbr: 100}}},
					},
				},
				{
					kind: 'block',
					type: 'videoStarten',
				},
				{
					kind: 'block', 
					type: 'videoGrosse',
					inputs: {
						videoGrosseX: {shadow: { type: 'numb', fields: { numbr: 0}}},
						videoGrosseY: {shadow: {type: 'numb', fields: { numbr: 0}}},
						videoGrosseBreite: {shadow: {type: 'numb', fields: {numbr: 20}}},
						videoGrosseHohe: {shadow: {type: 'numb', fields: {numbr: 20}}},
					},
				},
				{
					kind: 'block', 
					type: 'ton',
				},
				{
					kind: 'block', 
					type: 'tonfrequenz',
				},
				{
					kind: 'block',
					type: 'tonAmplitude'
				}
			]
		},
		{
			kind: 'category',
			name: 'Variablen',
			categorystyle: 'variablen_category',
			//vorher:
			custom: 'VARIABLE',
			//ab hier neu
			/*contents: [
				{
					kind: 'block',
					type: 'variablesGet',
				},
				{
					kind: 'block', 
					type: 'variablesSet',
				}
			],*/
		},
		{
			kind: 'category',
			name: 'Veränderungen',
			categorystyle: 'veranderungen_category',
			contents: [
				{
					kind: 'block',
					type: 'scale'
				},
				{
					kind: 'block',
					type: 'translate',
					inputs: {
						transX: {shadow: { type: 'numb', fields: { numbr: 0}}},
						transY: {shadow: { type: 'numb', fields: { numbr: 0}}},
					},
				},
				{
					kind: 'block',
					type: 'rotate',
					inputs: {
						rotateX: {shadow: { type: 'numb', fields: { numbr: 0}}},
						rotateY: {shadow: { type: 'numb', fields: { numbr: 0}}},
						rotateDeg: {shadow: { type: 'numb', fields: { numbr: 90}}},
					},
				},
				{
					kind: 'block',
					type: 'mirrorY',
				},
				{
					kind: 'block',
					type: 'mirrorX',
				},
				{
					kind: 'block',
					type: 'transparenz',
				},
				{
					kind: 'block',
					type: 'filterBild',
				},
				{
					kind: 'block',
					type: 'filterAuswahlBild'
				}
			]
		},
		{
			kind: 'category',
			name: 'Logik',
			categorystyle: 'logik_category',
			contents: [
				{
					kind: 'block',
					type: 'wennDann'
				}, 
				{
					kind: 'block', 
					type: 'sonst',
				},
				{
					kind: 'block',
					type: 'wiederholeSolange',
					inputs: {
						solangeStatement: { shadow: { type: 'numb', fields: { numbr: 1}}},
					},
				},
				{
					kind: 'block',
					type: 'wahr',
				},
				{
					kind: 'block',
					type: 'falsch'
				},
				{
					kind: 'block',
					type: 'numb'
				},
				{
					kind: 'block',
					type: 'randomNum',
					inputs: {
						randomMin: { shadow: { type: 'numb', fields: { numbr: 0}}},
						randomMax: { shadow: { type: 'numb', fields: { numbr: 1}}},
					},
				},
				{
					kind: 'block',
					type: 'plus',
					inputs: {
						ersteZahlplus: { shadow: { type: 'numb', fields: { numbr: 1}}},
						zweiteZahlplus: { shadow: { type: 'numb', fields: { numbr: 1}}},
					},
				},
				{
					kind: 'block',
					type: 'minus',
					inputs: {
						ersteZahlminus: { shadow: { type: 'numb', fields: { numbr: 2}}},
						zweiteZahlminus: { shadow: { type: 'numb', fields: { numbr: 1}}},
					},
				},
				{
					kind: 'block',
					type: 'mal',
					inputs: {
						ersteZahlmal: { shadow: { type: 'numb', fields: { numbr: 1}}},
						zweiteZahlmal: { shadow: { type: 'numb', fields: { numbr: 1}}},
					},
				},
				{
					kind: 'block',
					type: 'geteilt',
					inputs: {
						ersteZahlgeteilt: { shadow: { type: 'numb', fields: { numbr: 2}}},
						zweiteZahlgeteilt: { shadow: { type: 'numb', fields: { numbr: 1}}},
					},
				},
				{
					kind: 'block',
					type: 'rest',
					inputs: {
						ersteZahlrest: { shadow: { type: 'numb', fields: { numbr: 3}}},
						zweiteZahlrest: { shadow: { type: 'numb', fields: { numbr: 2}}},
					},
				},
				{
					kind: 'block',
					type: 'grosserAls',
					inputs: {
						ersteZahlgrosser: { shadow: { type: 'numb', fields: { numbr: 2}}},
						zweiteZahlgrosser: { shadow: { type: 'numb', fields: { numbr: 1}}},
					},
				},
				{
					kind: 'block',
					type: 'kleinerAls',
					inputs: {
						ersteZahlkleiner: { shadow: { type: 'numb', fields: { numbr: 1}}},
						zweiteZahlkleiner: { shadow: { type: 'numb', fields: { numbr: 2}}},
					},
				},
				{
					kind: 'block',
					type: 'gleich',
					inputs: {
						ersteZahlgleich: { shadow: { type: 'numb', fields: { numbr: 1}}},
						zweiteZahlgleich: { shadow: { type: 'numb', fields: { numbr: 1}}},
					},
				},
				{
					kind: 'block', 
					type: 'und',
					inputs: {
						ersteZahlund: { shadow: { type: 'wahr'}},
						zweiteZahlund: { shadow: { type: 'wahr'}},
					},
				},
				{
					kind: 'block', 
					type: 'oder',
					inputs: {
						ersteZahloder: { shadow: { type: 'wahr'}},
						zweiteZahloder: { shadow: { type: 'falsch'}},
					},
				},
				{
					kind: 'block',
					type: 'nicht',
					inputs: {
						ersteZahlnicht: { shadow: { type: 'wahr'}},
					},
				},
			]
		},
		{
			kind: 'category', 
			name: 'Ausgabe',
			categorystyle: 'ausgabe_category',
			contents: [
				{
					kind: 'block',
					type: 'saveGif',
					inputs: {
						gifDauer: { shadow: { type: 'numb', fields: { numbr: 2}}},
						nameGif: { shadow: { type: 'textBlock', fields: { textBlockText: 'Name GIF'}}},
					},
				},
				{
					kind: 'block',
					type: 'saveImg',
					inputs: {
						saveImgName: { shadow: { type: 'textBlock', fields: { textBlockText: 'Name Bild'}}},
					},
				}
			]
		},
	]
};
export const toolbox3D = {
	kind: 'categoryToolbox',
	contents: [
		{
			kind: 'category', 
			name: 'Startfunktionen',
			categorystyle: 'startfunktionen_category',
			contents: [
				{
					kind: 'block',
					type: 'vorbereiten',
				},
				{
					kind: 'block',
					type: 'altSetup3D',
				},
				{
					kind: 'block', 
					type: 'repeatForever'
				},
			],
		},
		{
			kind: 'category', 
			name: 'Funktionen',
			custom: 'PROCEDURE',
			categorystyle: 'startfunktionen_category',
		},
		{
			kind: 'category',
			name: 'Eingabe',
			categorystyle: 'eingabe_category',
			contents: [
				{
					kind: 'block', 
					type: 'mouseClick'
				},
				{
					kind: 'block', 
					type: 'keyClicked'
				},
				{
					kind: 'block',
					type: 'keyClickFixed',
				},
				{
					kind: 'block',
					type: 'keyClickString',
					inputs: {
						keyPressed: { shadow: { type: 'textBlock', fields: { textBlockText: 's'}}},
					},
				},
				{
					kind: 'block', 
					type: 'mausBewegt'
				},
				{
					kind: 'block', 
					type: 'mouseX'
				},
				{
					kind: 'block',
					type: 'mouseY'
				},
				{
					kind: 'block', 
					type: 'pmouseX'
				},
				{
					kind: 'block',
					type: 'pmouseY'
				},
			],
		},
		{
			kind: 'category',
			name: 'Leinwand',
			categorystyle: 'leinwand_category',
			contents: [
				{
					kind: 'block',
					type: 'background'
				},
				{
					kind: 'block',
					type: 'backgroundHSV'
				},
				{
					kind: 'block',
					type: 'hoehe'
				},
				{
					kind: 'block',
					type: 'breite'
				},
				{
					kind: 'block',
					type: 'frameRateVar'
				},
				{
					kind: 'block',
					type: 'frameCountVar'
				},
			],
		},
		{
			kind: 'category',
			name: 'Objekte',
			categorystyle: 'objekte_category',
			contents: [
				{
					kind: 'block',
					type: 'neueFigur'
				},
				{
					kind: 'block',
					type: 'stiftFarbe'
				},
				{
					kind: 'block', 
					type: 'stiftFarbeHSB'
				},
				{
					kind: 'block',
					type: 'textBlock'
				},
				{
					kind: 'block',
					type: 'texte',
					inputs : {
						textOne: { shadow: {type: 'textBlock'}},
						xPosT: { shadow: { type: 'numb', fields: { numbr: 0}}},
						yPosT: { shadow: { type: 'numb', fields: { numbr: 0}}},
						textsize: {shadow: { type: 'numb', fields: { numbr: 20}}},
					},
				},
				{
					kind: 'block',
					type: 'point3D',
					inputs: {
						xValuePoint3D: { shadow: { type: 'numb', fields: { numbr: 0}}},
						yValuePoint3D: { shadow: { type: 'numb', fields: { numbr: 0}}},
						zValuePoint3D: { shadow: { type: 'numb', fields: { numbr: 0}}},
					},
				},
				{
					kind: 'block',
					type: 'line3D',
					inputs: {
						xValueLineOne3D: { shadow: { type: 'numb', fields: { numbr: 0}}},
						yValueLineOne3D: { shadow: { type: 'numb', fields: { numbr: 0}}},
						zValueLineOne3D: { shadow: { type: 'numb', fields: { numbr: 0}}},
						xValueLineTwo3D: { shadow: { type: 'numb', fields: { numbr: 0}}},
						yValueLineTwo3D: { shadow: { type: 'numb', fields: { numbr: 0}}},
						zValueLineTwo3D: { shadow: { type: 'numb', fields: { numbr: 0}}},
					},
				},
				{
					kind: 'block', 
					type: 'color'
				},
				{
					kind: 'block',
					type: 'colorHSV'
				},
				{
					kind: 'block',
					type: 'circle',
					inputs : {
						xValue: { shadow: { type: 'numb', fields: { numbr: 0 }}},
						yValue: { shadow: { type: 'numb', fields: { numbr: 0 }}},
						dValue: { shadow: { type: 'numb', fields: { numbr: 20 }}},
					},
				},
				{
					kind: 'block',
					type: 'rect3D',
					inputs: {
						rectWidth3D: { shadow: { type: 'numb', fields: { numbr: 0}}},
						rectHeight3D: { shadow: { type: 'numb', fields: { numbr: 0}}},
						rectDetail3D: { shadow: { type: 'numb', fields: { numbr: 20}}},
					},
				},
				{
					kind: 'block',
					type: 'triangle',
					inputs: {
						xTriOne: { shadow: { type: 'numb', fields: { numbr: 0}}},
						yTriOne: { shadow: { type: 'numb', fields: { numbr: 0}}},
						xTriTwo: { shadow: { type: 'numb', fields: { numbr: 0}}},
						yTriTwo: { shadow: { type: 'numb', fields: { numbr: 0}}},
						xTriThree: { shadow: { type: 'numb', fields: { numbr: 0}}},
						yTriThree: { shadow: { type: 'numb', fields: { numbr: 0}}},
					},

				},
				{
					kind: 'block',
					type: 'ellipsoid3D',
					inputs: {
						xValueEllipsoid: {shadow: { type: 'numb', fields: {numbr: 0}}},
						yValueEllipsoid: {shadow: { type: 'numb', fields: {numbr: 0}}},
						zValueEllipsoid: {shadow: { type: 'numb', fields: {numbr: 0}}},
					},
				},
				{
					kind: 'block',
					type: 'box3D',
					inputs: {
						widthBox3D: {shadow: { type: 'numb', fields: {numbr: 0}}},
						heightBox3D: {shadow: { type: 'numb', fields: {numbr: 0}}},
						depthBox3D: {shadow: { type: 'numb', fields: {numbr: 0}}},
					},
				},
				{
					kind: 'block',
					type: 'cylinder3D',
					inputs: {
						cylinderRadius3D: {shadow: { type: 'numb', fields: {numbr: 0}}},
						cylinderHeight3D: {shadow: { type: 'numb', fields: {numbr: 0}}},
					},
				},
				{
					kind: 'block',
					type: 'ring3D',
					inputs: {
						torusOuterRadius3D: {shadow: { type: 'numb', fields: {numbr: 0}}},
						torusInnerRadius3D: {shadow: { type: 'numb', fields: {numbr: 0}}},
					},
				},
				{
					kind: 'block',
					type: 'kegel3D',
					inputs: {
						coneRadius3D: {shadow: { type: 'numb', fields: {numbr: 0}}},
						coneHeight3D: {shadow: { type: 'numb', fields: {numbr: 0}}},
					},
				},
				{
					kind: 'block',
					type: 'bildLaden',
					inputs: {
						VAR_NAME: { shadow: { type: 'variables_get'}},
					},
				},
				{
					kind: 'block',
					type: 'bildAnzeigen',
					inputs: {
						VAR_NAME: { shadow: { type: 'variables_get'}},
						X: { shadow: { type: 'numb', fields: { numbr: 0}}},
						Y: { shadow: { type: 'numb', fields: { numbr: 0}}},
						W: { shadow: { type: 'numb', fields: { numbr: 100}}},
						H: { shadow: { type: 'numb', fields: { numbr: 100}}},
					},
				},
				{
					kind: 'block',
					type: 'videoStarten',
				},
				{
					kind: 'block', 
					type: 'videoGrosse',
					inputs: {
						videoGrosseX: {shadow: { type: 'numb', fields: { numbr: 0}}},
						videoGrosseY: {shadow: {type: 'numb', fields: { numbr: 0}}},
						videoGrosseBreite: {shadow: {type: 'numb', fields: {numbr: 20}}},
						videoGrosseHohe: {shadow: {type: 'numb', fields: {numbr: 20}}},
					},
				},
				{
					kind: 'block', 
					type: 'ton',
				},
				{
					kind: 'block', 
					type: 'tonfrequenz',
				},
				{
					kind: 'block',
					type: 'tonAmplitude'
				}

			]
		},
		{
			kind: 'category',
			name: 'Variablen',
			categorystyle: 'variablen_category',
			//vorher:
			custom: 'VARIABLE',
			//ab hier neu
			/*contents: [
				{
					kind: 'block',
					type: 'variablesGet',
				},
				{
					kind: 'block', 
					type: 'variablesSet',
				}
			],*/
		},
		{
			kind: 'category',
			name: 'Veränderungen',
			categorystyle: 'veranderungen_category',
			contents: [
				{
					kind: 'block',
					type: 'freidrehen3D'
				},
				{
					kind: 'block',
					type: 'scale'
				},
				{
					kind: 'block',
					type: 'translate3D',
					inputs: {
						transX3D: {shadow: { type: 'numb', fields: { numbr: 0}}},
						transY3D: {shadow: { type: 'numb', fields: { numbr: 0}}},
						transZ3D: {shadow: { type: 'numb', fields: { numbr: 0}}},
					},
				},
				{
					kind: 'block',
					type: 'rotate3D',
					inputs: {
						rotateDeg3D: {shadow: { type: 'numb', fields: { numbr: 90}}},
						rotateX3D: {shadow: { type: 'numb', fields: { numbr: 0}}},
						rotateY3D: {shadow: { type: 'numb', fields: { numbr: 0}}},
						rotateZ3D: {shadow: { type: 'numb', fields: { numbr: 0}}},
					},
				},
				{
					kind: 'block',
					type: 'mirrorY',
				},
				{
					kind: 'block',
					type: 'mirrorX',
				},
				{
					kind: 'block',
					type: 'transparenz',
				},
				{
					kind: 'block',
					type: 'filterBild',
				},
				{
					kind: 'block',
					type: 'filterAuswahlBild'
				}
			]
		},
		{
			kind: 'category',
			name: 'Logik',
			categorystyle: 'logik_category',
			contents: [
				{
					kind: 'block',
					type: 'wennDann'
				}, 
				{
					kind: 'block', 
					type: 'sonst',
				},
				{
					kind: 'block',
					type: 'wiederholeSolange',
					inputs: {
						solangeStatement: { shadow: { type: 'numb', fields: { number: 1}}},
					},
				},
				{
					kind: 'block',
					type: 'wahr',
				},
				{
					kind: 'block',
					type: 'falsch'
				},
				{
					kind: 'block',
					type: 'numb'
				},
				{
					kind: 'block',
					type: 'randomNum',
					inputs: {
						randomMin: { shadow: { type: 'numb', fields: { numbr: 1}}},
						randomMax: { shadow: { type: 'numb', fields: { numbr: 1}}},
					},
				},
				{
					kind: 'block',
					type: 'plus',
					inputs: {
						ersteZahlplus: { shadow: { type: 'numb', fields: { number: 1}}},
						zweiteZahlplus: { shadow: { type: 'numb', fields: { number: 1}}},
					},
				},
				{
					kind: 'block',
					type: 'minus',
					inputs: {
						ersteZahlminus: { shadow: { type: 'numb', fields: { number: 1}}},
						zweiteZahlminus: { shadow: { type: 'numb', fields: { number: 1}}},
					},
				},
				{
					kind: 'block',
					type: 'mal',
					inputs: {
						ersteZahlmal: { shadow: { type: 'numb', fields: { number: 1}}},
						zweiteZahlmal: { shadow: { type: 'numb', fields: { number: 1}}},
					},
				},
				{
					kind: 'block',
					type: 'geteilt',
					inputs: {
						ersteZahlgeteilt: { shadow: { type: 'numb', fields: { number: 1}}},
						zweiteZahlgeteilt: { shadow: { type: 'numb', fields: { number: 1}}},
					},
				},
				{
					kind: 'block',
					type: 'rest',
					inputs: {
						ersteZahlrest: { shadow: { type: 'numb', fields: { number: 1}}},
						zweiteZahlrest: { shadow: { type: 'numb', fields: { number: 1}}},
					},
				},
				{
					kind: 'block',
					type: 'grosserAls',
					inputs: {
						ersteZahlgrosser: { shadow: { type: 'numb', fields: { number: 1}}},
						zweiteZahlgrosser: { shadow: { type: 'numb', fields: { number: 1}}},
					},
				},
				{
					kind: 'block',
					type: 'kleinerAls',
					inputs: {
						ersteZahlkleiner: { shadow: { type: 'numb', fields: { number: 1}}},
						zweiteZahlkleiner: { shadow: { type: 'numb', fields: { number: 1}}},
					},
				},
				{
					kind: 'block',
					type: 'gleich',
					inputs: {
						ersteZahlgleich: { shadow: { type: 'numb', fields: { number: 1}}},
						zweiteZahlgleich: { shadow: { type: 'numb', fields: { number: 1}}},
					},
				},
				{
					kind: 'block', 
					type: 'und',
					inputs: {
						ersteZahlund: { shadow: { type: 'wahr'}},
						zweiteZahlund: { shadow: { type: 'wahr'}},
					},
				},
				{
					kind: 'block', 
					type: 'oder',
					inputs: {
						ersteZahloder: { shadow: { type: 'wahr'}},
						zweiteZahloder: { shadow: { type: 'falsch'}},
					},
				},
				{
					kind: 'block',
					type: 'nicht',
					inputs: {
						ersteZahlnicht: { shadow: { type: 'wahr'}},
					},
				},
			]
		},
		{
			kind: 'category', 
			name: 'Ausgabe',
			categorystyle: 'ausgabe_category',
			contents: [
				{
					kind: 'block',
					type: 'saveGif',
					inputs: {
						gifDauer: { shadow: { type: 'numb', fields: { numbr: 2}}},
						nameGif: { shadow: { type: 'textBlock', fields: { textBlockText: 'Name GIF'}}},
					},
				},
				{
					kind: 'block',
					type: 'saveImg',
					inputs: {
						saveImgName: { shadow: { type: 'textBlock', fields: { textBlockText: 'Name Bild'}}},
					},
				}
			]
		},
	]
};