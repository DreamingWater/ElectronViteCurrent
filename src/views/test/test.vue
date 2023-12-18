<template>
    <div class="personal-bests-container">
        <div class="best-item box-one">
        <p>Fastest 5K Run: 22min</p>
        <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/05dfc444-9ed3-44cc-96af-a9cf195f5820" alt="" />
        </div>
    </div>
</template>

<style lang="css" scoped>


/* MAIN MENU */




.personal-bests-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 150px);
  gap: 10px;
  margin-top: 10px;
}

.best-item {
  display: flex;
  gap: 20px;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 3px;
}

.box-one {
  flex-direction: row;
  align-items: center;
  justify-content: center;
  grid-area: 1 / 1 / 2 / 3;
  background-color: rgba(185, 159, 237, 0.6);
  padding: 15px;
  font-size: 1rem;
  font-weight: 700;
}

.box-one img {
  max-width: 100px;
  aspect-ratio: 4/3;
}



</style>