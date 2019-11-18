<template>
  <div class="base-use">
    <div id="myDiagramDiv">

    </div>
  </div>
</template>

<script>
import go, { Point } from 'gojs';
const $ = go.GraphObject.make;
export default {
  name: 'base-use',
  data() {
    return {
      myDiagram: null,
      nodeDataArray: [
        {
          key: '0',
          title: '水利部综合事业局总水量',
          value: '30',
          position: 9,
          textX: 80,
          bgColor: '#2C7FF7'
        },
        {
          key: '1',
          title: '上善若水大厦水量',
          parent: '0',
          value: '30',
          position: 30,
          textX: 80,
          bgColor: '#23DD72'
        },
        {
          key: '2',
          title: '水务大厦水量',
          parent: '0',
          value: '30',
          position: 45,
          textX: 80,
          bgColor: '#23DD72'
        },
        {
          key: '3',
          title: '食堂、空调水量',
          parent: '0',
          value: '30',
          position: 40,
          textX: 80,
          bgColor: '#23DD72'
        },
        {
          key: '4',
          title: '绿化水量',
          parent: '0',
          value: '30',
          position: 59,
          textX: 80,
          bgColor: '#23DD72'
        },
        {
          key: '5',
          title: '损耗量',
          parent: '0',
          value: '30',
          position: 68,
          textX: 80,
          bgColor: '#FF400C'
        }
      ]
    };
  },
  mounted() {
    this.initDiagram();
  },
  methods: {
    //   初始化模板
    initDiagram() {
      this.myDiagram = $(go.Diagram, 'myDiagramDiv', {
        isReadOnly: true
      });
      this.initTemplate();
      this.initLayout();
      this.initLinkTemplate();
      this.initData();
    },

    /** 节点样式 */
    initTemplate() {
      this.myDiagram.nodeTemplate = $(
        go.Node,
        'Spot',
        $(
          go.Panel,
          'Position',
          {
            width: 200,
            height: 90,
            background: '#EEE',
            padding: 10
          },
          $(
            go.TextBlock,
            {
              font: 'bold 15px sans-serif'
            },
            // TextBlock.text is bound to Node.data.key
            new go.Binding('position', 'position', function(v) {
              return new Point(v, 0);
            }),
            new go.Binding('text', 'title')
          ),
          $(
            go.Shape,
            'RoundedRectangle',
            {
              position: new go.Point(0, 20),
              margin: 10,
              width: 160,
              height: 40,
              stroke: null
            },
            new go.Binding('fill', 'bgColor')
          ),
          $(
            go.TextBlock,
            {
              font: 'bold 15px sans-serif',
              stroke: '#fff'
            },
            new go.Binding('position', 'textX', function(v) {
              return new Point(v, 42);
            }),
            new go.Binding('text', 'value')
          )
        )
      );
      this.loop(); // animate some flow through the pipes
    },
    loop() {},
    initLayout() {
      this.myDiagram.layout = $(go.TreeLayout, {
        angle: 90,
        layerSpacing: 100
      });
    },

    initLinkTemplate() {
      this.myDiagram.linkTemplate = $(
        go.Link,
        $(go.Shape), // the link shape
        
      );
    },

    /** 图表和模型 */
    initData() {
      const myModel = $(go.TreeModel);
      myModel.nodeDataArray = this.nodeDataArray;
      //   myModel.linkDataArray = [{ from: 'A', to: 'C' }, { from: 'B', to: 'C' }];
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
    background-color: #fff;
  }
}
</style>

