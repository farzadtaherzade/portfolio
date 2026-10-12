"use client";

import { useEffect, useRef } from "react";

interface CoffeePlatformerProps {
  onClose: () => void;
}

interface Player {
  x: number;
  y: number;
  vy: number;
  width: number;
  height: number;
  onGround: boolean;
}

interface Coffee {
  x: number;
  y: number;
  collected: boolean;
  width: number;
  height: number;
}

interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
}

const GAME_WIDTH = 720;
const GAME_HEIGHT = 360;
const PLAYER_SIZE = 16;
const COFFEE_SIZE = 12;
const GRAVITY = 0.5;
const JUMP_FORCE = -9;
const MOVE_SPEED = 3;

export default function CoffeePlatformer({ onClose }: CoffeePlatformerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<Player>({
    x: 20,
    y: 200,
    vy: 0,
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
    onGround: false,
  });
  const keysRef = useRef<Record<string, boolean>>({});
  const coffeesRef = useRef<Coffee[]>([]);
  const platformsRef = useRef<Platform[]>([]);
  const scoreRef = useRef(0);
  const gameLoopRef = useRef<number | null>(null);
  const runningRef = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Grab keyboard focus immediately so the game responds without a click.
  // This matters inside iframes / preview panels where focus starts on the parent.
  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.focus({ preventScroll: true });
      try {
        window.focus();
      } catch {}
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reset loop state on every (re)mount. React StrictMode mounts effects
    // twice in dev: the first cleanup sets running=false, and without this
    // reset the game would freeze after rendering a single frame.
    runningRef.current = true;
    scoreRef.current = 0;

    ctx.imageSmoothingEnabled = false;

    // Define platforms
    platformsRef.current = [
      { x: 0, y: 340, width: 720, height: 20 }, // floor
      { x: 80, y: 280, width: 80, height: 8 },
      { x: 200, y: 230, width: 80, height: 8 },
      { x: 340, y: 280, width: 80, height: 8 },
      { x: 460, y: 200, width: 80, height: 8 },
      { x: 580, y: 280, width: 80, height: 8 },
      { x: 200, y: 150, width: 60, height: 8 },
      { x: 340, y: 130, width: 60, height: 8 },
    ];

    // Place coffee cups on platforms
    coffeesRef.current = [
      { x: 110, y: 264, collected: false, width: COFFEE_SIZE, height: COFFEE_SIZE },
      { x: 230, y: 214, collected: false, width: COFFEE_SIZE, height: COFFEE_SIZE },
      { x: 370, y: 264, collected: false, width: COFFEE_SIZE, height: COFFEE_SIZE },
      { x: 490, y: 184, collected: false, width: COFFEE_SIZE, height: COFFEE_SIZE },
      { x: 610, y: 264, collected: false, width: COFFEE_SIZE, height: COFFEE_SIZE },
      { x: 220, y: 134, collected: false, width: COFFEE_SIZE, height: COFFEE_SIZE },
      { x: 360, y: 114, collected: false, width: COFFEE_SIZE, height: COFFEE_SIZE },
    ];

    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
      if (
        e.key === " " ||
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "w" ||
        e.key === "a" ||
        e.key === "s" ||
        e.key === "d"
      ) {
        e.preventDefault();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const update = () => {
      if (!runningRef.current) return;

      const p = playerRef.current;

      // Horizontal movement
      if (keysRef.current["ArrowLeft"] || keysRef.current["a"]) {
        p.x -= MOVE_SPEED;
      }
      if (keysRef.current["ArrowRight"] || keysRef.current["d"]) {
        p.x += MOVE_SPEED;
      }
      if (p.x < 0) p.x = 0;
      if (p.x + p.width > GAME_WIDTH) p.x = GAME_WIDTH - p.width;

      // Jump
      if ((keysRef.current[" "] || keysRef.current["ArrowUp"] || keysRef.current["w"]) && p.onGround) {
        p.vy = JUMP_FORCE;
        p.onGround = false;
      }

      // Gravity
      p.vy += GRAVITY;
      p.y += p.vy;

      // Platform collision
      p.onGround = false;
      for (const plat of platformsRef.current) {
        if (
          p.x + p.width > plat.x &&
          p.x < plat.x + plat.width &&
          p.y + p.height > plat.y &&
          p.y + p.height < plat.y + plat.height + p.vy + 2 &&
          p.vy >= 0
        ) {
          p.y = plat.y - p.height;
          p.vy = 0;
          p.onGround = true;
        }
      }

      // Fall off bottom
      if (p.y > GAME_HEIGHT) {
        p.x = 20;
        p.y = 200;
        p.vy = 0;
      }

      // Coffee collection
      for (const c of coffeesRef.current) {
        if (!c.collected) {
          if (
            p.x < c.x + c.width &&
            p.x + p.width > c.x &&
            p.y < c.y + c.height &&
            p.y + p.height > c.y
          ) {
            c.collected = true;
            scoreRef.current++;
          }
        }
      }
    };

    const draw = () => {
      // Background
      ctx.fillStyle = "#151227";
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      // Atmospheric gradient (layered rects)
      ctx.fillStyle = "#1e1a35";
      ctx.fillRect(0, 0, GAME_WIDTH, 240);
      ctx.fillStyle = "#2a2444";
      ctx.fillRect(0, 0, GAME_WIDTH, 120);

      // Stars
      ctx.fillStyle = "#c4c0d8";
      const starPositions = [
        [50, 30], [120, 50], [200, 25], [280, 40], [350, 60],
        [430, 35], [500, 50], [580, 25], [650, 45], [90, 70],
        [310, 80], [470, 75], [620, 80],
      ];
      starPositions.forEach(([x, y]) => {
        ctx.fillRect(x, y, 2, 2);
      });

      // Moon
      ctx.fillStyle = "rgba(232, 168, 56, 0.15)";
      ctx.fillRect(580, 20, 40, 40);
      ctx.fillStyle = "rgba(232, 168, 56, 0.3)";
      ctx.fillRect(588, 28, 24, 24);

      // Platforms
      for (const plat of platformsRef.current) {
        ctx.fillStyle = "#3a3458";
        ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
        ctx.fillStyle = "#2d8a76";
        ctx.globalAlpha = 0.3;
        ctx.fillRect(plat.x, plat.y, plat.width, 2);
        ctx.globalAlpha = 1;
      }

      // Coffee cups
      for (const c of coffeesRef.current) {
        if (!c.collected) {
          // Cup body
          ctx.fillStyle = "#e06c75";
          ctx.fillRect(c.x, c.y, c.width, c.height);
          // Coffee top
          ctx.fillStyle = "#b07d28";
          ctx.fillRect(c.x + 1, c.y + 1, c.width - 2, 3);
          // Steam
          ctx.fillStyle = "rgba(196, 192, 216, 0.3)";
          ctx.fillRect(c.x + 3, c.y - 4, 1, 4);
          ctx.fillRect(c.x + 7, c.y - 6, 1, 6);
        }
      }

      // Player (pixel Farzad)
      const p = playerRef.current;
      // Hoodie
      ctx.fillStyle = "#1e1a35";
      ctx.fillRect(p.x, p.y, p.width, p.height);
      ctx.fillStyle = "#2a2444";
      ctx.fillRect(p.x + 2, p.y + 2, p.width - 4, p.height - 4);
      // Headphones
      ctx.fillStyle = "#4ec9b0";
      ctx.fillRect(p.x, p.y, 3, 5);
      ctx.fillRect(p.x + p.width - 3, p.y, 3, 5);
      ctx.fillRect(p.x + 3, p.y - 1, p.width - 6, 2);
      // Skin
      ctx.fillStyle = "#e8a838";
      ctx.fillRect(p.x + 4, p.y + 2, p.width - 8, 4);
      // Eyes
      ctx.fillStyle = "#151227";
      ctx.fillRect(p.x + 5, p.y + 4, 2, 1);
      ctx.fillRect(p.x + 9, p.y + 4, 2, 1);

      // Score
      ctx.fillStyle = "#e8a838";
      ctx.font = '10px "Press Start 2P", monospace';
      ctx.fillText(`COFFEE: ${scoreRef.current}/${coffeesRef.current.length}`, 10, 20);

      // Win check
      if (scoreRef.current >= coffeesRef.current.length) {
        ctx.fillStyle = "rgba(13, 11, 26, 0.8)";
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        ctx.fillStyle = "#e8a838";
        ctx.font = '16px "Press Start 2P", monospace';
        ctx.textAlign = "center";
        ctx.fillText("CAFFEINE OVERLOAD!", GAME_WIDTH / 2, GAME_HEIGHT / 2);
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.fillStyle = "#4ec9b0";
        ctx.fillText("You collected all the coffee", GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30);
        ctx.fillStyle = "#c4c0d8";
        ctx.fillText("Press R to restart", GAME_WIDTH / 2, GAME_HEIGHT / 2 + 50);
        ctx.textAlign = "left";
      }
    };

    const loop = () => {
      update();
      draw();
      if (runningRef.current) {
        gameLoopRef.current = requestAnimationFrame(loop);
      }
    };
    loop();

    const handleRestart = (e: KeyboardEvent) => {
      if (e.key === "r" || e.key === "R") {
        scoreRef.current = 0;
        playerRef.current = { x: 20, y: 200, vy: 0, width: PLAYER_SIZE, height: PLAYER_SIZE, onGround: false };
        coffeesRef.current.forEach((c) => (c.collected = false));
      }
    };
    window.addEventListener("keydown", handleRestart);

    return () => {
      runningRef.current = false;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("keydown", handleRestart);
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, []);

  const holdKey = (key: string, down: boolean) => {
    keysRef.current[key] = down;
  };

  const tapKey = (key: string, ms = 160) => {
    keysRef.current[key] = true;
    setTimeout(() => {
      keysRef.current[key] = false;
    }, ms);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 overflow-y-auto"
      style={{ background: "rgba(13, 11, 26, 0.92)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={containerRef}
        tabIndex={-1}
        className="pixel-card p-3 sm:p-4 w-full max-w-3xl my-auto outline-none"
        style={{
          borderColor: "var(--accent-amber)",
          boxShadow: "0 0 40px rgba(232,168,56,0.15)",
        }}
      >
        <div className="flex justify-between items-center mb-3 gap-2">
          <h3 className="font-pixel text-xs sm:text-sm text-accent-amber">COFFEE QUEST</h3>
          <button
            onClick={onClose}
            className="font-mono text-lg text-text-secondary hover:text-accent-red cursor-pointer transition-colors duration-200 px-2"
            aria-label="Close game"
          >
            [x]
          </button>
        </div>

        <canvas
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          className="w-full h-auto block border border-border-mid"
          style={{ imageRendering: "pixelated" }}
        />

        {/* Touch controls (mobile / tablet) */}
        <div className="grid grid-cols-3 gap-2 mt-3 sm:hidden select-none">
          <button
            className="pixel-card py-4 font-pixel text-xs text-accent-cyan active:border-accent-amber cursor-pointer touch-none"
            onPointerDown={() => holdKey("ArrowLeft", true)}
            onPointerUp={() => holdKey("ArrowLeft", false)}
            onPointerLeave={() => holdKey("ArrowLeft", false)}
            onPointerCancel={() => holdKey("ArrowLeft", false)}
            aria-label="Move left"
          >
            {"<"}
          </button>
          <button
            className="pixel-card py-4 font-pixel text-xs text-accent-amber active:border-accent-amber cursor-pointer touch-none"
            onPointerDown={() => tapKey(" ")}
            aria-label="Jump"
          >
            JUMP
          </button>
          <button
            className="pixel-card py-4 font-pixel text-xs text-accent-cyan active:border-accent-amber cursor-pointer touch-none"
            onPointerDown={() => holdKey("ArrowRight", true)}
            onPointerUp={() => holdKey("ArrowRight", false)}
            onPointerLeave={() => holdKey("ArrowRight", false)}
            onPointerCancel={() => holdKey("ArrowRight", false)}
            aria-label="Move right"
          >
            {">"}
          </button>
        </div>

        <p className="font-mono text-sm sm:text-base text-text-secondary mt-3 text-center">
          Arrow keys / A-D to move. Space / W / Up to jump. R to restart.
        </p>
      </div>
    </div>
  );
}
