import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  BANK_SOAL, 
  BankSoalManager, 
  Soal 
} from './data/bank_soal';
import { sound } from './utils/audio';
import { 
  MazeGenerator, 
  MAZE_LEVELS, 
  MazeData 
} from './core/maze';
import { 
  BuzzerReferee, 
  bindInteractiveButton 
} from './utils/pointer';
import { 
  Volume2, 
  VolumeX, 
  Home, 
  RotateCcw, 
  Award, 
  Sparkles, 
  Zap, 
  Users, 
  Swords, 
  Grid3X3, 
  Flag, 
  X, 
  Check, 
  ChevronRight, 
  BookOpen, 
  Heart,
  Trophy
} from 'lucide-react';

type Screen = 'menu' | 'maze' | 'tug_of_war' | 'quiz_rush' | 'bank_modal';

const bankManager = new BankSoalManager();
const buzzerRef = new BuzzerReferee();

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [isMuted, setIsMuted] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>('Semua');

  // Handle browser Back button (history.pushState)
  useEffect(() => {
    window.history.replaceState({ screen: 'menu' }, '');
    const handlePopState = (e: PopStateEvent) => {
      const target = (e.state && e.state.screen) || 'menu';
      setCurrentScreen(target);
      setShowBankModal(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (screen: Screen) => {
    sound.playClick();
    window.history.pushState({ screen }, '');
    setCurrentScreen(screen);
  };

  const toggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans select-none touch-none">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950 via-slate-950 to-black pointer-events-none opacity-80" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4vmin_4vmin] pointer-events-none" />

      {/* Persistent Audio Toggle & Brand Watermark in Bottom Bar / Top Edge */}
      <div className="absolute top-2 right-3 z-50 flex items-center gap-2">
        <button
          onClick={toggleMute}
          title={isMuted ? "Aktifkan Suara" : "Bisukan Suara"}
          className="p-[1.2vmin] rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 shadow-lg text-slate-300 active:scale-95 transition-transform"
        >
          {isMuted ? <VolumeX className="w-[3vmin] h-[3vmin] text-rose-400" /> : <Volume2 className="w-[3vmin] h-[3vmin] text-emerald-400" />}
        </button>
      </div>

      {/* Screen Routing */}
      {currentScreen === 'menu' && (
        <MainMenu 
          onSelectMode={navigateTo} 
          onOpenBank={() => setShowBankModal(true)} 
        />
      )}

      {currentScreen === 'maze' && (
        <MazeScreen onBack={() => navigateTo('menu')} />
      )}

      {currentScreen === 'tug_of_war' && (
        <TugOfWarScreen onBack={() => navigateTo('menu')} />
      )}

      {currentScreen === 'quiz_rush' && (
        <QuizRushScreen onBack={() => navigateTo('menu')} />
      )}

      {/* Modal Bank Soal Guru */}
      {showBankModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-[3vmin]">
          <div className="w-[90vw] max-w-5xl h-[85vh] bg-slate-900 border border-slate-700 rounded-3xl flex flex-col overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-[2.5vmin] bg-slate-800/90 border-b border-slate-700 flex justify-between items-center">
              <div>
                <h2 className="text-[2.6vmin] font-bold text-cyan-400 flex items-center gap-2">
                  <BookOpen className="w-[3vmin] h-[3vmin]" /> Bank Soal Guru: {BANK_SOAL.meta.judul}
                </h2>
                <p className="text-[1.6vmin] text-slate-400">
                  {BANK_SOAL.meta.mapel} • {BANK_SOAL.meta.jenjang} Kelas {BANK_SOAL.meta.kelas} • Total {BANK_SOAL.soal.length} Soal
                </p>
              </div>
              <button
                onClick={() => setShowBankModal(false)}
                className="p-[1.5vmin] rounded-2xl bg-rose-600/80 hover:bg-rose-500 text-white active:scale-95 transition-transform"
              >
                <X className="w-[3vmin] h-[3vmin]" />
              </button>
            </div>

            {/* Filter Kategori */}
            <div className="p-[1.8vmin] bg-slate-900/60 border-b border-slate-800 flex gap-2 overflow-x-auto">
              {['Semua', ...BANK_SOAL.kategori].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilterCategory(cat)}
                  className={`px-[2vmin] py-[1vmin] rounded-xl text-[1.5vmin] font-semibold whitespace-nowrap transition-colors ${
                    selectedFilterCategory === cat 
                      ? 'bg-cyan-500 text-slate-950 shadow-md font-bold' 
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* List Soal */}
            <div className="flex-1 overflow-y-auto p-[2.5vmin] space-y-[2vmin]">
              {BANK_SOAL.soal
                .filter(s => selectedFilterCategory === 'Semua' || s.kategori === selectedFilterCategory)
                .map((soal, idx) => (
                  <div key={soal.id} className="p-[2vmin] rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-slate-600 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-[1.2vmin] py-[0.4vmin] rounded-lg bg-cyan-950 text-cyan-400 font-mono text-[1.4vmin] font-bold border border-cyan-800">
                          {soal.id}
                        </span>
                        <span className="text-[1.4vmin] text-slate-400">{soal.kategori}</span>
                      </div>
                      <span className={`px-[1.4vmin] py-[0.4vmin] rounded-full text-[1.3vmin] font-bold uppercase ${
                        soal.tingkat === 'mudah' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        soal.tingkat === 'sedang' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                        'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}>
                        {soal.tingkat} • {soal.poin} Poin
                      </span>
                    </div>

                    <p className="text-[2vmin] font-medium text-slate-100 mb-3">
                      {idx + 1}. {soal.pertanyaan}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[1.6vmin]">
                      {soal.opsi.map((op, oIdx) => (
                        <div 
                          key={oIdx} 
                          className={`p-[1.2vmin] rounded-xl flex items-center gap-2 ${
                            oIdx === soal.jawaban 
                              ? 'bg-emerald-950/80 border border-emerald-500/80 text-emerald-200 font-semibold' 
                              : 'bg-slate-900/60 border border-slate-800 text-slate-400'
                          }`}
                        >
                          <span className={`w-[2.6vmin] h-[2.6vmin] rounded-full flex items-center justify-center text-[1.3vmin] font-bold ${
                            oIdx === soal.jawaban ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                          }`}>
                            {['A','B','C','D'][oIdx]}
                          </span>
                          <span>{op}</span>
                          {oIdx === soal.jawaban && <Check className="w-[2vmin] h-[2vmin] text-emerald-400 ml-auto" />}
                        </div>
                      ))}
                    </div>

                    <div className="mt-2 text-[1.4vmin] text-cyan-300/80 bg-cyan-950/30 p-[1.2vmin] rounded-xl border border-cyan-900/40">
                      💡 <strong>Pembahasan:</strong> {soal.pembahasan}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   1. MAIN MENU SCREEN
   ========================================================================= */
interface MainMenuProps {
  onSelectMode: (mode: Screen) => void;
  onOpenBank: () => void;
}

function MainMenu({ onSelectMode, onOpenBank }: MainMenuProps) {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-[3vmin] z-10">
      {/* Top Header */}
      <div className="text-center pt-[1vmin]">
        <div className="inline-flex items-center gap-2 px-[2vmin] py-[0.6vmin] rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[1.6vmin] font-bold tracking-wide uppercase shadow-lg shadow-cyan-950/50 mb-[1vmin]">
          <Sparkles className="w-[2vmin] h-[2vmin] text-cyan-400 animate-pulse" />
          Media Pembelajaran Papan Interaktif Digital (IFP) • SMP Kelas 7 Fase D
        </div>
        <h1 className="text-[4.5vmin] font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 drop-shadow-md">
          KECERDASAN ARTIFISIAL GENERATIF
        </h1>
        <p className="text-[2vmin] text-slate-300 max-w-3xl mx-auto font-medium">
          Sentuh salah satu mode permainan di bawah untuk memulai pembelajaran interaktif multi-touch di kelas!
        </p>
      </div>

      {/* 3 Large Mode Cards */}
      <div className="grid grid-cols-3 gap-[3vmin] px-[2vmin] my-auto">
        {/* Card 1: Labirin AI */}
        <button
          onClick={() => onSelectMode('maze')}
          className="group relative flex flex-col justify-between p-[3vmin] rounded-3xl bg-gradient-to-b from-indigo-900/70 to-slate-900/90 border-2 border-indigo-500/40 hover:border-indigo-400 shadow-xl shadow-indigo-950/40 active:translate-y-1 transition-all text-left overflow-hidden min-h-[36vmin]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-[2vmin]">
              <div className="p-[2vmin] rounded-2xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
                <Flag className="w-[5vmin] h-[5vmin]" />
              </div>
              <span className="px-[1.8vmin] py-[0.8vmin] rounded-xl bg-indigo-950 border border-indigo-700/60 text-indigo-300 text-[1.6vmin] font-bold">
                1 - 2 Pemain
              </span>
            </div>
            <h2 className="text-[3vmin] font-bold text-white group-hover:text-indigo-200 transition-colors mb-[1vmin]">
              Mode 1: Labirin AI
            </h2>
            <p className="text-[1.8vmin] text-slate-300 leading-snug">
              Jelajahi labirin, buka gerbang kuis dengan menjawab soal AI, capai Finis tercepat!
            </p>
          </div>
          <div className="mt-[2vmin] flex items-center gap-2 text-indigo-400 text-[1.8vmin] font-bold group-hover:translate-x-2 transition-transform">
            <span>Mulai Petualangan</span>
            <ChevronRight className="w-[2.4vmin] h-[2.4vmin]" />
          </div>
        </button>

        {/* Card 2: Tarik Tambang AI */}
        <button
          onClick={() => onSelectMode('tug_of_war')}
          className="group relative flex flex-col justify-between p-[3vmin] rounded-3xl bg-gradient-to-b from-amber-900/70 to-slate-900/90 border-2 border-amber-500/40 hover:border-amber-400 shadow-xl shadow-amber-950/40 active:translate-y-1 transition-all text-left overflow-hidden min-h-[36vmin]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-[2vmin]">
              <div className="p-[2vmin] rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-300">
                <Swords className="w-[5vmin] h-[5vmin]" />
              </div>
              <span className="px-[1.8vmin] py-[0.8vmin] rounded-xl bg-amber-950 border border-amber-700/60 text-amber-300 text-[1.6vmin] font-bold">
                2 Pemain Adu Cepat
              </span>
            </div>
            <h2 className="text-[3vmin] font-bold text-white group-hover:text-amber-200 transition-colors mb-[1vmin]">
              Mode 2: Tarik Tambang AI
            </h2>
            <p className="text-[1.8vmin] text-slate-300 leading-snug">
              Adu cepat menjawab soal untuk menarik simpul tali ke zona timmu hingga batas garis!
            </p>
          </div>
          <div className="mt-[2vmin] flex items-center gap-2 text-amber-400 text-[1.8vmin] font-bold group-hover:translate-x-2 transition-transform">
            <span>Mulai Duel Tali</span>
            <ChevronRight className="w-[2.4vmin] h-[2.4vmin]" />
          </div>
        </button>

        {/* Card 3: Kuis Rebutan */}
        <button
          onClick={() => onSelectMode('quiz_rush')}
          className="group relative flex flex-col justify-between p-[3vmin] rounded-3xl bg-gradient-to-b from-rose-900/70 to-slate-900/90 border-2 border-rose-500/40 hover:border-rose-400 shadow-xl shadow-rose-950/40 active:translate-y-1 transition-all text-left overflow-hidden min-h-[36vmin]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-all pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-[2vmin]">
              <div className="p-[2vmin] rounded-2xl bg-rose-500/20 border border-rose-400/30 text-rose-300">
                <Zap className="w-[5vmin] h-[5vmin]" />
              </div>
              <span className="px-[1.8vmin] py-[0.8vmin] rounded-xl bg-rose-950 border border-rose-700/60 text-rose-300 text-[1.6vmin] font-bold">
                4 Kelompok Buzzer
              </span>
            </div>
            <h2 className="text-[3vmin] font-bold text-white group-hover:text-rose-200 transition-colors mb-[1vmin]">
              Mode 3: Kuis Rebutan
            </h2>
            <p className="text-[1.8vmin] text-slate-300 leading-snug">
              Papan 40 kotak (10–50 poin). Tekan buzzer sudut kelompok tercepat untuk merebut hak jawab!
            </p>
          </div>
          <div className="mt-[2vmin] flex items-center gap-2 text-rose-400 text-[1.8vmin] font-bold group-hover:translate-x-2 transition-transform">
            <span>Buka Papan Soal</span>
            <ChevronRight className="w-[2.4vmin] h-[2.4vmin]" />
          </div>
        </button>
      </div>

      {/* Bottom Bar Information */}
      <div className="flex items-center justify-between px-[2vmin] py-[1.2vmin] bg-slate-900/80 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-3">
          <span className="px-[1.6vmin] py-[0.6vmin] rounded-lg bg-emerald-950 border border-emerald-700/60 text-emerald-400 text-[1.5vmin] font-bold">
            Bank Soal: {BANK_SOAL.soal.length} Soal Aktif
          </span>
          <span className="text-[1.5vmin] text-slate-400">
            Dukungan Multi-Touch Simultan • Tanpa Keyboard/Mouse • 100% Offline
          </span>
        </div>

        <button
          onClick={onOpenBank}
          className="flex items-center gap-2 px-[2.2vmin] py-[0.8vmin] rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-[1.5vmin] font-semibold border border-slate-600 active:scale-95 transition-all"
        >
          <BookOpen className="w-[2vmin] h-[2vmin] text-cyan-400" />
          <span>Lihat / Kelola Bank Soal Guru</span>
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   2. MODE 1: LABIRIN AI (1 ATAU 2 PEMAIN)
   ========================================================================= */
interface MazeScreenProps {
  onBack: () => void;
}

interface PlayerState {
  x: number;
  y: number;
  unlockedGates: Set<number>;
  frozenUntil: number; // timestamp
  activeGateSoal: { gateId: number; soal: Soal } | null;
  selectedOption: number | null;
  isFinished: boolean;
  finishTime: number | null;
}

function MazeScreen({ onBack }: MazeScreenProps) {
  const [playerMode, setPlayerMode] = useState<'pilih' | 'single' | 'dual'>('pilih');
  const [levelIdx, setLevelIdx] = useState(0);
  const [mazeData, setMazeData] = useState<MazeData | null>(null);

  const [p1, setP1] = useState<PlayerState>({
    x: 1,
    y: 1,
    unlockedGates: new Set(),
    frozenUntil: 0,
    activeGateSoal: null,
    selectedOption: null,
    isFinished: false,
    finishTime: null,
  });

  const [p2, setP2] = useState<PlayerState>({
    x: 1,
    y: 1,
    unlockedGates: new Set(),
    frozenUntil: 0,
    activeGateSoal: null,
    selectedOption: null,
    isFinished: false,
    finishTime: null,
  });

  const [startTime, setStartTime] = useState<number>(Date.now());
  const [elapsed, setElapsed] = useState<number>(0);
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  // Inisialisasi Maze Level
  const initLevel = useCallback((lvlIndex: number) => {
    const config = MAZE_LEVELS[lvlIndex];
    const data = MazeGenerator.generate(config);
    setMazeData(data);
    setLevelIdx(lvlIndex);

    setP1({
      x: data.start.x,
      y: data.start.y,
      unlockedGates: new Set(),
      frozenUntil: 0,
      activeGateSoal: null,
      selectedOption: null,
      isFinished: false,
      finishTime: null,
    });

    setP2({
      x: data.start.x,
      y: data.start.y,
      unlockedGates: new Set(),
      frozenUntil: 0,
      activeGateSoal: null,
      selectedOption: null,
      isFinished: false,
      finishTime: null,
    });

    setStartTime(Date.now());
    setElapsed(0);
    setShowWinnerModal(false);
  }, []);

  useEffect(() => {
    if (playerMode !== 'pilih') {
      initLevel(levelIdx);
    }
  }, [playerMode, levelIdx, initLevel]);

  // Timer loop
  useEffect(() => {
    if (playerMode === 'pilih' || showWinnerModal) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [playerMode, startTime, showWinnerModal]);

  // Movement handler for a player
  const movePlayer = useCallback((playerNum: 1 | 2, dx: number, dy: number) => {
    if (!mazeData || showWinnerModal) return;

    const isP1 = playerNum === 1;
    const current = isP1 ? p1 : p2;

    if (current.isFinished) return;
    if (Date.now() < current.frozenUntil) return;
    if (current.activeGateSoal) return; // sedang menjawab gerbang

    const targetX = current.x + dx;
    const targetY = current.y + dy;

    // Boundary check
    if (targetX < 0 || targetX >= mazeData.width || targetY < 0 || targetY >= mazeData.height) return;

    const cell = mazeData.grid[targetY][targetX];

    // Dinding '#'
    if (cell === '#') return;

    // Gerbang 'G'
    if (cell === 'G') {
      const gate = mazeData.gatePositions.find(g => g.x === targetX && g.y === targetY);
      if (gate && !current.unlockedGates.has(gate.id)) {
        // Tampilkan soal kuis di zona pemain
        const soal = bankManager.getNextSoal('maze');
        sound.playTick();
        if (isP1) {
          setP1(prev => ({ ...prev, activeGateSoal: { gateId: gate.id, soal }, selectedOption: null }));
        } else {
          setP2(prev => ({ ...prev, activeGateSoal: { gateId: gate.id, soal }, selectedOption: null }));
        }
        return;
      }
    }

    // Melangkah sukses
    sound.playStep();
    const isNowFinish = targetX === mazeData.finish.x && targetY === mazeData.finish.y;

    if (isP1) {
      setP1(prev => ({
        ...prev,
        x: targetX,
        y: targetY,
        isFinished: isNowFinish,
        finishTime: isNowFinish ? Date.now() : prev.finishTime,
      }));
    } else {
      setP2(prev => ({
        ...prev,
        x: targetX,
        y: targetY,
        isFinished: isNowFinish,
        finishTime: isNowFinish ? Date.now() : prev.finishTime,
      }));
    }

    if (isNowFinish) {
      sound.playWin();
      setShowWinnerModal(true);
    }
  }, [mazeData, p1, p2, showWinnerModal]);

  // Answer Gate Question Handler
  const handleAnswerGate = (playerNum: 1 | 2, optionIdx: number) => {
    const isP1 = playerNum === 1;
    const current = isP1 ? p1 : p2;
    if (!current.activeGateSoal) return;

    const { gateId, soal } = current.activeGateSoal;
    const isCorrect = optionIdx === soal.jawaban;

    if (isP1) {
      setP1(prev => ({ ...prev, selectedOption: optionIdx }));
    } else {
      setP2(prev => ({ ...prev, selectedOption: optionIdx }));
    }

    if (isCorrect) {
      sound.playCorrect();
      setTimeout(() => {
        const gate = mazeData?.gatePositions.find(g => g.id === gateId);
        if (isP1) {
          setP1(prev => {
            const nextGates = new Set(prev.unlockedGates);
            nextGates.add(gateId);
            return {
              ...prev,
              unlockedGates: nextGates,
              activeGateSoal: null,
              selectedOption: null,
              x: gate ? gate.x : prev.x,
              y: gate ? gate.y : prev.y,
            };
          });
        } else {
          setP2(prev => {
            const nextGates = new Set(prev.unlockedGates);
            nextGates.add(gateId);
            return {
              ...prev,
              unlockedGates: nextGates,
              activeGateSoal: null,
              selectedOption: null,
              x: gate ? gate.x : prev.x,
              y: gate ? gate.y : prev.y,
            };
          });
        }
      }, 500);
    } else {
      sound.playWrong();
      // Bekukan selama 3 detik!
      const freezeTime = Date.now() + 3000;
      setTimeout(() => {
        if (isP1) {
          setP1(prev => ({
            ...prev,
            frozenUntil: freezeTime,
            activeGateSoal: null,
            selectedOption: null,
          }));
        } else {
          setP2(prev => ({
            ...prev,
            frozenUntil: freezeTime,
            activeGateSoal: null,
            selectedOption: null,
          }));
        }
      }, 700);
    }
  };

  // Layar Pemilihan Mode Sendiri atau Berdua
  if (playerMode === 'pilih') {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-[4vmin] z-10">
        <button
          onClick={onBack}
          className="absolute top-[3vmin] left-[3vmin] flex items-center gap-2 px-[2vmin] py-[1vmin] rounded-xl bg-slate-800 text-slate-300 font-semibold border border-slate-700 active:scale-95 transition-all text-[1.8vmin]"
        >
          <Home className="w-[2.5vmin] h-[2.5vmin]" /> Kembali ke Menu
        </button>

        <h2 className="text-[4vmin] font-extrabold text-indigo-300 mb-[1vmin]">
          Mode 1: Labirin AI
        </h2>
        <p className="text-[2vmin] text-slate-300 mb-[5vmin]">
          Pilih jenis permainan untuk papan interaktif di kelas:
        </p>

        <div className="grid grid-cols-2 gap-[4vmin] w-full max-w-4xl">
          <button
            onClick={() => setPlayerMode('single')}
            className="flex flex-col items-center justify-center p-[5vmin] rounded-3xl bg-slate-900/90 border-2 border-indigo-500/50 hover:border-indigo-400 active:scale-95 transition-all shadow-2xl group"
          >
            <div className="p-[3vmin] rounded-2xl bg-indigo-500/20 text-indigo-300 mb-[2vmin] group-hover:scale-110 transition-transform">
              <Users className="w-[8vmin] h-[8vmin]" />
            </div>
            <h3 className="text-[3vmin] font-bold text-white mb-2">Main Sendiri (1 Siswa)</h3>
            <p className="text-[1.8vmin] text-slate-400 text-center">
              Peta labirin penuh di tengah layar dengan kendali D-pad besar di bawah.
            </p>
          </button>

          <button
            onClick={() => setPlayerMode('dual')}
            className="flex flex-col items-center justify-center p-[5vmin] rounded-3xl bg-slate-900/90 border-2 border-cyan-500/50 hover:border-cyan-400 active:scale-95 transition-all shadow-2xl group"
          >
            <div className="p-[3vmin] rounded-2xl bg-cyan-500/20 text-cyan-300 mb-[2vmin] group-hover:scale-110 transition-transform">
              <Swords className="w-[8vmin] h-[8vmin]" />
            </div>
            <h3 className="text-[3vmin] font-bold text-white mb-2">Main Berdua (Split-Screen)</h3>
            <p className="text-[1.8vmin] text-slate-400 text-center">
              Layar dibagi Kiri & Kanan! Dua labirin identik bersaing serentak membuka gerbang kuis.
            </p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-[1.5vmin] z-10">
      {/* Top Bar: Back, Level, Timer, Jump Level */}
      <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 px-[2vmin] py-[0.8vmin] rounded-2xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1 px-[1.5vmin] py-[0.6vmin] rounded-xl bg-slate-800 text-slate-200 text-[1.4vmin] font-semibold border border-slate-700 active:scale-95"
          >
            <Home className="w-[1.8vmin] h-[1.8vmin]" /> Menu
          </button>
          <button
            onClick={() => initLevel(levelIdx)}
            className="flex items-center gap-1 px-[1.5vmin] py-[0.6vmin] rounded-xl bg-slate-800 text-slate-200 text-[1.4vmin] font-semibold border border-slate-700 active:scale-95"
          >
            <RotateCcw className="w-[1.8vmin] h-[1.8vmin]" /> Ulangi
          </button>
          <span className="px-[1.6vmin] py-[0.5vmin] rounded-lg bg-indigo-950 text-indigo-300 font-bold text-[1.5vmin] border border-indigo-700">
            Level {levelIdx + 1} ({MAZE_LEVELS[levelIdx].width}×{MAZE_LEVELS[levelIdx].height} • {MAZE_LEVELS[levelIdx].gateCount} Gerbang)
          </span>
        </div>

        {/* Level Jumper for Teacher */}
        <div className="flex items-center gap-2">
          <span className="text-[1.3vmin] text-slate-400">Pilih Level:</span>
          {MAZE_LEVELS.map((lvl, idx) => (
            <button
              key={lvl.level}
              onClick={() => initLevel(idx)}
              className={`px-[1.4vmin] py-[0.4vmin] rounded-lg text-[1.3vmin] font-bold ${
                levelIdx === idx
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Lvl {lvl.level}
            </button>
          ))}
          <span className="ml-4 font-mono text-[1.6vmin] font-bold text-amber-400">
            ⏱ {elapsed}s
          </span>
        </div>
      </div>

      {/* Main Game Zone */}
      <div className="flex-1 flex gap-[2vmin] my-[1vmin] overflow-hidden">
        {mazeData && (
          playerMode === 'single' ? (
            <MazeZone
              playerNum={1}
              title="Pemain 1"
              themeColor="indigo"
              mazeData={mazeData}
              playerState={p1}
              onMove={(dx, dy) => movePlayer(1, dx, dy)}
              onAnswer={(opt) => handleAnswerGate(1, opt)}
            />
          ) : (
            <>
              <MazeZone
                playerNum={1}
                title="Pemain 1 (Kiri)"
                themeColor="indigo"
                mazeData={mazeData}
                playerState={p1}
                onMove={(dx, dy) => movePlayer(1, dx, dy)}
                onAnswer={(opt) => handleAnswerGate(1, opt)}
              />
              <div className="w-[2px] bg-slate-700 self-stretch my-2" />
              <MazeZone
                playerNum={2}
                title="Pemain 2 (Kanan)"
                themeColor="cyan"
                mazeData={mazeData}
                playerState={p2}
                onMove={(dx, dy) => movePlayer(2, dx, dy)}
                onAnswer={(opt) => handleAnswerGate(2, opt)}
              />
            </>
          )
        )}
      </div>

      {/* Winner / Completion Modal */}
      {showWinnerModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-[3vmin]">
          <div className="w-[90vw] max-w-xl bg-slate-900 border-2 border-indigo-500 rounded-3xl p-[4vmin] text-center shadow-2xl">
            <Trophy className="w-[10vmin] h-[10vmin] text-amber-400 mx-auto mb-3 animate-bounce" />
            <h3 className="text-[3.5vmin] font-extrabold text-white mb-2">
              {playerMode === 'single'
                ? "Selamat! Labirin Selesai!"
                : p1.isFinished && (!p2.isFinished || (p1.finishTime! <= p2.finishTime!))
                ? "Pemain 1 (Kiri) Juara!"
                : "Pemain 2 (Kanan) Juara!"}
            </h3>
            <p className="text-[2vmin] text-slate-300 mb-6">
              Waktu tempuh: <strong>{elapsed} detik</strong> • Berhasil membuka seluruh {MAZE_LEVELS[levelIdx].gateCount} gerbang kuis AI!
            </p>
            <div className="flex justify-center gap-3">
              {levelIdx < MAZE_LEVELS.length - 1 && (
                <button
                  onClick={() => initLevel(levelIdx + 1)}
                  className="px-[3vmin] py-[1.5vmin] rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[2vmin] shadow-lg active:scale-95"
                >
                  Lanjut ke Level {levelIdx + 2}
                </button>
              )}
              <button
                onClick={() => initLevel(levelIdx)}
                className="px-[3vmin] py-[1.5vmin] rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[2vmin] border border-slate-600 active:scale-95"
              >
                Ulangi
              </button>
              <button
                onClick={onBack}
                className="px-[3vmin] py-[1.5vmin] rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[2vmin] border border-slate-600 active:scale-95"
              >
                Menu Utama
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Sub-komponen Zona Pemain Labirin (Canvas/Grid + Virtual D-pad + Gate Question Pop-in) */
interface MazeZoneProps {
  playerNum: 1 | 2;
  title: string;
  themeColor: 'indigo' | 'cyan';
  mazeData: MazeData;
  playerState: PlayerState;
  onMove: (dx: number, dy: number) => void;
  onAnswer: (optionIdx: number) => void;
}

function MazeZone({
  playerNum,
  title,
  themeColor,
  mazeData,
  playerState,
  onMove,
  onAnswer,
}: MazeZoneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ cellSize: number; width: number; height: number }>({
    cellSize: 32,
    width: 400,
    height: 300,
  });

  // Strict JS Cell Size calculation to guarantee perfectly square cells
  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const availW = rect.width - 16;
      const availH = rect.height - 16;
      const cellSize = Math.floor(Math.min(availW / mazeData.width, availH / mazeData.height));
      setDimensions({
        cellSize,
        width: cellSize * mazeData.width,
        height: cellSize * mazeData.height,
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [mazeData]);

  // Virtual D-pad binding with pointerId and repeatIntervalMs (190ms)
  const upBtnRef = useRef<HTMLButtonElement>(null);
  const downBtnRef = useRef<HTMLButtonElement>(null);
  const leftBtnRef = useRef<HTMLButtonElement>(null);
  const rightBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const unbindUp = upBtnRef.current
      ? bindInteractiveButton(upBtnRef.current, { onPress: () => onMove(0, -1), repeatIntervalMs: 190 })
      : () => {};
    const unbindDown = downBtnRef.current
      ? bindInteractiveButton(downBtnRef.current, { onPress: () => onMove(0, 1), repeatIntervalMs: 190 })
      : () => {};
    const unbindLeft = leftBtnRef.current
      ? bindInteractiveButton(leftBtnRef.current, { onPress: () => onMove(-1, 0), repeatIntervalMs: 190 })
      : () => {};
    const unbindRight = rightBtnRef.current
      ? bindInteractiveButton(rightBtnRef.current, { onPress: () => onMove(1, 0), repeatIntervalMs: 190 })
      : () => {};

    return () => {
      unbindUp();
      unbindDown();
      unbindLeft();
      unbindRight();
    };
  }, [onMove]);

  const isFrozen = Date.now() < playerState.frozenUntil;
  const freezeSecondsLeft = isFrozen ? Math.ceil((playerState.frozenUntil - Date.now()) / 1000) : 0;

  return (
    <div className="relative flex-1 flex flex-col justify-between bg-slate-900/60 rounded-3xl border border-slate-800/80 p-[1vmin] overflow-hidden">
      {/* Player Header */}
      <div className="flex items-center justify-between px-[1.5vmin] py-[0.5vmin]">
        <span className={`text-[1.8vmin] font-bold ${themeColor === 'indigo' ? 'text-indigo-400' : 'text-cyan-400'}`}>
          {title}
        </span>
        <div className="flex items-center gap-2 text-[1.4vmin] text-slate-300">
          <span>Gerbang Terbuka:</span>
          <span className="font-bold text-amber-400">
            {playerState.unlockedGates.size} / {mazeData.gatePositions.length}
          </span>
        </div>
      </div>

      {/* Maze Grid Container */}
      <div ref={containerRef} className="relative flex-1 flex items-center justify-center p-1 overflow-hidden">
        <div
          style={{
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            gridTemplateColumns: `repeat(${mazeData.width}, ${dimensions.cellSize}px)`,
            gridTemplateRows: `repeat(${mazeData.height}, ${dimensions.cellSize}px)`,
          }}
          className="grid bg-slate-950 border-2 border-slate-700/80 rounded-xl overflow-hidden shadow-inner"
        >
          {mazeData.grid.map((row, y) =>
            row.map((cell, x) => {
              const isStart = x === mazeData.start.x && y === mazeData.start.y;
              const isFinish = x === mazeData.finish.x && y === mazeData.finish.y;
              const gate = mazeData.gatePositions.find(g => g.x === x && g.y === y);
              const isGateUnlocked = gate ? playerState.unlockedGates.has(gate.id) : false;
              const isPion = x === playerState.x && y === playerState.y;

              return (
                <div
                  key={`${x}-${y}`}
                  style={{ width: `${dimensions.cellSize}px`, height: `${dimensions.cellSize}px` }}
                  className={`relative flex items-center justify-center transition-colors ${
                    cell === '#'
                      ? 'bg-slate-800 border-[0.5px] border-slate-700/50'
                      : isGateUnlocked
                      ? 'bg-emerald-950/40'
                      : 'bg-slate-950'
                  }`}
                >
                  {/* Gate Display */}
                  {gate && !isGateUnlocked && (
                    <div className="w-[80%] h-[80%] rounded-md bg-amber-600/90 border border-amber-300 flex items-center justify-center text-slate-950 font-bold text-[1.2vmin] shadow-md animate-pulse">
                      🔒
                    </div>
                  )}

                  {/* Finish Display */}
                  {isFinish && (
                    <div className="w-[85%] h-[85%] rounded-md bg-rose-600 border border-rose-300 flex items-center justify-center text-white font-bold text-[1.2vmin] shadow-md">
                      🏁
                    </div>
                  )}

                  {/* Start Display */}
                  {isStart && !isPion && (
                    <span className="text-[1vmin] font-bold text-slate-500">S</span>
                  )}

                  {/* Pion Pemain */}
                  {isPion && (
                    <div
                      className={`w-[85%] h-[85%] rounded-full shadow-lg flex items-center justify-center font-bold text-[1.4vmin] text-slate-950 transition-all duration-150 ${
                        themeColor === 'indigo'
                          ? 'bg-indigo-400 border-2 border-white ring-2 ring-indigo-500'
                          : 'bg-cyan-400 border-2 border-white ring-2 ring-cyan-500'
                      }`}
                    >
                      P{playerNum}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Frozen Overlay for Player with Big Countdown */}
        {isFrozen && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center z-30 rounded-2xl">
            <div className="text-[6vmin] font-extrabold text-rose-500 animate-ping">
              {freezeSecondsLeft}
            </div>
            <div className="text-[2.2vmin] font-bold text-rose-300 mt-2">
              Jawaban Salah! Membeku {freezeSecondsLeft} Detik...
            </div>
            <div className="text-[1.5vmin] text-slate-400">
              Percobaan berikutnya akan menggunakan soal baru.
            </div>
          </div>
        )}

        {/* Gate Question Overlay (strictly inside player's zone!) */}
        {playerState.activeGateSoal && (
          <div className="absolute inset-2 bg-slate-900/95 border-2 border-amber-400 rounded-2xl p-[2vmin] flex flex-col justify-between z-20 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2">
              <span className="text-[1.6vmin] font-bold text-amber-400 flex items-center gap-1">
                🔒 Gerbang Kuis Terkunci! Jawab Benar untuk Lewat:
              </span>
              <span className="px-[1vmin] py-[0.2vmin] rounded bg-amber-950 text-amber-300 text-[1.2vmin] font-bold">
                {playerState.activeGateSoal.soal.tingkat}
              </span>
            </div>

            <p className="text-[2vmin] font-bold text-white my-auto leading-relaxed">
              {playerState.activeGateSoal.soal.pertanyaan}
            </p>

            <div className="grid grid-cols-2 gap-2 mt-2">
              {playerState.activeGateSoal.soal.opsi.map((op, idx) => {
                const isSelected = playerState.selectedOption === idx;
                const isCorrect = idx === playerState.activeGateSoal?.soal.jawaban;
                let btnStyle = 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700';

                // RULE: Only selected button turns green if correct, or red if wrong. Answer key NEVER revealed to wrong buttons!
                if (isSelected) {
                  btnStyle = isCorrect
                    ? 'bg-emerald-600 text-white border-emerald-400 font-bold scale-[1.02]'
                    : 'bg-rose-600 text-white border-rose-400 font-bold';
                }

                return (
                  <button
                    key={idx}
                    disabled={playerState.selectedOption !== null}
                    onClick={() => onAnswer(idx)}
                    className={`p-[1.4vmin] rounded-xl border text-[1.5vmin] font-medium text-left flex items-center gap-2 active:scale-95 transition-all min-h-[5.5vmin] ${btnStyle}`}
                  >
                    <span className="w-[2.6vmin] h-[2.6vmin] rounded-full bg-slate-900/80 flex items-center justify-center font-bold text-[1.3vmin]">
                      {['A', 'B', 'C', 'D'][idx]}
                    </span>
                    <span className="line-clamp-2">{op}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Large Virtual D-pad (buttons around ~8.5vmin) placed in lower reach of IFP */}
      <div className="flex items-center justify-center py-[0.5vmin]">
        <div className="grid grid-cols-3 gap-1 w-[26vmin] h-[17vmin]">
          <div />
          <button
            ref={upBtnRef}
            className="rounded-2xl bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 flex items-center justify-center text-[3.2vmin] font-black shadow-lg active:translate-y-1 active:bg-slate-600 text-white"
          >
            ▲
          </button>
          <div />

          <button
            ref={leftBtnRef}
            className="rounded-2xl bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 flex items-center justify-center text-[3.2vmin] font-black shadow-lg active:translate-y-1 active:bg-slate-600 text-white"
          >
            ◀
          </button>
          <button
            ref={downBtnRef}
            className="rounded-2xl bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 flex items-center justify-center text-[3.2vmin] font-black shadow-lg active:translate-y-1 active:bg-slate-600 text-white"
          >
            ▼
          </button>
          <button
            ref={rightBtnRef}
            className="rounded-2xl bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 flex items-center justify-center text-[3.2vmin] font-black shadow-lg active:translate-y-1 active:bg-slate-600 text-white"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   3. MODE 2: TARIK TAMBANG (2 PEMAIN, ADU CEPAT)
   ========================================================================= */
interface TugOfWarScreenProps {
  onBack: () => void;
}

function TugOfWarScreen({ onBack }: TugOfWarScreenProps) {
  // Knot position: range -5 (P1 Wins / Left Boundary 12%) to +5 (P2 Wins / Right Boundary 88%)
  const [knotPos, setKnotPos] = useState<number>(0);
  const [currentSoal, setCurrentSoal] = useState<Soal>(() => bankManager.getNextSoal('tug_of_war'));
  const [scoreP1, setScoreP1] = useState<number>(0);
  const [scoreP2, setScoreP2] = useState<number>(0);
  const [roundLocked, setRoundLocked] = useState<boolean>(false);
  const [pressedP1, setPressedP1] = useState<number | null>(null);
  const [pressedP2, setPressedP2] = useState<number | null>(null);
  const [winner, setWinner] = useState<1 | 2 | null>(null);

  const nextQuestion = useCallback(() => {
    setRoundLocked(false);
    setPressedP1(null);
    setPressedP2(null);
    setCurrentSoal(bankManager.getNextSoal('tug_of_war'));
  }, []);

  const handleAnswer = (player: 1 | 2, optionIdx: number) => {
    if (roundLocked || winner !== null) return;
    setRoundLocked(true);

    const isCorrect = optionIdx === currentSoal.jawaban;

    if (player === 1) {
      setPressedP1(optionIdx);
      if (isCorrect) {
        sound.playCorrect();
        setScoreP1(s => s + 1);
        setKnotPos(k => {
          const next = k - 1; // Tarik ke kiri (P1)
          if (next <= -5) setWinner(1);
          return next;
        });
      } else {
        sound.playWrong();
        setKnotPos(k => {
          const next = k + 1; // Salah -> ditarik ke lawan (P2)
          if (next >= 5) setWinner(2);
          return next;
        });
      }
    } else {
      setPressedP2(optionIdx);
      if (isCorrect) {
        sound.playCorrect();
        setScoreP2(s => s + 1);
        setKnotPos(k => {
          const next = k + 1; // Tarik ke kanan (P2)
          if (next >= 5) setWinner(2);
          return next;
        });
      } else {
        sound.playWrong();
        setKnotPos(k => {
          const next = k - 1; // Salah -> ditarik ke lawan (P1)
          if (next <= -5) setWinner(1);
          return next;
        });
      }
    }

    // Soal berikutnya muncul ~0.9 detik kemudian
    setTimeout(() => {
      if (winner === null && Math.abs(knotPos) < 4) {
        nextQuestion();
      }
    }, 900);
  };

  useEffect(() => {
    if (winner !== null) {
      sound.playWin();
    }
  }, [winner]);

  // Knot visual position percentage between 12% and 88%
  // 0 -> 50%, -5 -> 12%, +5 -> 88%
  const knotPercent = 50 + (knotPos / 5) * 38;

  const resetGame = () => {
    setKnotPos(0);
    setScoreP1(0);
    setScoreP2(0);
    setWinner(null);
    nextQuestion();
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-[2vmin] z-10">
      {/* Top Bar: Back, Title, Score */}
      <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 px-[2.5vmin] py-[1vmin] rounded-2xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1 px-[1.6vmin] py-[0.8vmin] rounded-xl bg-slate-800 text-slate-200 text-[1.5vmin] font-semibold border border-slate-700 active:scale-95"
          >
            <Home className="w-[2vmin] h-[2vmin]" /> Menu
          </button>
          <button
            onClick={resetGame}
            className="flex items-center gap-1 px-[1.6vmin] py-[0.8vmin] rounded-xl bg-slate-800 text-slate-200 text-[1.5vmin] font-semibold border border-slate-700 active:scale-95"
          >
            <RotateCcw className="w-[2vmin] h-[2vmin]" /> Ulangi
          </button>
        </div>

        <h2 className="text-[2.6vmin] font-extrabold text-amber-400">
          TARIK TAMBANG AI: ADU CEPAT (5 LANGKAH)
        </h2>

        <div className="flex items-center gap-6 text-[1.8vmin] font-bold">
          <span className="text-rose-400">Tim Merah: {scoreP1} Benar</span>
          <span className="text-slate-500">|</span>
          <span className="text-sky-400">Tim Biru: {scoreP2} Benar</span>
        </div>
      </div>

      {/* Central Question Display */}
      <div className="bg-slate-900/95 border-2 border-slate-700 rounded-3xl p-[2.5vmin] mx-auto w-full max-w-4xl shadow-2xl text-center my-[1vmin]">
        <span className="inline-block px-[1.5vmin] py-[0.3vmin] rounded-full bg-slate-800 text-slate-400 text-[1.3vmin] font-bold uppercase mb-2">
          {currentSoal.kategori} • {currentSoal.tingkat}
        </span>
        <h3 className="text-[3vmin] font-bold text-white leading-snug">
          {currentSoal.pertanyaan}
        </h3>
      </div>

      {/* Visual Rope & Knot Arena */}
      <div className="relative w-full h-[14vmin] bg-slate-900/70 border border-slate-800 rounded-3xl flex items-center px-[4vmin] overflow-hidden my-[1vmin]">
        {/* Left Boundary Line (12%) */}
        <div className="absolute left-[12%] top-0 bottom-0 w-[4px] bg-rose-500/80 flex flex-col items-center justify-between py-1 z-10">
          <span className="text-[1.2vmin] font-black text-rose-400 bg-slate-900 px-1 rounded">MENANG</span>
          <span className="text-[1.2vmin] font-black text-rose-400 bg-slate-900 px-1 rounded">12%</span>
        </div>

        {/* Right Boundary Line (88%) */}
        <div className="absolute right-[12%] top-0 bottom-0 w-[4px] bg-sky-500/80 flex flex-col items-center justify-between py-1 z-10">
          <span className="text-[1.2vmin] font-black text-sky-400 bg-slate-900 px-1 rounded">MENANG</span>
          <span className="text-[1.2vmin] font-black text-sky-400 bg-slate-900 px-1 rounded">88%</span>
        </div>

        {/* Center Neutral Line (50%) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-slate-700 dashed" />

        {/* Heavy Rope */}
        <div className="w-full h-[2.5vmin] bg-amber-700 rounded-full shadow-inner relative flex items-center">
          <div className="w-full h-full bg-[repeating-linear-gradient(45deg,#78350f,#78350f_10px,#b45309_10px,#b45309_20px)] rounded-full opacity-90" />

          {/* Red Ribbon Knot with Physics Position */}
          <div
            style={{ left: `${knotPercent}%` }}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out z-20 flex flex-col items-center"
          >
            <div className="w-[6vmin] h-[6vmin] rounded-full bg-gradient-to-tr from-red-600 to-amber-500 border-4 border-white shadow-2xl flex items-center justify-center text-white font-extrabold text-[2vmin] animate-pulse">
              ⚡
            </div>
            <span className="text-[1.3vmin] font-black text-amber-300 mt-1 drop-shadow">
              {knotPos === 0 ? "SEIMBANG" : knotPos < 0 ? `+${Math.abs(knotPos)} Merah` : `+${knotPos} Biru`}
            </span>
          </div>
        </div>
      </div>

      {/* Dual Player Answer Zone (Left: Tim Merah, Right: Tim Biru) */}
      <div className="grid grid-cols-2 gap-[4vmin] flex-1">
        {/* Tim Merah (Player 1) */}
        <div className="flex flex-col justify-between bg-rose-950/20 border-2 border-rose-500/40 rounded-3xl p-[2vmin]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[2.2vmin] font-extrabold text-rose-400">
              TIM MERAH (KIRI)
            </span>
            <span className="text-[1.4vmin] text-rose-300 font-medium">
              Sentuh cepat opsi jawaban:
            </span>
          </div>

          <div className="grid grid-cols-2 gap-[1.5vmin] flex-1">
            {currentSoal.opsi.map((op, idx) => {
              const isPressed = pressedP1 === idx;
              const isCorrect = idx === currentSoal.jawaban;
              let style = 'bg-slate-900/90 border-slate-700 text-slate-100 hover:border-rose-400';

              if (isPressed) {
                style = isCorrect
                  ? 'bg-emerald-600 border-emerald-400 text-white font-bold scale-[1.02]'
                  : 'bg-rose-600 border-rose-400 text-white font-bold';
              }

              return (
                <button
                  key={idx}
                  disabled={roundLocked}
                  onClick={() => handleAnswer(1, idx)}
                  className={`p-[2vmin] rounded-2xl border-2 text-[1.8vmin] font-semibold text-left flex items-center gap-3 active:scale-95 transition-all shadow-md ${style}`}
                >
                  <span className="w-[3.6vmin] h-[3.6vmin] rounded-xl bg-slate-800 flex items-center justify-center font-bold text-[1.8vmin]">
                    {['A', 'B', 'C', 'D'][idx]}
                  </span>
                  <span className="line-clamp-2">{op}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tim Biru (Player 2) */}
        <div className="flex flex-col justify-between bg-sky-950/20 border-2 border-sky-500/40 rounded-3xl p-[2vmin]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[2.2vmin] font-extrabold text-sky-400">
              TIM BIRU (KANAN)
            </span>
            <span className="text-[1.4vmin] text-sky-300 font-medium">
              Sentuh cepat opsi jawaban:
            </span>
          </div>

          <div className="grid grid-cols-2 gap-[1.5vmin] flex-1">
            {currentSoal.opsi.map((op, idx) => {
              const isPressed = pressedP2 === idx;
              const isCorrect = idx === currentSoal.jawaban;
              let style = 'bg-slate-900/90 border-slate-700 text-slate-100 hover:border-sky-400';

              if (isPressed) {
                style = isCorrect
                  ? 'bg-emerald-600 border-emerald-400 text-white font-bold scale-[1.02]'
                  : 'bg-rose-600 border-rose-400 text-white font-bold';
              }

              return (
                <button
                  key={idx}
                  disabled={roundLocked}
                  onClick={() => handleAnswer(2, idx)}
                  className={`p-[2vmin] rounded-2xl border-2 text-[1.8vmin] font-semibold text-left flex items-center gap-3 active:scale-95 transition-all shadow-md ${style}`}
                >
                  <span className="w-[3.6vmin] h-[3.6vmin] rounded-xl bg-slate-800 flex items-center justify-center font-bold text-[1.8vmin]">
                    {['A', 'B', 'C', 'D'][idx]}
                  </span>
                  <span className="line-clamp-2">{op}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Winner Fanfare Modal */}
      {winner !== null && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-[3vmin]">
          <div className="w-[90vw] max-w-xl bg-slate-900 border-4 border-amber-400 rounded-3xl p-[4vmin] text-center shadow-2xl">
            <Trophy className="w-[12vmin] h-[12vmin] text-amber-400 mx-auto mb-2 animate-bounce" />
            <h3 className="text-[4vmin] font-extrabold text-white mb-2">
              {winner === 1 ? "TIM MERAH MENANG!" : "TIM BIRU MENANG!"}
            </h3>
            <p className="text-[2vmin] text-slate-300 mb-6">
              Simpul tali berhasil ditarik mencapai batas kemenangan 5 langkah!
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={resetGame}
                className="px-[3.5vmin] py-[1.5vmin] rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-[2vmin] shadow-lg active:scale-95"
              >
                Tanding Ulang
              </button>
              <button
                onClick={onBack}
                className="px-[3.5vmin] py-[1.5vmin] rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[2vmin] border border-slate-600 active:scale-95"
              >
                Menu Utama
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   4. MODE 3: KUIS REBUTAN (4 KELOMPOK)
   ========================================================================= */
interface QuizRushScreenProps {
  onBack: () => void;
}

interface TeamState {
  id: number;
  name: string;
  colorName: string;
  colorClass: string;
  borderClass: string;
  bgGlowClass: string;
  score: number;
  lives: number; // Max 3
}

interface GridBoxState {
  index: number;
  row: number; // 0..4
  col: number; // 0..7
  points: number; // 10..50
  lockedByTeamId: number | null; // null = open, 0 = locked grey (timeout/failed), 1..4 = locked by team
  soal: Soal;
}

function QuizRushScreen({ onBack }: QuizRushScreenProps) {
  const [teams, setTeams] = useState<TeamState[]>([
    { id: 1, name: "Kelompok 1", colorName: "Kuning Cyber", colorClass: "text-amber-400", borderClass: "border-amber-400", bgGlowClass: "bg-amber-500/20", score: 0, lives: 3 },
    { id: 2, name: "Kelompok 2", colorName: "Cyan Neon", colorClass: "text-cyan-400", borderClass: "border-cyan-400", bgGlowClass: "bg-cyan-500/20", score: 0, lives: 3 },
    { id: 3, name: "Kelompok 3", colorName: "Hijau Matrix", colorClass: "text-emerald-400", borderClass: "border-emerald-400", bgGlowClass: "bg-emerald-500/20", score: 0, lives: 3 },
    { id: 4, name: "Kelompok 4", colorName: "Magenta Quantum", colorClass: "text-fuchsia-400", borderClass: "border-fuchsia-400", bgGlowClass: "bg-fuchsia-500/20", score: 0, lives: 3 },
  ]);

  // 40 kotak: 8 kolom x 5 baris (Row 0: 10, Row 1: 20, Row 2: 30, Row 3: 40, Row 4: 50)
  const [boxes, setBoxes] = useState<GridBoxState[]>(() => {
    const arr: GridBoxState[] = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 8; col++) {
        const index = row * 8 + col;
        arr.push({
          index,
          row,
          col,
          points: (row + 1) * 10,
          lockedByTeamId: null,
          soal: bankManager.getNextSoal('quiz_rush'),
        });
      }
    }
    return arr;
  });

  // State kartu soal aktif
  const [activeBoxIndex, setActiveBoxIndex] = useState<number | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number>(30);
  const [answeringTeamId, setAnsweringTeamId] = useState<number | null>(null);
  const [failedTeamsForBox, setFailedTeamsForBox] = useState<Set<number>>(new Set());
  const [buzzerTieMessage, setBuzzerTieMessage] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showPodium, setShowPodium] = useState<boolean>(false);

  // Timer 30 detik untuk kartu aktif
  useEffect(() => {
    if (activeBoxIndex === null) return;
    if (timerSeconds <= 0) {
      // Waktu habis! Kotak terkunci abu-abu
      sound.playWrong();
      setBoxes(prev => prev.map(b => b.index === activeBoxIndex ? { ...b, lockedByTeamId: 0 } : b));
      setActiveBoxIndex(null);
      return;
    }

    const timer = setInterval(() => {
      setTimerSeconds(s => s - 1);
      if (timerSeconds <= 5) sound.playTick();
    }, 1000);

    return () => clearInterval(timer);
  }, [activeBoxIndex, timerSeconds]);

  // Buka Kotak Soal
  const handleOpenBox = (idx: number) => {
    const box = boxes[idx];
    if (box.lockedByTeamId !== null) return;

    sound.playClick();
    buzzerRef.reset();
    setActiveBoxIndex(idx);
    setTimerSeconds(30);
    setAnsweringTeamId(null);
    setFailedTeamsForBox(new Set());
    setBuzzerTieMessage(null);
    setSelectedOption(null);
  };

  // Tutup soal darurat tanpa denda (tombol "✕ Tutup")
  const handleEmergencyClose = () => {
    sound.playClick();
    buzzerRef.reset();
    setActiveBoxIndex(null);
  };

  // Wasit Buzzer: Kelompok menekan buzzer sudut
  const handleBuzzerHit = (teamId: number, e: PointerEvent) => {
    if (activeBoxIndex === null) return;
    if (answeringTeamId !== null) return; // sudah ada penentu
    const team = teams.find(t => t.id === teamId);
    if (!team || team.lives <= 0) return; // tim gugur
    if (failedTeamsForBox.has(teamId)) return; // tim ini sudah gagal untuk kotak ini

    const timeStamp = e.timeStamp;
    buzzerRef.registerHit(teamId, timeStamp, (winnerId, wasTie) => {
      sound.playBuzzer();
      setAnsweringTeamId(winnerId);
      if (wasTie) {
        setBuzzerTieMessage("Tekanan nyaris bersamaan — pemenang diundi sistem!");
      }
    });
  };

  // Guru menunjuk kelompok manual lewat tombol di kartu
  const handleTeacherSelectTeam = (teamId: number) => {
    if (answeringTeamId !== null) return;
    const team = teams.find(t => t.id === teamId);
    if (!team || team.lives <= 0 || failedTeamsForBox.has(teamId)) return;

    sound.playClick();
    setAnsweringTeamId(teamId);
  };

  // Jawaban Dipilih
  const handleChooseOption = (optionIdx: number) => {
    if (activeBoxIndex === null || answeringTeamId === null || selectedOption !== null) return;
    setSelectedOption(optionIdx);

    const activeBox = boxes[activeBoxIndex];
    const isCorrect = optionIdx === activeBox.soal.jawaban;

    if (isCorrect) {
      sound.playCorrect();
      setTimeout(() => {
        // Poin masuk, kotak terkunci warna tim
        setTeams(prev => prev.map(t => t.id === answeringTeamId ? { ...t, score: t.score + activeBox.points } : t));
        setBoxes(prev => prev.map(b => b.index === activeBoxIndex ? { ...b, lockedByTeamId: answeringTeamId } : b));
        setActiveBoxIndex(null);
      }, 700);
    } else {
      sound.playWrong();
      setTimeout(() => {
        // Nyawa berkurang 1, tim gugur untuk kotak ini
        setTeams(prev => prev.map(t => t.id === answeringTeamId ? { ...t, lives: Math.max(0, t.lives - 1) } : t));
        const nextFailed = new Set(failedTeamsForBox);
        nextFailed.add(answeringTeamId);
        setFailedTeamsForBox(nextFailed);

        // Cek apakah masih ada kelompok yang memiliki sisa nyawa
        const availableTeams = teams.filter(t => t.lives > 0 && !nextFailed.has(t.id));

        if (availableTeams.length === 0) {
          // Semua gugur! Kotak terkunci abu-abu
          setBoxes(prev => prev.map(b => b.index === activeBoxIndex ? { ...b, lockedByTeamId: 0 } : b));
          setActiveBoxIndex(null);
        } else {
          // Lempar ke tim lain: reset buzzer referee, aktifkan kembali buzzer
          buzzerRef.reset();
          setAnsweringTeamId(null);
          setSelectedOption(null);
          setBuzzerTieMessage(null);
        }
      }, 700);
    }
  };

  // Cek apakah game selesai (semua kotak terkunci atau semua nyawa habis)
  const isAllBoxesLocked = boxes.every(b => b.lockedByTeamId !== null);
  const isAllLivesDepleted = teams.every(t => t.lives <= 0);

  useEffect(() => {
    if (isAllBoxesLocked || isAllLivesDepleted) {
      setShowPodium(true);
    }
  }, [isAllBoxesLocked, isAllLivesDepleted]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-[1.5vmin] z-10">
      {/* Top Bar Header */}
      <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 px-[2vmin] py-[0.8vmin] rounded-2xl z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1 px-[1.5vmin] py-[0.6vmin] rounded-xl bg-slate-800 text-slate-200 text-[1.4vmin] font-semibold border border-slate-700 active:scale-95"
          >
            <Home className="w-[1.8vmin] h-[1.8vmin]" /> Menu
          </button>
          <span className="text-[1.8vmin] font-extrabold text-rose-400">
            KUIS REBUTAN 4 KELOMPOK (40 KOTAK)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPodium(true)}
            className="flex items-center gap-2 px-[2vmin] py-[0.6vmin] rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[1.4vmin] font-bold active:scale-95"
          >
            <Award className="w-[1.8vmin] h-[1.8vmin]" /> Akhiri & Lihat Juara
          </button>
        </div>
      </div>

      {/* 4 Team Corner Buzzer Panels (Top-Left, Top-Right, Bottom-Left, Bottom-Right) */}
      {/* Top-Left: Kelompok 1 */}
      <div className="absolute top-[8vmin] left-[2vmin] z-40">
        <CornerTeamPanel team={teams[0]} onBuzzer={(e) => handleBuzzerHit(1, e)} isAnswering={answeringTeamId === 1} isFailedForBox={failedTeamsForBox.has(1)} />
      </div>

      {/* Top-Right: Kelompok 2 */}
      <div className="absolute top-[8vmin] right-[2vmin] z-40">
        <CornerTeamPanel team={teams[1]} onBuzzer={(e) => handleBuzzerHit(2, e)} isAnswering={answeringTeamId === 2} isFailedForBox={failedTeamsForBox.has(2)} />
      </div>

      {/* Bottom-Left: Kelompok 3 */}
      <div className="absolute bottom-[2vmin] left-[2vmin] z-40">
        <CornerTeamPanel team={teams[2]} onBuzzer={(e) => handleBuzzerHit(3, e)} isAnswering={answeringTeamId === 3} isFailedForBox={failedTeamsForBox.has(3)} />
      </div>

      {/* Bottom-Right: Kelompok 4 */}
      <div className="absolute bottom-[2vmin] right-[2vmin] z-40">
        <CornerTeamPanel team={teams[3]} onBuzzer={(e) => handleBuzzerHit(4, e)} isAnswering={answeringTeamId === 4} isFailedForBox={failedTeamsForBox.has(4)} />
      </div>

      {/* 40-Grid Arena (8 Cols x 5 Rows) centered in between corner buzzers */}
      <div className="flex-1 flex items-center justify-center p-[2vmin] z-20">
        <div className="w-[70vw] max-w-5xl h-[68vh] grid grid-cols-8 grid-rows-5 gap-[1vmin] bg-slate-900/60 p-[1.5vmin] rounded-3xl border-2 border-slate-800 shadow-2xl">
          {boxes.map(box => {
            const isLocked = box.lockedByTeamId !== null;
            let cellStyle = 'bg-slate-800/90 border-slate-700 hover:border-slate-500 hover:scale-[1.02] text-white';

            if (isLocked) {
              if (box.lockedByTeamId === 0) {
                // Hangus / Abu-abu
                cellStyle = 'bg-slate-900 border-slate-800 text-slate-600 opacity-60 pointer-events-none';
              } else {
                const lockTeam = teams.find(t => t.id === box.lockedByTeamId);
                cellStyle = `${lockTeam?.bgGlowClass} ${lockTeam?.borderClass} ${lockTeam?.colorClass} font-black pointer-events-none`;
              }
            }

            return (
              <button
                key={box.index}
                disabled={isLocked}
                onClick={() => handleOpenBox(box.index)}
                className={`rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-150 active:scale-95 shadow-md ${cellStyle}`}
              >
                <span className="text-[2.2vmin] font-extrabold">
                  {box.points}
                </span>
                <span className="text-[1vmin] uppercase font-bold tracking-wider opacity-75">
                  {isLocked ? (box.lockedByTeamId === 0 ? "HANGUS" : `K${box.lockedByTeamId}`) : "POIN"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Center Question Modal (Backdrop has pointer-events: none so corners remain clickable!) */}
      {activeBoxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-[4vmin]">
          <div className="w-[75vw] max-w-4xl bg-slate-900/95 border-4 border-amber-400/90 rounded-3xl p-[3.5vmin] shadow-2xl pointer-events-auto flex flex-col justify-between max-h-[85vh]">
            {/* Header: Points, Timer, Close Button */}
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div className="flex items-center gap-3">
                <span className="px-[2vmin] py-[0.6vmin] rounded-xl bg-amber-500 text-slate-950 font-black text-[2vmin]">
                  {boxes[activeBoxIndex].points} Poin
                </span>
                <span className="text-[1.6vmin] text-slate-400 font-semibold">
                  {boxes[activeBoxIndex].soal.kategori}
                </span>
              </div>

              {/* 30s Countdown timer (turns red and pulses at <= 5s) */}
              <div className={`px-[2.5vmin] py-[0.8vmin] rounded-2xl font-mono text-[2.6vmin] font-black border-2 ${
                timerSeconds <= 5
                  ? 'bg-rose-950 text-rose-400 border-rose-500 animate-pulse'
                  : 'bg-slate-800 text-white border-slate-600'
              }`}>
                ⏱ {timerSeconds}s
              </div>

              <button
                onClick={handleEmergencyClose}
                title="Tutup tanpa denda (salah sentuh)"
                className="px-[1.5vmin] py-[0.6vmin] rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[1.4vmin] font-bold border border-slate-600 active:scale-95"
              >
                ✕ Tutup
              </button>
            </div>

            {/* Question Text */}
            <p className="text-[3vmin] font-extrabold text-white my-[2vmin] leading-relaxed text-center">
              {boxes[activeBoxIndex].soal.pertanyaan}
            </p>

            {/* Buzzer / Answering Team Status Bar */}
            <div className="p-[1.8vmin] rounded-2xl bg-slate-800/80 border border-slate-700 mb-[2vmin] text-center">
              {answeringTeamId === null ? (
                <div>
                  <div className="text-[2vmin] font-extrabold text-amber-400 animate-pulse">
                    🔔 TEKAN BUZZER KELOMPOK DI SUDUT LAYAR UNTUK MENJAWAB!
                  </div>
                  {buzzerTieMessage && (
                    <div className="text-[1.4vmin] text-cyan-300 font-bold mt-1">
                      {buzzerTieMessage}
                    </div>
                  )}
                  {/* Teacher Quick Selector Buttons */}
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-[1.3vmin] text-slate-400">Atau pilih manual guru:</span>
                    {teams.map(t => {
                      const isFailed = failedTeamsForBox.has(t.id);
                      const isDead = t.lives <= 0;
                      return (
                        <button
                          key={t.id}
                          disabled={isFailed || isDead}
                          onClick={() => handleTeacherSelectTeam(t.id)}
                          className={`px-[1.6vmin] py-[0.5vmin] rounded-xl text-[1.3vmin] font-bold border ${t.borderClass} ${
                            isFailed || isDead ? 'opacity-30 bg-slate-900' : 'bg-slate-800 hover:bg-slate-700'
                          }`}
                        >
                          {t.name} ({'❤️'.repeat(t.lives)})
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <span className="text-[2.2vmin] font-black text-emerald-400">
                    🎯 Penjawab: {teams.find(t => t.id === answeringTeamId)?.name}
                  </span>
                  <span className="text-[1.4vmin] text-slate-400">
                    (Silakan sentuh opsi jawaban)
                  </span>
                </div>
              )}
            </div>

            {/* Answer Options Grid (Active only after answering team is determined) */}
            <div className="grid grid-cols-2 gap-[1.5vmin]">
              {boxes[activeBoxIndex].soal.opsi.map((op, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === boxes[activeBoxIndex].soal.jawaban;
                let btnStyle = 'bg-slate-800 text-slate-200 border-slate-700 hover:border-slate-500';

                if (answeringTeamId === null) {
                  btnStyle = 'bg-slate-900/50 text-slate-500 border-slate-800 opacity-60 cursor-not-allowed';
                } else if (isSelected) {
                  btnStyle = isCorrect
                    ? 'bg-emerald-600 border-emerald-400 text-white font-bold scale-[1.02]'
                    : 'bg-rose-600 border-rose-400 text-white font-bold';
                }

                return (
                  <button
                    key={idx}
                    disabled={answeringTeamId === null || selectedOption !== null}
                    onClick={() => handleChooseOption(idx)}
                    className={`p-[2vmin] rounded-2xl border-2 text-[1.8vmin] font-semibold text-left flex items-center gap-3 transition-all min-h-[7vmin] ${btnStyle}`}
                  >
                    <span className="w-[3.5vmin] h-[3.5vmin] rounded-xl bg-slate-900 flex items-center justify-center font-bold text-[1.6vmin]">
                      {['A', 'B', 'C', 'D'][idx]}
                    </span>
                    <span className="line-clamp-2">{op}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Podium Leaderboard Modal */}
      {showPodium && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-[4vmin]">
          <div className="w-[90vw] max-w-2xl bg-slate-900 border-4 border-amber-400 rounded-3xl p-[4vmin] text-center shadow-2xl">
            <Trophy className="w-[12vmin] h-[12vmin] text-amber-400 mx-auto mb-2 animate-bounce" />
            <h3 className="text-[3.8vmin] font-extrabold text-white mb-4">
              Papan Juara Kuis Rebutan
            </h3>

            {/* Ranking List */}
            <div className="space-y-[1.5vmin] mb-[4vmin]">
              {[...teams]
                .sort((a, b) => b.score - a.score)
                .map((t, rank) => (
                  <div
                    key={t.id}
                    className={`flex items-center justify-between p-[2vmin] rounded-2xl border-2 ${t.borderClass} ${t.bgGlowClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-[4vmin] h-[4vmin] rounded-full bg-slate-900 flex items-center justify-center font-black text-[2vmin] text-white">
                        {rank === 0 ? "🥇" : rank === 1 ? "🥈" : rank === 2 ? "🥉" : "4"}
                      </span>
                      <span className={`text-[2.2vmin] font-extrabold ${t.colorClass}`}>
                        {t.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-[1.6vmin] text-slate-300">
                        Sisa Nyawa: {'❤️'.repeat(t.lives) || '💀'}
                      </span>
                      <span className="text-[2.6vmin] font-black text-white">
                        {t.score} Poin
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowPodium(false);
                  // Reset game
                  setTeams(prev => prev.map(t => ({ ...t, score: 0, lives: 3 })));
                  setBoxes(prev => prev.map(b => ({ ...b, lockedByTeamId: null, soal: bankManager.getNextSoal('quiz_rush') })));
                }}
                className="px-[3.5vmin] py-[1.5vmin] rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-[2vmin] shadow-lg active:scale-95"
              >
                Main Ulang
              </button>
              <button
                onClick={onBack}
                className="px-[3.5vmin] py-[1.5vmin] rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[2vmin] border border-slate-600 active:scale-95"
              >
                Menu Utama
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Corner Team Panel with Large Round BUZZER */
interface CornerTeamPanelProps {
  team: TeamState;
  onBuzzer: (e: PointerEvent) => void;
  isAnswering: boolean;
  isFailedForBox: boolean;
}

function CornerTeamPanel({ team, onBuzzer, isAnswering, isFailedForBox }: CornerTeamPanelProps) {
  const buzzerBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!buzzerBtnRef.current) return;
    return bindInteractiveButton(buzzerBtnRef.current, {
      onPress: (e) => onBuzzer(e),
    });
  }, [onBuzzer]);

  const isDead = team.lives <= 0;

  return (
    <div className={`p-[1.5vmin] rounded-3xl bg-slate-900/95 border-2 ${team.borderClass} ${team.bgGlowClass} shadow-xl flex flex-col items-center gap-[1vmin] w-[20vmin] transition-all ${
      isDead ? 'opacity-40 grayscale' : ''
    }`}>
      {/* Team Info */}
      <div className="text-center w-full">
        <h4 className={`text-[1.8vmin] font-extrabold ${team.colorClass}`}>
          {team.name}
        </h4>
        <div className="flex items-center justify-center gap-1 my-[0.4vmin] text-[1.4vmin]">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className={i < team.lives ? "text-rose-500" : "text-slate-600"}>
              {i < team.lives ? "❤️" : "🖤"}
            </span>
          ))}
        </div>
        <div className="text-[2.2vmin] font-black text-white">
          {team.score} <span className="text-[1.2vmin] text-slate-400 font-normal">pts</span>
        </div>
      </div>

      {/* Large Round BUZZER Button (±10 vmin, strictly circular) */}
      <button
        ref={buzzerBtnRef}
        disabled={isDead || isFailedForBox}
        className={`w-[11vmin] h-[11vmin] rounded-full border-4 shadow-2xl flex flex-col items-center justify-center active:scale-95 active:translate-y-1 transition-all ${
          isAnswering
            ? 'bg-emerald-500 border-white text-slate-950 ring-4 ring-emerald-400 animate-pulse font-black'
            : isDead || isFailedForBox
            ? 'bg-slate-800 border-slate-700 text-slate-600 cursor-not-allowed'
            : `${team.borderClass} bg-gradient-to-b from-slate-800 to-slate-900 text-white hover:brightness-125`
        }`}
      >
        <Zap className="w-[4vmin] h-[4vmin] mb-[-0.5vmin]" />
        <span className="text-[1.4vmin] font-black tracking-wider uppercase">
          BUZZER
        </span>
      </button>

      {isFailedForBox && !isDead && (
        <span className="text-[1.1vmin] text-rose-400 font-bold bg-rose-950/80 px-2 py-0.5 rounded-full">
          Gugur di Kotak Ini
        </span>
      )}
    </div>
  );
}
