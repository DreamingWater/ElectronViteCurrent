<template>
    <div id="container_container">
        <div id="g2container"></div>
    </div>

</template>

<script lang="ts" setup>
// @ts-nocheck
    import { Line } from "@antv/g2plot";
    import { onMounted } from "vue"; 
    function getData() {
    // generate an array of random data
    const data = [];
    const time = new Date().getTime();

    for (let i = -19; i <= 0; i += 1) {
        data.push({
        x: time + i * 1000,
        y: Math.random() + 0.2,
        });
    }
    return data;
    }
    onMounted(()=>{
        let data = [
  {
    "name": "China",
    "year": "2000",
    "gdp": 1211346869605.24
  },
  {
    "name": "China",
    "year": "2001",
    "gdp": 1339395718865.3
  },
  {
    "name": "China",
    "year": "2002",
    "gdp": 1470550015081.55
  },
  {
    "name": "China",
    "year": "2003",
    "gdp": 1660287965662.68
  },
  {
    "name": "China",
    "year": "2004",
    "gdp": 1955347004963.27
  },
  {
    "name": "China",
    "year": "2005",
    "gdp": 2285965892360.54
  },
  {
    "name": "China",
    "year": "2006",
    "gdp": 2752131773355.16
  },
  {
    "name": "China",
    "year": "2007",
    "gdp": 3550342425238.25
  },
  {
    "name": "China",
    "year": "2008",
    "gdp": 4594306848763.08
  },
  {
    "name": "China",
    "year": "2009",
    "gdp": 5101702432883.45
  },
  {
    "name": "China",
    "year": "2010",
    "gdp": 6087164527421.24
  },
  {
    "name": "China",
    "year": "2011",
    "gdp": 7551500425597.77
  },
  {
    "name": "China",
    "year": "2012",
    "gdp": 8532230724141.76
  },
  {
    "name": "China",
    "year": "2013",
    "gdp": 9570405758739.79
  },
  {
    "name": "China",
    "year": "2014",
    "gdp": 10438529153237.6
  },
  {
    "name": "China",
    "year": "2015",
    "gdp": 11015542352468.9
  },
  {
    "name": "China",
    "year": "2016",
    "gdp": 11137945669350.6
  },
  {
    "name": "China",
    "year": "2017",
    "gdp": 12143491448186.1
  },
  {
    "name": "China",
    "year": "2018",
    "gdp": 13608151864637.9
  },
  {
    "name": "Japan",
    "year": "2000",
    "gdp": 4887519660744.86
  },
  {
    "name": "Japan",
    "year": "2001",
    "gdp": 4303544259842.72
  },
  {
    "name": "Japan",
    "year": "2002",
    "gdp": 4115116279069.77
  },
  {
    "name": "Japan",
    "year": "2003",
    "gdp": 4445658071221.86
  },
  {
    "name": "Japan",
    "year": "2004",
    "gdp": 4815148854362.11
  },
  {
    "name": "Japan",
    "year": "2005",
    "gdp": 4755410630912.14
  },
  {
    "name": "Japan",
    "year": "2006",
    "gdp": 4530377224970.4
  },
  {
    "name": "Japan",
    "year": "2007",
    "gdp": 4515264514430.57
  },
  {
    "name": "Japan",
    "year": "2008",
    "gdp": 5037908465114.48
  },
  {
    "name": "Japan",
    "year": "2009",
    "gdp": 5231382674593.7
  },
  {
    "name": "Japan",
    "year": "2010",
    "gdp": 5700098114744.41
  },
  {
    "name": "Japan",
    "year": "2011",
    "gdp": 6157459594823.72
  },
  {
    "name": "Japan",
    "year": "2012",
    "gdp": 6203213121334.12
  },
  {
    "name": "Japan",
    "year": "2013",
    "gdp": 5155717056270.83
  },
  {
    "name": "Japan",
    "year": "2014",
    "gdp": 4850413536037.84
  },
  {
    "name": "Japan",
    "year": "2015",
    "gdp": 4389475622588.97
  },
  {
    "name": "Japan",
    "year": "2016",
    "gdp": 4926667087367.51
  },
  {
    "name": "Japan",
    "year": "2017",
    "gdp": 4859950558538.97
  },
  {
    "name": "Japan",
    "year": "2018",
    "gdp": 4971323079771.87
  }
];
const linePlot = new Line('g2container', {
                data,
                xField: 'year',
                yField: 'gdp',
                seriesField: 'name',
                yAxis: {
                    label: {
                    formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
                    },
                },
                legend: {
                    position: 'top',
                },
                smooth: true,
                // @TODO 后续会换一种动画方式
                // animation: {
                //     appear: {
                //     animation: 'path-in',
                //     duration: 5000,
                //     },
                // },
                });

                linePlot.render();

  });

  

   
</script>

<style lang="scss">
    .container_container{
        height: 200px;
        width: 600px;
        padding-top: 50px;
    }
</style>