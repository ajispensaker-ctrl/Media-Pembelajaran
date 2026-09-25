/**
 * Helper Multi-Touch & Pointer Events untuk Papan Interaktif Digital (IFP)
 * Memastikan respons simultan tanpa konflik antar jari/siswa.
 */

export interface PressOptions {
  onPress: (e: PointerEvent) => void;
  onRelease?: (e: PointerEvent) => void;
  repeatIntervalMs?: number; // Jika ada repeat misal D-pad (190ms)
}

export function bindInteractiveButton(
  element: HTMLElement,
  options: PressOptions
): () => void {
  const activePointers = new Set<number>();
  let repeatTimer: number | null = null;

  const handlePointerDown = (e: PointerEvent) => {
    // Abaikan jika bukan tombol primer / sentuhan
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    
    // Multi-touch isolation: catat pointerId
    activePointers.add(e.pointerId);
    
    try {
      element.setPointerCapture(e.pointerId);
    } catch {
      // Fallback aman jika perangkat tidak mendukung pointer capture
    }

    element.classList.add('btn-pressed');
    options.onPress(e);

    // Jika tombol mendukung ditahan (contoh D-pad labirin)
    if (options.repeatIntervalMs && options.repeatIntervalMs > 0) {
      if (repeatTimer) clearInterval(repeatTimer);
      repeatTimer = window.setInterval(() => {
        if (activePointers.size > 0) {
          options.onPress(e);
        }
      }, options.repeatIntervalMs);
    }
  };

  const handlePointerUp = (e: PointerEvent) => {
    activePointers.delete(e.pointerId);
    if (activePointers.size === 0) {
      element.classList.remove('btn-pressed');
      if (repeatTimer) {
        clearInterval(repeatTimer);
        repeatTimer = null;
      }
      options.onRelease?.(e);
    }
  };

  const handlePointerCancel = (e: PointerEvent) => {
    activePointers.delete(e.pointerId);
    if (activePointers.size === 0) {
      element.classList.remove('btn-pressed');
      if (repeatTimer) {
        clearInterval(repeatTimer);
        repeatTimer = null;
      }
      options.onRelease?.(e);
    }
  };

  element.addEventListener('pointerdown', handlePointerDown);
  element.addEventListener('pointerup', handlePointerUp);
  element.addEventListener('pointercancel', handlePointerCancel);
  element.addEventListener('lostpointercapture', handlePointerCancel);

  // Return unbinder cleanup function
  return () => {
    if (repeatTimer) clearInterval(repeatTimer);
    element.removeEventListener('pointerdown', handlePointerDown);
    element.removeEventListener('pointerup', handlePointerUp);
    element.removeEventListener('pointercancel', handlePointerCancel);
    element.removeEventListener('lostpointercapture', handlePointerCancel);
  };
}

/**
 * Wasit Buzzer Cerdas (12 ms window)
 * Tekanan pertama membuka jendela 12 ms. Tekanan dalam 12 ms diundi acak.
 */
export interface BuzzerAttempt {
  teamId: number;
  timeStamp: number;
}

export class BuzzerReferee {
  private windowDurationMs = 12;
  private firstHitTime: number | null = null;
  private candidateHits: BuzzerAttempt[] = [];
  private decisionTimer: number | null = null;
  private isLocked: boolean = false;

  public registerHit(
    teamId: number,
    timeStamp: number,
    onDecided: (winnerTeamId: number, wasTie: boolean) => void
  ): boolean {
    if (this.isLocked) return false;

    if (this.firstHitTime === null) {
      // Hit pertama!
      this.firstHitTime = timeStamp;
      this.candidateHits = [{ teamId, timeStamp }];

      // Buka jendela 12 ms
      this.decisionTimer = window.setTimeout(() => {
        this.isLocked = true;
        if (this.candidateHits.length === 1) {
          onDecided(this.candidateHits[0].teamId, false);
        } else {
          // Undi acak dari kandidat dalam jendela 12ms
          const picked = this.candidateHits[Math.floor(Math.random() * this.candidateHits.length)];
          onDecided(picked.teamId, true);
        }
      }, this.windowDurationMs);

      return true;
    } else {
      // Cek apakah masih dalam rentang 12ms
      if (timeStamp - this.firstHitTime <= this.windowDurationMs) {
        // Cek belum ada tim yang sama
        if (!this.candidateHits.some(c => c.teamId === teamId)) {
          this.candidateHits.push({ teamId, timeStamp });
        }
        return true;
      } else {
        // Terlambat setelah 12ms
        return false;
      }
    }
  }

  public reset(): void {
    if (this.decisionTimer) {
      clearTimeout(this.decisionTimer);
      this.decisionTimer = null;
    }
    this.firstHitTime = null;
    this.candidateHits = [];
    this.isLocked = false;
  }
}
