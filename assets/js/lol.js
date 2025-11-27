
document.addEventListener('click', e=>{
    if(e.target.classList.contains('lol-tab')){
        document.querySelectorAll('.lol-tab').forEach(t=>t.classList.remove('active'));
        document.querySelectorAll('.lol-content').forEach(c=>c.classList.remove('active'));
        e.target.classList.add('active');
        document.getElementById(e.target.dataset.tab).classList.add('active');
    }
});
