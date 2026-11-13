// Fictional data embedded for offline file:// support.
const matches = [
  {date:'2026-11-01',mode:'Ranked',result:'Win',kills:21,deaths:12,hits:68,shots:180},
  {date:'2026-11-02',mode:'Casual',result:'Loss',kills:13,deaths:16,hits:39,shots:135},
  {date:'2026-11-03',mode:'Ranked',result:'Win',kills:26,deaths:10,hits:84,shots:205},
  {date:'2026-11-04',mode:'Casual',result:'Win',kills:18,deaths:14,hits:54,shots:162},
  {date:'2026-11-05',mode:'Ranked',result:'Loss',kills:12,deaths:18,hits:37,shots:142},
  {date:'2026-11-06',mode:'Ranked',result:'Win',kills:24,deaths:11,hits:77,shots:190},
  {date:'2026-11-07',mode:'Casual',result:'Loss',kills:15,deaths:17,hits:45,shots:155},
  {date:'2026-11-08',mode:'Ranked',result:'Win',kills:19,deaths:9,hits:60,shots:170}
];
const mode = document.querySelector('#mode');
function render(){
 const rows = matches.filter(m=>mode.value==='All'||m.mode===mode.value);
 const sum = key=>rows.reduce((n,m)=>n+m[key],0);
 const wins = rows.filter(m=>m.result==='Win').length;
 const losses = rows.length-wins;
 const metrics = [['Matches',rows.length],['Win rate',`${(wins/rows.length*100||0).toFixed(1)}%`],['K/D ratio',(sum('kills')/sum('deaths')||0).toFixed(2)],['Accuracy',`${(sum('hits')/sum('shots')*100||0).toFixed(1)}%`]];
 document.querySelector('#metrics').innerHTML=metrics.map(([k,v])=>`<article class="metric"><span>${k}</span><strong>${v}</strong></article>`).join('');
 const max=Math.max(wins,losses,1);
 document.querySelector('#chart').innerHTML=[['Wins',wins,''],['Losses',losses,'loss']].map(([label,n,cls])=>`<div class="barbox"><strong>${n}</strong><div class="bar ${cls}" style="height:${n/max*110}px"></div><span>${label}</span></div>`).join('');
 document.querySelector('#matches').innerHTML=rows.map(m=>`<tr><td>${m.date}</td><td>${m.mode}</td><td class="${m.result==='Win'?'win':'lossText'}">${m.result}</td><td>${m.kills}</td><td>${m.deaths}</td><td>${(m.hits/m.shots*100).toFixed(1)}%</td></tr>`).join('');
}
mode.addEventListener('change',render);render();
