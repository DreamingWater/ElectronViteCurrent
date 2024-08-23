<template>
  <div class="article-details-box">
    <article>
      <!--顶部封面-->
      <header>
        <div class="upper-header">
          <div class="mini-title">About</div>
          <div class="date-since">
            <p><span class="date-value" id="sinceData"></span></p>
            <svg t="1659875517934" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1496" width="20" height="20"><path fill="currentColor" d="M511.913993 63.989249c-247.012263 0-447.924744 200.912481-447.924744 447.924744s200.912481 447.924744 447.924744 447.924744 447.924744-200.912481 447.924744-447.924744S758.926256 63.989249 511.913993 63.989249zM671.199059 575.903242 480.263397 575.903242c-17.717453 0-32.166639-14.449185-32.166639-32.166639L448.096758 289.15572c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 222.930287 159.285066 0c17.717453 0 31.994625 14.277171 31.994625 31.994625S688.916513 575.903242 671.199059 575.903242z" p-id="1497"></path></svg>
          </div>
        </div>
        <div class="lower-header">
          <p class="subtitle">
            本光纤激光器系统包括振荡器、放大器和倍频器三个部分，由振荡器产生1540nm可调谐窄线宽激光，由放大器将信号激光放大到数十W量级，然后在倍频模块中倍频得到高功率的770nm激光。
          </p>
        </div>
      </header>

      <!--文章详细内容-->
      <section class="main-article">
        <h4>使用要求</h4>
        <p>本系统开启过程需要包括启动振荡器、放大器和温控器，启动顺序也有一定的要求，要求放大器启动之前必须启动振荡器（所谓的启动不是开启，而且设置功率输出），否者系统不工作，温控器的启动时间并不关键，越早也好，温控模块需要几分钟达到温度稳定状态。
          </p>
        <p>首先启动振荡器输出，然后启动放大器，最后开启倍频温度设置，这属于这套系统的正常启动环节。</p>
        <blockquote class="pullquote">"振荡器-->放大器-->倍频器" &mdash; Laser--->>></blockquote>

        <p>关闭的话，首先关放大器，然后再关闭振荡器，保证放大器工作过程中必定有种子光存在。</p>
      </section>
    </article>
  </div>

</template>

<script>
export default {
  name: "ArticleDetailsView",
  data(){
    return {
    }
  },
  computed(){

  }
}
</script>

<style scoped lang="scss">


.article-details-box {
  display: flex;
  justify-content: center;
  width: 100%;
  //height: calc(max(100vh, 400px));
  background-color: rgba(16 18 27 / 10%);
  padding: 20px 10px;
  color: #756e6e;
  font-family: "Plus Jakarta Sans", sans-serif;
  overflow: auto;

  article {
    width: 100%;
    //max-width: 1000px;

    header {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      min-height: 80px;
      padding: 5px;
      border-radius: 16px;
      color: #373434;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      //background-image: url("../../assets/images/article/1.jpeg");

      .upper-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 5px;

        .mini-title {
          font-size: 1.125rem;
          font-weight: bold;
          letter-spacing: 0.4rem;
          text-transform: uppercase;
          opacity: 0.9;
        }

        .date-since {
          display: flex;
          align-items: center;
          opacity: 0.5;
          font-size: 0.875rem;

          .date-value {
            display: inline-block;
            padding-bottom: 2px;
          }

          svg {
            width: 20px;
            margin-left: 10px;
          }
        }
      }

      .lower-header {
        padding-top: 5px;

        .tags-container {
          display: flex;
          align-items: center;
          opacity: 0.75;
          margin-bottom: 12px;

          & > span:not(:nth-child(2))::before {
            content: ", ";
          }

          svg {
            width: 20px;
            margin-right: 10px;
          }

          span {
            font-size: 0.875rem;
          }
        }

        .title {
          margin: 20px 0;
          font-size: 3rem;
          font-weight: bold;
          opacity: 0.9;
        }

        .subtitle {
          width: 50%;
          margin-top: 10px;
          opacity: 0.75;
          line-height: 1.75;
        }
      }
    }


  }

  .summary {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    padding: 30px 50px;
    border-radius: 16px;
    box-shadow: 0 0 0 1px #f2f2f2;

    .summary-item {
      width: 100%;
      padding-right: 20px;

      .item-title {
        color: #eae9e9;
        letter-spacing: 2px;
      }

      .item-text {
        margin-top: 10px;
        font-size: 1.5rem;
      }
      *{
        margin: 0;
      }
    }
  }

  .main-article {
    width: 100%;
    margin-top: 5px;
    padding-bottom: 5px;
    line-height: 1.75;

    h4 {
      margin-top: 2px;
      margin-bottom: 2px;
      font-size: 1.1em;
    }

    p {
      margin-bottom: 20px;
      color: #777;
      color: #dca1a1;
      font-size: 1em;
    }

    blockquote {
      position: relative;
      margin: 10px 0;
      padding: 10px;
      //改为渐变背景
      background-color: #b6b6b6;
      background-color: rgba(186, 191, 217, 0.4);

      border-radius: 16px;

      &::before {
        content: url("https://icons.craftwork.design/static/media/QuotesFill.f65b03951f44e212816420b00909f4df.svg");
        position: absolute;
        top: -10px;
        left: 0px;
        transform: scale(1);
        opacity: 0.1;
      }

      &::after {
        content: url("https://icons.craftwork.design/static/media/QuotesFill.f65b03951f44e212816420b00909f4df.svg");
        position: absolute;
        bottom: -10px;
        right: 0px;
        transform: scale(1) rotate(180deg);
        opacity: 0.1;
      }
    }

    .gallery {
      display: grid;
      gap: 20px;
      grid-template-areas:
				"img1 img1 img2 img3"
				"img1 img1 img4 img5";
      min-height: 400px;
      margin-top: 40px;

      .image-item {
        min-height: 200px;
        background-color: #eee;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 8px;
        transition: 250ms;

        &:hover {
          opacity: 0.9;
          cursor: pointer;
        }
      }

      .image-1 {
        grid-area: img1;
      }
      .image-2 {
        grid-area: img2;
      }
      .image-3 {
        grid-area: img3;
      }
      .image-4 {
        grid-area: img4;
      }
      .image-5 {
        grid-area: img5;
      }

    }
  }
}

@media screen and (max-width: 1024px) {
  .article-details-box {
    padding: 5px;

    article header .lower-header .subtitle {
      width: 100%;
    }
  }
}

@media screen and (max-width: 768px) {
  .article-details-box article {
    header .lower-header .title {
      word-break: break-all;
    }

    .summary {
      flex-direction: column;

      .summary-item:not(:last-child) {
        padding-bottom: 30px;
      }
    }

    .main-article {
      .gallery {
        grid-template-areas:
					"img1 img1"
					"img1 img1"
					"img2 img3"
					"img4 img5";
      }
    }
  }
}

@media screen and (max-width: 425px) {
  .article-details-box {
    padding: 20px;
  }

  .article-details-box article header .upper-header .date-since {
    display: none;
  }
}


</style>