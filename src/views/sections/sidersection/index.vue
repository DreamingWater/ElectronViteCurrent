<template>
  <div class="sidebar_content">
    <!-- <circlewave /> -->
    <div class="app-sidebar">
      <router-link to="/manager" class="app-sidebar-link"  active-class="active" >
        <div class="svg_content">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"  width="24" height="24" data-v-ea893729=""><path d="M900.6592 318.5664L512 480.512 123.2896 318.5664c-26.2656-10.9056-26.2656-49.7664 0-60.672L512 95.9488l388.6592 161.9456c26.2656 10.9056 26.2656 49.7664 0 60.672zM219.3408 288.256L512 410.1632l292.608-121.9584L512 166.2976 219.3408 288.2048z" fill="#000000" fill-opacity=".9" p-id="566"></path><path d="M95.9488 449.6896v78.5408L512 711.168l415.9488-182.8864V449.7408L512 632.6272 95.9488 449.6896z" fill="#000000" fill-opacity=".9" p-id="567"></path><path d="M95.9488 666.8288v78.5408L512 928.3072l415.9488-182.8864v-78.5408L512 849.7664l-416.0512-182.9376z" fill="#000000" fill-opacity=".9" p-id="568"></path></svg>
          <p class="content"> 监测器</p>
        </div>

      </router-link>
      <router-link to="/watercooling" class="app-sidebar-link"  active-class="active" >
        <div class="svg_content">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"  width="24" height="24" data-v-ea893729=""><path d="M512 192s192 192 192 352c0 192-192 192-192 192s-192 0-192-192c0-160 192-352 192-352M352 832c0 53.12-42.88 96-96 96s-96-42.88-96-96 42.88-96 96-96 96 42.88 96 96M384 160c0 35.2-28.8 64-64 64s-64-28.8-64-64 28.8-64 64-64 64 28.8 64 64M256 464a80 80 0 0 1-160 0 80 80 0 0 1 160 0M768 832c0 35.2-28.8 64-64 64s-64-28.8-64-64 28.8-64 64-64 64 28.8 64 64M960 592a80 80 0 0 1-160 0 80 80 0 0 1 160 0" fill="#67DDE0" p-id="1675"></path><path d="M512 192s-192 192-192 352c0 192 192 192 192 192s192 0 192-192c0-160-192-352-192-352m0 512c-6.4 0-160-1.92-160-160 0-113.6 111.04-250.24 160-304.96 48.96 54.72 160 191.36 160 304.96 0 154.24-143.68 160-160 160M256 736c-53.12 0-96 42.88-96 96s42.88 96 96 96 96-42.88 96-96-42.88-96-96-96m0 160c-35.2 0-64-28.8-64-64s28.8-64 64-64 64 28.8 64 64-28.8 64-64 64" fill="#4D5152" p-id="1676"></path><path d="M896 192c0 53.12-42.88 96-96 96s-96-42.88-96-96 42.88-96 96-96 96 42.88 96 96" fill="#67DDE0" p-id="1677"></path><path d="M800 96c-53.12 0-96 42.88-96 96s42.88 96 96 96 96-42.88 96-96-42.88-96-96-96m0 160c-35.2 0-64-28.8-64-64s28.8-64 64-64 64 28.8 64 64-28.8 64-64 64M320 96c-35.2 0-64 28.8-64 64s28.8 64 64 64 64-28.8 64-64-28.8-64-64-64m0 96c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32-14.4 32-32 32M880 512a80 80 0 0 0 0 160 80 80 0 0 0 0-160m0 128c-26.56 0-48-21.44-48-48s21.44-48 48-48 48 21.44 48 48-21.44 48-48 48M176 384a80 80 0 0 0 0 160 80 80 0 0 0 0-160m0 128c-26.56 0-48-21.44-48-48S149.44 416 176 416s48 21.44 48 48S202.56 512 176 512M704 768c-35.2 0-64 28.8-64 64s28.8 64 64 64 64-28.8 64-64-28.8-64-64-64m0 96c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32-14.4 32-32 32" fill="#4D5152" p-id="1678"></path><path d="M576 512c0-53.12 42.88-96 96-96s96 42.88 96 96-42.88 96-96 96-96-42.88-96-96" fill="#67DDE0" p-id="1679"></path><path d="M672 416c-53.12 0-96 42.88-96 96s42.88 96 96 96 96-42.88 96-96-42.88-96-96-96m0 160c-35.2 0-64-28.8-64-64s28.8-64 64-64 64 28.8 64 64-28.8 64-64 64" fill="#4D5152" p-id="1680"></path></svg>
          <p class="content"> 水冷器</p>
        </div>

      </router-link>
      <router-link to="/creater" class="app-sidebar-link" active-class="active" >
        <div class="svg_content" >
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"  width="24" height="24" data-v-ea893728=""><path d="M512 64a448.128 448.128 0 0 0 0 896 446.976 446.976 0 0 0 381.056-212.288c18.56-30.08 0-48.768-30.016-67.392-30.08-18.624-60.16-30.08-78.784 0A318.976 318.976 0 0 1 512 832a320 320 0 0 1 0-640c35.328 0 40.448-30.72 40.448-66.048S547.328 64 512 64z m447.68 469.568c6.784-177.92-84.672-327.616-220.224-407.616-30.464-17.92-47.104 1.92-65.088 32.384-17.92 30.4-30.464 59.904 0 77.824A319.744 319.744 0 0 1 832 512c0 35.328 33.664 40.576 61.056 52.864 27.328 12.288 65.28 3.968 66.624-31.296z" fill="#515151" p-id="2507"></path></svg>
          <p class="content"> 振荡器</p>
        </div>
      </router-link>
      <!-- <a href="" class="app-sidebar-link active"> -->
      <!--          <router-link to="/serial" class="app-sidebar-link active"> -->
      <!--          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"  width="24" height="24" data-v-ea893728="">-->
      <!--            <path fill="currentColor" d="M640 384v64H448a128 128 0 0 0-128 128v128a128 128 0 0 0 128 128h320a128 128 0 0 0 128-128V576a128 128 0 0 0-64-110.848V394.88c74.56 26.368 128 97.472 128 181.056v128a192 192 0 0 1-192 192H448a192 192 0 0 1-192-192V576a192 192 0 0 1 192-192h192z"></path><path fill="currentColor" d="M384 640v-64h192a128 128 0 0 0 128-128V320a128 128 0 0 0-128-128H256a128 128 0 0 0-128 128v128a128 128 0 0 0 64 110.848v70.272A192.064 192.064 0 0 1 64 448V320a192 192 0 0 1 192-192h320a192 192 0 0 1 192 192v128a192 192 0 0 1-192 192H384z">-->
      <!--            </path>-->
      <!--          </svg>-->
      <!--        </router-link>-->


      <router-link to="/amplifier" class="app-sidebar-link "  active-class="active" >
        <div class="svg_content">

          <svg  viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"  width="24" height="24" data-v-ea893728=""><path d="M571.392 87.074133l-0.631467 0.8704-356.9152 465.92c-10.222933 14.4384-12.544 32.512-3.669333 48.503467l2.013867 3.310933c8.618667 14.677333 23.808 22.766933 40.891733 22.766934l190.122667-0.017067-45.841067 270.08-0.631467 2.679467c-4.437333 21.128533 6.144 39.5776 24.832 48.401066l2.372267 1.024 0.529067 0.324267c5.12 2.696533 10.7008 4.215467 16.4352 4.642133l3.464533 0.136534c13.755733 0 26.368-5.410133 36.078933-15.121067a34.133333 34.133333 0 0 0 3.7376-4.437333L812.032 472.576a34.133333 34.133333 0 0 0 5.632-13.090133c2.048-10.376533 2.048-20.48-0.375467-30.173867a34.133333 34.133333 0 0 0-2.645333-7.133867l-1.6384-3.003733c-8.6528-14.557867-23.773867-22.596267-40.789333-22.596267l-162.833067-0.017066 46.165333-272.093867a34.133333 34.133333 0 0 0 0.477867-5.700267l-0.068267-3.072c-0.9216-18.312533-9.984-34.2016-26.760533-41.2672l-1.143467-0.426666-1.006933-0.597334c-19.694933-10.581333-41.984-4.539733-55.671467 13.6704z m2.833067 108.5952l-38.894934 229.3248-0.341333 2.491734a34.133333 34.133333 0 0 0 33.9968 37.358933l164.898133-0.017067-254.856533 360.379734 38.229333-225.1776 0.341334-2.491734a34.133333 34.133333 0 0 0-33.979734-37.376H294.980267l279.2448-364.4928z" fill="#444444" p-id="4682"></path><path d="M828.672 559.616a34.133333 34.133333 0 0 1 30.122667 54.698667l-99.874134 135.0656-55.7568-39.389867 100.608-136.055467 0.256-0.3584a34.048 34.048 0 0 1 24.644267-13.943466z" fill="#00B386" p-id="4683"></path></svg>
          <p class="content"> 放大器</p>
        </div>
      </router-link>
      <router-link to="/temperature" class="app-sidebar-link"  active-class="active" >
        <div class="svg_content">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"  width="24" height="24" data-v-ea893728=""><path d="M511.8194 43.705115c0 0-631.015168 705.783422-54.541093 927.198589 220.692769 84.881834 343.13933-116.306173 382.510053-272.705467C895.77425 474.615873 504.956614 346.390123 511.8194 43.705115zM684.833862 825.701587c-19.504762 78.019048-80.908642 178.793651-191.074427 136.172134-288.237037-110.526984 27.451146-463.418695 27.451146-463.418695C517.23739 649.797531 713.007407 714.091005 684.833862 825.701587z" p-id="3423"></path></svg>
          <p class="content"> 倍频器</p>
        </div>
      </router-link>

      <!-- </a> -->
    </div>
    <div class="bottom-sidebar">
      <router-link to="/about" class="app-sidebar-link"  active-class="active" >
        <div class="svg_content">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"  width="24" height="24" data-v-ea893728=""><path d="M814.848 213.312a62.336 62.336 0 0 1 62.336 62.336v415.616a62.336 62.336 0 0 1-62.336 62.336H491.136l-142.848 93.632a20.8 20.8 0 0 1-32.192-17.408v-76.224H233.024a62.336 62.336 0 0 1-62.336-62.336V275.648c0-34.432 27.904-62.336 62.336-62.336h581.76z m-264.32 270.144H378.432v62.336h172.096v-62.336z m118.848-124.672H378.432v62.336h290.944v-62.336z" p-id="696"></path></svg>          <p class="content"> About</p>
        </div>
      </router-link>
    </div>

    <div class="save_button" @click="SaveConfigs">
      <svg class="icon" style="width: 1.5em;height: 1.5em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="619"><path d="M906.666667 298.666667L725.333333 117.333333c-14.933333-14.933333-32-21.333333-53.333333-21.333333H170.666667C130.133333 96 96 130.133333 96 170.666667v682.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h682.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667V349.866667c0-19.2-8.533333-38.4-21.333333-51.2zM652.8 864H371.2V648.533333h281.6v215.466667z m211.2-10.666667c0 6.4-4.266667 10.666667-10.666667 10.666667h-140.8V618.666667c0-17.066667-12.8-29.866667-29.866666-29.866667H341.333333c-17.066667 0-29.866667 12.8-29.866666 29.866667v245.333333H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h140.8V320c0 17.066667 12.8 29.866667 29.866666 29.866667h277.333334c17.066667 0 29.866667-12.8 29.866666-29.866667s-12.8-29.866667-29.866666-29.866667H371.2V160h302.933333c2.133333 0 6.4 2.133333 8.533334 2.133333l179.2 179.2c2.133333 2.133333 2.133333 4.266667 2.133333 8.533334V853.333333z" fill="#666666" p-id="620"></path></svg>
    </div>
  </div>

