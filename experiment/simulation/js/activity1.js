let maindiv = document.getElementById('pannelcreate');
function activity1() {
    let text = `
    <div class='divide'>
    <div style='margin-top: 2vw;'>
        <br>
        <h4 class="center-text fs-20px fw-600">Fluid Mechanics: Hydrostatic Forces on surface</h4>

        <div class="fs-16px">
        <p style="text-align: center">Hydrostatic force on circular plate</p>
        </div>

        <button class='btn btn-info std-btn' style='position: relative; left: 50vw;' onclick='start_act1();' id='temp-btn-1' >Next</button>
    </div>
    </div>
    `;
    maindiv.innerHTML = text;
    setTimeout(() => { MathJax.typeset(); }, 300);
}
//for starting first activity
function start_act1() {
    let temp_btn = document.getElementById('temp-btn-1');
    if (temp_btn) {
        temp_btn.remove();
    }
    calculation();
    let btn_text = get_collapse_btn_text("Activity 1", "tb1-box");
    let text = `
    ${btn_text}
    <div class='collapse divide' style='style='margin-top: 2vw; 'width: 80%; margin: auto;' id='tb1-box'>
        <div class="row">
            <div class="col-12">
                <p style="font-weight: 400">Diameter of circular plate (d) = ${d} m.<br>
                Find the position of centre of pressure.</p>
            </div>
        </div>
        <p style="text-align:center"><img src="images/sim1.png" style='width: 40%;' ></p>
        <br>
        <p> $$ position\\ of\\ centre\\ of\\ gravity (\\bar{h})= \\frac{d}{2} $$</p>
        <p style="text-align: center"><span style="display: inline-block">$$\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad=$$</span> <input type='text' class='form-control' style='display: inline-block !important; width: 100px;' id='act1-hbar-inp'><span id='act1-hbar-val-sp'></span> N
        <button class='btn btn-info std-btn' style='position: relative; left: 2vw;' onclick='act1_verify_hbar();' id='temp-btn-hbar'>Verify</button></p>

        <div id="act1-tpf-div" style="display: none">
            <p> $$ total\\ pressure\\ force\\ (F)= \\rho * g * A * \\bar{h} $$</p>
            <p style="text-align: center"><span style="display: inline-block">$$\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad=$$</span> <input type='text' class='form-control' style='display: inline-block !important; width: 100px;' id='tpf-inp'><span id='tpf-val-sp'></span> N
            <button class='btn btn-info std-btn' style='position: relative; left: 2vw;' onclick='verify_tpf();' id='temp-btn-2' >Verify</button></p>
        </div>
        
        <div id="ig-div" style="display: none">
            <p> $$ moment\\ of\\ inertia\\ about\\ centre\\ of\\ gravity (I_G)= \\frac{\\pi d^4}{64} $$</p>
            <p style="text-align: center"><span style="display: inline-block">$$\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad=$$</span> <input type='text' class='form-control' style='display: inline-block !important; width: 100px;' id='ig-inp'><span id='ig-val-sp'></span> m<sup>4</sup>
            <button class='btn btn-info std-btn' style='position: relative; left: 2vw;' onclick='verify_ig();' id='temp-btn-3' >Verify</button></p>
        </div>

        <div id="cp-div" style="display: none">
            <p> $$ position\\ of\\ centre\\ of\\ pressure (h^*)= \\frac{I_G}{\\frac{\\pi}{4} d^2 \\bar{h}} + \\bar{h} $$</p>
            <p style="text-align: center"><span style="display: inline-block">$$\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad=$$</span> <input type='text' class='form-control' style='display: inline-block !important; width: 100px;' id='cp-inp'><span id='cp-val-sp'></span> m
            <button class='btn btn-info std-btn' style='position: relative; left: 2vw;' onclick='verify_cp();' id='temp-btn-4' >Verify</button></p>
        </div>
    </div>`;
    maindiv.innerHTML += text;
    hide_all_steps();
    show_step('tb1-box');
    setTimeout(() => { MathJax.typeset(); }, 300);
}
function calculation() {
    let A = (Math.random() * 2) + 1;
    d = parseFloat(A.toFixed(1));
    console.log("d= ", d);
    h_bar = d / 2;
    console.log("h bar= ", h_bar);
    let pi_value = parseFloat(Math.PI.toFixed(2));
    console.log("pi value= ", pi_value);
    f = (rho * gravity * ((pi_value / 4) * (Math.pow(d, 2))) * h_bar);
    console.log("force f= ", f);
    ig = (pi_value * Math.pow(d, 4)) / 64;
    console.log("ig= ", ig);
    h_star = (ig / (pi_value / 4 * Math.pow(d, 2)) * h_bar) + h_bar;
    console.log("h star= ", h_star);
}
function act1_verify_hbar() {
    let btn = document.getElementById('temp-btn-hbar');
    let act1_hbar_inp = document.getElementById('act1-hbar-inp');
    let act1_sp11 = document.getElementById('act1-hbar-val-sp');
    console.log("inp pressure= ", h_bar);
    if (!verify_values(parseFloat(parseFloat(act1_hbar_inp.value).toFixed(2)), parseFloat(h_bar.toFixed(2)))) {
        alert(`incorrect value of force`);
        return;
    }
    act1_hbar_inp.remove();
    act1_sp11.innerText = `${parseFloat(h_bar.toFixed(2))}`;
    //btn.remove();
    if (btn) {
        btn.remove();
    }
    let div = (document.getElementById('act1-tpf-div'));
    div.style.display = 'block';
}
function verify_tpf() {
    let btn = document.getElementById('temp-btn-2');
    let pressure_inp = document.getElementById('tpf-inp');
    let sp1 = document.getElementById('tpf-val-sp');
    console.log("inp pressure= ", f);
    if (!verify_values(parseFloat(parseFloat(pressure_inp.value).toFixed(2)), parseFloat(f.toFixed(2)))) {
        alert(`incorrect value of force`);
        return;
    }
    pressure_inp.remove();
    sp1.innerText = `${parseFloat(f.toFixed(2))}`;
    //btn.remove();
    if (btn) {
        btn.remove();
    }
    let div = (document.getElementById('ig-div'));
    div.style.display = 'block';
}
function verify_ig() {
    let btn = document.getElementById('temp-btn-3');
    let ig_inp = document.getElementById('ig-inp');
    let sp2 = document.getElementById('ig-val-sp');
    console.log("inp ig= ", ig);
    if (!verify_values(parseFloat(parseFloat(ig_inp.value).toFixed(2)), parseFloat(ig.toFixed(2)))) {
        alert(`incorrect value of ig`);
        return;
    }
    ig_inp.remove();
    sp2.innerText = `${parseFloat(ig.toFixed(2))}`;
    //btn.remove();
    if (btn) {
        btn.remove();
    }
    let div = (document.getElementById('cp-div'));
    div.style.display = 'block';
}
function verify_cp() {
    let btn = document.getElementById('temp-btn-4');
    let cp_inp = document.getElementById('cp-inp');
    let sp3 = document.getElementById('cp-val-sp');
    console.log("inp cp= ", h_star);
    if (!verify_values(parseFloat(parseFloat(cp_inp.value).toFixed(2)), parseFloat(h_star.toFixed(2)))) {
        alert(`incorrect value of cp`);
        return;
    }
    cp_inp.remove();
    sp3.innerText = `${parseFloat(h_star.toFixed(2))}`;
    //btn.remove();
    if (btn) {
        btn.remove();
    }
    start_act2();
}
activity1();
//# sourceMappingURL=activity1.js.map