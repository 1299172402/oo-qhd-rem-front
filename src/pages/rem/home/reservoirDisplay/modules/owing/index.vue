<template>
    <info-window
        info-width="100%"
        info-height="100%"
        header-title="超欠注情况统计"
        :is-show-max-btn="true"
    >
        <el-button class="buttonActive_primary detailLinkBtn" type="primary" @click="linkroute('/injection/indexHome')">
            详情
        </el-button>
        <el-button class="buttonActive_primary detailLinkBtn" type="primary" style="right:110px" @click="downTable">
            下载
        </el-button>
        <el-table
            :data="tableData"
            height="100%"
            id="tabledata"
            border
            style="width: 100%"
        >
            <el-table-column prop="date" label="序号" align="center" width="50" sortable>
                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column prop="wellName" label="井号" min-width="130"
                             align="center" sortable></el-table-column>
            <el-table-column prop="productionIntervalNo" min-width="150" label="层位" align="center" sortable>
                <template slot-scope="scope">
                    <span>{{ scope.row.productionIntervalNo }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="injPump" label="注水工况" align="center" sortable>
                <template slot-scope="scope">
                    <span>{{ scope.row.injPump }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="overflowInj" label="超/欠注量(m³)" min-width="100" align="center"
                             sortable :sort-method="sortNumber">
                <template slot-scope="scope">
                    <span>{{ scope.row.overflowInj }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="dayNum" :label="`天数\n(d)`"
                             align="center" sortable :sort-method="sortNumber02"></el-table-column>
            <el-table-column prop="injAllocRatio" :label="`比例(%)`"
                             align="center" sortable :sort-method="sortNumber03"></el-table-column>
        </el-table>

    </info-window>

</template>

<script>
import {getUltraShortShotStatistics} from "@/api/rem/r-intelligentIPA";
import {exportExcel} from "@/lib/exportExcel";

export default {
    data() {
        return {
            tableData: [],
        };
    },
    mounted() {
        this.queryUltraShortShotStatistics()
    },
    methods: {
        sortNumber(a, b) {
            // 将 a 和 b 转换为数值类型进行比较
            return a.overflowInj - b.overflowInj;
        },
        sortNumber02(a, b) {
            // 将 a 和 b 转换为数值类型进行比较
            return a.dayNum - b.dayNum;
        },
        sortNumber03(a, b) {
            // 将 a 和 b 转换为数值类型进行比较
            return a.injAllocRatio - b.injAllocRatio;
        },
        linkroute(rname) {
            this.$router.push({path: rname, query: {link: 'remHome'}});
        },
        renderheader(h, {column, $index}) {
            return h('span', {}, [
                h('span', {}, column.label.split('?')[0]),
                h('br'),
                h('span', {}, column.label.split('?')[1])
            ]);
        },
        downTable() {
            exportExcel("#tabledata", "超欠注情况统计");
        },
        eeee() {
            let data = new Date()
            if (data.getMonth() < 10) {
                if (data.getMonth() === 0) {
                    return data.getFullYear() - 1 + '-12'
                }
                if (data.getMonth() === 1) {
                    return data.getFullYear() + '-01'
                }
                return data.getFullYear() + '-0' + (data.getMonth() - 1)
            } else {
                return data.getFullYear() + '-' + (data.getMonth() - 1)
            }

        },
        //超欠注情况统计
        queryUltraShortShotStatistics() {
            let queryData = {
                //区块
                blockId: '83D33B89B0DAB7DFA440BD060746883A',
                //选择时间
                // dateTime: new Date().format('YYYY-MM') ,
                //修改取数的日期为5月
                dateTime: this.eeee(),
                // dateTime:'2023-02',
                //油田
                ogfId: '3FC9A818F5BC43B88270DB80BBB3018F'
            }
            getUltraShortShotStatistics(queryData).then((res) => {
                //this.tableData = res.ultraShortShotData
                this.tableData = [
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "9A8D689E9353487E895F93D0DDAC7A14",
                        "wellName": "QHD32-6-C29",
                        "layerId": "ECC4EEB0DD9A430AB8FC649DD49FC2FF",
                        "productionIntervalNo": "明化镇组下段Ⅲ油组1小层",
                        "injPump": "超注",
                        "overflowInj": "7",
                        "dateTime": "2024-06-02 00:00:00",
                        "realInjAlloc": 56.86,
                        "planInjAlloc": 50.0000,
                        "dayNum": 3,
                        "injAllocRatio": 13.100
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "AD8480D6E481453CB21C59DA68C21864",
                        "wellName": "QHD32-6-D22",
                        "layerId": "86577D8B73A74B3182CC67FB9E9E889F",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组2小层",
                        "injPump": "超注",
                        "overflowInj": "6",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 56.04,
                        "planInjAlloc": 50.0000,
                        "dayNum": 17,
                        "injAllocRatio": 13.000
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "22CDFC57B2434AE78967C4A9D1F6B2C7",
                        "wellName": "QHD32-6-C18",
                        "layerId": "5835F100CE2E46A999B04C412D8B014F",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组",
                        "injPump": "超注",
                        "overflowInj": "58",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 657.48,
                        "planInjAlloc": 600.0000,
                        "dayNum": 30,
                        "injAllocRatio": 9.700
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "24B2ACE2768A4953871AD5643D9DA097",
                        "wellName": "QHD32-6-C7",
                        "layerId": "ECC4EEB0DD9A430AB8FC649DD49FC2FF",
                        "productionIntervalNo": "明化镇组下段Ⅲ油组1小层",
                        "injPump": "超注",
                        "overflowInj": "6",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 89.40,
                        "planInjAlloc": 80.0000,
                        "dayNum": 23,
                        "injAllocRatio": 7.500
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "F7218509683F41C593D0B187FB825C7E",
                        "wellName": "QHD32-6-D26",
                        "layerId": "AAA06557D7A14B668E5B8ECE71579B33",
                        "productionIntervalNo": "明化镇组下段Ⅱ油组1+2小层",
                        "injPump": "超注",
                        "overflowInj": "35",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 529.43,
                        "planInjAlloc": 520.0000,
                        "dayNum": 29,
                        "injAllocRatio": 6.700
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "FB937097C7A04856894D19C16B54D4B7",
                        "wellName": "QHD32-6-C13",
                        "layerId": "23A38A9901844C7FA853EA326E75962E",
                        "productionIntervalNo": "明化镇组下段Ⅳ油组1小层",
                        "injPump": "超注",
                        "overflowInj": "5",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 84.00,
                        "planInjAlloc": 80.0000,
                        "dayNum": 30,
                        "injAllocRatio": 6.000
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "ABD3E9CBC589454DBFD56407CBEA4EA8",
                        "wellName": "QHD32-6-C25",
                        "layerId": "2D26DAC50F0346008E93EA399BFF4919",
                        "productionIntervalNo": "明化镇组下段0油组3小层",
                        "injPump": "超注",
                        "overflowInj": "22",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 427.07,
                        "planInjAlloc": 400.0000,
                        "dayNum": 30,
                        "injAllocRatio": 5.500
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "25D7C7A2C3604A1B89F043A9E180F461",
                        "wellName": "QHD32-6-I40",
                        "layerId": "3029D3F7F2E64DC49C5F9D278EEA498D",
                        "productionIntervalNo": "明化镇组下段Ⅲ油组3小层",
                        "injPump": "超注",
                        "overflowInj": "6",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 153.88,
                        "planInjAlloc": 150.0000,
                        "dayNum": 30,
                        "injAllocRatio": 4.000
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "4C360DF8801743F1A938A370C265B30A",
                        "wellName": "QHD32-6-D15",
                        "layerId": "263518079CED49AE8B6C9FE5CEBDD26A",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组3小层",
                        "injPump": "超注",
                        "overflowInj": "21",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 634.00,
                        "planInjAlloc": 600.0000,
                        "dayNum": 30,
                        "injAllocRatio": 3.500
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "B66AFEE1140F45C4A7B2D173AD25B289",
                        "wellName": "QHD32-6-D17",
                        "layerId": "263518079CED49AE8B6C9FE5CEBDD26A",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组3小层",
                        "injPump": "超注",
                        "overflowInj": "24",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 718.00,
                        "planInjAlloc": 700.0000,
                        "dayNum": 30,
                        "injAllocRatio": 3.400
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "23362A72259B4E488D397AF626C610D3",
                        "wellName": "QHD32-6-C26",
                        "layerId": "2D26DAC50F0346008E93EA399BFF4919",
                        "productionIntervalNo": "明化镇组下段0油组3小层",
                        "injPump": "超注",
                        "overflowInj": "13",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 393.92,
                        "planInjAlloc": 380.0000,
                        "dayNum": 30,
                        "injAllocRatio": 3.400
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "AD39991D8C98412EA65985717A67D255",
                        "wellName": "QHD32-6-C12",
                        "layerId": "263518079CED49AE8B6C9FE5CEBDD26A",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组3小层",
                        "injPump": "超注",
                        "overflowInj": "13",
                        "dateTime": "2024-06-13 00:00:00",
                        "realInjAlloc": 412.17,
                        "planInjAlloc": 400.0000,
                        "dayNum": 18,
                        "injAllocRatio": 3.200
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "FB49DE74975B4856BCC9F6B49A556D0F",
                        "wellName": "QHD32-6-C17",
                        "layerId": "071E248DD8D64FDC8D0CA9C4C95B891A",
                        "productionIntervalNo": "明化镇组下段0油组",
                        "injPump": "超注",
                        "overflowInj": "9",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 290.43,
                        "planInjAlloc": 300.0000,
                        "dayNum": 30,
                        "injAllocRatio": 3.100
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "AD8480D6E481453CB21C59DA68C21864",
                        "wellName": "QHD32-6-D22",
                        "layerId": "02398139A19A4F62BEFAC658E870D487",
                        "productionIntervalNo": "明化镇组下段Ⅱ油组2小层",
                        "injPump": "超注",
                        "overflowInj": "4",
                        "dateTime": "2024-06-17 00:00:00",
                        "realInjAlloc": 158.40,
                        "planInjAlloc": 150.0000,
                        "dayNum": 29,
                        "injAllocRatio": 2.800
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "5C7259DA42C04EEDBA97686DB89F0D92",
                        "wellName": "QHD32-6-D21",
                        "layerId": "3029D3F7F2E64DC49C5F9D278EEA498D",
                        "productionIntervalNo": "明化镇组下段Ⅲ油组3小层",
                        "injPump": "超注",
                        "overflowInj": "9",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 344.52,
                        "planInjAlloc": 340.0000,
                        "dayNum": 30,
                        "injAllocRatio": 2.700
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "940B2502EE1D45AEB3B73ED7A1DA338A",
                        "wellName": "QHD32-6-C16",
                        "layerId": "23A38A9901844C7FA853EA326E75962E",
                        "productionIntervalNo": "明化镇组下段Ⅳ油组1小层",
                        "injPump": "超注",
                        "overflowInj": "7",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 301.98,
                        "planInjAlloc": 300.0000,
                        "dayNum": 30,
                        "injAllocRatio": 2.300
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "B5984F2C77A147D29B26154685DD1CB6",
                        "wellName": "QHD32-6-C15",
                        "layerId": "A22D90003C1F4970A5F7859873B3724A",
                        "productionIntervalNo": "明化镇组下段Ⅳ油组",
                        "injPump": "超注",
                        "overflowInj": "6",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 265.33,
                        "planInjAlloc": 260.0000,
                        "dayNum": 30,
                        "injAllocRatio": 2.300
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "8BF7C003D9E2406F86477F7B177C3EF7",
                        "wellName": "QHD32-6-D11",
                        "layerId": "5835F100CE2E46A999B04C412D8B014F",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组",
                        "injPump": "超注",
                        "overflowInj": "15",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 809.00,
                        "planInjAlloc": 800.0000,
                        "dayNum": 30,
                        "injAllocRatio": 1.900
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "64F12F6CEE424D5E83EA9A9F5A2261E0",
                        "wellName": "QHD32-6-C21",
                        "layerId": "5835F100CE2E46A999B04C412D8B014F",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组",
                        "injPump": "超注",
                        "overflowInj": "6",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 404.00,
                        "planInjAlloc": 400.0000,
                        "dayNum": 30,
                        "injAllocRatio": 1.500
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "6BB843AC990941E3A5AEF6253D9174B6",
                        "wellName": "QHD32-6-D2",
                        "layerId": "263518079CED49AE8B6C9FE5CEBDD26A",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组3小层",
                        "injPump": "超注",
                        "overflowInj": "9",
                        "dateTime": "2024-06-15 00:00:00",
                        "realInjAlloc": 810.00,
                        "planInjAlloc": 800.0000,
                        "dayNum": 30,
                        "injAllocRatio": 1.200
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "5C7259DA42C04EEDBA97686DB89F0D92",
                        "wellName": "QHD32-6-D21",
                        "layerId": "263518079CED49AE8B6C9FE5CEBDD26A",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组3小层",
                        "injPump": "超注",
                        "overflowInj": "5",
                        "dateTime": "2024-06-23 00:00:00",
                        "realInjAlloc": 429.99,
                        "planInjAlloc": 430.0000,
                        "dayNum": 30,
                        "injAllocRatio": 1.100
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "46F7C81383A54FCF87AC812A8E2A9345",
                        "wellName": "QHD32-6-C32",
                        "layerId": "5835F100CE2E46A999B04C412D8B014F",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组",
                        "injPump": "超注",
                        "overflowInj": "6",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 704.00,
                        "planInjAlloc": 700.0000,
                        "dayNum": 30,
                        "injAllocRatio": 0.800
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "BFF982C1429F401182502D1BCBC1C4F5",
                        "wellName": "QHD32-6-C4",
                        "layerId": "071E248DD8D64FDC8D0CA9C4C95B891A",
                        "productionIntervalNo": "明化镇组下段0油组",
                        "injPump": "超注",
                        "overflowInj": "1",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 258.96,
                        "planInjAlloc": 250.0000,
                        "dayNum": 23,
                        "injAllocRatio": 0.300
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "940B2502EE1D45AEB3B73ED7A1DA338A",
                        "wellName": "QHD32-6-C16",
                        "layerId": "263518079CED49AE8B6C9FE5CEBDD26A",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组3小层",
                        "injPump": "欠注",
                        "overflowInj": "1",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 451.02,
                        "planInjAlloc": 450.0000,
                        "dayNum": 30,
                        "injAllocRatio": -0.300
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "25D7C7A2C3604A1B89F043A9E180F461",
                        "wellName": "QHD32-6-I40",
                        "layerId": "263518079CED49AE8B6C9FE5CEBDD26A",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组3小层",
                        "injPump": "欠注",
                        "overflowInj": "2",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 647.12,
                        "planInjAlloc": 650.0000,
                        "dayNum": 30,
                        "injAllocRatio": -0.400
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "23362A72259B4E488D397AF626C610D3",
                        "wellName": "QHD32-6-C26",
                        "layerId": "5835F100CE2E46A999B04C412D8B014F",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组",
                        "injPump": "欠注",
                        "overflowInj": "7",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 912.08,
                        "planInjAlloc": 920.0000,
                        "dayNum": 30,
                        "injAllocRatio": -0.800
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "FB49DE74975B4856BCC9F6B49A556D0F",
                        "wellName": "QHD32-6-C17",
                        "layerId": "5835F100CE2E46A999B04C412D8B014F",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组",
                        "injPump": "欠注",
                        "overflowInj": "6",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 562.57,
                        "planInjAlloc": 600.0000,
                        "dayNum": 30,
                        "injAllocRatio": -0.900
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "B5984F2C77A147D29B26154685DD1CB6",
                        "wellName": "QHD32-6-C15",
                        "layerId": "071E248DD8D64FDC8D0CA9C4C95B891A",
                        "productionIntervalNo": "明化镇组下段0油组",
                        "injPump": "欠注",
                        "overflowInj": "1",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 49.24,
                        "planInjAlloc": 50.0000,
                        "dayNum": 30,
                        "injAllocRatio": -1.200
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "AD8480D6E481453CB21C59DA68C21864",
                        "wellName": "QHD32-6-D22",
                        "layerId": "263518079CED49AE8B6C9FE5CEBDD26A",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组3小层",
                        "injPump": "欠注",
                        "overflowInj": "18",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 780.61,
                        "planInjAlloc": 800.0000,
                        "dayNum": 30,
                        "injAllocRatio": -2.200
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "ABD3E9CBC589454DBFD56407CBEA4EA8",
                        "wellName": "QHD32-6-C25",
                        "layerId": "263518079CED49AE8B6C9FE5CEBDD26A",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组3小层",
                        "injPump": "欠注",
                        "overflowInj": "16",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 681.93,
                        "planInjAlloc": 700.0000,
                        "dayNum": 30,
                        "injAllocRatio": -2.200
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "F544EDAEA5574E72AFE26A2DA2820EF1",
                        "wellName": "QHD32-6-C10",
                        "layerId": "263518079CED49AE8B6C9FE5CEBDD26A",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组3小层",
                        "injPump": "欠注",
                        "overflowInj": "15",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 606.55,
                        "planInjAlloc": 600.0000,
                        "dayNum": 23,
                        "injAllocRatio": -2.500
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "7DA18524E02F46BFA268BA9987DA41B0",
                        "wellName": "QHD32-6-D16",
                        "layerId": "263518079CED49AE8B6C9FE5CEBDD26A",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组3小层",
                        "injPump": "欠注",
                        "overflowInj": "12",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 405.36,
                        "planInjAlloc": 400.0000,
                        "dayNum": 23,
                        "injAllocRatio": -3.100
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "89F2745FA187430C9BB5C3262AEDD31B",
                        "wellName": "QHD32-6-D18H1",
                        "layerId": "2D26DAC50F0346008E93EA399BFF4919",
                        "productionIntervalNo": "明化镇组下段0油组3小层",
                        "injPump": "欠注",
                        "overflowInj": "2",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 64.93,
                        "planInjAlloc": 70.0000,
                        "dayNum": 23,
                        "injAllocRatio": -3.100
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "731FCC582E8F468EB89AB9423EE1052E",
                        "wellName": "QHD32-6-C5",
                        "layerId": "263518079CED49AE8B6C9FE5CEBDD26A",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组3小层",
                        "injPump": "欠注",
                        "overflowInj": "22",
                        "dateTime": "2024-06-02 00:00:00",
                        "realInjAlloc": 701.00,
                        "planInjAlloc": 700.0000,
                        "dayNum": 22,
                        "injAllocRatio": -3.200
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "89F2745FA187430C9BB5C3262AEDD31B",
                        "wellName": "QHD32-6-D18H1",
                        "layerId": "02398139A19A4F62BEFAC658E870D487",
                        "productionIntervalNo": "明化镇组下段Ⅱ油组2小层",
                        "injPump": "欠注",
                        "overflowInj": "31",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 919.07,
                        "planInjAlloc": 900.0000,
                        "dayNum": 23,
                        "injAllocRatio": -3.400
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "24B2ACE2768A4953871AD5643D9DA097",
                        "wellName": "QHD32-6-C7",
                        "layerId": "263518079CED49AE8B6C9FE5CEBDD26A",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组3小层",
                        "injPump": "欠注",
                        "overflowInj": "14",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 401.82,
                        "planInjAlloc": 400.0000,
                        "dayNum": 23,
                        "injAllocRatio": -3.400
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "BFF982C1429F401182502D1BCBC1C4F5",
                        "wellName": "QHD32-6-C4",
                        "layerId": "9DB23175242847B78355345C2D0D333F",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组2+3小层",
                        "injPump": "欠注",
                        "overflowInj": "27",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 695.54,
                        "planInjAlloc": 700.0000,
                        "dayNum": 23,
                        "injAllocRatio": -3.900
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "7DA18524E02F46BFA268BA9987DA41B0",
                        "wellName": "QHD32-6-D16",
                        "layerId": "DC09219741164EF8A56F4AF38B124BB3",
                        "productionIntervalNo": "明化镇组下段0油组4小层",
                        "injPump": "欠注",
                        "overflowInj": "8",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 204.92,
                        "planInjAlloc": 200.0000,
                        "dayNum": 23,
                        "injAllocRatio": -4.100
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "F544EDAEA5574E72AFE26A2DA2820EF1",
                        "wellName": "QHD32-6-C10",
                        "layerId": "02398139A19A4F62BEFAC658E870D487",
                        "productionIntervalNo": "明化镇组下段Ⅱ油组2小层",
                        "injPump": "欠注",
                        "overflowInj": "13",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 267.45,
                        "planInjAlloc": 270.0000,
                        "dayNum": 23,
                        "injAllocRatio": -4.700
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "24B2ACE2768A4953871AD5643D9DA097",
                        "wellName": "QHD32-6-C7",
                        "layerId": "23A38A9901844C7FA853EA326E75962E",
                        "productionIntervalNo": "明化镇组下段Ⅳ油组1小层",
                        "injPump": "欠注",
                        "overflowInj": "18",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 292.77,
                        "planInjAlloc": 300.0000,
                        "dayNum": 23,
                        "injAllocRatio": -6.200
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "9A8D689E9353487E895F93D0DDAC7A14",
                        "wellName": "QHD32-6-C29",
                        "layerId": "071E248DD8D64FDC8D0CA9C4C95B891A",
                        "productionIntervalNo": "明化镇组下段0油组",
                        "injPump": "欠注",
                        "overflowInj": "6",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 103.52,
                        "planInjAlloc": 100.0000,
                        "dayNum": 23,
                        "injAllocRatio": -6.400
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "BFF982C1429F401182502D1BCBC1C4F5",
                        "wellName": "QHD32-6-C4",
                        "layerId": "AAA06557D7A14B668E5B8ECE71579B33",
                        "productionIntervalNo": "明化镇组下段Ⅱ油组1+2小层",
                        "injPump": "欠注",
                        "overflowInj": "8",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 107.51,
                        "planInjAlloc": 110.0000,
                        "dayNum": 23,
                        "injAllocRatio": -7.100
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "CDE09D475CA141FBAC1B128E7FCDA312",
                        "wellName": "QHD32-6-D10",
                        "layerId": "2D26DAC50F0346008E93EA399BFF4919",
                        "productionIntervalNo": "明化镇组下段0油组3小层",
                        "injPump": "欠注",
                        "overflowInj": "13",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 168.69,
                        "planInjAlloc": 170.0000,
                        "dayNum": 23,
                        "injAllocRatio": -7.900
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "2041C25B14D4481ABB568BAB184E8005",
                        "wellName": "QHD32-6-D8",
                        "layerId": "23A38A9901844C7FA853EA326E75962E",
                        "productionIntervalNo": "明化镇组下段Ⅳ油组1小层",
                        "injPump": "欠注",
                        "overflowInj": "11",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 138.94,
                        "planInjAlloc": 140.0000,
                        "dayNum": 23,
                        "injAllocRatio": -8.200
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "22CDFC57B2434AE78967C4A9D1F6B2C7",
                        "wellName": "QHD32-6-C18",
                        "layerId": "2EA856207F524537B47A7A77CC9B7F2E",
                        "productionIntervalNo": "明化镇组下段Ⅲ油组",
                        "injPump": "欠注",
                        "overflowInj": "52",
                        "dateTime": "2024-06-19 00:00:00",
                        "realInjAlloc": 548.88,
                        "planInjAlloc": 600.0000,
                        "dayNum": 30,
                        "injAllocRatio": -8.600
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "CDE09D475CA141FBAC1B128E7FCDA312",
                        "wellName": "QHD32-6-D10",
                        "layerId": "DC09219741164EF8A56F4AF38B124BB3",
                        "productionIntervalNo": "明化镇组下段0油组4小层",
                        "injPump": "欠注",
                        "overflowInj": "4",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 49.28,
                        "planInjAlloc": 50.0000,
                        "dayNum": 23,
                        "injAllocRatio": -8.800
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "2041C25B14D4481ABB568BAB184E8005",
                        "wellName": "QHD32-6-D8",
                        "layerId": "263518079CED49AE8B6C9FE5CEBDD26A",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组3小层",
                        "injPump": "欠注",
                        "overflowInj": "71",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 788.06,
                        "planInjAlloc": 800.0000,
                        "dayNum": 23,
                        "injAllocRatio": -8.900
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "7DA18524E02F46BFA268BA9987DA41B0",
                        "wellName": "QHD32-6-D16",
                        "layerId": "02398139A19A4F62BEFAC658E870D487",
                        "productionIntervalNo": "明化镇组下段Ⅱ油组2小层",
                        "injPump": "欠注",
                        "overflowInj": "22",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 190.71,
                        "planInjAlloc": 200.0000,
                        "dayNum": 23,
                        "injAllocRatio": -10.800
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "CDE09D475CA141FBAC1B128E7FCDA312",
                        "wellName": "QHD32-6-D10",
                        "layerId": "263518079CED49AE8B6C9FE5CEBDD26A",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组3小层",
                        "injPump": "欠注",
                        "overflowInj": "66",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 597.03,
                        "planInjAlloc": 615.0000,
                        "dayNum": 23,
                        "injAllocRatio": -10.800
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "2BADE374849F41C6A959CA407F45B4E6",
                        "wellName": "QHD32-6-D3",
                        "layerId": "5BDD7E1CD51D792509EBD535A5F586FD",
                        "productionIntervalNo": "明化镇组下段Ⅱ+Ⅲ油组",
                        "injPump": "欠注",
                        "overflowInj": "25",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 214.52,
                        "planInjAlloc": 230.0000,
                        "dayNum": 23,
                        "injAllocRatio": -11.000
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "F7218509683F41C593D0B187FB825C7E",
                        "wellName": "QHD32-6-D26",
                        "layerId": "9DB23175242847B78355345C2D0D333F",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组2+3小层",
                        "injPump": "欠注",
                        "overflowInj": "34",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 276.57,
                        "planInjAlloc": 280.0000,
                        "dayNum": 39,
                        "injAllocRatio": -12.000
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "9A8D689E9353487E895F93D0DDAC7A14",
                        "wellName": "QHD32-6-C29",
                        "layerId": "263518079CED49AE8B6C9FE5CEBDD26A",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组3小层",
                        "injPump": "欠注",
                        "overflowInj": "38",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 311.64,
                        "planInjAlloc": 300.0000,
                        "dayNum": 27,
                        "injAllocRatio": -12.800
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "CA2CA697D4F84171AEEA03BEB4F273BE",
                        "wellName": "QHD32-6-C9",
                        "layerId": "263518079CED49AE8B6C9FE5CEBDD26A",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组3小层",
                        "injPump": "欠注",
                        "overflowInj": "110",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 521.21,
                        "planInjAlloc": 800.0000,
                        "dayNum": 20,
                        "injAllocRatio": -13.800
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "2BADE374849F41C6A959CA407F45B4E6",
                        "wellName": "QHD32-6-D3",
                        "layerId": "071E248DD8D64FDC8D0CA9C4C95B891A",
                        "productionIntervalNo": "明化镇组下段0油组",
                        "injPump": "欠注",
                        "overflowInj": "13",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 58.82,
                        "planInjAlloc": 70.0000,
                        "dayNum": 34,
                        "injAllocRatio": -18.000
                    },
                    {
                        "blockId": null,
                        "blockName": null,
                        "wellId": "2BADE374849F41C6A959CA407F45B4E6",
                        "wellName": "QHD32-6-D3",
                        "layerId": "263518079CED49AE8B6C9FE5CEBDD26A",
                        "productionIntervalNo": "明化镇组下段Ⅰ油组3小层",
                        "injPump": "欠注",
                        "overflowInj": "42",
                        "dateTime": "2024-06-01 00:00:00",
                        "realInjAlloc": 181.65,
                        "planInjAlloc": 220.0000,
                        "dayNum": 44,
                        "injAllocRatio": -19.000
                    }
                ];
            });
        },
    }
};
</script>

<style lang="scss" scoped>
#tableData {
    ::v-deep .el-table__header-wrapper .cell {
        height: auto;
        line-height: 18px;
        white-space: pre;
    }

    ::v-deep .cell:empty {
        &::before {
            content: "-";
        }
    }
}

.detailLinkBtn {
    position: absolute;
    right: 45px;
    top: 10px;
    width: 50px;
    line-height: 20px;
    padding: 0 !important;
    height: 20px !important;
    font-size: smaller !important;
    text-align: center !important;
}
</style>
