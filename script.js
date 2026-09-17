const STORE="sporthub_pro_v2", CODE="qwASzx12";
const seed={settings:{heroEyebrow:"LIVE SPORTS DASHBOARD",heroTitle:"دنیای وەرزش لە یەک شوێن",heroText:"یانەکان، یارییەکان، گۆڵ و ئاسیستەکان بە شێوەیەکی پڕۆفیشناڵ.",clubsTitle:"خشتەی یانەکان",matchesTitle:"یارییەکان",historyTitle:"مێژووی یاریەکان",goalsTitle:"گۆڵەکان",assistsTitle:"ئاسیستەکان"},
clubs:[["City United",8,19,7,20,"🔵"],["Green FC",8,17,9,17,"🟢"],["Red Stars",8,13,11,13,"🔴"],["Blue Warriors",8,9,15,8,"🔷"],["Golden FC",8,11,12,10,"🟡"],["White FC",8,8,14,7,"⚪"],["Black FC",8,10,16,6,"⚫"],["River FC",8,7,15,5,"🟣"],["Eagle FC",8,6,17,4,"🦅"],["Royal FC",8,5,19,2,"👑"]],
upcoming:[["City United","Green FC","2026-09-19","19:30","🔵","🟢"],["Red Stars","Golden FC","2026-09-20","18:00","🔴","🟡"]],
history:[["Red Stars","Blue Warriors","2026-09-15","18:00",2,1,["Ali — 18'","Soran — 54'","Omar — 77'"]]],
goals:[["Ali Ahmed","City United",8],["Soran Karim","Green FC",6],["Omar Hassan","Red Stars",5],["Dara Salim","City United",4],["Aram Aziz","Blue Warriors",3]],
assists:[["Soran Karim","Green FC",7],["Ali Ahmed","City United",5],["Dara Salim","City United",4],["Omar Hassan","Red Stars",3]]};
let d=JSON.parse(localStorage.getItem(STORE)||"null")||structuredClone(seed);
const $=s=>document.querySelector(s), esc=x=>String(x??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
function save(){localStorage.setItem(STORE,JSON.stringify(d))}
function toast(x){let t=$("#toast");t.textContent=x;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2000)}
function date(x){return new Intl.DateTimeFormat("ku-IQ",{year:"numeric",month:"long",day:"numeric"}).format(new Date(x+"T12:00:00"))}
function render(){
let s=d.settings;["heroEyebrow","heroTitle","heroText","clubsTitle","matchesTitle","historyTitle","goalsTitle","assistsTitle"].forEach(k=>{let el=$("#"+k);if(el)el.textContent=s[k]});
$("#clubsTable").innerHTML=d.clubs.map(c=>`<div class="table-row"><span class="club"><i class="club-logo">${esc(c[5])}</i>${esc(c[0])}</span><span>${c[1]}</span><span>${c[2]}</span><span>${c[3]}</span><span class="points">${c[4]}</span></div>`).join("");
$("#upcoming").innerHTML=d.upcoming.map(m=>`<div class="match-card"><div class="match-meta">📅 ${date(m[2])} &nbsp; • &nbsp; ⏰ ${esc(m[3])}</div><div class="teams"><div class="team"><div class="team-logo">${esc(m[4])}</div><b>${esc(m[0])}</b></div><div class="vs">VS</div><div class="team"><div class="team-logo">${esc(m[5])}</div><b>${esc(m[1])}</b></div></div></div>`).join("");
$("#history").innerHTML=d.history.map(m=>`<div class="history-item"><div><b>${esc(m[0])} — ${esc(m[1])}</b><div class="scorers">${date(m[2])} • ${m[3]} • ${(m[6]||[]).map(esc).join(" | ")}</div></div><div class="score">${m[4]} — ${m[5]}</div></div>`).join("");
stats("#goalsList",d.goals,"گۆڵ");stats("#assistsList",d.assists,"ئاسیست");
renderEditors();
}
function stats(sel,list,label){$(sel).innerHTML=list.map((p,i)=>`<div class="stat"><div class="rank">#${i+1} • ${label}</div><h3>${esc(p[0])}</h3><div class="rank">${esc(p[1])}</div><div class="num">${p[2]}</div></div>`).join("")}
function renderEditors(){
$("#eHeroTitle").value=d.settings.heroTitle;$("#eHeroText").value=d.settings.heroText;$("#eClubsTitle").value=d.settings.clubsTitle;
$("#clubAdminList").innerHTML=d.clubs.map((c,i)=>`<div class="row-editor" data-i="${i}"><input value="${esc(c[0])}" placeholder="ناوی یانە"><input type="number" value="${c[1]}" placeholder="یاری"><input type="number" value="${c[2]}" placeholder="GF"><input type="number" value="${c[3]}" placeholder="GA"><input type="number" value="${c[4]}" placeholder="خاڵ"><input value="${esc(c[5])}" placeholder="لۆگۆ"><button class="remove" onclick="removeClub(${i})">×</button></div>`).join("");
$("#matchAdminList").innerHTML=d.upcoming.map((m,i)=>`<div class="row-editor match"><input value="${esc(m[0])}" placeholder="یانەی یەکەم"><input value="${esc(m[1])}" placeholder="یانەی دووەم"><input type="date" value="${m[2]}"><input type="time" value="${m[3]}"><input value="${esc(m[4])}" placeholder="لۆگۆ"><input value="${esc(m[5])}" placeholder="لۆگۆ"><button class="remove" onclick="removeMatch(${i})">×</button></div>`).join("");
makePlayerEditor("#goalAdminList",d.goals,"goal");makePlayerEditor("#assistAdminList",d.assists,"assist");
}
function makePlayerEditor(sel,list,type){$(sel).innerHTML=list.map((p,i)=>`<div class="row-editor"><input value="${esc(p[0])}" placeholder="ناوی یاریزان"><input value="${esc(p[1])}" placeholder="یانە"><input type="number" value="${p[2]}" min="0" placeholder="${type==="goal"?"گۆڵ":"ئاسیست"}><button class="remove" onclick="removePlayer('${type}',${i})">×</button></div>`).join("")}
function readRows(sel,n){return [...document.querySelectorAll(sel+" .row-editor")].map(r=>[...r.querySelectorAll("input")].map(x=>x.type==="number"?Number(x.value):x.value))}
function removeClub(i){d.clubs.splice(i,1);save();render()} function removeMatch(i){d.upcoming.splice(i,1);save();render()} function removePlayer(t,i){d[t==="goal"?"goals":"assists"].splice(i,1);save();render()}
document.querySelectorAll(".nav").forEach(b=>b.onclick=()=>{document.querySelectorAll(".nav").forEach(x=>x.classList.remove("active"));document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));b.classList.add("active");$("#"+b.dataset.page).classList.add("active");$("#sidebar").classList.remove("open")});
$("#menuBtn").onclick=()=>$("#sidebar").classList.toggle("open");$("#themeBtn").onclick=()=>document.body.classList.toggle("light");
document.querySelectorAll(".edit-section").forEach(b=>b.onclick=()=>{document.querySelector('[data-page="admin"]').click();let map={home:"homeEditor",matches:"matchEditor",history:"matchEditor",goals:"goalEditor",assists:"assistEditor"};activateEditor(map[b.dataset.edit])});
function activateEditor(id){document.querySelectorAll(".admin-tab").forEach(x=>x.classList.toggle("active",x.dataset.editor===id));document.querySelectorAll(".editor").forEach(x=>x.classList.toggle("active",x.id===id))}
document.querySelectorAll(".admin-tab").forEach(b=>b.onclick=()=>activateEditor(b.dataset.editor));
$("#login").onsubmit=e=>{e.preventDefault();if($("#adminPass").value===CODE){sessionStorage.setItem("sport_admin","1");$("#loginBox").classList.add("hidden");$("#adminBox").classList.remove("hidden");toast("بەخێربێیت بۆ کۆنترۆڵ سنتر")}else $("#loginMsg").textContent="کۆدی نهێنی هەڵەیە."};
$("#logout").onclick=()=>{sessionStorage.removeItem("sport_admin");$("#adminBox").classList.add("hidden");$("#loginBox").classList.remove("hidden")};
$("#addClub").onclick=()=>{d.clubs.push(["New Club",0,0,0,0,"⚽"]);render()};
$("#addMatch").onclick=()=>{d.upcoming.push(["Home FC","Away FC","2026-09-25","18:00","⚽","⚽"]);render()};
$("#addGoal").onclick=()=>{d.goals.push(["یاریزانی نوێ","یانە",0]);render()};
$("#addAssist").onclick=()=>{d.assists.push(["یاریزانی نوێ","یانە",0]);render()};
document.querySelector(".save-home").onclick=()=>{d.settings.heroTitle=$("#eHeroTitle").value;d.settings.heroText=$("#eHeroText").value;d.settings.clubsTitle=$("#eClubsTitle").value;save();render();toast("سەرەکی نوێکرایەوە")};
document.querySelector(".save-clubs").onclick=()=>{d.clubs=readRows("#clubAdminList",6).map(x=>[x[0],+x[1],+x[2],+x[3],+x[4],x[5]]);save();render();toast("یانەکان پاشەکەوت کران")};
document.querySelector(".save-matches").onclick=()=>{d.upcoming=readRows("#matchAdminList").map(x=>[x[0],x[1],x[2],x[3],x[4],x[5]]);save();render();toast("یارییەکان نوێکرانەوە")};
document.querySelector(".save-goals").onclick=()=>{d.goals=readRows("#goalAdminList").map(x=>[x[0],x[1],+x[2]]);save();render();toast("گۆڵەکان نوێکرانەوە")};
document.querySelector(".save-assists").onclick=()=>{d.assists=readRows("#assistAdminList").map(x=>[x[0],x[1],+x[2]]);save();render();toast("ئاسیستەکان نوێکرانەوە")};
if(sessionStorage.getItem("sport_admin")==="1"){$("#loginBox").classList.add("hidden");$("#adminBox").classList.remove("hidden")}
render();