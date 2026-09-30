(function(){
var POSTS={"vY5e9aq8": {"vol": 5, "date": "2025.12.26", "name": "川島 雅弘", "field": "不動産 × コーチング × アスリート"}, "BL2PzFZm": {"vol": 4, "date": "2025.12.19", "name": "塩澤 駿一", "field": "テラドローン株式会社 執行役員CTO"}, "u4iI8qk7": {"vol": 3, "date": "2025.12.09", "name": "後藤 早貴子", "field": "社会保険労務士試験 合格／介護福祉士"}, "kEJhPE1T": {"vol": 2, "date": "2025.10.31", "name": "符 毅欣", "field": "株式会社ONCALL 代表取締役／医師"}, "EO1A8TFZ": {"vol": 1, "date": "2025.10.05", "name": "今林 広樹", "field": "EAGLYS 代表取締役"}};
var S={"hero": "d368eb7f-3d94-4d88-a6b5-b18128967494", "outer": "e550d148-8f10-4e37-b9d9-8aaf8f80fd00", "col": "58ab2302-8204-4d5c-95b1-9ca936c650a8", "row": "9f22ab1e-d674-47bb-90c5-c9b0b79bef48", "cat": "fb6570f3-9345-4d31-9e38-7502007124ab", "date": "95b95a5f-9d15-4599-93d2-c7afdc406047", "admin": "79d722e4-cd97-4478-9b20-b05712bb6c6f", "card": "41307287-c7e5-434f-ab5e-a4dd0ae2bdff", "cover": "f49e1358-e8ec-405a-8dd7-7d4ca8e48656", "rich": "515ded63-9bf3-4796-a574-518f49cc2091", "back": "a70cd7b4-633f-4a48-814f-6b8c50b9419b", "header": "2838754f-7be5-4854-a2ff-4a6944f6974a"};
function $(k,root){return (root||document).querySelector('[data-s-'+S[k]+']');}
function el(tag,cls,text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e;}
function fieldHtml(f,text){text.split(' ').forEach(function(w,i){if(i)f.appendChild(document.createTextNode(' '));w.split(/(?<=／)/).forEach(function(p){if(p)f.appendChild(el('span','nb',p));});});}
function apply(){
  var html=document.documentElement,cat=$('cat'),rich=$('rich'),card=$('card'),col=$('col'),outer=$('outer');
  var on=/^\/posts\//.test(location.pathname)&&cat&&cat.getAttribute('href')==='/news/interview'&&rich&&card&&col&&outer;
  if(!on){html.classList.remove('zk-article');return;}
  var hd=$('header');if(hd)html.style.setProperty('--zk-head',Math.round(hd.getBoundingClientRect().height)+'px');
  var id=location.pathname.split('/').filter(Boolean).pop(),p=POSTS[id];
  if(!p){var t=($('admin')||{}).textContent||'',m=t.match(/Vol\.?\s*(\d+)\s*[｜|]\s*(.+)$/),d=($('date')||{}).textContent||'';p={vol:m?+m[1]:null,date:d.trim().replace(/\//g,'.'),name:'',field:m?m[2].trim():''};}
  if(!outer.querySelector(':scope>.zk-mast')){var a=el('a','zk-mast');a.href='/news/interview';var i=el('span','zk-mast-in');i.appendChild(el('span','zk-mast-title','超人図鑑'));a.appendChild(i);outer.insertBefore(a,outer.firstChild);}
  var row=$('row');if(row&&!row.querySelector('.zk-meta')){var mt=el('p','zk-meta');if(p.vol)mt.appendChild(el('span','zk-vol','Vol.'+(p.vol<10?'0':'')+p.vol));if(p.date)mt.appendChild(el('span','zk-date',p.date));row.appendChild(mt);}
  var h1=rich.firstElementChild;
  if(h1&&h1.tagName==='H1'){var n=h1.nextElementSibling;if(n&&!n.classList.contains('zk-sub')&&/^[〜～~]/.test(n.textContent.trim()))n.classList.add('zk-sub');}
  if(!card.querySelector(':scope>.zk-person')&&(p.name||p.field)){var ps=el('p','zk-person');if(p.name)ps.appendChild(el('span','zk-name',p.name));var f=el('span','zk-field');fieldHtml(f,p.field);ps.appendChild(f);card.insertBefore(ps,card.firstChild);}
  if(!card.querySelector(':scope>.zk-back')){var b=el('a','zk-back','超人図鑑の一覧へ戻る');b.href='/news/interview';card.appendChild(b);}
  html.classList.add('zk-article');
}
var t;function sched(){clearTimeout(t);t=setTimeout(apply,30);}
new MutationObserver(sched).observe(document.documentElement,{childList:true,subtree:true});
window.addEventListener('popstate',sched);sched();
})();