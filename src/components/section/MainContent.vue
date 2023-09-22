<template>
    <div class="projects-section">
        <!-- <div class="projects-section-header">
        <p>Controller</p>
        <p class="time">July, 7</p>
        </div>
        <div class="projects-section-line">
            <div class="projects-status">
            <div class="item-status">
                <span class="status-number">45</span>
                <span class="status-type">Current</span>
            </div>
            <div class="item-status">
                <span class="status-number">24</span>
                <span class="status-type">Tempareture</span>
            </div>
            </div>
            <div class="view-actions">
            <button class="view-btn list-view" title="List View">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" /></svg>
            </button>
            <button class="view-btn grid-view active" title="Grid View">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" /></svg>
            </button>
            </div>
        </div> -->

        <div class="project-boxes jsGridView">
            <ShowCard CardLabel="LASER_ONE"/>
            <!-- <ShowCard CardLabel="LASER_TWO"/> -->
        </div>
    </div>
</template>


<script setup>
    import ShowCard from './ShowCard.vue';
</script>
<style lang="css" scoped>

.projects-section {
  width: 100%;
  height: 100%;
}
  
  .project-boxes  {
    width: 100%;
    height: 100%;
  }
</style>