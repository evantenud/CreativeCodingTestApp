import { useEffect, useRef, useState, ChangeEvent, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import * as Blockly from 'blockly';
import * as De from 'blockly/msg/de';
import { javascriptGenerator } from 'blockly/javascript';
import { blocks } from './blocks/text';
import { forBlock } from './generators/javascript';
import { toolbox2D, toolbox3D } from './toolbox';
import { save, load } from './serialization';
import { Play, Download, Upload, Code, Info, FileCode, LineSquiggle, Square, Box, Presentation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CreativeTheme } from './theme';
// to run type node server.ts

// Initialize Blockly
Blockly.setLocale(De);
Blockly.common.defineBlocks(blocks);
Object.assign(javascriptGenerator.forBlock, forBlock);

//erstellt die Funktion BlocklyEditor
function BlocklyEditor() {
  //Referenz zu einem Div Element, setzt sich nicht beim rendern zurück
  // es ist vom Typ ein Div Element, wird im html mit ref als attribut gesetzt
  const blocklyDiv = useRef<HTMLDivElement>(null);
  // Blockly.WorkspaceSvg ist die class vom Blockly Workspace, gibt einem das .current property
  const workspace = useRef<Blockly.WorkspaceSvg | null>(null);
  // setzt 2 Variablen, setzt sie zu zur initialen useState value ''
  const [previewCode, setPreviewCode] = useState('');
  //Um den Modus zunächst auf 2D zu schalten
  const [mode, setMode] = useState('2D');

// use Effect nimmt zwei Argumente die Funktion (was) und den dependency array(wann?)
// use Effect tritt in Kraft nachdem die Webseite gerendert wird
  useEffect(() => {

  if (workspace.current) {
    // wischt das ganze Weg, jedes mal, wenn Modus gewechselt wird
    workspace.current.clear();
    // Wenn mode '2D' ist, nimm toolbox2D, ansonsten toolbox3D
    const currentToolbox = mode === '2D' ? toolbox2D : toolbox3D;
    workspace.current.updateToolbox(currentToolbox);
    }
  }, [mode]);
  useEffect(() => {
    // Wenn die Konstante blocklyDiv in diesem Moment true zurückgibt und workspace.current false zurückgibt 
    if (blocklyDiv.current && !workspace.current) {
      // der Workspace (unten definiert) wird ins Div blocklyDiv injeziert
      workspace.current = Blockly.inject(blocklyDiv.current, {
        // das sind die Einstellugnen des Workspaces
        toolbox: toolbox2D,
        theme: CreativeTheme,
        renderer: 'zelos',
        grid: { spacing: 40, length: 1, colour: '#ccc', snap: true },
        trashcan: true,
        move: {
          scrollbars: true,
          drag: true,
          wheel: true,
        },
        zoom: {
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
        },
      });
      // dann wird dieser workspace geladen
      // !!! das kann ein Problem sein, wenn ein Workspace komisch ist
      load(workspace.current);
      // wenn dieser verändert wird, wir er gespeichert
      workspace.current.addChangeListener(() => {
        save(workspace.current!);
      });
    }
    // verstehe ich noch nicht ganz
    return () => {
      if (workspace.current) {
        workspace.current.dispose();
        workspace.current = null;
      }
    };
  }, []); // useEffekt Funktion beendet, läuft immer, dependancy array ist leer
  // rFunktion runcode
  const runCode = () => {
    // wenn workspace leer ist, seinlassen
    if (!workspace.current) return;
    // wendet die Funktion workspacetocode vom javascript generator an
    const code = javascriptGenerator.workspaceToCode(workspace.current);
    // erstellt Konstante mit dem generierten Code integriert als Script
    // ist was dann als Vorschau angezeigt wird
    const sketch = `
      <html>
        <head>
          <script src="https://cdn.jsdelivr.net/npm/p5@1.11.13/lib/p5.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/p5.sound@0.3.0/dist/p5.sound.min.js"></script>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">   
          <style>
            body { margin: 0; padding: 0; overflow: hidden; background: #f0f0f0; }
            canvas { display: block; }
          </style>
        </head>
        <body>
          <script>
            ${code}
          </script>
        </body>
      </html>
    `;
    //React Funktion set, um die Variable previewCode zum Sketch zu setzen
    setPreviewCode(sketch);
  };

// Funktion um den JavaScript herunterzuladen
  const downloadJS = () => {
    // wenn workspace current leer ist, seinlassen
    if (!workspace.current) return;
    // erstellt wie oben mit der Funktion workspacetocode code aus dem workspace
    const code = javascriptGenerator.workspaceToCode(workspace.current);
    // erstellt einen neuen Blob, ein objekt von unbearbeitbarer und raw data, kann wie ein file genutzt werden
    // der Inhalt des Blobs ist der Code und der typ ist javascript
    const blob = new Blob([code], { type: 'application/javascript' });
    // erstellt eine URL für den Blob
    const url = URL.createObjectURL(blob);
    // erstellt ein Element für den Blob
    const a = document.createElement('a');
    // die URL des Elements ist die URL des Blobs
    a.href = url;
    a.download = 'creativeCodingProjekt.js';
    a.click();
    URL.revokeObjectURL(url);
  };
// Funktion um den Workspace zu exportieren
  const exportProject = () => {
    // wenn workspace nicht existiert ist, sein lassen
    if (!workspace.current) return;
    const state = Blockly.serialization.workspaces.save(workspace.current);
    const json = JSON.stringify(state, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'creativeCodingProjekt.json';
    a.click();
    URL.revokeObjectURL(url);
  };
// Funktion um ein Projekt zu laden
  const importProject = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !workspace.current) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const state = JSON.parse(event.target?.result as string);
        workspace.current!.clear();
        Blockly.serialization.workspaces.load(state, workspace.current!);
      } catch (err) {
        console.error('Failed to import project:', err);
      }
    };
    reader.readAsText(file);
  };
