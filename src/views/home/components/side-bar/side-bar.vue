<template>

  <div class="has-logo">
    <logo :collapse="!$store.state.sidebar"></logo>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu"
               :collapse="!$store.state.sidebar"
               :background-color="variables.menuBg"
               :text-color="variables.menuText"
               :unique-opened="false"
               :active-text-color="variables.menuActiveText"
               :collapse-transition="false"
               mode="vertical">
        <template v-for="(item, index) in curMenu">
          <el-submenu v-if="item.children.length>0"
                      :key="index"
                      :index="item.url">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <template v-for="(ite, inx) in item.children">
              <el-menu-item :key="inx"
                            :index="ite.url"
                            @click="toPath(ite.url)">
                <i :class="ite.icon"></i>
                <span slot="title">{{ ite.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item v-else
                        :key="index"
                        :index="item.url"
                        @click="toPath(item.url)">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>

</template>

<script>
import logo from './logo';
import variables from '@/styles/variables.scss';
export default {
  name: 'side-bar',
  components: {
    logo
  },
  data() {
    return {
      curMenu: [
        {
          id: 'd2b45d754acf4dc8b6faca86189a06ff',
          sn: 'home',
          name: '基础用法',
          describe: '',
          type: 'menu',
          url: '/baseUse',
          icon: 'Eicons slbems-zongheyunhangjianshi',
          parentId: '1',
          order: 1524463150870,
          children: []
        },
        {
          id: 'd2b45d754acf4dc8b6faca86189a06ff',
          sn: 'home',
          name: '树状图',
          describe: '',
          type: 'menu',
          url: '/treeModel',
          icon: 'Eicons slbems-zongheyunhangjianshi',
          parentId: '1',
          order: 1524463150870,
          children: []
        },
        {
          id: 'd2b45d754acf4dc8b6faca86189a06ff',
          sn: 'home',
          name: '动态线流程图',
          describe: '',
          type: 'menu',
          url: '/goLink',
          icon: 'Eicons slbems-zongheyunhangjianshi',
          parentId: '1',
          order: 1524463150870,
          children: []
        },
        {
          id: 'd2b45d754acf4dc8b6faca86189a06ff',
          sn: 'home',
          name: '综合运行监视',
          describe: '',
          type: 'menu',
          url: '/operationMonitorin',
          icon: 'Eicons slbems-zongheyunhangjianshi',
          parentId: '1',
          order: 1524463150870,
          children: []
        },
        {
          id: 'd2b45d754acf4dc8b6faca86189a06ff',
          sn: 'home',
          name: '数据报表管理',
          describe: '',
          type: 'menu',
          url: '/dataReport',
          icon: 'Eicons slbems-shujubaobiaoguanli',
          parentId: '1',
          order: 1524463150870,
          children: [
            {
              id: 'd2b45d754acf4dc8b6faca86189a06ff',
              sn: 'home',
              name: '用水数据报表',
              describe: '',
              type: 'menu',
              url: '/dataReport/userWaterData',
              icon: 'fa fa-circle',
              parentId: '1',
              order: 1524463150870,
              children: []
            },
            {
              id: 'd2b45d754acf4dc8b6faca86189a06ff',
              sn: 'home',
              name: '用电数据报表',
              describe: '',
              type: 'menu',
              url: '/dataReport/userElectricityData',
              icon: 'fa fa-circle',
              parentId: '1',
              order: 1524463150870,
              children: []
            }
          ]
        }
      ]
    };
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { path } = route;
      return path;
    },
    variables() {
      return variables;
    }
  },
  methods: {
    toPath(path) {
      this.$router.push({ path: path });
    }
  }
};
</script>
<style  lang="scss">
.el-scrollbar__view {
  height: 100%;
  .el-menu {
    height: 100%;
    i {
      padding-right: 10px;
      color: #fff;
    }
  }
  .el-submenu .el-menu-item {
    i {
      padding-right: 10px !important;
      font-size: 12px;
    }
    min-width: 179px !important;
    &.is-active {
      i {
        color: #fd9b0d;
      }
    }
  }
}

.el-menu-item i {
  padding-right: 10px;
  color: #fff;
}
</style>
