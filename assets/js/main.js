document.addEventListener('click',e=>{
if(e.target.classList.contains('tab')){
document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
e.target.classList.add('active');
document.getElementById(e.target.dataset.tab).classList.add('active');
}
});