</template>
  
  <script lang="ts" setup>
    import Swal from 'sweetalert2';
    import { ConfigManager } from '@/api/Config/configManager'

    const alertResult = (success=true) => {
      if(success){
        Swal.fire({
          title: 'Success!',
          text: 'Configs saved successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
      else {
        Swal.fire({
          title: 'Error!',
          text: 'Error occuers!!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }

    const SaveConfigs = () =>{
      const manager = new ConfigManager();
      const result = manager.updateConfigs({
        'SeedPurchased': manager.get_serial_store_port('SeedPurchased'),
        'Amplifier': manager.get_serial_store_port('Amplifier'),
        'Manager': manager.get_serial_store_port('Manager'),
        'TemperaturePPLN': manager.get_serial_store_port('TemperaturePPLN'),
      });
      alertResult(result); // 弹窗显示结果
    }


  </script>


  <style rel="stylesheet/scss" lang="scss" scoped>
  $main-color: #131313;
  $link-color-hover: #b93535;
  $link-color-active: #571c1c;
  $link-color-active-bg: #b0b0b0;

  .sidebar_content{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

.app-sidebar {
  padding: 40px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.app-sidebar-link {
  color:  $main-color;
  margin: 16px 0;
  transition: 0.2s;
  border-radius: 50%;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.svg_content{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .content{
    font-size: 10px;
    font-style: italic;
  }

}

.app-sidebar-link:hover {
  background-color: $link-color-hover;
  color: var(--link-color-active);
}
.app-sidebar-link.active {
  background-color: $link-color-active-bg;
  color: $link-color-active;
}

.bottom-sidebar {
  margin-top: 50px;
}
.save_button{
  margin-top:50px;
}
  </style>
  