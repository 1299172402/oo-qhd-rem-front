<!-- 两提一降 -->
<template>
    <div>
        <headerSearch style="height: 100%">
            <vertical-switch-button :data-list="dataList1" button-width="100%" button-height="40px" btn-direction="row" style="flex-wrap: wrap; margin-top: 20px" @selectBtn="selectBtn" />
        </headerSearch>
        <div>
            <schedule1 v-if="radio1 == 'schedule1'"></schedule1>
            <schedule-2-1 v-if="radio1 == 'schedule21'"></schedule-2-1>
            <schedule-2-2 v-if="radio1 == 'schedule22'"></schedule-2-2>
            <schedule-3 v-if="radio1 == 'schedule3'"></schedule-3>
            <Schedule4 v-if="radio1 == 'Schedule4'"></Schedule4>
            <Schedule5 v-if="radio1 == 'Schedule5'"></Schedule5>
            <Schedule6 v-if="radio1 == 'Schedule6'"></Schedule6>
            <Schedule7 v-if="radio1 == 'Schedule7'"></Schedule7>
            <Schedule8 v-if="radio1 == 'Schedule8'"></Schedule8>
            <Schedule9 v-if="radio1 == 'Schedule9'"></Schedule9>
            <schedule10 v-if="radio1 == 'Schedule10'"></schedule10>
            <Schedule11 v-if="radio1 == 'Schedule11'"></Schedule11>
            <Schedule12 v-if="radio1 == 'Schedule12'"></Schedule12>
            <Schedule13 v-if="radio1 == 'Schedule13'"></Schedule13>
            <Schedule14 v-if="radio1 == 'Schedule14'"></Schedule14>
            <Schedule15 v-if="radio1 == 'Schedule15'"></Schedule15>
            <Schedule16 v-if="radio1 == 'Schedule16'"></Schedule16>
            <Schedule17 v-if="radio1 == 'Schedule17'"></Schedule17>
            <Schedule18 v-if="radio1 == 'Schedule18'"></Schedule18>
        </div>
    </div>
</template>
<script>
    import verticalSwitchButton from "@/components/intelligentOilfield/vertical-switch-button/index.vue";
    import schedule1 from "./components/schedule1.vue";
    import schedule21 from "./components/schedule2-1.vue";
    import schedule22 from "./components/schedule2-2.vue";
    import schedule3 from "./components/schedule3.vue";
    import Schedule4 from "./components/schedule4.vue";
    import Schedule5 from "./components/schedule5.vue";
    import Schedule6 from "./components/schedule6.vue";
    import Schedule7 from "./components/schedule7.vue";
    import Schedule8 from "./components/schedule8.vue";
    import Schedule9 from "./components/schedule9.vue";
    import Schedule10 from "./components/schedule10.vue";
    import Schedule11 from "./components/schedule11.vue";
    import Schedule12 from "./components/schedule12.vue";
    import Schedule13 from "./components/schedule13.vue";
    import Schedule14 from "./components/schedule14.vue";
    import Schedule15 from "./components/schedule15.vue";
    import Schedule16 from "./components/schedule16.vue";
    import Schedule17 from "./components/schedule17.vue";
    import Schedule18 from "./components/schedule18.vue";
    export default {
        components: {
            verticalSwitchButton,
            schedule1,
            schedule21,
            schedule22,
            schedule3,
            Schedule4,
            Schedule5,
            Schedule6,
            Schedule7,
            Schedule8,
            Schedule9,
            Schedule10,
            Schedule11,
            Schedule12,
            Schedule13,
            Schedule14,
            Schedule15,
            Schedule16,
            Schedule17,
            Schedule18,
        },
        data() {
            return {
                radio1: "schedule1",
                dataList1: [{
                        name: "附件1",
                        key: "schedule1",
                        isChecked: true
                    },
                    {
                        name: "附件2-1(在生产)",
                        key: "schedule21",
                        isChecked: false
                    },
                    {
                        name: "附件2-2(在建设+在评价)",
                        key: "schedule22",
                        isChecked: false
                    },
                    {
                        name: "附件3",
                        key: "schedule3",
                        isChecked: false
                    },
                    {
                        name: "附件4",
                        key: "Schedule4",
                        isChecked: false
                    },
                    {
                        name: "附件5",
                        key: "Schedule5",
                        isChecked: false
                    },
                    {
                        name: "附件6",
                        key: "Schedule6",
                        isChecked: false
                    },
                    {
                        name: "附件7",
                        key: "Schedule7",
                        isChecked: false
                    },
                    {
                        name: "附件8",
                        key: "Schedule8",
                        isChecked: false
                    },
                    {
                        name: "附件9",
                        key: "Schedule9",
                        isChecked: false
                    },
                    {
                        name: "附件10",
                        key: "Schedule10",
                        isChecked: false
                    },
                    {
                        name: "附件11",
                        key: "Schedule11",
                        isChecked: false
                    },
                    {
                        name: "附件12",
                        key: "Schedule12",
                        isChecked: false
                    },
                    {
                        name: "附件13",
                        key: "Schedule13",
                        isChecked: false
                    },
                    {
                        name: "附件14",
                        key: "Schedule14",
                        isChecked: false
                    },
                    {
                        name: "附件15",
                        key: "Schedule15",
                        isChecked: false
                    },
                    {
                        name: "附件16",
                        key: "Schedule16",
                        isChecked: false
                    },
                    {
                        name: "附件17",
                        key: "Schedule17",
                        isChecked: false
                    },
                    {
                        name: "附件18",
                        key: "Schedule18",
                        isChecked: false
                    },
                ],
            };
        },
        methods: {
            selectBtn(item) {
                (this.name = item.key), (this.radio1 = item.key);
            },
        },
    };
</script>

<style lang="scss" scoped>
    :root[theme-mode="dark"] .el-table .cell {
        height: auto;
        line-height: 40px;
    }

    ::v-deep .el-radio-button--medium .el-radio-button__inner {
        padding: 10px 10px;
        font-size: 14px;

        background-color: #031527;
        border: 1px solid #00def0;
    }

    ::v-deep .el-card__body,
    .el-main {
        padding: 0px;
    }
</style>
