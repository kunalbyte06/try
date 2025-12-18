let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchX = 0;
  touchY = 0;
  prevX = 0;
  prevY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentX = 0;
  currentY = 0;
  rotating = false;

  init(paper) {

    document.addEventListener('pointermove', (e) => {
      if (!this.holdingPaper) return;

      const x = e.clientX;
      const y = e.clientY;

      this.velX = x - this.prevX;
      this.velY = y - this.prevY;

      if (!this.rotating) {
        this.currentX += this.velX;
        this.currentY += this.velY;
      }

      // rotation
      const dx = x - this.touchX;
      const dy = y - this.touchY;
      const angle = Math.atan2(dy, dx);
      if (this.rotating) {
        this.rotation = angle * 180 / Math.PI;
      }

      paper.style.transform =
        `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;

      this.prevX = x;
      this.prevY = y;
    });

    paper.addEventListener('pointerdown', (e) => {
      this.holdingPaper = true;

      paper.style.zIndex = highestZ++;
      this.touchX = e.clientX;
      this.touchY = e.clientY;
      this.prevX = e.clientX;
      this.prevY = e.clientY;

      // two-finger touch = rotate
      this.rotating = e.pointerType === "touch" && e.isPrimary === false;
    });

    window.addEventListener('pointerup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

document.querySelectorAll('.paper').forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
