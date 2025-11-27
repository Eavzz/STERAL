
document.addEventListener('click', e=>{
    if(e.target.classList.contains('arcane-tab')){
        document.querySelectorAll('.arcane-tab').forEach(t=>t.classList.remove('active'));
        document.querySelectorAll('.arcane-box').forEach(b=>b.classList.remove('active'));
        e.target.classList.add('active');
        document.getElementById(e.target.dataset.tab).classList.add('active');
    }
});
