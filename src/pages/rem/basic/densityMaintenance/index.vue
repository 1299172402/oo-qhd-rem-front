<template>
  <div style="width: 20%">
    <el-tree ref="tree" :data="deptOptions" :props="defaultProps" :expand-on-click-node="false" default-expand-all />
  </div>
</template>

<script>
export default {
  data() {
    return {
      deptOptions: [
        {
          id: "1",
          label: "一级 1",
          children: [
            {
              id: "2",
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                  id: "3",
                },
              ],
            },
          ],
        },
        {
          id: "4",
          label: "一级 2",
          children: [
            {
              id: "5",
              label: "二级 2-1",
              children: [
                {
                  id: "6",
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              id: "7",
              label: "二级 2-2",
              children: [
                {
                  id: "8",
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
      ],
    };
  },
};
</script>

<style></style>
