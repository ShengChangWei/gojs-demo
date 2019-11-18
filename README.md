# gojs


## 模型类型

* GraphLinksModel 
* TreeModel

GraphLinksModel允许您在节点之间建立任意数量的链接，并且链接方向不限。从A到B可能有十个链接，从B到A的相反三个链接。

TreeModel的工作原理略有不同。代替维护链接数据的单独数组，而是通过为节点数据指定“父级”来创建树模型中的链接。然后从该关联中创建链接。这是一个与TreeModel相同的示例，其中节点A链接到节点B，节点B链接到节点C：

TreeModel比GraphLinksModel简单，但是它不能建立任意的链接关系，例如同一两个节点之间的多个链接或具有多个父级。我们的组织结构图是一个简单的分层树状结构，因此在此示例中将选择TreeModel。

## 单词

StrokeWidth: 描边宽度