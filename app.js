var foglalasok = JSON.parse(localStorage.getItem('foglalasok') || '[]');
var MAX_NAPI = 8;

function ment() {
  localStorage.setItem('foglalasok', JSON.stringify(foglalasok));
}

function uzen(szoveg) {
  document.getElementById('uzenet').textContent = szoveg;
}

function foglalt(ido) {
  return foglalasok.some(function (f) { return f.ido === ido; });
}

function rendezes() {
  foglalasok.sort(function (a, b) { return a.ido.localeCompare(b.ido); });
}

function render() {
  var lista = document.getElementById('lista');
  var fragment = document.createDocumentFragment();
  foglalasok.forEach(function (f, i) {
    var sor = document.createElement('div');
    sor.className = 'sor';

    var szoveg = document.createElement('span');
    szoveg.textContent = f.ido + ' – ' + f.nev;

    var gomb = document.createElement('button');
    gomb.type = 'button';
    gomb.className = 'torol';
    gomb.dataset.i = i;
    gomb.textContent = 'Törlés';
    gomb.setAttribute('aria-label', 'Törlés: ' + f.ido + ' ' + f.nev);

    sor.appendChild(szoveg);
    sor.appendChild(gomb);
    fragment.appendChild(sor);
  });
  lista.replaceChildren(fragment);
}

document.getElementById('lista').addEventListener('click', function (e) {
  var gomb = e.target.closest('.torol');
  if (!gomb) return;
  foglalasok.splice(Number(gomb.dataset.i), 1);
  ment();
  render();
});

document.getElementById('f').addEventListener('submit', function (e) {
  e.preventDefault();
  var nev = document.getElementById('nev').value.trim();
  var ido = document.getElementById('ido').value;
  if (foglalasok.length >= MAX_NAPI) { uzen('Ma már nincs szabad hely.'); return; }
  if (foglalt(ido)) { uzen('Ez az időpont már foglalt.'); return; }
  foglalasok.push({ nev: nev, ido: ido });
  rendezes();
  ment();
  render();
  uzen('Foglalás rögzítve: ' + ido);
  this.reset();
});

render();