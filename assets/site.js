(function () {
  document.querySelectorAll('.language-switch a[hreflang]').forEach(function (link) {
    link.addEventListener('click', function () {
      var lang = link.getAttribute('hreflang');
      try {
        window.localStorage.setItem('preferred-lang', lang);
      } catch (err) {}

      if (window.location.hash && link.href.indexOf('#') === -1) {
        link.href += window.location.hash;
      }
    });
  });

  var canvas = document.getElementById('matrix-canvas');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var fontSize = 14;
    var columns;
    var drops;
    var chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]=/\\';

    function initMatrix() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = [];
      for (var c = 0; c < columns; c++) {
        drops[c] = Math.random() * -100 | 0;
      }
    }

    function drawMatrix() {
      ctx.fillStyle = 'rgba(11, 12, 16, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#39ff14';
      ctx.font = fontSize + 'px Consolas, monospace';

      for (var c = 0; c < columns; c++) {
        if (drops[c] < 0) { drops[c]++; continue; }
        var ch = chars.charAt(Math.random() * chars.length | 0);
        var x = c * fontSize;
        var y = drops[c] * fontSize;
        ctx.globalAlpha = 0.6 + Math.random() * 0.4;
        ctx.fillText(ch, x, y);
        if (y > canvas.height && Math.random() > 0.975) {
          drops[c] = 0;
        }
        drops[c]++;
      }
      ctx.globalAlpha = 1;
    }

    initMatrix();
    window.setInterval(drawMatrix, 60);
    window.addEventListener('resize', initMatrix);
  }

  var target = document.getElementById('typed-greeting');
  if (target) {
    var text = target.dataset.text || target.textContent || '';
    target.textContent = '';
    var i = 0;

    function typeChar() {
      if (i < text.length) {
        target.textContent += text.charAt(i);
        i++;
        window.setTimeout(typeChar, 35 + Math.random() * 40);
      } else {
        target.classList.add('blink-cursor');
      }
    }

    window.setTimeout(typeChar, 600);
  }

  var faders = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    faders.forEach(function (el) { observer.observe(el); });
  } else {
    faders.forEach(function (el) { el.classList.add('visible'); });
  }
})();