// Die erste Seite (Programmierseite) wird von der Funktion Blockly Editor zurückgegeben
  return (
    <div className="editor-container">
      <div className="toolbar">
        <div className="toolbar-group">
          {/*Wenn button geklickt wird läuft die Funktion runcode*/}
          {/*<div className="mode-switch">
            <button onClick={() => setMode('2D')} className={`${mode === '2D' ? 'mode-btn active' :  'mode-btn'}`} title="2D Modus">
              <Square />
              2D
            </button>
            <button onClick={() => setMode('3D')} className= {`${mode === '3D' ? 'mode-btn active' : 'mode-btn'}`}>
              <Box />
              3D
            </button>
          </div>*/}
          <button onClick={runCode} className="btn btn-primary">
            {/*ein React Component namens Play, kommt von der Bibliothek Lucide*/}
            <Play size={18} fill="currentColor" />
            Start
          </button>
        </div>
      </div>
      <div className="workspace-wrapper">
        <div className="blockly-area">
          {/*Das referenzierte blocklyDiv*/}
          <div ref={blocklyDiv} style={{ position: 'absolute', inset: 0 }} />
        </div>
        <div className="preview-panel">
          <div className="panel-header">
            <span className="panel-title">Vorschau</span>
          </div>
          <div className="preview-content">
            {/*Wenn previeCode etwas enthält*/}
            {previewCode ? (
              // dann ist hier ein iframe mit der src vom erstellten Code
              <iframe
                srcDoc={previewCode}
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="p5-preview"
              />
            ) : (
            // ansonsten ist hier ein Div 
              <div className="preview-placeholder">
                {/*mit einem PlayIcon aus der lucide Bibliothek*/}
                <Play size={48} style={{ opacity: 0.2 }} />
                {/*und diesem Text*/}
                <p style={{ fontSize: '0.875rem' }}>Drücke Start um deinen Code auszuführen</p>
              </div>
            )}
          </div>
          {/*Hier sind alle Action Buttons untergebracht*/}
           <div className="actions-panel">
            <div className="actions-row">
              <button onClick={downloadJS} className="btn btn-outline btn-full">
                <FileCode size={18} />
                JS herunterladen
              </button>
            </div>
            <div className="actions-row">
              <label className="import-label btn-full">
                <Upload size={18} />
                Importieren
                <input type="file" accept=".json" onChange={importProject} className="hidden" style={{ display: 'none' }} />
              </label>
              <button onClick={exportProject} className="btn btn-outline btn-full">
                <Download size={18} />
                Exportieren
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
//
function InfosPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Informationen zum Programmieren</h1>
      <div className="prose">
        <p>
          Hier findest du Informationen zu verschiedenen Sachen, die dir beim Programmieren helfen können und eine Anleitung für diese Webseite
        </p>
        <div className="explanation-container">
          <div className="explanations" id="explanationOne">
            <h2>Was ist Creative Coding?</h2>
            <p>Beim Creative Coding geht es darum den Code zum experimentieren und ausprobieren zu nutzen. Es geht um den Prozess und nicht unbedingt um das Ergebnis</p>
            <p>Die Umgebung sieht Scratch sehr ähnlich. Ein wichtiger Unterschied zwischen den beiden ist aber genau das Creative Coding. Auf dieser Webseite sollst du frei ausprobieren können und was am Schluss daraus entsteht ist nicht festgelegt.</p>
          </div>
          <div className="explanations" id="explanationTwo">
            <h2>Wie funktioniert diese Webseite?</h2>
            <p>Die Webseite ist möglichst einfach aufgebaut, dass du möglichst schnell mit dem Programmieren beginnen kannst.</p>
            <p>Sie besteht aus 3 Unterseiten:</p>
            <p>In der <b>Code</b> Unterseite kannst du programmieren.</p>
            <p>In der <b>Infos</b> Unterseite bist du gerade und hier findest du die wichtigsten Infos dazu wie diese Webseite funktioniert, um was es geht und Informationen, die dir beim Programmieren helfen können.</p>
            <p>Die <b>Dateien</b> Unterseite ist auch ganz wichtig, dass du gut starten kannst. Hier findest du bereits erstellte Dateien mit Programmen, die gewisse Sachen tun. Du kannst diese Herunterladen und dann auf dieser Webseite bearbeiten und wieder herunterladen. So kannst du die wichtigsten Konzepte lernen und deine Dateien sind bei dir gespeichert.</p>
          </div>
          <div className="explanations" id="explanationThree">
            <h2>Was du lernst</h2>
            <p>Auf dieser Webseite lernst du, was Creative Coding ist und was damit möglich ist. Die Blöcke, die du benutzt sind auf einer JavaScript Bibliothek aufgebaut. JavaScript ist eine bekannte Programmiersprache, die besonders im Internet oft benutzt wird und eine Bibliothek ist eine Sammlung von Code, die von jemandem entwickelt wurde, um gewisse Sache in der Programmiersprache zu vereinfachen. Die Bibliothek heisst p5.js. Du findest sie hier: <a href="https://p5js.org/">P5.js</a>. Wenn du dich sicher fühlst mit den Blöcken kannst du auf dieser Webseite textbasiert weiterarbeiten.</p>
          </div>
          <div className="explanations" id="explanationFour">
            <h2>Der Start Block</h2>
            <img src="/public/code_explanations/start.png" />
            <p>Der Start Block gehört so ziemlich in jedes Programm. Er läuft einmal zum Beginn vom Programm und in ihn gehört aller Code, der nur einmal und nicht immer wieder ausgeführt werden soll.</p>
          </div>
          <div className="explanations" id="explanationFive">
            <h2>Der Zeichnen Block</h2>
            <img src="public/code_explanations/zeichnen.png" />
            <p>Der Zeichnen Block ist ebenfalls wichtig für die meisten Programme. Dieser wiederholt den Code in ihm andauernd.</p>
          </div>
          <div className="explanations" id="explanation">
            <h2>Farben</h2>
            <p>Es werden zwei Farbsysteme gebraucht HSB und RGB. Die beiden Farbsysteme unterscheiden sich darin wie die Farben gemischt werden. </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilesPage() {
  const downloadEinfachZeichnen = () => {
    const link = document.createElement('a');
    link.href = `/public/code_examples/einfach_zeichnen.json`;
    link.download = "einfach_zeichnen.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const downloadGeradeLinie = () => {
    const link = document.createElement('a');
    link.href = `/public/code_examples/gerade_linie.json`;
    link.download = "gerade_linie.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const downloadStempel = () => {
    const link = document.createElement('a');
    link.href = `/public/code_examples/komplexerer_stempel.json`;
    link.download = 'stempel.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const downloadChangeImage = () => {
    const link = document.createElement('a');
    link.href = `/public/code_examples/bild_verändern.json`;
    link.download = 'bild_verändern.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const downloadDrehung = () => {
    const link = document.createElement('a');
    link.href = `/public/code_examples/drehung.json`;
    link.download = 'drehung.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const downloadAnimation = () => {
    const link = document.createElement('a');
    link.href = `/public/code_examples/einfache_animation_mit_variablen.json`;
    link.download = 'einfache_animation_mit_variablen.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const downloadSymmetrie = () => {
    const link = document.createElement('a');
    link.href = `/public/code_examples/einfache_symmetrie.json`;
    link.download = 'einfache_symmetrie.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const downloadVideo = () => {
    const link = document.createElement('a');
    link.href = `/public/code_examples/einfaches_video.json`;
    link.download = 'einfaches_video.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const downloadTone = () => {
    const link = document.createElement('a');
    link.href = `/public/code_examples/töne.json`;
    link.download = 'töne.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const downloadShapes = () => {
    const link = document.createElement('a');
    link.href = `/public/code_examples/verschiedene_formen.json`;
    link.download = 'verschiedene_formen.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const downloadWiederholung = () => {
    const link = document.createElement('a');
    link.href = `/public/code_examples/wiederholung.json`;
    link.download = 'wiederholung.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="page-container" style={{ textAlign: 'center' }}>
      <div className="files-hero">
        <FileCode size={64} className="file-header-icon" style={{ color: '#bfdbfe', marginBottom: '1rem' }} />
        <h1 className="file-header-title" style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Code Beispiele</h1>
        <p className="file-header-text" style={{ color: '#4b5563', marginBottom: '2rem' }}>
          Hier kannst du verschiedene Code Beispiele herunterladen. Diese kannst du benutzen, ausprobieren und anpassen.
        </p>
        {/*Ich denke, ich fände die Aufstellung: Titel, dann grosses Bild, kurze Beschreibung und herunterladen besser*/}
        {/*Erste File Karte*/}
        {/*<div className="file-card">
          <div className="file-info">
            <div className="file-icon">
              <FileCode size={20} />
            </div>
            <div>
              <p className="file-name">Zeichnungsfeld</p>
              <p className="file-meta">Macht den Workspace zu einer Zeichungsfläche</p>
            </div>
          </div>
          <button onClick={downloadEinfachZeichnen} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 500 }}>Herunterladen</button>
        </div>*/}
        {/*Zweite File Karte*/}
         <div className="file-card">
          <div className="file-info">
            <div className="file-icon">
              <FileCode size={20} />
            </div>
            <div>
              <p className="file-name">Linie</p>
              <p className="file-meta">Zeichnet eine simple Linie</p>
            </div>
          </div>
          <button onClick={downloadGeradeLinie} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 500 }}>Herunterladen</button>
        </div>
        {/*Dritte File Karte*/}
        <div className="file-card">
          <div className="file-info">
            <div className="file-icon">
              <FileCode size={20} />
            </div>
            <div>
              <p className="file-name">Stempel</p>
              <p className="file-meta">Erstellt einen Stempel, der immer dort positioniert wird, wo man auf das Bild drückt.</p>
            </div>
          </div>
          <button onClick={downloadStempel} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 500 }}>Herunterladen</button>
        </div>
      {/*Vierte File Karte */}
        <div className="file-card">
          <div className="file-info">
            <div className="file-icon">
              <FileCode size={20} />
            </div>
            <div>
              <p className="file-name">Bild verändern</p>
              <p className="file-meta">Zeigt auf, wie man ein Bild erstellt und wie man dieses verändern kann.</p>
            </div>
          </div>
          <button onClick={downloadChangeImage} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 500 }}>Herunterladen</button>
        </div>
      {/*Fünfte File Karte*/}
        {/*<div className="file-card">
          <div className="file-info">
            <div className="file-icon">
              <FileCode size={20} />
            </div>
            <div>
              <p className="file-name">Drehung</p>
              <p className="file-meta">Zeigt auf, wie man Elemente drehen kann.</p>
            </div>
          </div>
          <button onClick={downloadDrehung} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 500 }}>Herunterladen</button>
        </div>*/}
      {/*Sechste File Karte*/}
        <div className="file-card">
          <div className="file-info">
            <div className="file-icon">
              <FileCode size={20} />
            </div>
            <div>
              <p className="file-name">Animation</p>
              <p className="file-meta">Zeigt auf, wie man eine einfache Animation erstellen kann.</p>
            </div>
          </div>
          <button onClick={downloadAnimation} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 500 }}>Herunterladen</button>
        </div>
      {/*Siebte File Karte*/}
        <div className="file-card">
          <div className="file-info">
            <div className="file-icon">
              <FileCode size={20} />
            </div>
            <div>
              <p className="file-name">Symmetrie</p>
              <p className="file-meta">Zeigt auf, wie man mit Spiegelungen Symmetrien erzeugen kann.</p>
            </div>
          </div>
          <button onClick={downloadSymmetrie} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 500 }}>Herunterladen</button>
        </div>
      {/*Achte File Karte*/}
        {/*<div className="file-card">
          <div className="file-info">
            <div className="file-icon">
              <FileCode size={20} />
            </div>
            <div>
              <p className="file-name">Video</p>
              <p className="file-meta">Erstellt ein Video aus der Kamera des Geräts.</p>
            </div>
          </div>
          <button onClick={downloadVideo} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 500 }}>Herunterladen</button>
        </div>*/}
      {/*Neunte File Karte */}
        <div className="file-card">
          <div className="file-info">
            <div className="file-icon">
              <FileCode size={20} />
            </div>
            <div>
              <p className="file-name">Töne</p>
              <p className="file-meta">Zeigt auf, wie man Töne in unterschiedlicher Höhe und Lautstärke erzeugen kann.</p>
            </div>
          </div>
          <button onClick={downloadTone} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 500 }}>Herunterladen</button>
        </div>
      {/*Zehnte File Karte*/}
        <div className="file-card">
          <div className="file-info">
            <div className="file-icon">
              <FileCode size={20} />
            </div>
            <div>
              <p className="file-name">Formen</p>
              <p className="file-meta">Zeigt auf, wie man verschiedene zweidimensionale Formen erstellen kann.</p>
            </div>
          </div>
          <button onClick={downloadShapes} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 500 }}>Herunterladen</button>
        </div>
      {/*Elfte File Karte*/}
        <div className="file-card">
          <div className="file-info">
            <div className="file-icon">
              <FileCode size={20} />
            </div>
            <div>
              <p className="file-name">Wiederholung</p>
              <p className="file-meta">Zeigt auf, wie man Wiederholungen nutzen kann.</p>
            </div>
          </div>
          <button onClick={downloadWiederholung} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 500 }}>Herunterladen</button>
        </div>
      {/*Ende File Karte*/}
      </div>
    </div>
  );
}

