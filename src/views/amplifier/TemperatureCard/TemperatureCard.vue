<template>
    <div class="card-box-warpper">
        <div class="left-box">
               <div class="temperature">
                <TemperatureShow />
               </div>
        </div>
        <div class="right-box">
               <div class="status-box">
                <div class="status">
                    正常
                </div> 
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup>
    import TemperatureShow from  '@/components/animation/TemperatureShow.vue'
    import { ref,onMounted } from 'vue'
    const this_tempratue = ref([])
    const this_current = ref([]) 

    // 父子接口
    const props = defineProps({
      CardLabel: { type: String, default: true },
    });


</script>

<style lang="scss" scoped>

    @charset "UTF-8";
    @import url("https://fonts.googleapis.com/css?family=DM+Sans:400,500,700&display=swap");
    .card-box-warpper {
        width: 100%;
        min-height: 100px;
        border-radius: 5px;
        border: dotted 1px rgb(211, 209, 209);
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        padding: 0;
        .left-box{

            margin-left: 20px;
            // border-radius: 3px;
            justify-content: center;
            // border-style: dotted;
            // border-color: antiquewhite;
            width: 30%;
            height: 100%;
            .temperature{
                width: 100%;
                height: 100%;
            }
        }
        .right-box{
            width: 65%;
            height: 100%;
       
            margin-right: 20px;
          
  
            .status-box{
                height: 80px;
                background-color: rgb(240, 238, 235);
                display: flex;
                align-content: center;
                justify-content: center;
                align-items: center;
                border-radius: 3px;
                border-style: dotted;
                border-color: antiquewhite;
                .status{
                    font-size: 25px;
                }
            }
            
        }
    }
</style>

