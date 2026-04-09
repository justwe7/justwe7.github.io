import React, { useRef, useEffect } from 'react';

const CanvasParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // 各种能够映射到极客、键盘手感的代码片段
    const codeSnippets = [
      "let matrix = new Reality();",
      "function byteDance() { return active; }",
      "import { life } from 'universe';",
      "const isGeek = true;",
      "> sudo rm -rf /ignorance",
      "while(alive) { learn(); }",
      "<h1>Hello World</h1>",
      "git commit -m 'dancing bytes'",
      "01001000 01101001",
      "[System] Decoding sequence...",
      "0x8f 0x3a 0x4c -> OK",
      "typing_rate: 9000 bytes/min"
    ];

    interface Typer {
      x: number;
      y: number;
      text: string;
      typedText: string;
      index: number;
      lastTypeTime: number;
      typeSpeed: number;
      alpha: number;
      state: 'typing' | 'waiting' | 'fading';
      waitTime: number;
      glitchMode: boolean; // 是否启用“字节跳动/字模随机变动”特效
    }

    const typers: Typer[] = [];
    // 移动端少一点，PC端多一点，避免太乱
    const maxTypers = window.innerWidth < 768 ? 8 : 16;

    const spawnTyper = (): Typer => {
      const text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      return {
        // 防止代码打在屏幕外面去
        x: Math.random() * (canvas.width - 250) + 30,
        y: Math.random() * (canvas.height - 100) + 50,
        text,
        typedText: '',
        index: 0,
        lastTypeTime: Date.now(),
        typeSpeed: Math.random() * 60 + 30, // 打字速度，模拟不同的键盘手速
        alpha: 0,
        state: 'typing',
        waitTime: 0,
        glitchMode: Math.random() > 0.5 // 50% 的代码块带有强烈的打字机胡乱跳动感
      };
    };

    // 错开出生时间，不要一下全出来
    for (let i = 0; i < maxTypers; i++) {
      setTimeout(() => typers.push(spawnTyper()), i * 600);
    }

    const draw = () => {
      // 每一帧画一个半透明的黑底，形成拖影和呼吸感，而不是死板的实心刷新
      ctx.fillStyle = 'rgba(3, 8, 22, 0.2)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      
      // 使用等宽代码字体
      ctx.font = 'bold 15px "Fira Code", Consolas, Monaco, monospace';

      for (let i = 0; i < typers.length; i++) {
        const t = typers[i];

        if (t.state === 'typing') {
          // 淡入起手
          if (t.alpha < 0.6) t.alpha += 0.05;
          
          if (now - t.lastTypeTime > t.typeSpeed) {
            t.lastTypeTime = now;
            t.index++;
            if (t.index <= t.text.length) {
              t.typedText = t.text.substring(0, t.index);
            } else {
              t.state = 'waiting';
              t.waitTime = now;
            }
          }
        } else if (t.state === 'waiting') {
          // 打完字后，在屏幕停留 3 秒
          if (now - t.waitTime > 3000) { 
            t.state = 'fading';
          }
        } else if (t.state === 'fading') {
          t.alpha -= 0.015;
          if (t.alpha <= 0) {
            typers[i] = spawnTyper(); // 彻底消失后，重生一个新的在别的地方
            continue;
          }
        }

        // --- 核心绘制 ---
        const chars = '!<>-_\\/[]{}—=+*^?#_01'; // 产生极客跳动效果的乱码库
        let displayText = t.typedText;
        
        // 【字节跳动特效】：还在打字时，最新的几个字符会疯狂随机变成乱码再定局，还原终极黑客解密感
        if (t.glitchMode && t.state === 'typing' && t.index < t.text.length && t.index > 0) {
            const scrambleLen = Math.min(2, t.index); // 最后两个字符跳动
            const stableText = t.typedText.substring(0, t.index - scrambleLen);
            let glitch = '';
            for(let j=0; j<scrambleLen; j++) {
                glitch += chars[Math.floor(Math.random() * chars.length)];
            }
            displayText = stableText + glitch;
        }

        // 以主基调色渲染文字
        ctx.fillStyle = `rgba(83, 191, 157, ${t.alpha})`; 
        ctx.fillText(displayText, t.x, t.y);

        // 【键盘打字特效】：追加那个一闪一闪的下划线方块光标
        if (Math.floor(now / 350) % 2 === 0 && t.state !== 'fading') {
          const textWidth = ctx.measureText(displayText).width;
          ctx.fillStyle = `rgba(100, 255, 218, ${t.alpha})`;
          ctx.fillText('_', t.x + textWidth + 2, t.y);
        }
      }

      animationFrameId = window.requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: '#030816',
      }}
    />
  );
};

export default CanvasParticles;
