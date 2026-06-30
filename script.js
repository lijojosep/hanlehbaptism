const EVENT_DATE=new Date('2026-07-09T17:00:00+05:30');
const GOOGLE_MAPS_URL='https://maps.google.com/?q=Christuraj+Church+Ettumanoor'; // Paste the final Google Maps share URL here.
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -30px'});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const hero=document.querySelector('.hero-image');let ticking=false;
if(!reduceMotion)addEventListener('scroll',()=>{if(!ticking)requestAnimationFrame(()=>{hero.style.translate='0 '+Math.min(scrollY*.18,120)+'px';ticking=false});ticking=true},{passive:true});
function updateCountdown(){const distance=EVENT_DATE-Date.now();if(distance<=0){document.getElementById('count').hidden=true;document.getElementById('countDone').hidden=false;return}const values=[Math.floor(distance/86400000),Math.floor(distance%86400000/3600000),Math.floor(distance%3600000/60000),Math.floor(distance%60000/1000)];['days','hours','minutes','seconds'].forEach((unit,i)=>document.getElementById(unit).textContent=String(values[i]).padStart(2,'0'))}updateCountdown();setInterval(updateCountdown,1000);
const track=document.getElementById('track'),photos=[...track.querySelectorAll('figure')],dots=document.getElementById('dots');photos.forEach((_,i)=>{const dot=document.createElement('i');if(!i)dot.className='active';dots.append(dot)});
function step(direction){track.scrollBy({left:(photos[0].getBoundingClientRect().width+16)*direction,behavior:'smooth'})}document.getElementById('prev').onclick=()=>step(-1);document.getElementById('next').onclick=()=>step(1);let gf;track.addEventListener('scroll',()=>{cancelAnimationFrame(gf);gf=requestAnimationFrame(()=>{const centers=photos.map(p=>Math.abs(p.offsetLeft-track.scrollLeft-track.clientWidth*.08)),active=centers.indexOf(Math.min(...centers));[...dots.children].forEach((d,i)=>d.classList.toggle('active',i===active))})},{passive:true});
const directions=document.getElementById('directions');if(GOOGLE_MAPS_URL)directions.href=GOOGLE_MAPS_URL;else directions.onclick=e=>{e.preventDefault();alert('The Google Maps link will be added soon.')};
document.querySelectorAll('[data-rsvp]').forEach(button=>button.onclick=()=>{document.querySelectorAll('[data-rsvp]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.getElementById('response').textContent=button.dataset.rsvp==='yes'?'Wonderful — we cannot wait to celebrate with you.':'Thank you for letting us know. You will be in our thoughts.'});
const form=document.getElementById('blessingForm'),wall=document.getElementById('wall');form.onsubmit=e=>{e.preventDefault();const data=new FormData(form),card=document.createElement('article'),message=document.createElement('p'),name=document.createElement('span');card.className='blessing-card';message.textContent='“'+data.get('blessing').trim()+'”';name.textContent='— '+data.get('name').trim();card.append(message,name);wall.prepend(card);form.hidden=true;document.getElementById('thanks').hidden=false};
const music = document.getElementById("music");
const bgMusic = document.getElementById("bgMusic");

if(bgMusic){

    bgMusic.volume = 0.25;

    music.onclick = () => {

        const playing = music.getAttribute("aria-pressed")==="true";

        if(playing){
            bgMusic.pause();
        }else{
            bgMusic.play();
        }

        music.setAttribute("aria-pressed", !playing);
        music.querySelector("span").textContent = playing ? "Music" : "Pause";

    };

}