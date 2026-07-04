const fs = require('fs');
const path = require('path');

const en = JSON.parse(fs.readFileSync('js/locales/en.json', 'utf8'));

function flatten(obj, prefix = '') {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? prefix + '.' + k : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) Object.assign(out, flatten(v, key));
    else if (Array.isArray(v)) v.forEach((item, i) => {
      if (typeof item === 'object') Object.assign(out, flatten(item, key + '[' + i + ']'));
      else out[key + '[' + i + ']'] = item;
    });
    else out[key] = v;
  }
  return out;
}

const enFlat = flatten(en);
const skipKeys = /^(slug|heroImage|screenshotPlayer|screenshotAdmin|related|type|lang|dir)$/;
const skipPath = /\.(slug|heroImage|screenshotPlayer|screenshotAdmin|related)(\[\d+\])?$/;
const skipValue = (v) => /^(ltr|updated|section|wallet|payments|sportsbook|bonus-engine|marketing-crm|affiliate-system|business-intelligence|anti-fraud|risk-compliance|operator-backoffice|game-integrations|\/assets\/)/.test(v);

const sections = [
  /^common\./,
  /^home\./,
  /^contact\./,
  /^pricing\./,
  /^integrations\./,
  /^features\.[^.]+\.(heroH1|heroSub|problem|solution|capabilities|steps|problemTitle|solutionTitle)/,
  /^legal\.(privacy|terms|aml|responsible)\.(title|sub|updated|sections\[\d+\]\.(heading|html))/
];

for (const lang of ['fr', 'es', 'pt', 'it']) {
  const loc = JSON.parse(fs.readFileSync('js/locales/' + lang + '.json', 'utf8'));
  const locFlat = flatten(loc);
  const matches = [];
  for (const [k, v] of Object.entries(enFlat)) {
    if (!sections.some((re) => re.test(k))) continue;
    if (skipPath.test(k)) continue;
    if (locFlat[k] === v && typeof v === 'string' && v.length > 1 && !skipValue(v)) {
      matches.push({ key: k, value: v });
    }
  }
  console.log('\n=== ' + lang.toUpperCase() + ' (' + matches.length + ' untranslated in target sections) ===');
  matches.forEach((m) => console.log(m.key + ': ' + JSON.stringify(m.value)));
}
