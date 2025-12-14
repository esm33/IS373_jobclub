(()=>{document.addEventListener("click",t=>{let e=t.target.closest('a[href^="#"]:not([href="#"])');if(!e)return;let r=e.getAttribute("href"),o=document.querySelector(r);o&&(t.preventDefault(),o.scrollIntoView({behavior:"smooth",block:"start"}),history.pushState(null,null,r))});})();
//# sourceMappingURL=smooth-scroll.bundle.js.map
