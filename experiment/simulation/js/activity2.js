function start_act2() {
    let temp_btn = document.getElementById('temp-btn-act-2');
    if (temp_btn) {
        temp_btn.remove();
    }
    act2_calculation();
    let btn_text = get_collapse_btn_text("Activity 2", "tb2-box");
    let text = `
    ${btn_text}
    <div class='collapse divide' style='style='margin-top: 2vw; 'width: 80%; margin: auto;' id='tb2-box'>
            <div class="row">
            <div class="col-12">
                <p style="font-weight: 400">Diameter of circular plate (d) = ${d} m.<br>
                Centre of circular plate is 5 m below the water surface. <br>
                Find the position of centre of pressure.</p>
            </div>
        </div>
        <p style="text-align:center"><img src="images/sim1.png" style='width: 40%;' ></p>
        <br>

        <p style="text-align: center"> <span style="display: inline-block">$$ position\\ of\\ centre\\ of\\ gravity (\\bar{h})= $$</span> <input type='text' class='form-control' style='display: inline-block !important; width: 100px;' id='hbar-inp'><span id='hbar-val-sp'></span>
        <button class='btn btn-info std-btn' style='position: relative; left: 2vw;' onclick='verify_hbar();' id='temp-btn-hbar' >Verify</button></p>

        <div id="act2-tpf-div" style="display: none">
            <p> $$ total\\ pressure\\ force\\ (F)= \\rho * g * A * \\bar{h} $$</p>
            <p style="text-align: center"><span style="display: inline-block">$$\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad=$$</span> <input type='text' class='form-control' style='display: inline-block !important; width: 100px;' id='act2-tpf-inp'><span id='act2-tpf-val-sp'></span> N
            <button class='btn btn-info std-btn' style='position: relative; left: 2vw;' onclick='act2_verify_tpf();' id='temp-btn-tpf' >Verify</button></p>
        </div>
        
        <div id="act2-ig-div" style="display: none">
            <p> $$ moment\\ of\\ inertia\\ about\\ centre\\ of\\ gravity (I_G)= \\frac{\\pi d^4}{64} $$</p>
            <p style="text-align: center"><span style="display: inline-block">$$\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad=$$</span> <input type='text' class='form-control' style='display: inline-block !important; width: 100px;' id='act2-ig-inp'><span id='act2-ig-val-sp'></span> m<sup>4</sup>
            <button class='btn btn-info std-btn' style='position: relative; left: 2vw;' onclick='act2_verify_ig();' id='temp-btn-ig' >Verify</button></p>
        </div>

        <div id="act2-cp-div" style="display: none">
            <p> $$ position\\ of\\ centre\\ of\\ pressure (h^*)= \\frac{I_G}{\\frac{\\pi}{4} d^2 \\bar{h}} + \\bar{h} $$</p>
            <p style="text-align: center"><span style="display: inline-block">$$\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad\\qquad=$$</span> <input type='text' class='form-control' style='display: inline-block !important; width: 100px;' id='act2-cp-inp'><span id='act2-cp-val-sp'></span> m
            <button class='btn btn-info std-btn' style='position: relative; left: 2vw;' onclick='act2_verify_cp();' id='temp-btn-cp' >Verify</button></p>
        </div>
    </div>

    `;
    maindiv.innerHTML += text;
    hide_all_steps();
    show_step('tb2-box');
    setTimeout(() => { MathJax.typeset(); }, 300);
}
function act2_calculation() {
    console.log("d= ", d);
    act2_h_bar = 5;
    console.log("act2 h bar= ", act2_h_bar);
    let pi_value = parseFloat(Math.PI.toFixed(2));
    console.log("pi value= ", pi_value);
    act2_f = (rho * gravity * ((pi_value / 4) * Math.pow(d, 2)) * act2_h_bar);
    console.log("act2 force f= ", act2_f);
    act2_ig = (pi_value * Math.pow(d, 4)) / 64;
    console.log("act2 ig= ", act2_ig);
    act2_h_star = (act2_ig / (pi_value / 4 * Math.pow(d, 2)) * act2_h_bar) + act2_h_bar;
    console.log("act2 h star= ", act2_h_star);
}
function verify_hbar() {
    let btn = document.getElementById('temp-btn-hbar');
    let hbar_inp = document.getElementById('hbar-inp');
    let sp1 = document.getElementById('hbar-val-sp');
    console.log("inp ig= ", act2_h_bar);
    if (!verify_values(parseFloat(parseFloat(hbar_inp.value).toFixed(2)), parseFloat(act2_h_bar.toFixed(2)))) {
        alert(`incorrect value of ig`);
        return;
    }
    hbar_inp.remove();
    sp1.innerText = `${parseFloat(act2_h_bar.toFixed(2))}`;
    //btn.remove();
    if (btn) {
        btn.remove();
    }
    let div = (document.getElementById('act2-tpf-div'));
    div.style.display = 'block';
}
function act2_verify_tpf() {
    let btn = document.getElementById('temp-btn-tpf');
    let act2_tpf_inp = document.getElementById('act2-tpf-inp');
    let sp2 = document.getElementById('act2-tpf-val-sp');
    console.log("inp pressure= ", act2_f);
    if (!verify_values(parseFloat(parseFloat(act2_tpf_inp.value).toFixed(2)), parseFloat(act2_f.toFixed(2)))) {
        alert(`incorrect value of force`);
        return;
    }
    act2_tpf_inp.remove();
    sp2.innerText = `${parseFloat(act2_f.toFixed(2))}`;
    //btn.remove();
    if (btn) {
        btn.remove();
    }
    let div = (document.getElementById('act2-ig-div'));
    div.style.display = 'block';
}
function act2_verify_ig() {
    let btn = document.getElementById('temp-btn-3');
    let act2_ig_inp = document.getElementById('act2-ig-inp');
    let sp3 = document.getElementById('act2-ig-val-sp');
    console.log("inp ig= ", act2_ig);
    if (!verify_values(parseFloat(parseFloat(act2_ig_inp.value).toFixed(2)), parseFloat(act2_ig.toFixed(2)))) {
        alert(`incorrect value of ig`);
        return;
    }
    act2_ig_inp.remove();
    sp3.innerText = `${parseFloat(act2_ig.toFixed(2))}`;
    //btn.remove();
    if (btn) {
        btn.remove();
    }
    let div = (document.getElementById('act2-cp-div'));
    div.style.display = 'block';
}
function act2_verify_cp() {
    let btn = document.getElementById('temp-btn-cp');
    let act2_cp_inp = document.getElementById('act2-cp-inp');
    let sp4 = document.getElementById('act2-cp-val-sp');
    console.log("inp cp= ", act2_h_star);
    if (!verify_values(parseFloat(parseFloat(act2_cp_inp.value).toFixed(2)), parseFloat(act2_h_star.toFixed(2)))) {
        alert(`incorrect value of cp`);
        return;
    }
    act2_cp_inp.remove();
    sp4.innerText = `${parseFloat(act2_h_star.toFixed(2))}`;
    //btn.remove();
    if (btn) {
        btn.remove();
    }
    exp_complete();
}
// function act2_verify_pressure() {
//     let btn: HTMLButtonElement = <HTMLButtonElement> document.getElementById('temp-btn-3');
//     let act2_pressure_inp: HTMLInputElement = <HTMLInputElement> document.getElementById('act2_pressure-inp');
//     let sp2: HTMLSpanElement = <HTMLSpanElement> document.getElementById('act2_pressure-val-sp');
//     console.log("inp pressure= ",act2_pressure_inp.value);
//     if(!verify_values(parseFloat(parseFloat(act2_pressure_inp.value).toFixed(2)), parseFloat(act2_pressure.toFixed(2)))) {
//         alert(`incorrect value of pressure`);
//         return;
//     }
//     act2_pressure_inp.remove();
//     sp2.innerText = `${parseFloat(act2_pressure.toFixed(2))}`;
//     //btn.remove();
//     if(btn) {
//         btn.remove();
//     }
//     exp_complete();
// }
// function act2_verify_volume() {
//     let btn: HTMLButtonElement = <HTMLButtonElement> document.getElementById('act2-temp-btn-2');
//     let act2_volume_inp1: HTMLInputElement = <HTMLInputElement> document.getElementById('act2-volume-inp');
//     let act2_sp1: HTMLSpanElement = <HTMLSpanElement> document.getElementById('act2-volume-val-sp');
//     console.log("inp vol= ",act2_volume_inp1.value);
//     // inp_volume = <HTMLInputElement> document.getElementById(`volume_inp`);
//     if(!verify_values(parseFloat(parseFloat(act2_volume_inp1.value).toFixed(2)), parseFloat(volume.toFixed(2)))) {
//         alert(`incorrect value of volume`);
//         return;
//     }
//     act2_volume_inp1.remove();
//     act2_sp1.innerText = `${volume}`;
//     //btn.remove();
//     if(btn) {
//         btn.remove();
//     }
//     let div: HTMLDivElement = <HTMLDivElement>(
//         document.getElementById('act2-mass-div')
// 	);
// 	div.style.display = 'block';
// }
// function act2_verify_mass() {
//     let btn: HTMLButtonElement = <HTMLButtonElement> document.getElementById('temp-btn-act2-mass');
//     let act2_mass_inp: HTMLInputElement = <HTMLInputElement> document.getElementById('act2-mass-inp');
//     let act2_sp2: HTMLSpanElement = <HTMLSpanElement> document.getElementById('act2-mass-val-sp');
//     console.log("inp mass act2= ",act2_mass_inp.value);
//     if(!verify_values(parseFloat(parseFloat(act2_mass_inp.value).toFixed(2)), parseFloat(act2_mass.toFixed(2)))) {
//         alert(`incorrect value of volume`);
//         return;
//     }
//     act2_mass_inp.remove();
//     act2_sp2.innerText = `${parseFloat(act2_mass.toFixed(4))}`;
//     //btn.remove();
//     if(btn) {
//         btn.remove();
//     }
//     let div: HTMLDivElement = <HTMLDivElement>(
//         document.getElementById('act2-density-div')
// 	);
// 	div.style.display = 'block';
// }
// function act2_verify_density() {
//     let btn: HTMLButtonElement = <HTMLButtonElement> document.getElementById('temp-btn-act2-density');
//     let act2_density_inp: HTMLInputElement = <HTMLInputElement> document.getElementById('act2-density-inp');
//     let act2_sp2: HTMLSpanElement = <HTMLSpanElement> document.getElementById('act2-density-val-sp');
//     console.log("inp density act2= ",act2_density_inp.value);
//     if(!verify_values(parseFloat(parseFloat(act2_density_inp.value).toFixed(2)), parseFloat(act2_density.toFixed(2)))) {
//         alert(`incorrect value of volume`);
//         return;
//     }
//     act2_density_inp.remove();
//     act2_sp2.innerText = `${parseFloat(act2_density.toFixed(4))}`;
//     //btn.remove();
//     if(btn) {
//         btn.remove();
//     }
//     let div: HTMLDivElement = <HTMLDivElement>(
//         document.getElementById('act2-spgr-div')
// 	);
// 	div.style.display = 'block';
// }
// function act2_verify_specific_gravity() {
//     let btn: HTMLButtonElement = <HTMLButtonElement> document.getElementById('temp-btn-act2-spgr');
//     let act2_spgr_inp: HTMLInputElement = <HTMLInputElement> document.getElementById('act2-spgr-inp');
//     let act2_sp2: HTMLSpanElement = <HTMLSpanElement> document.getElementById('act2-spgr-val-sp');
//     console.log("inp spgr act2= ",act2_spgr_inp.value);
//     if(!verify_values(parseFloat(parseFloat(act2_spgr_inp.value).toFixed(2)), parseFloat(specific_gravity.toFixed(2)))) {
//         alert(`incorrect value of volume`);
//         return;
//     }
//     act2_spgr_inp.remove();
//     act2_sp2.innerText = `${parseFloat(specific_gravity.toFixed(4))}`;
//     //btn.remove();
//     if(btn) {
//         btn.remove();
//     }
//     let div: HTMLDivElement = <HTMLDivElement>(
//         document.getElementById('act2-spwt-div')
// 	);
// 	div.style.display = 'block';
// }
// function act2_verify_specific_weight() {
//     let btn: HTMLButtonElement = <HTMLButtonElement> document.getElementById('temp-btn-act2-spwt');
//     let act2_spwt_inp: HTMLInputElement = <HTMLInputElement> document.getElementById('act2-spwt-inp');
//     let act2_sp2: HTMLSpanElement = <HTMLSpanElement> document.getElementById('act2-spwt-val-sp');
//     console.log("inp spwt act2= ",act2_spwt_inp.value);
//     if(!verify_values(parseFloat(parseFloat(act2_spwt_inp.value).toFixed(2)), parseFloat(specific_weight.toFixed(2)))) {
//         alert(`incorrect value of volume`);
//         return;
//     }
//     act2_spwt_inp.remove();
//     act2_sp2.innerText = `${parseFloat(specific_weight.toFixed(4))}`;
//     //btn.remove();
//     if(btn) {
//         btn.remove();
//     }
//     exp_complete();
// }
function exp_complete() {
    let btn = (document.getElementById('temp-btn-act2-spwt'));
    btn && btn.remove();
    alert('Experiment completed');
}
//# sourceMappingURL=activity2.js.map