/**
 * Generator Labirin Sempurna (Perfect Maze) via Recursive Backtracker
 * & Penempatan Gerbang Kuis dengan Verifikasi BFS.
 */

export interface MazeConfig {
  level: number;
  width: number;  // Harus ganjil: e.g. 13
  height: number; // Harus ganjil: e.g. 9
  gateCount: number;
}

export const MAZE_LEVELS: MazeConfig[] = [
  { level: 1, width: 13, height: 9, gateCount: 2 },
  { level: 2, width: 15, height: 11, gateCount: 3 },
  { level: 3, width: 19, height: 13, gateCount: 5 },
];

export interface MazeData {
  width: number;
  height: number;
  grid: string[][]; // '#' | '.' | 'S' | 'G' | 'F'
  start: { x: number; y: number };
  finish: { x: number; y: number };
  gatePositions: { x: number; y: number; id: number }[];
  solutionPath: { x: number; y: number }[];
}

export class MazeGenerator {
  public static generate(config: MazeConfig): MazeData {
    const { width, height, gateCount } = config;

    // Inisialisasi grid penuh dinding '#'
    const grid: string[][] = Array.from({ length: height }, () =>
      Array(width).fill('#')
    );

    // Titik awal & titik akhir (koordinat ganjil)
    const start = { x: 1, y: 1 };
    const finish = { x: width - 2, y: height - 2 };

    // 1. Recursive Backtracker untuk Perfect Maze
    const stack: { x: number; y: number }[] = [];
    grid[start.y][start.x] = '.';
    stack.push(start);

    const dirs = [
      { dx: 0, dy: -2 }, // Atas
      { dx: 2, dy: 0 },  // Kanan
      { dx: 0, dy: 2 },  // Bawah
      { dx: -2, dy: 0 }, // Kiri
    ];

    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const neighbors: { x: number; y: number; wallX: number; wallY: number }[] = [];

      // Acak arah agar labirin selalu bervariasi
      const shuffledDirs = [...dirs].sort(() => Math.random() - 0.5);

      for (const d of shuffledDirs) {
        const nx = current.x + d.dx;
        const ny = current.y + d.dy;

        if (nx > 0 && nx < width - 1 && ny > 0 && ny < height - 1 && grid[ny][nx] === '#') {
          neighbors.push({
            x: nx,
            y: ny,
            wallX: current.x + d.dx / 2,
            wallY: current.y + d.dy / 2,
          });
        }
      }

      if (neighbors.length > 0) {
        const next = neighbors[0];
        grid[next.wallY][next.wallX] = '.';
        grid[next.y][next.x] = '.';
        stack.push({ x: next.x, y: next.y });
      } else {
        stack.pop();
      }
    }

    // 2. Cari jalur utama dari Start ke Finish dengan BFS
    const solutionPath = this.findPath(grid, width, height, start, finish);

    // 3. Pasang gerbang ('G') merata di sepanjang jalur utama
    // Gerbang tidak boleh di titik start atau finish
    const validGateIndices: number[] = [];
    const minStep = 2;
    const maxStep = solutionPath.length - 3;
    const stepInterval = Math.max(2, Math.floor((maxStep - minStep) / (gateCount + 1)));

    for (let i = 1; i <= gateCount; i++) {
      const idx = Math.min(maxStep, minStep + i * stepInterval);
      validGateIndices.push(idx);
    }

    const gatePositions: { x: number; y: number; id: number }[] = [];
    validGateIndices.forEach((pathIdx, gateIdx) => {
      const pos = solutionPath[pathIdx];
      grid[pos.y][pos.x] = 'G';
      gatePositions.push({ x: pos.x, y: pos.y, id: gateIdx });
    });

    grid[start.y][start.x] = 'S';
    grid[finish.y][finish.x] = 'F';

    // 4. Verifikasi dengan BFS bahwa Finish TIDAK terjangkau jika gerbang tertutup
    const reachableWithoutGates = this.canReachFinishWithoutGates(grid, width, height, start, finish);
    if (reachableWithoutGates) {
      // Regenerate jika ada celah loop tak terduga
      return this.generate(config);
    }

    return {
      width,
      height,
      grid,
      start,
      finish,
      gatePositions,
      solutionPath,
    };
  }

  private static findPath(
    grid: string[][],
    w: number,
    h: number,
    start: { x: number; y: number },
    target: { x: number; y: number }
  ): { x: number; y: number }[] {
    const queue: { x: number; y: number; path: { x: number; y: number }[] }[] = [];
    const visited = Array.from({ length: h }, () => Array(w).fill(false));

    queue.push({ x: start.x, y: start.y, path: [start] });
    visited[start.y][start.x] = true;

    const dirs = [
      { dx: 0, dy: -1 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
    ];

    while (queue.length > 0) {
      const { x, y, path } = queue.shift()!;
      if (x === target.x && y === target.y) {
        return path;
      }

      for (const d of dirs) {
        const nx = x + d.dx;
        const ny = y + d.dy;

        if (nx >= 0 && nx < w && ny >= 0 && ny < h && !visited[ny][nx] && grid[ny][nx] !== '#') {
          visited[ny][nx] = true;
          queue.push({ x: nx, y: ny, path: [...path, { x: nx, y: ny }] });
        }
      }
    }

    return [];
  }

  /**
   * BFS untuk memastikan Finis mustahil dicapai jika sel 'G' dianggap dinding
   */
  private static canReachFinishWithoutGates(
    grid: string[][],
    w: number,
    h: number,
    start: { x: number; y: number },
    finish: { x: number; y: number }
  ): boolean {
    const queue: { x: number; y: number }[] = [start];
    const visited = Array.from({ length: h }, () => Array(w).fill(false));
    visited[start.y][start.x] = true;

    const dirs = [
      { dx: 0, dy: -1 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
    ];

    while (queue.length > 0) {
      const { x, y } = queue.shift()!;
      if (x === finish.x && y === finish.y) {
        return true; // Berhasil tembus tanpa buka gerbang (tidak sah)
      }

      for (const d of dirs) {
        const nx = x + d.dx;
        const ny = y + d.dy;

        // Gerbang 'G' dan dinding '#' dianggap terhalang
        if (
          nx >= 0 &&
          nx < w &&
          ny >= 0 &&
          ny < h &&
          !visited[ny][nx] &&
          grid[ny][nx] !== '#' &&
          grid[ny][nx] !== 'G'
        ) {
          visited[ny][nx] = true;
          queue.push({ x: nx, y: ny });
        }
      }
    }

    return false; // Aman: Finis tidak bisa dijangkau tanpa buka gerbang
  }
}
