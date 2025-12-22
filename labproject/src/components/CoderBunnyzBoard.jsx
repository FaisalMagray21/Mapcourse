import React, { useEffect, useMemo, useState } from "react";

// Default export a React component that renders a 9x9 CoderBunnyz-style board
// Tailwind CSS classes are used for styling. Make sure your project has Tailwind configured.

export default function CoderBunnyzBoard() {
  // 9x9 board definition (use codes to control colors/icons)
  // Legend: W = white, BL = blue, PU = purple, GR = green, OR = orange, C = center, I# = icon placeholders
  const board = useMemo(() => [
    ["W","I1","BL","I2","BL","I3","BL","I4","W"],
    ["I1","W","W","W","W","W","W","W","I5"],
    ["PU","W","W","W","W","W","W","W","GR"],
    ["I6","I7","W","W","C","W","W","I8","I5"],
    ["PU","I10","W","C","I4","C","W","I9","GR"],
    ["I3","I8","W","W","C","W","W","I9","I5"],
    ["PU","W","W","W","W","W","W","W","GR"],
    ["I4","W","W","W","W","W","W","W","I6"],
    ["W","I13","OR","I4","OR","I15","OR","I16","W"],
  ], []);

  // Build a movement path along the outer perimeter clockwise (top-left -> top-right -> bottom-right -> bottom-left -> back)
  const path = useMemo(() => {
    const N = 9;
    const p = [];
    // top row left->right
    for (let c = 0; c < N; c++) p.push([0, c]);
    // right col top+1 -> bottom
    for (let r = 1; r < N; r++) p.push([r, N - 1]);
    // bottom row right-1 -> left
    for (let c = N - 2; c >= 0; c--) p.push([N - 1, c]);
    // left col bottom-1 -> top+1
    for (let r = N - 2; r > 0; r--) p.push([r, 0]);
    return p;
  }, []);

  // players and tokens
  const [players, setPlayers] = useState(4);
  const [tokens, setTokens] = useState(() => {
    return Array.from({ length: 4 }).map((_, i) => ({
      id: `p${i}`,
      player: i,
      color: ["bg-red-500","bg-green-500","bg-blue-500","bg-purple-600"][i % 4],
      posIndex: 0,
    }));
  });

  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [moving, setMoving] = useState(false);
  const [dice, setDice] = useState(null);

  // Reset/create tokens when players value changes
  useEffect(() => {
    setTokens(Array.from({ length: players }).map((_, i) => ({
      id: `p${i}`,
      player: i,
      color: ["bg-red-500","bg-green-500","bg-blue-500","bg-purple-600"][i % 4],
      posIndex: 0,
    })));
    setCurrentPlayer(0);
    setDice(null);
  }, [players]);

  // Helpers
  const rollDice = () => Math.floor(Math.random()*3)+1;

  function moveTokenSteps(tokenId, steps) {
    if(moving) return;
    setMoving(true);
    let step = 0;
    const t = setInterval(() => {
      setTokens(prev => prev.map(tok => {
        if(tok.id !== tokenId) return tok;
        return { ...tok, posIndex: (tok.posIndex + 1) % path.length };
      }));
      step++;
      if(step >= steps){
        clearInterval(t);
        setMoving(false);
        setCurrentPlayer(cp => (cp+1) % players);
      }
    }, 260);
  }

  function handleRoll() {
    if(moving) return;
    const d = rollDice();
    setDice(d);
    const token = tokens.find(t=>t.player===currentPlayer);
    if(!token) return;
    moveTokenSteps(token.id, d);
  }

  function handleReset() {
    setTokens(prev => prev.map(tok => ({ ...tok, posIndex: 0 })));
    setCurrentPlayer(0);
    setDice(null);
    setMoving(false);
  }

  // compute token positions per cell for rendering inside cell
  const tokenMap = useMemo(() => {
    const map = Array.from({ length: 9 }, ()=>Array.from({ length: 9 }, ()=>[]));
    tokens.forEach(tok => {
      const [r, c] = path[tok.posIndex % path.length];
      map[r][c].push(tok);
    });
    return map;
  }, [tokens, path]);

  // small utility to render cell content (icons/placeholders)
  function renderCellContent(val){
    if(val==='W') return null;
    if(val==='BL') return <div className="text-xs font-semibold text-white">📘</div>;
    if(val==='PU') return <div className="text-xs font-semibold text-white">🟪</div>;
    if(val==='GR') return <div className="text-xs font-semibold text-white">🟩</div>;
    if(val==='OR') return <div className="text-xs font-semibold text-white">🟧</div>; // orange
    if(val==='C') return <div className="text-sm font-bold">★</div>;
    if(/^I\d+$/.test(val)) return <div className="text-xs">🔸</div>;
    return null;
  }

  function highlightCurrentPlayer(){
    tokens.forEach(t=> t.elStyle = (t.player===currentPlayer)? 'ring-4 ring-yellow-300':'');
  }

  return (
    <div className="p-4 flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold">CoderBunnyz — 9×9 Board (React + Tailwind)</h2>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2">
          Players:
          <select
            value={players}
            onChange={e=>setPlayers(Number(e.target.value))}
            className="ml-2 px-2 py-1 border rounded"
          >
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </label>

        <button
          onClick={handleRoll}
          className={`px-3 py-1 rounded font-semibold text-white ${moving?'bg-gray-400':'bg-indigo-600 hover:bg-indigo-700'}`}
          disabled={moving}
        >
          Roll Dice
        </button>

        <div className="px-3 py-1 bg-white border rounded shadow-sm">Dice: {dice ?? '-'}</div>

        <button onClick={handleReset} className="px-3 py-1 border rounded">Reset</button>

        <div className="px-3 py-1 rounded border bg-white">Turn: <span className="font-semibold">Player {currentPlayer + 1}</span></div>
      </div>

      {/* Board container */}
      <div className="relative">
        <div className="grid grid-cols-9 gap-0 w-[540px] h-[540px] border-8 border-red-600 bg-white" style={{ maxWidth:'90vw', maxHeight:'90vw' }}>
          {board.map((row,r)=>(
            row.map((cell,c)=>{
              const bg = cell==='W'?'bg-white':
                         cell==='BL'?'bg-blue-500 text-white':
                         cell==='PU'?'bg-purple-600 text-white':
                         cell==='GR'?'bg-green-600 text-white':
                         cell==='OR'?'bg-orange-500 text-white':
                         cell==='C'?'bg-yellow-200':'bg-slate-100';
              return (
                <div key={`${r}-${c}`} className={`border border-gray-200 ${bg} flex items-center justify-center relative`}>
                  <div className="absolute left-1 top-1 text-[10px] text-gray-600">{r},{c}</div>
                  <div className="flex flex-col items-center">
                    {renderCellContent(cell)}
                    <div className="flex gap-1 mt-1">
                      {tokenMap[r][c].map(tok=>(
                        <div key={tok.id} className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[12px] ${tok.color} ${tok.player===currentPlayer?'ring-4 ring-yellow-300':''}`}>
                          {tok.player+1}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })
          ))}
        </div>

        {/* Legend */}
        <div className="mt-3 flex gap-3 justify-center">
          <div className="flex items-center gap-1"><span className="w-4 h-4 bg-blue-500 inline-block"></span> Blue</div>
          <div className="flex items-center gap-1"><span className="w-4 h-4 bg-purple-600 inline-block"></span> Purple</div>
          <div className="flex items-center gap-1"><span className="w-4 h-4 bg-green-600 inline-block"></span> Green</div>
          <div className="flex items-center gap-1"><span className="w-4 h-4 bg-orange-500 inline-block"></span> Orange</div>
          <div className="flex items-center gap-1"><span className="w-4 h-4 bg-yellow-200 inline-block border"></span> Center</div>
        </div>
      </div>
    </div>
  );
}