function LehrpersonenPage(){
  return(
    <div className="page-container">
      <h1>Informationen für Lehrpersonen</h1>
    </div>
    );
}


export default function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navigationsleiste auf der Seite */}
        <nav className="sidebar">
          <div style={{ marginBottom: '3rem', color: '#2563eb' }}>
            <LineSquiggle size={32} /> 
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <NavLink to="/" icon={<Play size={24} />} label="Code" />
            <NavLink to="/infos" icon={<Info size={24} />} label="Infos" />
            <NavLink to="/files" icon={<FileCode size={24} />} label="Dateien" />
            <NavLink to="/lehrpersonen" icon={<Presentation size={24} />} label= "LP" />
          </div>
        </nav>
        {/* Die "Unterseiten" */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<BlocklyEditor />} />
            <Route path="/infos" element={<InfosPage />} />
            <Route path="/files" element={<FilesPage />} />
            <Route path="/lehrpersonen" element={<LehrpersonenPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Erstellung des NavLink react elements
function NavLink({ to, icon, label }: { to: string; icon: ReactNode; label: string }) {
  // setzt variable location zur aktuellen location
  const location = useLocation();
  // setzt to zum pathnamen der location
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`}>
      <div className="nav-icon-wrapper">
        {icon}
      </div>
      <span className="nav-label">{label}</span>
    </Link>
  );
}