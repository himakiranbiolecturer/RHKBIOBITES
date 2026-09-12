import React from 'react';
import { DiagramData } from '../types';

interface DiagramViewerProps {
  diagram: DiagramData;
}

export const DiagramViewer: React.FC<DiagramViewerProps> = ({ diagram }) => {
  const renderVisual = () => {
    switch (diagram.type) {
      case 'dna':
        return (
          <div className="relative w-full h-44 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 rounded-xl p-3 flex flex-col justify-between overflow-hidden border border-emerald-800/40 shadow-inner">
            {/* Background DNA wave grid */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-300 z-10">
              <span className="flex items-center gap-1.5 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-700/50">
                <i className="fa-solid fa-dna text-emerald-400"></i> Watson-Crick B-DNA Model
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Diameter: 2.0 nm | Pitch: 3.4 nm</span>
            </div>

            {/* SVG Representation of DNA Double Helix */}
            <div className="relative my-auto h-24 flex items-center justify-center">
              <svg className="w-full h-full max-w-md" viewBox="0 0 400 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* 5' and 3' Strands */}
                <path d="M 10 40 Q 60 10, 110 40 T 210 40 T 310 40 T 390 40" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 10 40 Q 60 70, 110 40 T 210 40 T 310 40 T 390 40" stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" />
                
                {/* Base Pair Rungs with H-Bonds */}
                {/* Pair 1: A = T */}
                <line x1="60" y1="20" x2="60" y2="60" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="3 2" />
                <text x="60" y="72" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">A = T (2H)</text>

                {/* Pair 2: G ≡ C */}
                <line x1="160" y1="20" x2="160" y2="60" stroke="#60a5fa" strokeWidth="2.5" strokeDasharray="2 1" />
                <text x="160" y="72" fill="#60a5fa" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">G ≡ C (3H)</text>

                {/* Pair 3: T = A */}
                <line x1="260" y1="20" x2="260" y2="60" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="3 2" />
                <text x="260" y="72" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">T = A (2H)</text>

                {/* Pair 4: C ≡ G */}
                <line x1="340" y1="25" x2="340" y2="55" stroke="#60a5fa" strokeWidth="2.5" strokeDasharray="2 1" />
                <text x="340" y="72" fill="#60a5fa" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">C ≡ G (3H)</text>

                {/* Distance dimension indicators */}
                <line x1="10" y1="12" x2="110" y2="12" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
                <text x="60" y="10" fill="#94a3b8" fontSize="8" textAnchor="middle">1 Turn: 3.4 nm (~10 bp)</text>
              </svg>
            </div>

            {/* Labels Bar */}
            <div className="flex flex-wrap items-center justify-between gap-1 pt-1 border-t border-slate-800 text-[11px] text-slate-300">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span> 5&apos; \u2192 3&apos; Polarity</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span> Purines (A, G)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400 inline-block"></span> Pyrimidines (T, C)</span>
              <span className="text-emerald-400 font-mono text-[10px]">0.34 nm between bp</span>
            </div>
          </div>
        );

      case 'nucleosome':
        return (
          <div className="relative w-full h-44 bg-gradient-to-br from-slate-900 to-emerald-950/60 rounded-xl p-3 flex flex-col justify-between overflow-hidden border border-emerald-800/40">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
              <span className="flex items-center gap-1.5"><i className="fa-solid fa-circle-nodes text-emerald-400"></i> Nucleosome Core Structure</span>
              <span className="text-[11px] text-amber-300 font-mono">200 bp total DNA wrap</span>
            </div>

            <div className="relative my-auto h-24 flex items-center justify-center">
              <svg className="w-full h-full max-w-sm" viewBox="0 0 320 80" fill="none">
                {/* Histone Octamer Core Cylinder */}
                <ellipse cx="160" cy="42" rx="45" ry="24" fill="#047857" stroke="#34d399" strokeWidth="2" />
                <ellipse cx="160" cy="36" rx="45" ry="24" fill="#065f46" stroke="#10b981" strokeWidth="1.5" />
                <text x="160" y="38" fill="#ecfdf5" fontSize="11" fontWeight="bold" textAnchor="middle">Histone Octamer</text>
                <text x="160" y="49" fill="#a7f3d0" fontSize="8" textAnchor="middle">(H2A, H2B, H3, H4) × 2</text>

                {/* DNA Loop wrapping 1.75 times */}
                <path d="M 40 45 C 90 85, 230 85, 270 45" stroke="#38bdf8" strokeWidth="3.5" fill="none" />
                <path d="M 50 25 C 100 -5, 220 -5, 260 25" stroke="#38bdf8" strokeWidth="3.5" fill="none" strokeDasharray="4 2" />

                {/* H1 Linker Histone */}
                <rect x="75" y="28" width="18" height="28" rx="4" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
                <text x="84" y="46" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">H1</text>
              </svg>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px] text-slate-300">
              <span className="text-amber-400 font-medium">H1 Linker Histone (External)</span>
              <span className="text-emerald-300">Core: 146 bp + Linker = ~200 bp</span>
              <span className="text-slate-400">Positively charged (Lys/Arg)</span>
            </div>
          </div>
        );

      case 'glycolysis':
        return (
          <div className="relative w-full h-44 bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl p-3 flex flex-col justify-between overflow-hidden border border-emerald-800/40">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
              <span className="flex items-center gap-1.5"><i className="fa-solid fa-arrows-split-up-and-left text-emerald-400"></i> EMP Pathway Checkpoints</span>
              <span className="text-[11px] text-emerald-400 font-mono">Net Yield: 2 ATP + 2 NADH</span>
            </div>

            <div className="grid grid-cols-5 gap-1.5 my-auto text-center">
              <div className="bg-emerald-950/70 border border-emerald-800/60 rounded p-1.5">
                <div className="text-[10px] text-slate-400">Substrate</div>
                <div className="text-xs font-bold text-white">Glucose (6C)</div>
                <span className="inline-block mt-1 text-[9px] bg-rose-950 text-rose-300 px-1 rounded border border-rose-800/40">-1 ATP</span>
              </div>
              <div className="flex items-center justify-center text-slate-500 text-xs">→</div>
              <div className="bg-emerald-950/70 border border-amber-600/50 rounded p-1.5">
                <div className="text-[10px] text-amber-300 font-medium">Pacemaker Step</div>
                <div className="text-xs font-bold text-white">F-1,6-BP (6C)</div>
                <span className="inline-block mt-1 text-[9px] bg-rose-950 text-rose-300 px-1 rounded border border-rose-800/40">-1 ATP (PFK-1)</span>
              </div>
              <div className="flex items-center justify-center text-slate-500 text-xs">→</div>
              <div className="bg-emerald-950/70 border border-emerald-500/50 rounded p-1.5">
                <div className="text-[10px] text-emerald-300">Payoff (×2)</div>
                <div className="text-xs font-bold text-white">2 Pyruvate (3C)</div>
                <span className="inline-block mt-1 text-[9px] bg-emerald-900 text-emerald-200 px-1 rounded border border-emerald-600">+4 ATP, +2 NADH</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px] text-slate-300">
              <span className="text-rose-400">Energy Invested: 2 ATP</span>
              <span className="text-emerald-400 font-bold">Gross: 4 ATP | Net Gain: 2 ATP</span>
              <span className="text-blue-400">Site: Cytoplasm (Anaerobic)</span>
            </div>
          </div>
        );

      case 'nephron':
        return (
          <div className="relative w-full h-44 bg-gradient-to-br from-slate-900 to-emerald-950/70 rounded-xl p-3 flex flex-col justify-between overflow-hidden border border-emerald-800/40">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
              <span className="flex items-center gap-1.5"><i className="fa-solid fa-filter text-emerald-400"></i> Renal Ultrafiltration & Podocytes</span>
              <span className="text-[11px] text-emerald-400 font-mono">GFR = 125 mL/min (180 L/day)</span>
            </div>

            <div className="relative my-auto flex items-center justify-around">
              <div className="bg-slate-800/90 border border-slate-700 rounded-lg p-2 text-center max-w-[120px]">
                <span className="text-[10px] text-rose-400 font-semibold block">Afferent (Wider)</span>
                <span className="text-[9px] text-slate-300 block">High hydrostatic pressure (~60 mmHg)</span>
              </div>
              <div className="text-emerald-400 font-mono font-bold text-sm">➔</div>
              <div className="bg-emerald-900/60 border border-emerald-500/60 rounded-lg p-2 text-center max-w-[140px]">
                <span className="text-xs font-bold text-white block">Glomerular Slits</span>
                <span className="text-[9px] text-emerald-200 block">Podocyte pedicels leave 25 nm filtration slits</span>
              </div>
              <div className="text-emerald-400 font-mono font-bold text-sm">➔</div>
              <div className="bg-slate-800/90 border border-slate-700 rounded-lg p-2 text-center max-w-[120px]">
                <span className="text-[10px] text-amber-400 font-semibold block">PCT Reabsorption</span>
                <span className="text-[9px] text-slate-300 block">70-80% electrolytes, 100% glucose</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px] text-slate-300">
              <span className="text-slate-400">Glomerular Filtrate = Protein-free plasma</span>
              <span className="text-emerald-400 font-semibold">99% Reabsorbed (1.5 L excreted)</span>
            </div>
          </div>
        );

      case 'counterCurrent':
        return (
          <div className="relative w-full h-44 bg-gradient-to-br from-slate-900 to-indigo-950/60 rounded-xl p-3 flex flex-col justify-between overflow-hidden border border-emerald-800/40">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
              <span className="flex items-center gap-1.5"><i className="fa-solid fa-arrows-up-down text-emerald-400"></i> Counter-Current Multiplier & Exchanger</span>
              <span className="text-[11px] text-indigo-300 font-mono">Gradient: 300 → 1200 mOsm/L</span>
            </div>

            <div className="grid grid-cols-3 gap-2 my-auto text-center">
              <div className="bg-blue-950/60 border border-blue-800/60 rounded-lg p-2">
                <span className="text-[10px] text-blue-300 font-bold block">Descending Limb</span>
                <span className="text-xs text-white block mt-0.5 font-medium">Permeable to H₂O</span>
                <span className="text-[9px] text-slate-400 block mt-1">Water exits; filtrate concentrates</span>
              </div>
              <div className="bg-indigo-950/80 border border-indigo-700/60 rounded-lg p-2 flex flex-col justify-center">
                <span className="text-[10px] text-indigo-300 block font-semibold">Hairpin Tip</span>
                <span className="text-sm font-bold text-amber-300 font-mono">1200 mOsm/L</span>
                <span className="text-[9px] text-slate-400">4× plasma osmolarity</span>
              </div>
              <div className="bg-emerald-950/60 border border-emerald-800/60 rounded-lg p-2">
                <span className="text-[10px] text-emerald-300 font-bold block">Ascending Limb</span>
                <span className="text-xs text-white block mt-0.5 font-medium">Impermeable to H₂O</span>
                <span className="text-[9px] text-slate-400 block mt-1">NaCl pumped out actively/passively</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px] text-slate-300">
              <span className="text-slate-400">Multiplier: Loop of Henle</span>
              <span className="text-slate-400">Exchanger: Vasa Recta</span>
              <span className="text-emerald-400">Recycled: Urea & NaCl</span>
            </div>
          </div>
        );

      case 'lacOperon':
        return (
          <div className="relative w-full h-44 bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl p-3 flex flex-col justify-between overflow-hidden border border-emerald-800/40">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
              <span className="flex items-center gap-1.5"><i className="fa-solid fa-toggle-on text-emerald-400"></i> Lac Operon Genetic Architecture</span>
              <span className="text-[11px] text-amber-300 font-mono">Negative Inducible Control</span>
            </div>

            <div className="my-auto">
              <div className="flex items-center justify-center gap-1 text-center font-mono">
                <div className="bg-purple-950 border border-purple-700 text-purple-200 px-2.5 py-1.5 rounded text-xs font-bold">
                  i gene
                  <span className="block text-[8px] font-sans text-purple-300">Repressor</span>
                </div>
                <div className="text-slate-600 text-xs">—</div>
                <div className="bg-slate-800 border border-slate-700 text-slate-300 px-2 py-1.5 rounded text-xs font-bold">
                  p
                  <span className="block text-[8px] font-sans text-slate-400">Promoter</span>
                </div>
                <div className="text-slate-600 text-xs">—</div>
                <div className="bg-amber-950 border border-amber-700 text-amber-200 px-2 py-1.5 rounded text-xs font-bold">
                  o
                  <span className="block text-[8px] font-sans text-amber-300">Operator</span>
                </div>
                <div className="text-slate-600 text-xs">—</div>
                <div className="bg-emerald-950 border border-emerald-700 text-emerald-200 px-2.5 py-1.5 rounded text-xs font-bold">
                  z
                  <span className="block text-[8px] font-sans text-emerald-300">β-gal</span>
                </div>
                <div className="text-slate-600 text-xs">—</div>
                <div className="bg-emerald-950 border border-emerald-700 text-emerald-200 px-2 py-1.5 rounded text-xs font-bold">
                  y
                  <span className="block text-[8px] font-sans text-emerald-300">Permease</span>
                </div>
                <div className="text-slate-600 text-xs">—</div>
                <div className="bg-emerald-950 border border-emerald-700 text-emerald-200 px-2 py-1.5 rounded text-xs font-bold">
                  a
                  <span className="block text-[8px] font-sans text-emerald-300">Transacetylase</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px] text-slate-300">
              <span className="text-amber-400">Inducer: Allolactose</span>
              <span className="text-emerald-400">z: Lactose → Glucose + Galactose</span>
              <span className="text-slate-400">Basal expression always needed</span>
            </div>
          </div>
        );

      case 'dihybrid':
        return (
          <div className="relative w-full h-44 bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl p-3 flex flex-col justify-between overflow-hidden border border-emerald-800/40">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
              <span className="flex items-center gap-1.5"><i className="fa-solid fa-table-cells text-emerald-400"></i> F₂ Phenotypic Distribution (16 Offspring)</span>
              <span className="text-[11px] text-emerald-400 font-mono">Ratio: 9 : 3 : 3 : 1</span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 my-auto text-center text-xs">
              <div className="bg-amber-950/70 border border-amber-500/60 rounded p-1.5">
                <div className="text-sm font-bold text-amber-300">9/16</div>
                <div className="text-[10px] text-slate-200 font-medium">Round Yellow</div>
                <div className="text-[8px] text-slate-400 font-mono">R_Y_ (Parental)</div>
              </div>
              <div className="bg-emerald-950/70 border border-emerald-500/60 rounded p-1.5">
                <div className="text-sm font-bold text-emerald-300">3/16</div>
                <div className="text-[10px] text-slate-200 font-medium">Round Green</div>
                <div className="text-[8px] text-emerald-400 font-mono">R_yy (Recomb)</div>
              </div>
              <div className="bg-emerald-950/70 border border-emerald-500/60 rounded p-1.5">
                <div className="text-sm font-bold text-emerald-300">3/16</div>
                <div className="text-[10px] text-slate-200 font-medium">Wrinkled Yellow</div>
                <div className="text-[8px] text-emerald-400 font-mono">rrY_ (Recomb)</div>
              </div>
              <div className="bg-slate-800/70 border border-slate-600 rounded p-1.5">
                <div className="text-sm font-bold text-slate-200">1/16</div>
                <div className="text-[10px] text-slate-300 font-medium">Wrinkled Green</div>
                <div className="text-[8px] text-slate-400 font-mono">rryy (Recessive)</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px] text-slate-300">
              <span className="text-amber-400">Parentals: 10/16 (62.5%)</span>
              <span className="text-emerald-400 font-semibold">Recombinants: 6/16 (37.5%)</span>
              <span className="text-slate-400">Test Cross = 1:1:1:1</span>
            </div>
          </div>
        );

      case 'breathing':
        return (
          <div className="relative w-full h-48 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/70 rounded-xl p-3 flex flex-col justify-between overflow-hidden border border-emerald-800/40">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-lungs text-emerald-400"></i> Alveolar Diffusion Membrane &amp; O₂ Dissociation
              </span>
              <span className="text-[11px] text-cyan-300 font-mono">Membrane: &lt; 1 mm (0.2-0.5 µm)</span>
            </div>

            <div className="relative my-auto flex items-center justify-between gap-2 px-1">
              {/* Alveolar Cavity */}
              <div className="flex-1 bg-cyan-950/50 border border-cyan-500/40 rounded-lg p-2 text-center">
                <span className="text-[10px] text-cyan-300 font-bold block uppercase tracking-wider">Alveolar Air</span>
                <div className="flex justify-center gap-3 mt-1 text-xs font-mono font-bold">
                  <span className="text-emerald-400">pO₂: 104</span>
                  <span className="text-rose-400">pCO₂: 40</span>
                </div>
                <span className="text-[9px] text-slate-400 block mt-0.5">mmHg</span>
              </div>

              {/* 3-Layer Diffusion Barrier */}
              <div className="px-2 py-1.5 bg-slate-800/80 border border-slate-600 rounded text-center shrink-0">
                <span className="text-[9px] text-amber-300 font-bold block">3-Layer Diffusion Barrier</span>
                <div className="text-[8px] text-slate-300 space-y-0.5 mt-0.5 leading-tight text-left">
                  <div>1. Squamous alveolar epithelium</div>
                  <div>2. Acellular basement substance</div>
                  <div>3. Capillary endothelium</div>
                </div>
                <span className="text-[9px] text-emerald-300 font-bold block mt-1">O₂ → | ← CO₂ (20-25× faster)</span>
              </div>

              {/* Pulmonary Capillary Blood */}
              <div className="flex-1 bg-rose-950/50 border border-rose-500/40 rounded-lg p-2 text-center">
                <span className="text-[10px] text-rose-300 font-bold block uppercase tracking-wider">Capillary Blood</span>
                <div className="flex justify-center gap-3 mt-1 text-xs font-mono font-bold">
                  <span className="text-emerald-400">pO₂: 40 → 95</span>
                  <span className="text-rose-400">pCO₂: 45 → 40</span>
                </div>
                <span className="text-[9px] text-slate-400 block mt-0.5">Deoxy → Oxygenated</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px] text-slate-300">
              <span className="text-emerald-300">Sigmoid Curve: 100 mL blood delivers 5 mL O₂ to tissues</span>
              <span className="text-amber-300">Shift Right (Dissociation): High pCO₂, High H⁺ (Low pH), High Temp</span>
            </div>
          </div>
        );

      case 'cardiac':
        return (
          <div className="relative w-full h-48 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-xl p-3 flex flex-col justify-between overflow-hidden border border-emerald-800/40">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-heart-pulse text-rose-500"></i> Standard Electrocardiogram (ECG) &amp; Nodal Conduction
              </span>
              <span className="text-[11px] text-emerald-400 font-mono">Cardiac Cycle: 0.8 sec (72 bpm)</span>
            </div>

            {/* SVG ECG Waveform */}
            <div className="relative my-auto h-24 flex items-center justify-center">
              <svg className="w-full h-full max-w-lg" viewBox="0 0 450 90" fill="none">
                {/* Baseline grid */}
                <line x1="0" y1="50" x2="450" y2="50" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />

                {/* Heartbeat trace */}
                <path
                  d="M 10 50 L 50 50 Q 75 30, 100 50 L 125 50 L 135 60 L 150 10 L 165 72 L 175 50 L 210 50 Q 240 25, 270 50 L 320 50 Q 345 30, 370 50 L 395 50 L 405 60 L 420 10 L 435 72 L 445 50"
                  stroke="#ef4444"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* P Wave annotation */}
                <circle cx="75" cy="40" r="4" fill="#3b82f6" />
                <text x="75" y="24" fill="#60a5fa" fontSize="10" fontWeight="bold" textAnchor="middle">P Wave</text>
                <text x="75" y="80" fill="#94a3b8" fontSize="8" textAnchor="middle">Atrial Depol</text>

                {/* QRS Complex annotation */}
                <circle cx="150" cy="12" r="4" fill="#10b981" />
                <text x="150" y="8" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">QRS Complex</text>
                <text x="150" y="86" fill="#94a3b8" fontSize="8" textAnchor="middle">Ventricular Depol</text>

                {/* T Wave annotation */}
                <circle cx="240" cy="38" r="4" fill="#f59e0b" />
                <text x="240" y="24" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">T Wave</text>
                <text x="240" y="80" fill="#94a3b8" fontSize="8" textAnchor="middle">Ventricular Repol</text>
              </svg>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px] text-slate-300">
              <span className="text-blue-400">SAN (72/min) → AVN → Bundle of His → Purkinje</span>
              <span className="text-amber-400">Lub = Tricuspid/Bicuspid close; Dub = Semilunar close</span>
            </div>
          </div>
        );

      case 'sarcomere':
        return (
          <div className="relative w-full h-48 bg-gradient-to-br from-slate-900 to-emerald-950/70 rounded-xl p-3 flex flex-col justify-between overflow-hidden border border-emerald-800/40">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-arrows-left-right text-emerald-400"></i> Sarcomere Architecture &amp; Sliding Filament
              </span>
              <span className="text-[11px] text-amber-300 font-mono">Rule: A-Band length is CONSTANT</span>
            </div>

            <div className="relative my-auto flex flex-col gap-2">
              {/* Relaxed state schematic */}
              <div className="bg-slate-800/90 rounded-lg p-2 border border-slate-700">
                <div className="flex items-center justify-between text-[10px] text-slate-300 font-mono mb-1">
                  <span className="text-cyan-400 font-bold">Z-Line</span>
                  <span className="text-emerald-300">I-Band (Thin Actin)</span>
                  <span className="text-rose-300 font-bold bg-rose-950/80 px-2 rounded border border-rose-700">
                    A-Band (Thick Myosin + Actin Overlap)
                  </span>
                  <span className="text-amber-300">H-Zone (Myosin only)</span>
                  <span className="text-cyan-400 font-bold">Z-Line</span>
                </div>
                {/* SVG representation of filament sliding */}
                <div className="h-7 w-full flex items-center justify-between px-2 bg-slate-950/60 rounded">
                  <div className="w-1.5 h-6 bg-cyan-400 rounded-full"></div>
                  <div className="flex-1 flex items-center justify-center gap-1 px-2">
                    <div className="h-1 bg-emerald-400 w-1/4 rounded"></div>
                    <div className="h-2.5 bg-rose-500 w-2/5 rounded relative flex items-center justify-center">
                      <div className="h-1.5 w-1/3 bg-amber-400/80 rounded"></div>
                    </div>
                    <div className="h-1 bg-emerald-400 w-1/4 rounded"></div>
                  </div>
                  <div className="w-1.5 h-6 bg-cyan-400 rounded-full"></div>
                </div>
              </div>

              {/* Status on contraction */}
              <div className="flex items-center justify-between text-[10px] px-2 py-1 bg-emerald-950/50 border border-emerald-800/60 rounded text-emerald-200">
                <span className="font-semibold text-amber-300">Contraction Trigger: Ca²⁺ binds Troponin-C</span>
                <span>I-band shortens ↓</span>
                <span>H-zone disappears ↓</span>
                <span className="font-bold text-white bg-emerald-800 px-1.5 py-0.5 rounded">A-band = NO CHANGE</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px] text-slate-300">
              <span className="text-cyan-300">Sarcomere = Region between two successive Z-lines</span>
              <span className="text-amber-300">Myosin head has ATPase &amp; Actin-binding active sites</span>
            </div>
          </div>
        );

      case 'neural':
        return (
          <div className="relative w-full h-48 bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl p-3 flex flex-col justify-between overflow-hidden border border-emerald-800/40">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-bolt text-amber-400"></i> Axon Membrane Potential &amp; Ion Gradients
              </span>
              <span className="text-[11px] text-emerald-400 font-mono">Resting: -70 mV → Action: +30 mV</span>
            </div>

            <div className="relative my-auto flex items-center justify-between gap-3">
              {/* Resting state card */}
              <div className="flex-1 bg-slate-800/90 rounded-lg p-2.5 border border-slate-700 text-center">
                <span className="text-[10px] text-emerald-300 font-bold block uppercase">Resting State (-70 mV)</span>
                <div className="text-[10px] text-slate-300 space-y-1 mt-1 text-left">
                  <div className="flex justify-between"><span>Extracellular:</span> <strong className="text-amber-300">High Na⁺, Low K⁺ (+)</strong></div>
                  <div className="flex justify-between"><span>Intracellular:</span> <strong className="text-cyan-300">High K⁺, -ve proteins (-)</strong></div>
                  <div className="text-[9px] text-emerald-400 font-mono bg-slate-900/90 p-1 rounded mt-1 text-center">
                    Na⁺/K⁺ Pump: 3 Na⁺ OUT / 2 K⁺ IN
                  </div>
                </div>
              </div>

              {/* Depolarisation / Spike card */}
              <div className="flex-1 bg-amber-950/40 rounded-lg p-2.5 border border-amber-600/40 text-center">
                <span className="text-[10px] text-amber-300 font-bold block uppercase">Action Potential (+30 mV)</span>
                <div className="text-[10px] text-slate-300 space-y-1 mt-1 text-left">
                  <div className="flex justify-between"><span>Stimulus:</span> <span className="text-rose-400 font-bold">Voltage Na⁺ gates OPEN</span></div>
                  <div className="flex justify-between"><span>Depolarisation:</span> <span className="text-amber-300 font-bold">Rapid Influx of Na⁺</span></div>
                  <div className="text-[9px] text-cyan-300 font-mono bg-slate-900/90 p-1 rounded mt-1 text-center">
                    Repolarisation: K⁺ Efflux restores -70 mV
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px] text-slate-300">
              <span className="text-amber-300">Resting membrane is freely permeable to K⁺, impermeable to Na⁺</span>
              <span className="text-emerald-300">Saltatory conduction in myelinated axons at Nodes of Ranvier</span>
            </div>
          </div>
        );

      case 'hormone':
        return (
          <div className="relative w-full h-48 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/70 rounded-xl p-3 flex flex-col justify-between overflow-hidden border border-emerald-800/40">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-vial-virus text-emerald-400"></i> Dual Mechanism of Hormone Action
              </span>
              <span className="text-[11px] text-cyan-300 font-mono">Peptide vs Steroid / Thyroid</span>
            </div>

            <div className="relative my-auto flex items-center justify-between gap-3">
              {/* Membrane Bound (Peptide) */}
              <div className="flex-1 bg-cyan-950/40 border border-cyan-500/40 rounded-lg p-2 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-cyan-300">1. Membrane-Bound Receptor</span>
                  <span className="text-[9px] text-cyan-400 bg-cyan-900/60 px-1 rounded">Peptide/Protein</span>
                </div>
                <div className="text-[9px] text-slate-300 mt-1 space-y-0.5 font-mono">
                  <div>• Hormone (e.g. FSH, Insulin, Glucagon)</div>
                  <div>• Binds cell surface receptor</div>
                  <div>• Generates <strong className="text-amber-300">cAMP / IP₃ / Ca²⁺ (2nd Messengers)</strong></div>
                  <div>• Cascades enzyme / metabolic response</div>
                </div>
              </div>

              {/* Intracellular (Steroid) */}
              <div className="flex-1 bg-emerald-950/40 border border-emerald-500/40 rounded-lg p-2 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-300">2. Intracellular Nuclear Receptor</span>
                  <span className="text-[9px] text-emerald-400 bg-emerald-900/60 px-1 rounded">Steroid/Thyroid</span>
                </div>
                <div className="text-[9px] text-slate-300 mt-1 space-y-0.5 font-mono">
                  <div>• Steroids (Estrogen, Cortisol) &amp; Thyroid (T₃, T₄)</div>
                  <div>• Crosses lipid membrane directly</div>
                  <div>• Forms <strong className="text-emerald-300">Hormone-Receptor Complex</strong></div>
                  <div>• Regulates DNA gene expression &amp; mRNA</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px] text-slate-300">
              <span className="text-cyan-300">Peptides DO NOT enter cell (act via 2nd messengers)</span>
              <span className="text-emerald-300">Steroids &amp; Iodothyronines alter genome transcription directly</span>
            </div>
          </div>
        );

      case 'cellStructure':
        return (
          <div className="relative w-full h-48 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/70 rounded-xl p-3 flex flex-col justify-between overflow-hidden border border-emerald-800/40">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-shapes text-emerald-400"></i> Fluid Mosaic Membrane &amp; Ribosome Sedimentation
              </span>
              <span className="text-[11px] text-cyan-300 font-mono">Singer &amp; Nicolson (1972)</span>
            </div>

            <div className="relative my-auto flex items-center justify-between gap-3">
              {/* Membrane Architecture Schematic */}
              <div className="flex-1 bg-slate-800/80 border border-slate-700 rounded-lg p-2 text-center">
                <div className="flex justify-between items-center text-[10px] text-slate-300 mb-1 font-semibold">
                  <span className="text-cyan-300">Phospholipid Bilayer</span>
                  <span className="text-amber-300">Quasi-Fluid Matrix</span>
                </div>
                {/* SVG Bilayer representation */}
                <div className="h-10 w-full flex items-center justify-center gap-1 bg-slate-950/70 rounded px-2">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
                    <div className="w-0.5 h-3 bg-cyan-600"></div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
                    <div className="w-0.5 h-3 bg-cyan-600"></div>
                  </div>
                  {/* Integral Protein */}
                  <div className="h-8 w-8 bg-gradient-to-b from-emerald-500 to-teal-700 rounded text-[8px] font-bold flex items-center justify-center text-white shadow">
                    Integral
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
                    <div className="w-0.5 h-3 bg-cyan-600"></div>
                  </div>
                  {/* Peripheral Protein */}
                  <div className="h-4 w-6 bg-amber-500/80 rounded text-[7px] font-bold flex items-center justify-center text-slate-900 self-start">
                    Periph
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
                    <div className="w-0.5 h-3 bg-cyan-600"></div>
                  </div>
                </div>
                <span className="text-[9px] text-slate-400 block mt-1">Hydrophobic tails tucked away from aqueous phase</span>
              </div>

              {/* Ribosomes & Organelles */}
              <div className="flex-1 bg-emerald-950/40 border border-emerald-600/40 rounded-lg p-2 text-left space-y-1">
                <span className="text-[10px] font-bold text-emerald-300 block">Sedimentation Units (Svedberg 'S')</span>
                <div className="text-[9px] text-slate-300 space-y-0.5 font-mono">
                  <div className="flex justify-between">
                    <span className="text-cyan-300">Prokaryotes / Plastids:</span>
                    <strong className="text-white">70S (50S + 30S)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300">Eukaryotes Cytoplasm:</span>
                    <strong className="text-white">80S (60S + 40S)</strong>
                  </div>
                  <div className="pt-0.5 text-[8px] text-amber-300 leading-tight">
                    Endomembrane: ER + Golgi + Lysosomes + Vacuoles (Coordinated)
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px] text-slate-300">
              <span className="text-cyan-300">Mitochondria &amp; Chloroplasts are semi-autonomous (have 70S + circular DNA)</span>
              <span className="text-emerald-300">Lipid:Protein ratio in human RBC = 40% Lipid, 52% Protein</span>
            </div>
          </div>
        );

      case 'biomolecules':
        return (
          <div className="relative w-full h-48 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-xl p-3 flex flex-col justify-between overflow-hidden border border-emerald-800/40">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-atom text-emerald-400"></i> Enzyme Kinetics &amp; Competitive Inhibition
              </span>
              <span className="text-[11px] text-amber-300 font-mono">Succinate vs Malonate</span>
            </div>

            <div className="relative my-auto flex items-center justify-between gap-3">
              {/* Competitive Inhibition visual */}
              <div className="flex-1 bg-slate-800/90 border border-slate-700 rounded-lg p-2 text-center">
                <span className="text-[10px] font-bold text-amber-300 block mb-1">Competitive Inhibitor Dynamics</span>
                <div className="grid grid-cols-2 gap-1.5 text-[9px] text-left">
                  <div className="bg-emerald-950/60 p-1 rounded border border-emerald-700/50">
                    <strong className="text-emerald-300 block">Substrate:</strong>
                    <span>Succinate → Binds active site of Dehydrogenase</span>
                  </div>
                  <div className="bg-rose-950/60 p-1 rounded border border-rose-700/50">
                    <strong className="text-rose-300 block">Inhibitor:</strong>
                    <span>Malonate → Resembles succinate, blocks site</span>
                  </div>
                </div>
                <div className="text-[9px] text-cyan-300 font-mono mt-1 bg-slate-900/80 py-0.5 rounded">
                  Reversible by increasing [Substrate] conc.
                </div>
              </div>

              {/* Kinetic Outcome */}
              <div className="flex-1 bg-cyan-950/40 border border-cyan-500/40 rounded-lg p-2 text-left space-y-1">
                <span className="text-[10px] font-bold text-cyan-300 block">Michaelis-Menten Kinetic Impact</span>
                <div className="text-[9px] text-slate-300 space-y-1 font-mono">
                  <div className="flex justify-between items-center bg-slate-900/80 px-2 py-1 rounded">
                    <span>Vmax (Max Velocity):</span>
                    <strong className="text-emerald-400">UNCHANGED</strong>
                  </div>
                  <div className="flex justify-between items-center bg-slate-900/80 px-2 py-1 rounded">
                    <span>Km (Affinity Constant):</span>
                    <strong className="text-rose-400">INCREASES (Lower affinity)</strong>
                  </div>
                  <div className="text-[8px] text-amber-300">
                    Bonds: Peptide (-CO-NH-), Glycosidic (C-O-C), Phosphodiester (3'-5')
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px] text-slate-300">
              <span className="text-emerald-300">Enzymes lower Activation Energy barrier without altering equilibrium</span>
              <span className="text-amber-300">Cofactor = Prosthetic group (tight/heme) vs Co-enzyme (NAD/vitamins)</span>
            </div>
          </div>
        );

      case 'cellCycle':
        return (
          <div className="relative w-full h-48 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/70 rounded-xl p-3 flex flex-col justify-between overflow-hidden border border-emerald-800/40">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-arrows-spin text-emerald-400"></i> Cell Cycle Phases &amp; Meiosis I Prophase Hotspots
              </span>
              <span className="text-[11px] text-cyan-300 font-mono">Interphase (~95% duration)</span>
            </div>

            <div className="relative my-auto flex flex-col gap-2">
              {/* Cycle Phases Flow */}
              <div className="flex items-center justify-between gap-1 text-center font-mono">
                <div className="flex-1 bg-cyan-950/60 border border-cyan-600/40 rounded p-1">
                  <span className="text-[10px] font-bold text-cyan-300 block">G₁ Phase</span>
                  <span className="text-[8px] text-slate-300">Metabolically active, RNA/protein synth</span>
                </div>
                <div className="text-slate-500 text-xs">→</div>
                <div className="flex-1 bg-emerald-950/80 border border-emerald-500 rounded p-1">
                  <span className="text-[10px] font-bold text-emerald-300 block">S Phase (DNA)</span>
                  <span className="text-[8px] text-white font-semibold">DNA: 2C → 4C | Chr: 2n (same!)</span>
                </div>
                <div className="text-slate-500 text-xs">→</div>
                <div className="flex-1 bg-slate-800/80 border border-slate-600 rounded p-1">
                  <span className="text-[10px] font-bold text-slate-200 block">G₂ Phase</span>
                  <span className="text-[8px] text-slate-300">Tubulin/protein for spindle</span>
                </div>
                <div className="text-slate-500 text-xs">→</div>
                <div className="flex-1 bg-rose-950/70 border border-rose-600/50 rounded p-1">
                  <span className="text-[10px] font-bold text-rose-300 block">M Phase</span>
                  <span className="text-[8px] text-rose-200">Equational / Reductional</span>
                </div>
              </div>

              {/* Meiosis I Prophase stages mnemonic bar */}
              <div className="flex items-center justify-between text-[9px] px-2 py-1 bg-slate-900/90 border border-slate-700 rounded text-slate-300">
                <span className="text-amber-400 font-bold">Prophase I:</span>
                <span className="text-slate-300">1. Leptotene (Compaction)</span>
                <span className="text-cyan-300">2. Zygotene (Synapsis / Synaptonemal)</span>
                <span className="text-emerald-300 font-bold bg-emerald-950 px-1 rounded border border-emerald-700">3. Pachytene (Crossing over via Recombinase)</span>
                <span className="text-rose-300">4. Diplotene (Chiasmata)</span>
                <span className="text-amber-300">5. Diakinesis (Terminalisation)</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px] text-slate-300">
              <span className="text-cyan-300">G₀ Quiescent Stage: Cells remain metabolically active but do not proliferate</span>
              <span className="text-emerald-300">Centriole duplicates in CYTOPLASM during S-phase</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="relative w-full h-44 bg-gradient-to-br from-slate-900 to-emerald-950/70 rounded-xl p-3 flex flex-col justify-between overflow-hidden border border-emerald-800/40">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
              <span className="flex items-center gap-1.5"><i className="fa-solid fa-chart-line text-emerald-400"></i> DDT Biomagnification Gradient</span>
              <span className="text-[11px] text-rose-400 font-mono">Amplification: ×8.3 Million</span>
            </div>

            <div className="flex items-center justify-between my-auto gap-1 text-center">
              <div className="bg-slate-800/80 px-2 py-1 rounded text-[10px]">
                <span className="text-slate-400 block">Water</span>
                <span className="font-mono text-cyan-400 font-bold">0.003 ppb</span>
              </div>
              <span className="text-slate-600">→</span>
              <div className="bg-slate-800/80 px-2 py-1 rounded text-[10px]">
                <span className="text-slate-400 block">Zooplankton</span>
                <span className="font-mono text-cyan-300 font-bold">0.04 ppm</span>
              </div>
              <span className="text-slate-600">→</span>
              <div className="bg-slate-800/80 px-2 py-1 rounded text-[10px]">
                <span className="text-slate-400 block">Small Fish</span>
                <span className="font-mono text-amber-400 font-bold">0.5 ppm</span>
              </div>
              <span className="text-slate-600">→</span>
              <div className="bg-rose-950/80 border border-rose-700 px-2 py-1 rounded text-[10px]">
                <span className="text-rose-300 font-bold block">Fish Birds</span>
                <span className="font-mono text-rose-400 font-bold">25 ppm</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px] text-slate-300">
              <span className="text-rose-400 font-medium">Pathology: Disturbed Ca²⁺ metabolism → Eggshell thinning</span>
              <span className="text-slate-400">Lipid-soluble toxicant</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="my-3">
      {renderVisual()}
      <p className="mt-1.5 text-xs text-slate-500 italic flex items-center gap-1.5">
        <i className="fa-solid fa-magnifying-glass-plus text-emerald-600"></i>
        <span>{diagram.caption}</span>
      </p>
    </div>
  );
};
