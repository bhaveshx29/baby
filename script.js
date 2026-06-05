var stems = gsap.utils.toArray('.stem');
var leaves = gsap.utils.toArray('.leaf');
var flowers = gsap.utils.toArray('.flower');
var petals = gsap.utils.toArray('.petal');
var centers = gsap.utils.toArray('.center');
var ribbon = document.querySelector('.ribbon');
var sparkles = gsap.utils.toArray('.sparkle');
var glow = document.querySelector('.glow');

var confettiLayer = document.querySelector('.confetti');
var confettiHost = document.querySelector('.container');

function randomInRange(min, max) {
    return min + Math.random() * (max - min);
}

function addConfetti(count, options) {
    if (!confettiLayer) {
        return;
    }

    var hostWidth = confettiHost ? confettiHost.clientWidth : window.innerWidth;
    var spread = Math.max(hostWidth * (options.spread || 0.9), 320);
    var durationMin = options.durationRange[0];
    var durationMax = options.durationRange[1];
    var delayMin = options.delayRange[0];
    var delayMax = options.delayRange[1];
    var sizeMin = options.sizeRange[0];
    var sizeMax = options.sizeRange[1];
    var driftMin = options.driftRange[0];
    var driftMax = options.driftRange[1];
    var removeAfter = options.removeAfter;

    for (var i = 0; i < count; i += 1) {
        var piece = document.createElement('span');
        var x = (Math.random() - 0.5) * spread;
        var drift = randomInRange(driftMin, driftMax);
        var size = randomInRange(sizeMin, sizeMax);
        var duration = randomInRange(durationMin, durationMax);
        var delay = randomInRange(delayMin, delayMax);
        var hue = Math.floor(Math.random() * 360);
        var spin = Math.floor(Math.random() * 360) + 'deg';

        piece.className = 'confetti-piece';
        piece.style.setProperty('--x', x + 'px');
        piece.style.setProperty('--drift', drift + 'px');
        piece.style.setProperty('--size', size + 'px');
        piece.style.setProperty('--duration', duration + 's');
        piece.style.setProperty('--delay', delay + 's');
        piece.style.setProperty('--hue', hue);
        piece.style.setProperty('--spin', spin);

        confettiLayer.appendChild(piece);

        if (removeAfter) {
            var totalTime = (duration + delay) * 1000;
            setTimeout(function (node) {
                if (node && node.parentNode) {
                    node.parentNode.removeChild(node);
                }
            }, totalTime + 200, piece);
        }
    }
}

if (stems.length) {
    stems.forEach(function (stem) {
        var length = stem.getTotalLength();
        gsap.set(stem, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });
    });
}

gsap.set('.bloom-message', { autoAlpha: 0, y: 14 });
gsap.set(leaves, { scale: 0, opacity: 0, transformOrigin: '50% 50%' });
gsap.set(flowers, { scale: 0, opacity: 0, transformOrigin: '50% 70%' });
gsap.set(petals, { scale: 0.65, opacity: 0, transformOrigin: '50% 80%' });
gsap.set(centers, { scale: 0, opacity: 0 });
gsap.set(ribbon, { scale: 0, opacity: 0, transformOrigin: '50% 50%' });
gsap.set(sparkles, { scale: 0, opacity: 0, transformOrigin: '50% 50%' });
gsap.set(glow, { scale: 0.6, opacity: 0 });

var tl = gsap.timeline();
tl.to(glow, { duration: 1.2, scale: 1, opacity: 0.6, ease: 'power2.out' })
    .to(stems, { duration: 1.6, strokeDashoffset: 0, stagger: 0.15, ease: 'power2.out' }, 0)
    .to(leaves, { duration: 0.9, scale: 1, opacity: 1, stagger: 0.1, ease: 'back.out(2)' }, '-=0.8')
    .to(flowers, { duration: 1, scale: 1, opacity: 1, stagger: 0.15, ease: 'back.out(1.7)' }, '-=0.6')
    .to(petals, { duration: 0.8, scale: 1, opacity: 1, stagger: 0.03, ease: 'back.out(2)' }, '-=0.7')
    .to(centers, { duration: 0.6, scale: 1, opacity: 1, stagger: 0.1, ease: 'back.out(2)' }, '-=0.6')
    .to(ribbon, { duration: 0.8, scale: 1, opacity: 1, ease: 'back.out(1.6)' }, '-=0.4')
    .to(sparkles, { duration: 0.6, scale: 1, opacity: 1, stagger: 0.05, ease: 'power2.out' }, '-=0.4')
    .to('.bloom-message', { duration: 1, autoAlpha: 1, y: 0, ease: 'power2.out' }, '-=0.3')
    .call(function () {
        addConfetti(140, {
            durationRange: [2.6, 4.6],
            delayRange: [0, 0.6],
            sizeRange: [6, 12],
            driftRange: [-220, 220],
            spread: 0.95,
            removeAfter: true
        });
    }, null, '+=0.1');

addConfetti(60, {
    durationRange: [6, 9],
    delayRange: [0, 2],
    sizeRange: [6, 10],
    driftRange: [-160, 160],
    spread: 0.85,
    removeAfter: false
});