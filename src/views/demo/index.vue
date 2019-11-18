<template>
  <div class="hello">
    <div id="diagram"></div>
  </div>
</template>

<script>
import go from 'gojs';
import level0 from '@/assets/0.png';
import level1 from '@/assets/1.gif';
import level2 from '@/assets/2.gif';
import level3 from '@/assets/3.png';
import bg from '@/assets/bg.png';
export default {
  name: 'HelloWorld',
  props: ['msg'],
  data() {
    return {
      myDiagram: null,
      down: true,
      opacity: 1,
      modelData: {
        class: 'TreeModel',
        nodeDataArray: [
          {
            key: 1,
            loc: '0 0',
            text: '消防水箱',
            dirTo: 'bottom',
            dirFrom: 'top',
            parent: 2,
            textAlign: 'top',
            level: 2
          },
          {
            key: 2,
            loc: '0 480',
            text: '加压水泵',
            parent: '4',
            dirTo: 'right',
            dirFrom: 'left',
            textAlign: 'bottom',
            level: 0
          },
          {
            key: 3,
            loc: '80 100',
            text: '增压水表',
            parent: '2',
            dirTo: 'left',
            dirFrom: 'top',
            textAlign: 'top',
            level: 2
          },
          {
            key: 4,
            loc: '550 480',
            text: '总水表',
            parent: '',
            dirTo: 'left',
            dirFrom: 'right',
            textAlign: 'left',
            level: 1
          },
          {
            key: 5,
            loc: '80 200',
            text: '市政水表',
            parent: '2',
            dirTo: 'right',
            dirFrom: 'right',
            textAlign: 'top',
            level: 2
          },
          {
            key: 6,
            loc: '150 30',
            text: '食堂、空调水表',
            parent: '2',
            dirTo: 'bottom',
            dirFrom: 'right',
            textAlign: 'top',
            level: 2
          },
          {
            key: 7,
            loc: '250 200',
            text: '增压水表',
            level: 2,
            parent: '2',
            dirTo: 'left',
            dirFrom: 'right',
            textAlign: 'top'
          },
          {
            key: 8,
            loc: '250 300',
            text: '市政水表',
            level: 2,
            parent: '2',
            dirTo: 'left',
            dirFrom: 'right',
            textAlign: 'top'
          },
          {
            key: 9,
            loc: '430 -30',
            text: '空调机组',
            level: 3,
            parent: '6',
            dirTo: 'bottom',
            dirFrom: 'right',
            textAlign: 'top'
          },
          {
            key: 10,
            loc: '620 -30',
            text: '灶台',
            level: 3,
            parent: '17',
            dirTo: 'bottom',
            dirFrom: 'left',
            textAlign: 'top'
          },
          {
            key: 11,
            loc: '690 -30',
            text: '操作间',
            level: 3,
            parent: '17',
            dirTo: 'bottom',
            dirFrom: 'right',
            textAlign: 'top'
          },
          {
            key: 12,
            loc: '440 160',
            text: '北侧卫生间 3-6层',
            level: 3,
            parent: '7',
            dirTo: 'bottom',
            dirFrom: 'right',
            textAlign: 'top'
          },
          {
            key: 13,
            loc: '650 160',
            text: '南侧卫生间 3-6层',
            level: 3,
            parent: '7',
            dirTo: 'bottom',
            dirFrom: 'right',
            textAlign: 'top'
          },
          {
            key: 14,
            loc: '400 390',
            text: '绿化',
            level: 3,
            parent: '8',
            dirTo: 'top',
            dirFrom: 'right',
            textAlign: 'bottom'
          },
          {
            key: 15,
            loc: '440 260',
            text: '北侧卫生间 1-2层',
            level: 3,
            parent: '8',
            dirTo: 'bottom',
            dirFrom: 'right',
            textAlign: 'top'
          },
          {
            key: 16,
            loc: '650 260',
            text: '南侧卫生间 1-2层',
            level: 3,
            parent: '8',
            dirTo: 'bottom',
            dirFrom: 'right',
            textAlign: 'top'
          },
          {
            key: 17,
            loc: '670 20',
            text: '',
            level: 3,
            parent: '6',
            dirTo: 'bottom',
            dirFrom: 'right',
            textAlign: 'top'
          }
        ]
      }
    };
  },
  watch: {},
  mounted() {
    let $ = go.GraphObject.make;
    let self = this;
    self.myDiagram = $(go.Diagram, 'diagram', {
      allowCopy: false,
      allowDelete: false,
      allowMove: true
    });

    self.myDiagram.add(
      $(
        go.Part, // this Part is background image
        {
          width: 1000,
          height: 800,
          layerName: 'Background',
          position: new go.Point(-60, -80),
          selectable: false,
          pickable: false
        },
        $(go.Picture, bg)
      )
    );

    self.myDiagram.nodeTemplate = $(
      go.Node,
      'Auto',
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      $(go.Shape, 'Rectangle', {
        name: 'SHAPE',
        fill: 'rgba(0,0,255,0)',
        stroke: 'white',
        strokeWidth: 0,
        cursor: 'pointer'
      }),
      $(
        go.Panel,
        'Horizontal',
        $(
          go.Panel,
          'Table',
          {
            margin: 0
          },
          // $(go.TextBlock, {
          //   row: 3,
          //   column: 0,
          //   stroke: '#ffffff',
          //   desiredSize: new go.Size(20, 20),
          //   text: ''
          // },
          // new go.Binding("desiredSize", "dirTo", function(v) {
          //   if (v === "bottom") {
          //     return new go.Size(0, 0)
          //   }
          // }),
          // new go.Binding("row", "key", function(v) {
          //   if (v === 2 || v === 4) {
          //     return 0
          //   }
          // }),
          // ),
          $(
            go.TextBlock,
            {
              row: 0,
              column: 0,
              stroke: '#ffffff'
            },
            new go.Binding('desiredSize', 'key', function(v) {
              if (v === 17) {
                return new go.Size(10, 15);
              }
            }),
            new go.Binding('text', 'text'),
            new go.Binding('row', 'textAlign', function(v) {
              if (v === 'top') {
                return 0;
              } else {
                return 1;
              }
            })
          ),
          $(
            go.Picture,
            {
              name: 'Picture',
              row: 1,
              column: 0,
              desiredSize: new go.Size(30, 30),
              source: ''
            },

            new go.Binding('desiredSize', 'key', function(v) {
              if (v === 17) {
                return new go.Size(0, 0);
              } else {
                return new go.Size(30, 30);
              }
            }),
            new go.Binding('source', 'level', function(v) {
              if (v === 1) {
                return level1;
              } else if (v === 0) {
                return level0;
              } else if (v === 2) {
                return level2;
              } else if (v === 3) {
                return level3;
              }
            }),
            new go.Binding('row', 'textAlign', function(v) {
              if (v === 'top') {
                return 1;
              } else {
                return 0;
              }
            })
          )
        )
      )
    );

    self.myDiagram.linkTemplate = $(
      go.Link, // the whole link panel
      {
        routing: go.Link.Orthogonal,
        curve: go.Link.JumpOver,
        toShortLength: -10,
        fromShortLength: -30,
        layerName: 'Background'
      },
      new go.Binding('fromSpot', 'dirFrom', function(dir) {
        if (dir === 'left') return go.Spot.Left;
        if (dir === 'right') return go.Spot.Right;
        if (dir === 'top') return go.Spot.Top;
        if (dir === 'bottom') return go.Spot.Bottom;
      }),
      new go.Binding('toSpot', 'dirTo', function(dir) {
        if (dir === 'left') return go.Spot.Left;
        if (dir === 'right') return go.Spot.Right;
        if (dir === 'top') return go.Spot.Top;
        if (dir === 'bottom') return go.Spot.Bottom;
      }),

      $(
        go.Shape,
        {
          isPanelMain: true,
          stroke: '#52ce60',
          strokeWidth: 5
        },
        new go.Binding('stroke', 'color', '#52ce60')
      ),
      $(go.Shape, {
        isPanelMain: true,
        stroke: 'white',
        strokeWidth: 3,
        name: 'PIPE',
        strokeDashArray: [20, 10]
      })
    );
    self.myDiagram.commandHandler.zoomToFit();
    self.loop();

    this.load();
  },
  methods: {
    loop() {
      var diagram = this.myDiagram;
      let self = this;
      setTimeout(function() {
        var oldskips = diagram.skipsUndoManager;
        diagram.skipsUndoManager = true;
        diagram.links.each(function(link) {
          var shape = link.findObject('PIPE');
          var off = shape.strokeDashOffset - 3;
          // animate (move) the stroke dash
          shape.strokeDashOffset = off <= 0 ? 60 : off;
        });
        diagram.skipsUndoManager = oldskips;
        self.loop();
      }, 60);
    },

    load() {
      this.myDiagram.model = go.Model.fromJson(this.modelData);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#diagram {
  width: 100%;
  height: 900px;
  border: solid 1px #ccc;
  background: #001656;
}
</style>
