const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const loader=$('#loader');window.addEventListener('load',()=>{setTimeout(()=>loader.style.opacity='0',250);setTimeout(()=>loader.remove(),850)});
const nav=$('#nav'),navLinks=$('#navLinks'),menu=$('#menuBtn');menu.onclick=()=>{navLinks.classList.toggle('open');menu.setAttribute('aria-expanded',navLinks.classList.contains('open'))};$$('#navLinks a').forEach(a=>a.onclick=()=>navLinks.classList.remove('open'));addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>20));
const reveals=$$('.reveal'),io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});reveals.forEach(e=>io.observe(e));
const sections=$$('main section[id]'),links=$$('#navLinks a'),sio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-40% 0px -50%'});sections.forEach(s=>sio.observe(s));
const projectModal=$('#projectModal'),mi=$('#modalImage'),mt=$('#modalTitle'),md=$('#modalDesc'),mc=$('#modalCat'),mtech=$('#modalTech');function openProject(p){mc.textContent='PROJECT';mt.textContent=p.dataset.title;md.textContent=p.dataset.desc;mtech.textContent=p.dataset.tech;mi.innerHTML=`<img src="${p.dataset.img}" alt="${p.dataset.title}">`;projectModal.classList.add('open');document.body.style.overflow='hidden'}$$('.open-project').forEach(b=>b.onclick=()=>openProject(b.closest('.project')));$('#modalClose').onclick=()=>{projectModal.classList.remove('open');document.body.style.overflow=''};projectModal.onclick=e=>{if(e.target===projectModal)$('#modalClose').click()};document.addEventListener('keydown',e=>{if(e.key==='Escape'&&projectModal.classList.contains('open'))$('#modalClose').click()});
const programming=[
  ['python','Python'],['html5','HTML'],['css3','CSS'],['javascript','JavaScript'],['c','C'],['csharp','C#'],
  ['nodedotjs','Node.js'],['react','React'],['electron','Electron'],['unity','Game Dev'],['figma','UI / UX'],['googlechrome','Web Dev']
];
const adobe=[
  ['adobephotoshop','Photoshop'],['adobeillustrator','Illustrator'],['adobepremierepro','Premiere Pro'],
  ['adobeaftereffects','After Effects'],['adobeindesign','InDesign'],['adobelightroom','Lightroom'],['adobecreativecloud','Creative Cloud']
];
function fillTrack(id,items){
  const t=$(id); const cards=[...items,...items];
  t.innerHTML=cards.map(([slug,n])=>`<div class="tech-card"><div class="tech-icon"><img src="assets/icons/${slug}.svg" alt=""></div><div><strong>${n}</strong><small>WORKING TOOL</small></div></div>`).join('')
}
fillTrack('#programmingTrack',programming);fillTrack('#adobeTrack',adobe);
const platforms=[
  ['fiverr','Fiverr','Freelance services','https://www.fiverr.com/s/NeB9PV8',''],
  ['freelancer','Freelancer','Freelance projects','https://www.freelancer.com/u/nethum33?frm=nethum33&sb=t',''],
  ['facebook','Facebook','Personal social profile','https://www.facebook.com/nethum.nimsara.750606?mibextid=ZbWKwL',''],
  ['instagram','Instagram','Creative profile','https://www.instagram.com/_nethumnimsara_?stkn=dGg0cDVhM3ZwdHh0',''],
  ['youtube','YouTube','@nethumnimsara2.0','https://youtube.com/@nethumnimsara2.0?si=CME6LeyVcuJWvVIl',''],
  ['tiktok','TikTok','@nethumnimsaraz','https://www.tiktok.com/@nethumnimsaraz?_r=1&_t=ZS-99Z68oBuc36',''],
  ['github','GitHub','Code & projects','https://github.com/Nethumnimsara',''],
  ['adobestock','Adobe Stock','Member ID · 213029921','https://stock.adobe.com/','213029921'],
  ['shutterstock','Shutterstock','Creative marketplace','https://www.shutterstock.com/',''],
  ['pinterest','Pinterest','@nethumnimsaraphotography','https://www.pinterest.com/nethumnimsaraphotography/','nethumnimsaraphotography']
];
$('#platformGrid').innerHTML=platforms.map(([i,n,d,u,extra])=>{const locked=(i==='adobestock'||i==='shutterstock'); return locked?`<div class="platform-card platform-locked" aria-label="${n} details"><div class="platform-icon"><img src="assets/icons/${i}.svg" alt="${n}"></div><div><strong>${n}</strong><small>${d}</small>${extra?`<b class="platform-extra">${extra}</b>`:''}</div><span class="platform-status">LINK COMING SOON</span></div>`:`<a class="platform-card" href="${u}" target="_blank" rel="noopener noreferrer"><div class="platform-icon"><img src="assets/icons/${i}.svg" alt="${n}"></div><div><strong>${n}</strong><small>${d}</small>${extra?`<b class="platform-extra">${extra}</b>`:''}</div></a>`}).join('');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,canvas=$('#particles'),ctx=canvas.getContext('2d');let W,H,pts=[];function resize(){W=canvas.width=innerWidth*devicePixelRatio;H=canvas.height=innerHeight*devicePixelRatio;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);pts=Array.from({length:Math.min(48,Math.floor(innerWidth/28))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.2,vy:(Math.random()-.5)*.2,r:Math.random()*1.2+.3}))}function particles(){ctx.clearRect(0,0,innerWidth,innerHeight);if(!reduced){for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;ctx.fillStyle='rgba(0,231,140,.3)';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<100){ctx.strokeStyle=`rgba(0,231,140,${.06*(1-d/100)})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}requestAnimationFrame(particles)}}resize();addEventListener('resize',resize);particles();
const dot=$('.cursor-dot'),ring=$('.cursor-ring');let mx=0,my=0,rx=0,ry=0;addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px'});function cursor(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(cursor)}cursor();$$('a,button,.project,.platform-card,.tech-card').forEach(el=>{el.addEventListener('mouseenter',()=>ring.classList.add('big'));el.addEventListener('mouseleave',()=>ring.classList.remove('big'))});
const energy=$('#energyLayer');document.addEventListener('click',e=>{if(e.target.closest('a,button,input,textarea,select'))return;for(let i=0;i<8;i++){const s=document.createElement('i');s.className='energy';s.style.left=e.clientX+'px';s.style.top=e.clientY+'px';const a=Math.PI*2*i/8,d=20+Math.random()*28;s.style.setProperty('--x',Math.cos(a)*d+'px');s.style.setProperty('--y',Math.sin(a)*d+'px');energy.appendChild(s);setTimeout(()=>s.remove(),650)}});
