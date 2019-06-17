<template>
    <div class="home">
        <NodeInfo></NodeInfo>
    </div>
</template>

<script>

import NodeInfo from '../components/Home/NodeInfo';

export default {
    name: '',
    components: { NodeInfo },
    data() {
        return {}
    },
}
</script>

<style scoped lang='scss'>
.home{
  width: 100%;
  background: #fafbfe;
}
</style>
