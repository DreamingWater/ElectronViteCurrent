<template>

  <div class="card">
    <div class="card-content">
      <p class="card-title">Sample Temp
      </p>
      <p class="card-para">
        <ValueShow :name="props.name" :proto_type="props.proto_type" :data_store="props.data_store" :store_getter_key="props.store_getter_key" />
      <p class="card-unit">℃</p>
      </p>
    </div>
  </div>
</template>

<script  setup>
  import ValueShow from "@/components/showContent/ValueShow.vue";
  // 父子接口
  const props = defineProps({
    name:  { type: String, default: 'None-name' },
    proto_type: { type: null, default: 'None-type' },
    data_store: { type: null , required: true},
    store_getter_key:{type:null,required:true},
  });

</script>


<style lang="scss" scoped>
.card {
  width: 200px;
  height: 100px;
  background-color: #FF3CAC;
  background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
  color: white;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  perspective: 1000px;
  //transition: all 1s ease-in-out;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
  cursor: pointer;
}

.card-content {
  padding: 10px;
  position: relative;
  z-index: 1;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.card:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10%;
  background-color: rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: all 1s ease-in-out;
  //transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
  z-index: 1;
}

.card:hover:before {
  opacity: 1;
}

.card .card-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
  text-transform: capitalize;
  font-style: italic;
}

.card .card-para {
  margin-top: 5px;
  font-size: 25px;
  opacity: 0.8;
  font-family: lemon;
}

.card-content {
  transform: translateY(0%);
  transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
}

.card:hover .card-content {
  transform: translateY(-10%);
}

.card-unit{
  font-size: 16px;
  font-style: italic;
}
.card-para, .card-unit {
  display: inline-block;
}

</style>