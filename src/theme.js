import * as Blockly from 'blockly/core';

export const CreativeTheme = Blockly.Theme.defineTheme('creative', {
  'base': Blockly.Themes.Classic,
  'blockStyles': {
    'startfunktionen_blocks': {
      'colourPrimary': '#00BBF9',
      'colourSecondary': '#74dbfd', // für shadows
      'colourTertiary': '#016e92', // für Umrandung, highlight
      'hat': 'cap',
    },
    'eingabe_blocks': {
      'colourPrimary': '#9B5DE5',
      'colourSecondary': '#b690e3',
      'colourTertiary': '#7119db',
      'hat': 'cap',
    },
    'leinwand_blocks': {
      'colourPrimary': '#C65CCD',
      'colourSecondary': '#caa0cd',
      'colourTertiary': '#82028a',
    },
    'objekte_blocks': {
      'colourPrimary': '#F15BB5',
      'colourSecondary': '#f0cce2',
      'colourTertiary': '#863465',
    },
    'variablen_blocks': {
      'colourPrimary': '#FF6A6A', //wieso gaht das nid? Ah wahrschinlich si si schon neume definiert d farbe für d blöck vo de variable wils built-in isch
      'colourSecondary': '#fdc2c2',
      'colourTertiary': '#8f3d3d',
    },
    'veranderungen_blocks': {
      'colourPrimary': '#F8A07B',
      'colourSecondary': '#fccdba',
      'colourTertiary': '#a16850',
    },
    'logik_blocks': {
      'colourPrimary': '#FEE440',
      'colourSecondary': '#fff8ca',
      'colourTertiary': '#b09e2d',
    },
    'ausgabe_blocks': {
      'colourPrimary': '#00F5D4',
      'colourSecondary': '#77f0e0',
      'colourTertiary': '#01a38e',
    },
  },
  //CategoryStyles überschreibt die CSS gegebenen Farben
  'categoryStyles': {
    'startfunktionen_category': { 'colour': '#00BBF9' },
    'eingabe_category': { 'colour': '#9B5DE5' },
    'leinwand_category': { 'colour': '#C65CCD' },
    'objekte_category': { 'colour': '#F15BB5' },
    'variablen_category': { 'colour': '#FF6A6A' },
    'veranderungen_category': { 'colour': '#F8A07B' },
    'logik_category': { 'colour': '#FEE440' },
    'ausgabe_category': { 'colour': '#00F5D4' },
  },
  'componentStyles': {
    'workspaceBackgroundColour': '#f9fafb',
    'toolboxBackgroundColour': '#ffffff',
    'toolboxForegroundColour': '#374151',
    'flyoutBackgroundColour': '#ffffff',
    'flyoutForegroundColour': '#374151',
    'flyoutOpacity': 0.9,
    'scrollbarColour': '#d1d5db',
    'insertionMarkerColour': '#000000',
    'insertionMarkerOpacity': 0.2,
    'markerColour': '#000000',
    'cursorColour': '#000000',
  },
  'fontStyle': {
    'family': 'var(--font-sans)',
    'weight': '200',
    'size': 12,
  },
});