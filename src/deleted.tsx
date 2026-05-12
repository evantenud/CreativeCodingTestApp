// Nach oben bei Blockly Editor in der Funktion, unterhalb von der Definition von previewCode

const [showCode, setShowCode] = useState(false);

// Innerhalb von actionsrow vor JS herunterladen

<button onClick={() => setShowCode(!showCode)} className="btn btn-secondary btn-full">
                <Code size={18} />
                {showCode ? 'Code ausblenden' : 'Code anzeigen'}
              </button>

// Innerhalb der return function von BlocklyCode
// Nach Ende von Actions Panel, innerhalb von Preview Panel
<AnimatePresence>
            {showCode && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: '300px' }}
                exit={{ height: 0 }}
                className="code-panel"
              >
                <div className="code-header">
                  <span className="code-title">Generiertes JavaScript</span>
                  <button onClick={() => setShowCode(false)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: '1.25rem' }}>×</button>
                </div>
                <pre className="code-body">
                  <code>{workspace.current ? javascriptGenerator.workspaceToCode(workspace.current) : '// No code generated'}</code>
                </pre>
              </motion.div>
            )}
          </AnimatePresence>