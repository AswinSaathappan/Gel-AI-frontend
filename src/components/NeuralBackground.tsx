import { useEffect, useRef } from 'react';

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    /* ---------------- Image Processing Waves ---------------- */
    const waveLines: { y: number; offset: number; speed: number }[] = [];
    for (let i = 0; i < 10; i++) {
      waveLines.push({
        y: (canvas.height / 11) * (i + 1),
        offset: Math.random() * canvas.width,
        speed: 0.4 + Math.random() * 0.3
      });
    }

    /* ---------------- Neural Network Nodes ---------------- */
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      opacity: number;
    }[] = [];

    const NODE_COUNT = 32;

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        opacity: 0.25 + Math.random() * 0.2
      });
    }

    let animationId: number;
    let t = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.01;

      /* ---------- Image Processing Waves ---------- */
      waveLines.forEach((wave) => {
        wave.offset += wave.speed;
        if (wave.offset > canvas.width) wave.offset = 0;

        ctx.strokeStyle = 'rgba(143, 191, 180, 0.22)';
        ctx.lineWidth = 2.4;
        ctx.beginPath();

        for (let x = 0; x < canvas.width; x += 6) {
          const y = wave.y + Math.sin((x + wave.offset) * 0.01) * 14;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      /* ---------- Neural Connections FIRST ---------- */
      nodes.forEach((n1, i) => {
        nodes.forEach((n2, j) => {
          if (i >= j) return;

          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 260) {
            const alpha = (1 - dist / 260) * 0.25;

            ctx.strokeStyle = `rgba(125, 211, 199, ${alpha})`;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        });
      });

      /* ---------- Neural Nodes ---------- */
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Glow effect
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(143, 191, 180, ${node.opacity})`;
        ctx.shadowBlur = 18;
        ctx.shadowColor = 'rgba(143, 191, 180, 0.7)';
        ctx.fill();

        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        opacity: 1,
        zIndex: 0
      }}
    />
  );
}
