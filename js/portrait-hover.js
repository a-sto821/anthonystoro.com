(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (reducedMotion.matches || !finePointer.matches) return;

  const portrait = document.querySelector('.portrait-treatment');
  const front = document.querySelector('.portrait-placeholder');
  const back = document.querySelector('.portrait-backplate');
  if (!portrait || !front || !back) return;

  let targetX = 0;
  let targetY = 0;
  let targetRotate = 0;
  let x = 0;
  let y = 0;
  let rotate = 0;
  let frame = 0;

  const render = () => {
    frame = 0;
    x += (targetX - x) * 0.16;
    y += (targetY - y) * 0.16;
    rotate += (targetRotate - rotate) * 0.16;

    front.style.setProperty('--portrait-hover-x', `${x.toFixed(2)}px`);
    front.style.setProperty('--portrait-hover-y', `${y.toFixed(2)}px`);
    front.style.setProperty('--portrait-hover-rotate', `${rotate.toFixed(3)}deg`);

    back.style.setProperty('--portrait-back-hover-x', `${(-x * 0.32).toFixed(2)}px`);
    back.style.setProperty('--portrait-back-hover-y', `${(-y * 0.32).toFixed(2)}px`);
    back.style.setProperty('--portrait-back-hover-rotate', `${(-rotate * 0.28).toFixed(3)}deg`);

    if (
      Math.abs(targetX - x) > 0.02 ||
      Math.abs(targetY - y) > 0.02 ||
      Math.abs(targetRotate - rotate) > 0.005
    ) {
      frame = requestAnimationFrame(render);
    }
  };

  const requestRender = () => {
    if (!frame) frame = requestAnimationFrame(render);
  };

  portrait.addEventListener('pointermove', (event) => {
    const rect = portrait.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) - 0.5;
    const ny = ((event.clientY - rect.top) / rect.height) - 0.5;

    targetX = Math.max(-3, Math.min(3, nx * 6));
    targetY = Math.max(-2, Math.min(2, ny * 4));
    targetRotate = Math.max(-0.55, Math.min(0.55, nx * 1.1));
    requestRender();
  }, { passive: true });

  portrait.addEventListener('pointerleave', () => {
    targetX = 0;
    targetY = 0;
    targetRotate = 0;
    requestRender();
  }, { passive: true });
})();
