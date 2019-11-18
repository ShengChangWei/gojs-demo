<template>
    <div class="base-use">
        <div id="myDiagramDiv">

        </div>
    </div>
</template>

<script>
import go from 'gojs';
const $ = go.GraphObject.make;
export default {
  name: 'base-use',
  data() {
    return {
      myDiagram: null
    };
  },
  mounted() {
    this.initDiagram();
  },
  methods: {
    //   初始化模板
    initDiagram() {
      this.myDiagram = $(go.Diagram, 'myDiagramDiv');
      this.initTemplate();
      this.initLayout();
      this.initLinkTemplate();
      this.initData();
    },

    /** 节点样式 */
    initTemplate() {
      this.myDiagram.nodeTemplate = $(
        go.Node,
        'Horizontal',
        { background: '#44CCFF' },

        $(
          go.Picture,
          { margin: 10, width: 50, height: 50, background: 'red' },
          new go.Binding('source')
        ),
        $(
          go.TextBlock,
          'Default Text',
          { margin: 12, stroke: '#000', font: 'bold 16px sans-serif' },
          new go.Binding('text', 'key')
        ),
        $(
          go.TextBlock,
          'Default Text',
          { margin: 12, stroke: '#000', font: 'bold 16px sans-serif' },
          new go.Binding('text', 'value')
        )
      );
    },
    initLayout() {
      this.myDiagram.layout = $(go.TreeLayout, { angle: 90, layerSpacing: 35 });
    },

    initLinkTemplate() {
      this.myDiagram.linkTemplate = $(
        go.Link,
        { routing: go.Link.Orthogonal, corner: 5 },
        $(go.Shape, { strokeWidth: 3, stroke: '#555' }) 

      );
    },

    /** 图表和模型 */
    initData() {
      const myModel = $(go.TreeModel);
      myModel.nodeDataArray = [
        { key: 'A', value: '1', source: require('@/assets/3.png') },
        {
          key: 'B',
          value: '2',
          parent: 'A',
          source: require('@/assets/3.png')
        },
        { key: 'C', value: '3', parent: 'A', source: require('@/assets/3.png') }
      ];
      myModel.linkDataArray = [{ from: 'A', to: 'C' }, { from: 'B', to: 'C' }];
      this.myDiagram.model = myModel;
    }
  }
};
</script>

<style lang="scss" scoped>
.base-use {
  position: relative;
  height: 100%;
  width: 100%;
  #myDiagramDiv {
    width: 100%;
    height: 100%;
    background-color: #ccc;
  }
}
</style>

