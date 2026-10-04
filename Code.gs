// Googleスプレッドシートに「events」シートを作成し、1行目に次の列名を設定：
// ts,date,type,id,level,x,y,name
function doGet(e){const sh=SpreadsheetApp.getActive().getSheetByName('events');if(!sh)return out({events:[]});const v=sh.getDataRange().getValues();if(v.length<2)return out({events:[]});const h=v[0].map(String);const events=v.slice(1).filter(r=>r.some(x=>x!=='' )).map(r=>{let o={};h.forEach((k,i)=>o[k]=r[i]);o.ts=Number(o.ts);o.level=Number(o.level);o.x=Number(o.x);o.y=Number(o.y);return o});return out({events});}
function doPost(e){const d=JSON.parse(e.postData.contents);if(d.action==='event'&&d.event){const sh=SpreadsheetApp.getActive().getSheetByName('events');const x=d.event;sh.appendRow([x.ts||Date.now(),x.date||'',x.type||'',x.id||'',x.level||'',x.x||'',x.y||'',x.name||'']);}return out({ok:true});}
function out(x){return ContentService.createTextOutput(JSON.stringify(x)).setMimeType(ContentService.MimeType.JSON)}
