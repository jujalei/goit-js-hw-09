!function(){function t(){return"#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}console.log(t());var e={startBTN:document.querySelector("button[data-start]"),stopBTN:document.querySelector("button[data-stop]"),bodyLink:document.querySelector("body")},n={timerId:null,disabled:!1,start:function(){this.disabled||(this.disabled=!0,this.timerId=setInterval((function(){e.bodyLink.style.backgroundColor=t()}),1e3))},stop:function(){clearInterval(this.timerId),this.disabled=!1}};e.startBTN.addEventListener("click",n.start.bind(n)),e.stopBTN.addEventListener("click",n.stop.bind(n))}();
//# sourceMappingURL=01-color-switcher.32900ec3.js.map
