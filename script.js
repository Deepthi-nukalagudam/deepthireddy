// Simulated interaction code to match provided screenshot behaviour
document.addEventListener('DOMContentLoaded', ()=>{
  const mapC = document.getElementById('mapCplaceholder');
  const tooltip = document.getElementById('tooltip');
  const tipSpark = document.getElementById('tip-spark');

  // Sample sparkline data (1980-2019 points simplified)
  const data = [
    {year:1980, value:0.36},{year:1990, value:0.37},{year:2000, value:0.38},{year:2010, value:0.39},{year:2019, value:0.40}
  ];

  function drawSparkline(svgEl, series){
    while(svgEl.firstChild) svgEl.removeChild(svgEl);
    const svgNS = 'http://www.w3.org/2000/svg';
    const w = +svgEl.getAttribute('width');
    const h = +svgEl.getAttribute('height');
    const pad = {l:28,r:6,t:6,b:18};
    const innerW = w - pad.l - pad.r;
    const innerH = h - pad.t - pad.b;
    const xs = series.map(d=>d.year);
    const ys = series.map(d=>d.value);
    const xMin = Math.min(...xs), xMax = Math.max(...xs);
    const yMin = Math.min(...ys), yMax = Math.max(...ys);
    function xScale(x){ return pad.l + ( (x - xMin) / (xMax - xMin) ) * innerW; }
    function yScale(y){ return pad.t + innerH - ( (y - yMin) / (yMax - yMin) ) * innerH; }
    const path = document.createElementNS(svgNS,'path');
    const d = series.map((p,i)=> (i===0? 'M':'L') + xScale(p.year).toFixed(2) + ' ' + yScale(p.value).toFixed(2) ).join(' ');
    path.setAttribute('d', d);
    path.setAttribute('fill','none');
    path.setAttribute('stroke','#111827');
    path.setAttribute('stroke-width','1.6');
    svgEl.appendChild(path);
    // axes (years)
    const axis = document.createElementNS(svgNS,'text');
    axis.setAttribute('x', pad.l);
    axis.setAttribute('y', h - 2);
    axis.setAttribute('font-size','10');
    axis.textContent = series[0].year;
    svgEl.appendChild(axis);
    const axis2 = document.createElementNS(svgNS,'text');
    axis2.setAttribute('x', w - pad.r - 20);
    axis2.setAttribute('y', h - 2);
    axis2.setAttribute('font-size','10');
    axis2.textContent = series[series.length-1].year;
    svgEl.appendChild(axis2);
  }

  // attach hover to Map C placeholder to show tooltip
  mapC.addEventListener('mouseenter', (e)=>{
    tooltip.style.display = 'block';
    tooltip.style.left = (e.pageX + 10) + 'px';
    tooltip.style.top = (e.pageY + 10) + 'px';
    document.getElementById('tip-title').textContent = 'County C';
    document.getElementById('tip-stats').innerHTML = 'Pop 1980: 150,000<br>Pop 2010: 160,000<br>Gini 2019: 0.400';
    drawSparkline(tipSpark, data);
  });
  mapC.addEventListener('mousemove', (e)=>{
    tooltip.style.left = (e.pageX + 10) + 'px';
    tooltip.style.top = (e.pageY + 10) + 'px';
  });
  mapC.addEventListener('mouseleave', (e)=>{
    tooltip.style.display = 'none';
  });

  // Also add hover highlights to A and B placeholders to simulate sync
  const mapA = document.querySelector('#mapA .map-placeholder');
  const mapB = document.querySelector('#mapB .map-placeholder');
  function highlightPair(on){
    if(on){ mapA.style.boxShadow = '0 6px 20px rgba(255,106,0,0.15) inset'; mapB.style.boxShadow = '0 6px 20px rgba(255,106,0,0.15) inset'; }
    else { mapA.style.boxShadow = ''; mapB.style.boxShadow = ''; }
  }
  mapA.addEventListener('mouseenter', ()=> highlightPair(true) );
  mapA.addEventListener('mouseleave', ()=> highlightPair(false) );
  mapB.addEventListener('mouseenter', ()=> highlightPair(true) );
  mapB.addEventListener('mouseleave', ()=> highlightPair(false) );

});