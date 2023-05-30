<template>
  <div class="menu menuColor">
    <!--隐藏菜单-->
    <div class="ensconce">
      <h2>
        <img v-if="$store.state.setting.mode === 'dark'" src="@/assets/treeSelectDark2.png" alt="">
        <img v-else src="@/assets/treeSelectWhite2.png" alt="">
        <div class="navClass">
          目标导航
        </div>
      </h2>
    </div>
    <!--显示菜单-->
    <div class="open openColor" :class="$store.state.setting.mode === 'dark' ? 'open' : 'open-white'">
      <div class="navH navHColor">
        <div style="font-size: 14px;font-weight: 500;">
          目标导航
        </div>
        <span>
          <img
            v-if="$store.state.setting.mode === 'dark'"
            class="obscure"
            src="@/assets/treeSelectDark1.png"
            alt=""
          >
          <img
            v-else
            class="obscure"
            src="@/assets/treeSelectWhite1.png"
            alt=""
          >
        </span>
      </div>
      <div class="navBox">
        <el-tree
          ref="tree"
          :data="deptOptions"
          show-checkbox
          accordion
          :expand-on-click-node="false"
          :default-expand-all="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    "level": {
      type: String,
      default: "5"
    }
  },
  data() {
    return {
      deptOptions: [
        {
          "label": "有限天津分公司",
          "value": "3DC1B33E1B5B431E99FA163BF9E86E6A",
          "level": "1",
          "children": [
            {
              "label": "秦皇岛32-6作业公司",
              "value": "715AD1CD60484BB59E737CD18A9DE44A",
              "level": "2",
              "children": [
                {
                  "label": "QHD32-6",
                  "value": "3FC9A818F5BC43B88270DB80BBB3018F",
                  "level": "3",
                  "children": [
                    {
                      "label": "QHD32-6CEPI",
                      "value": "3F1E5858C6CC41E2BF4FFC4902797C08",
                      "level": "4",
                      "children": [
                        {
                          "label": "QHD32-6-I10H",
                          "value": "AD04DD9926074346AF9BB1E92A61E5BC",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I11H",
                          "value": "661C937CE0474619A2264C69F7E0B7F3",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I12H",
                          "value": "829093298E2245F59D75D7612FA767E0",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I13H",
                          "value": "280D9712045E4332A8678BF387686A62",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I13H1",
                          "value": "4C90C0F4AF4445A8A3FF13E798170885",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I14H",
                          "value": "CE83EDE2DD6A4171A6D62333937945D7",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I15H",
                          "value": "40DDC88FCACA4F0CB471569B2E3255D6",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I16H",
                          "value": "2104A7EB9D27460A868A715B6A30F033",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I17H",
                          "value": "4B506CC162C84EAABFC2447DF8DC7FEA",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I18H",
                          "value": "0783411175F14B82BF2E10794F0FB721",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I19H",
                          "value": "785C215EBE6142C3BD1D5A3F15EB3F85",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I19H1",
                          "value": "406751D78BA64138BF94AEF627D24539",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I1H",
                          "value": "388E7616786F413DA6911A82DEF20F3B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I20H",
                          "value": "213B33C6346A42C49C78678B85FD6B62",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I21H",
                          "value": "3AAFF17582A9461792515471577184DB",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I21H1",
                          "value": "E2D47EEC4C994DB6BF3FBE744B4A1629",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I22H",
                          "value": "692AF91E7AAF481AA4123C86FC3B53FC",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I23H",
                          "value": "509AF2CA49324238AD643FEC45767F84",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I23H1",
                          "value": "6DA2FA0F37D447189D2D1C9BF3F3D6FF",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I24H",
                          "value": "2A8D967236BA41CA90FF6E1395BEF6F7",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I24S1",
                          "value": "4F4F8BDEAF4940F984C665DD50C831E9",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I25H",
                          "value": "E0627398DE9544388EE295D7F00B679E",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I26H",
                          "value": "29F1A12E1F2A4C378ACEA7A3188A8195",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I26H1",
                          "value": "6AC3994B9BB59AA95AB8F1411C01E1AA",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I27H",
                          "value": "5A6A221155274B578E18D33A2417D675",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I27H1",
                          "value": "2A9385E0ABC049EDA5C2CAE3EDF2FD35",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I28H",
                          "value": "9E466BF6EF4A4FE8840DB4ACA9ABED4F",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I29H",
                          "value": "8F576F4C2C3F4B30AFD09B36C9E25FAC",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I2H",
                          "value": "83B416781486482DB168619C4A1E5287",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I2H1",
                          "value": "E5940DA6EDCE40309FCD946593EDDBF8",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I30H",
                          "value": "8043FE33FB6C4DDC86D1E5DD6B72F0D1",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I31H",
                          "value": "393C280D795B4D0493A0BD78135B9247",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I32H",
                          "value": "8C62CAB4844D4F1E86C20CEA228B120E",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I33H",
                          "value": "D78B34624D4644398150CC2C71AD7D84",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I34",
                          "value": "D7EEE21DFAE44E03A30BEA3982ACF410",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I35H",
                          "value": "64C2EC1EA63C46C2BF3D0FEDE9F9D920",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I36H",
                          "value": "67AD3CF8D3A74FA785851BD2F0A1AA09",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I37H",
                          "value": "5D4EAD27BABC4BEAA21C1F9ACDD53456",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I38H",
                          "value": "0511069A166241FAAC7C558CF2888CAC",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I38H1",
                          "value": "D5F5E6C74BD24A6CA882BFA49F1E1F35",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I39H",
                          "value": "37B04082AF474798B1E1F989641A9F94",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I39H1",
                          "value": "EF457981ED3B452ABFAE31861D3ABEF0",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I3H",
                          "value": "E7D2ED52ECBF45589EBA3034C69BF6CB",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I3H1",
                          "value": "D4BEBD2817E0449F957F78ED0A685A6C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I40",
                          "value": "25D7C7A2C3604A1B89F043A9E180F461",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I41H",
                          "value": "CB2B0E520100B3023F681FAD3A31113E",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I42H",
                          "value": "381024FB1397E5E6C39809CDE1954A14",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I43H",
                          "value": "45F43336985BE305EF1887F12B92CE9D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I44H",
                          "value": "D42AC1B0676F7AEDA51ABF255AE347B4",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I45H",
                          "value": "ACB190B77EDE805616F8E3CC2644E167",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I46",
                          "value": "0C37B943D9EFF0E59DA8948CEDC0AE66",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I47",
                          "value": "66870B98E31E4E97C43ACF0C849DB92C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I4H",
                          "value": "A702C42E10FE45E483744E3A2F4A2694",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I4H1",
                          "value": "D3A6C3091BB84701A4828B0EC4612CA3",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I5",
                          "value": "80AEB8C1BDF640A7BA283CCBA569DF30",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I5H2",
                          "value": "96B12D83206E4E2B9081D7262525D56C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I5S1",
                          "value": "8EDB0367F22F451C8C40067CC231C56D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I6H",
                          "value": "583CDF2F1A944CEEB8EDD705F1A37203",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I6H1",
                          "value": "E2DF3CB3B2394297914EF4BFCFD20EE5",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I7H",
                          "value": "56E75C7F558D459A8D8260E1CE50027B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I7H1",
                          "value": "24878F3701B447198636934C1A90F9C9",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I8H",
                          "value": "A75C270791C0465C952A5B34D5ED948C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I9H",
                          "value": "AA68E30954CD449D82BFD7CC8439309F",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-I9H1",
                          "value": "8AE237EBADA04DD59963F1A9F5BF09CE",
                          "level": "5",
                          "children": []
                        }
                      ]
                    },
                    {
                      "label": "QHD32-6CEPJ",
                      "value": "FA1CF76628104FB383BB444C8861BFCB",
                      "level": "4",
                      "children": [
                        {
                          "label": "QHD32-6-J10H",
                          "value": "1651395D897D485FB196B646881B9EDE",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J10H1",
                          "value": "EA7B2020510846D0878A629E6382E5AB",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J11H",
                          "value": "EC7F139A854C4074B70D8C24EFE1103F",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J11H1",
                          "value": "833126A2F4544FC8AEC16FCF8E4055BA",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J12H",
                          "value": "A02254A9E72B49D4B6C88062AB7281CB",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J13H",
                          "value": "573B0FFDB8A34441B206047AC5FF6799",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J14H",
                          "value": "0721D474D9B04D6B9CAF2FCC06186483",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J14H1",
                          "value": "257DE61B82E94263BFB8239D02447934",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J15H",
                          "value": "5E750C5F40654189835D39225EFA6A5A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J15H1",
                          "value": "201FA84AD54D40A8BF42CF64BE5AE937",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J16H",
                          "value": "C0A243482FAD46C6BFF6B63128BE0491",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J17H",
                          "value": "1D38390AEAAA42FEA9ADC795544BBC6D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J17H1",
                          "value": "0F4583A0BF814F048DC0C6162809C06F",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J18H",
                          "value": "26F07059DBA34F36A39873E539694D5F",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J19H",
                          "value": "944ABCA46F5E42DDA9183778C9C81888",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J19H1",
                          "value": "8600CC012B824A09893FD30A3A15A9FE",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J1H",
                          "value": "9E2CA0468BBB4F0E949FB11A61EF4C06",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J1H1",
                          "value": "04697E0665BC445BAFBF808314F99243",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J20H",
                          "value": "D45C81F416EB4D0DB731D91FBC8A9EBD",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J21H",
                          "value": "64EE3F811C12478FBBA6CB1C8F399947",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J21H1",
                          "value": "D976540A9D0B49C6BC9E0598AD534E27",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J22H1",
                          "value": "46B7F97AF1754E858B0F7974B591B986",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J22M",
                          "value": "308E3693BBFB4EF9AA24E12E750C55B8",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J23H",
                          "value": "DC3D126701DF45AE9EE98CE0CDEE5702",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J23H1",
                          "value": "35990C336A3C47189EF2AB351B30306E",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J24H",
                          "value": "1D77A9A73EB44323875BAB43EC617C0C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J25H",
                          "value": "77247D5C5ECC4FB5A6001919E9A45277",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J26H",
                          "value": "FF2F372F52354E19B4BC6891BB145CFD",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J26H1",
                          "value": "590F2C19814B417CA278461B62B7C905",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J27H",
                          "value": "5BCFAC19475341F6ABFC8552C73EABC9",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J27H1",
                          "value": "0247FC527FA441D397ADA01D7788F8A6",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J28",
                          "value": "1D16036522BA4E7B8263E76CAB7089FC",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J28S1",
                          "value": "F7729F4275D9429882E7B763520DAA8E",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J29H",
                          "value": "E4AADC7DC7E347F5AC236195194F6EEA",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J29H1",
                          "value": "9208AE4DDA2E3DD8A7B8D3160845AEA5",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J2H",
                          "value": "1E526437C2974D1B9574C81E5E671F51",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J30H",
                          "value": "65EB8B33DBCC468BAC23FFE427030153",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J30H1",
                          "value": "4D99F9864605410EAF63597BFF2F2D70",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J30H2",
                          "value": "B0BA28BD046E475197728564764CCE26",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J31H",
                          "value": "6073892092DD4C4896B277521DCAB164",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J31H1",
                          "value": "558CF9721DD83A207498197F3632789C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J32H",
                          "value": "0AB7D88759C649AB914EE48069C27D03",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J32H1",
                          "value": "188D3654660047589EEBD3B1DD30C164",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J33H",
                          "value": "DD53A1276DE94995B2C54761E2720A21",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J33H1",
                          "value": "FE18C7DBB9BBF153D60BBEEFF1BE7774",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J34H",
                          "value": "1E01C23625624DE9A1357C57C936821A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J34H1",
                          "value": "A99663E5BE0C4DB79383B97CC7476858",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J35H",
                          "value": "EC780A01A6E045949862E3A184E8335B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J36H",
                          "value": "09DD2B1E628044B388D0320EC80E5614",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J37",
                          "value": "C143CB1BE003405C8B2A4BB6D559EE57",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J38",
                          "value": "F8BB44878D704DD79F3EE9D4E675C144",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J39H",
                          "value": "66BBEA3E4ACC4920BEE2635943960B9C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J39H1",
                          "value": "DF103A65D1C200EE1AF9F4B9282D70AF",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J3H",
                          "value": "184A2D02B57E422AA0A9436780CBE1DF",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J40H",
                          "value": "0BBF36512E5A4134B364AE7D5308D477",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J41H",
                          "value": "30AFD1D2C05E43838A8399DEA51BD89B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J42H",
                          "value": "F88243B6D46A4EA497164AD10044BFF0",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J43H",
                          "value": "31B4516AAFD6474FBF3741FD50DF8BA4",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J44H",
                          "value": "19E50A4519D248758DDC35273D2B29CF",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J45H",
                          "value": "31DA84FF536B41779C1D00FAD72AC73A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J46H",
                          "value": "3DE1F3813C2741C893F0ECB4D5C5E5E6",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J47H",
                          "value": "79ABA30B59FD4974959DBD4CA018079D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J48H",
                          "value": "9777243E373C42B4AE6ABF2B081D9797",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J49H",
                          "value": "93A8B041F9F540F1852795BBDDCF1D95",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J4H",
                          "value": "96C04F532D8342359E941E3643C28592",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J50H",
                          "value": "4246426446D1436185380D7D42919824",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J50H1",
                          "value": "1BDC742DBA9EC0919AC85E9820D04EA3",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J51H",
                          "value": "CB223CEC339E49D29083F7470B4DA28D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J52H",
                          "value": "816D638FE22A4A4D823EE801C95BC6FF",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J53H",
                          "value": "C0B4BD97DEA14D71ABD639E4A0EF3AD9",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J54H",
                          "value": "3D8156CA036B4F9A985ED120DB552099",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J54H2",
                          "value": "51466E1820534E63A48D33D905FD675D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J55H",
                          "value": "EC534DC0C346412593D3213E70F5F588",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J55H1",
                          "value": "249C72B9A6E6464DB0C553451AF2CEA2",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J56H",
                          "value": "80A4213AB4274819AC577122BCA78674",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J56H1",
                          "value": "A64A1EBB74EF4EE38C90C6DF1EB9C0E4",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J5H",
                          "value": "80B0965683B140B8B82BFE58F8260305",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J6H",
                          "value": "B22895A9EA6E4DB395FB0E51D5F2A1F2",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J7H",
                          "value": "E6FB52CD308B41E9874C1883131347B8",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J7S1",
                          "value": "BDF471AE2A2646E3870D966CE28F1C56",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J8H",
                          "value": "986F8F0D24F842D58AC2EBB132287A30",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J8H1",
                          "value": "3BC452FE2661466890F0396FB39AF0E0",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J9H",
                          "value": "CBBCFF9F1A1A4D27A5C149C7B5C792BD",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-J9H1",
                          "value": "9EC2E73DEC8344FA85E1878C739B5F66",
                          "level": "5",
                          "children": []
                        }
                      ]
                    },
                    {
                      "label": "QHD32-6CEPL",
                      "value": "9B780635FBD846D789873CBC77632A5B",
                      "level": "4",
                      "children": [
                        {
                          "label": "QHD32-6-L10H",
                          "value": "032C9080AEBF6D6EA2B9AD765A8C436E",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-L11H",
                          "value": "88C2094C026A594277A845E9D1FE42AD",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-L12H",
                          "value": "6FDB6CE58649E717CE8882011912702E",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-L1H",
                          "value": "34980671A45A454A805F1A9A36D3FAE4",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-L2H",
                          "value": "D926ADF9D1154DFD890B9D38238A57D4",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-L3H",
                          "value": "D92F6D8EE5564DEEBA8AB58E9407C4A6",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-L3P1",
                          "value": "D4B8AA5328FF33E556487A0A4FC11753",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-L4H",
                          "value": "866E16B49318443081DAB53AAB35C1C6",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-L5H",
                          "value": "EEC4662C8FEF40A7932129F4FAF4AF0F",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-L6H",
                          "value": "F0978DE013294C3A921B4724DC5036E8",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-L7",
                          "value": "55AE0ACABCE100D361BAE9BD828D0571",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-L7H",
                          "value": "58CB9AB090224EE9B429E50F314E949E",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-L8H",
                          "value": "6083D81F85FC4774898B49FDD637FE6D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-L9H",
                          "value": "FB20D36C65A5CA91216B4A5F2167A198",
                          "level": "5",
                          "children": []
                        }
                      ]
                    },
                    {
                      "label": "QHD32-6WHPA",
                      "value": "C099F9FAB82348FDB73B33EECCE20A08",
                      "level": "4",
                      "children": [
                        {
                          "label": "QHD32-6-A1",
                          "value": "09D30C16BD1D4F759D53F74941701307",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A10",
                          "value": "F088ECA070CE45429BFD772A4A82D13D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A11",
                          "value": "F27ED92CE5E54980ADC8BFEC9DE04DDC",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A12",
                          "value": "9BEC1B2CCA2C41FEAD8ACE33DC47F8BF",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A13",
                          "value": "F0B8619234074B9F970A3BE4AF34265C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A13H1",
                          "value": "DBAA5B9101F9451DA40175B1849F4554",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A14",
                          "value": "A92B5D699A3B4C44AB0C1C6C9A879A2B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A15",
                          "value": "7ADBC380D3214E479CB676F298FE2B95",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A15H1",
                          "value": "2183CEB5987840AD95FB2A2FC467EF21",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A16",
                          "value": "EDCECA2B41FF475687E158F4D3A3580F",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A16H1",
                          "value": "5E94B13106F74EED84393BC96BDAC4AC",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A17",
                          "value": "DA16FEAE0BBF49A1B938C86C2F194DED",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A17H1",
                          "value": "0714B164AA9647CA9160FD458B87AFE3",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A18",
                          "value": "1E3522013117430FBDB893903542FD5D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A19",
                          "value": "9BF5DF32D48540E6B93EDB129AD7E46A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A2",
                          "value": "8AD478C388D54C1590FDD6AE2DFFB2F5",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A20",
                          "value": "7EFEBAEB61F84422B9379CA0DD473684",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A21",
                          "value": "FC61AEDD360D45D2A151861431843FD0",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A21H1",
                          "value": "55C0E6BFDBC44E0DAAB4B5F75E05E095",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A22",
                          "value": "94856F6380F643D8AD7D2C723A4E1BCE",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A23",
                          "value": "7F17F71346FF4A0BA7071DA97F529E0A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A23H1",
                          "value": "2D6DA4B795D3470DB2A69B90B372BDBC",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A24",
                          "value": "9E7E321D0AA34E8AA26D1AAFC1AE9351",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A25H",
                          "value": "89BA4E3B2BBA4414BD06A023AE4D12BF",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A26H",
                          "value": "A3670E492286459BB190C3C3392D95AB",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A27",
                          "value": "4A3BC0882EB0408486BEEA2B9414F10B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A27H1",
                          "value": "AECC833C256A4092A2B8B6D577BDED8E",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A28",
                          "value": "798DEB1F14C447558894CC05830A0290",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A28H1",
                          "value": "0E21D96F1439404390CA48E183BBD943",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A29H",
                          "value": "F42F8F1289CE4778A196BA409EC0BB34",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A29H1",
                          "value": "D4D13E8BFAE64C74AEE1ED97A0C91317",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A3",
                          "value": "E6FEE0A6CF4E4125B26951A64F4A4D26",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A30",
                          "value": "BF1FA6FFF35B429687F7E93E5451D670",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A31",
                          "value": "4EAA2B204ECA42FDA8D6D80CF15F2D70",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A32H",
                          "value": "AF8E0B385C7942D392F8186FE6ABBEA1",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A32H1",
                          "value": "82DD8E7D023D40A4BF8403B7073AB36D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A33H",
                          "value": "3B31036D898E41B28717C8775FAA77F7",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A33H1",
                          "value": "90E74F903BBA4F41AA2715F3AB2742E3",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A34",
                          "value": "5F1EDD70D009441099EC45A159B73063",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A34S1",
                          "value": "35C2F806347D4C2C833522A6BAB43839",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A3H1",
                          "value": "25906A7AF2C24D9C972F76BCC2EB37ED",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A4",
                          "value": "E5A8FB67DCC94F53B42D34E72E0ECB11",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A5",
                          "value": "2F6C9BB5214E413FB312ACB2BED3D24F",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A6",
                          "value": "43ECDBBE6C6F47DE9DB82472EC8545DD",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A6H1",
                          "value": "7B454C21CEF04A3E9D7C9310DF5C05A5",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A7",
                          "value": "20B726579A24487590BCCE559A38BD94",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A7H1",
                          "value": "3E21F1F48D6D44E688E20F13CA4B4189",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A8",
                          "value": "238A8D045040494E9FBD688613490253",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-A9",
                          "value": "69797ADDAF9540818AB94C2879354829",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-AW1",
                          "value": "CDB3C99C20AD4345842D21F622EBA05E",
                          "level": "5",
                          "children": []
                        }
                      ]
                    },
                    {
                      "label": "QHD32-6WHPB",
                      "value": "E3F27DD08F7D42B8AC185C7A793AAE6C",
                      "level": "4",
                      "children": [
                        {
                          "label": "QHD32-6-B1",
                          "value": "3C84A20C37454C82B8C1D59C652FD35C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B10",
                          "value": "9A2C5A2F44EB47B6B5F9BF64801F3A24",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B11",
                          "value": "2CFCBF2CDC1B4BB58213BAE339DAB1E6",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B12",
                          "value": "C4A7D2D638CA4638B70687963A855C39",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B13",
                          "value": "D85A0439F4764643BBB727E3DA000866",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B14",
                          "value": "8061604068204DC39E9C8892B3165267",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B15",
                          "value": "E647287AE0B0426E9FAD2E9EA999CB6B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B16",
                          "value": "42660F5FECCB444FACEB48D70A7DD3DC",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B17",
                          "value": "328280DBF4794A84AF91AD1F48DC4692",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B18",
                          "value": "178F12CF70214D529A39F123C20F9E1C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B18H1",
                          "value": "B39CC3E1624A411EAE83F6E042EEB6B2",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B19",
                          "value": "37614D7550774CC79BF1043EEEC2409C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B2",
                          "value": "8F99EF04546845F7AC0D000D047AB03B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B20",
                          "value": "AAC4682C437F4E8E9E5E5B33A59D097C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B21",
                          "value": "F28FC5AC17C244F8848EBF5D30D2CA97",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B22",
                          "value": "53FDE6729A714EEF9F8A37DF3527563D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B23H",
                          "value": "3E211C5BBC034AAE9271BB150D5A241E",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B24",
                          "value": "34BA0F38EDBF4F89B256F27F1B8CD503",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B25",
                          "value": "B281E5F554C8468087B2187DF1621713",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B26",
                          "value": "C209EE2BD5D15D49E050440A04947C7B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B26HS",
                          "value": "5ECCD9789ABD41F0BF278C32318E7161",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B27H",
                          "value": "65334FE84D3E4F359CE6583E178E46D9",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B28",
                          "value": "833C6D658C8E484ABC848E7C13BDFA95",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B28H1",
                          "value": "5664C9D9FD484B9A8C3C02FAEE45A055",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B29",
                          "value": "055D97B1B47C4FD18E7F58C3E31E0151",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B29H1",
                          "value": "EECA1470DEF04AE8B31B760274E6CEE1",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B3",
                          "value": "8F3FE04A9F7E4161859F961F5EEBB04C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B30",
                          "value": "7C6E518FF4644181B234DD640BFEC415",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B31",
                          "value": "CBD7F5C3FA444E36B7BB57595D9D1618",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B32",
                          "value": "0F8D9FB047DF4B6CA0A52A9FCC32AD7D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B33",
                          "value": "22E4D772B1434DECB4FB57FADD36A3A3",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B34",
                          "value": "C66E2E8655C347F5A7AF6AD74BD2E8B6",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B4",
                          "value": "808F171B8EA54ADC9B4E4308A166B9A8",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B4S1",
                          "value": "AD60745D702D45739FB78EB1931636B2",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B5",
                          "value": "DAA3B57EE5034968B04889910B6C508A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B6",
                          "value": "1740EFED6D6D40D592EE7BA9F6FFD512",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B7",
                          "value": "2F5D8C67B0ED4AA9AEB353AA70B791DC",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B8",
                          "value": "DBA705D7D3CE4871A625DF39DC56732C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B8H1",
                          "value": "925F45F641324619A9EF2177C457A14E",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B8S1",
                          "value": "414C96F3B1BF423AB64FCAADA213A6CE",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-B9",
                          "value": "9CD500A20F074A628DA93A73F25FC0AC",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-BW1",
                          "value": "0ED92A8C17674F619FC7C31838FFE965",
                          "level": "5",
                          "children": []
                        }
                      ]
                    },
                    {
                      "label": "QHD32-6WHPC",
                      "value": "0C118F2856574256A8F1BBA26F99BA1A",
                      "level": "4",
                      "children": [
                        {
                          "label": "QHD32-6-C1",
                          "value": "DA0269628E74490ABDE198E7D1DBF3EA",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C10",
                          "value": "F544EDAEA5574E72AFE26A2DA2820EF1",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C11",
                          "value": "C0FC6B74F29D469499BA63627BA00553",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C12",
                          "value": "AD39991D8C98412EA65985717A67D255",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C13",
                          "value": "FB937097C7A04856894D19C16B54D4B7",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C14",
                          "value": "008259D4D5B24D97BBD0BAF2AA8C2D6F",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C15",
                          "value": "B5984F2C77A147D29B26154685DD1CB6",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C16",
                          "value": "940B2502EE1D45AEB3B73ED7A1DA338A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C16H1",
                          "value": "206403425179451785EF3D15041A5286",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C17",
                          "value": "FB49DE74975B4856BCC9F6B49A556D0F",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C18",
                          "value": "22CDFC57B2434AE78967C4A9D1F6B2C7",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C19",
                          "value": "6965B63C790B4B2D82068F18F78F3427",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C2",
                          "value": "16A9045E42C041AE8F72D3954C223F8D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C20",
                          "value": "93589CE241434CD6AC7EFFB7477C71CF",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C21",
                          "value": "64F12F6CEE424D5E83EA9A9F5A2261E0",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C22",
                          "value": "4EB01E0BAE7A445E9C86C4DC1AA7C3BA",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C23",
                          "value": "343A97A1100D445D8D239BE8F844C61A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C24",
                          "value": "CC5601428E584054BAF440B3C1A214AE",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C25",
                          "value": "ABD3E9CBC589454DBFD56407CBEA4EA8",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C26",
                          "value": "23362A72259B4E488D397AF626C610D3",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C27",
                          "value": "F6B820CF8EA44EBD84A06D6DA55E3E68",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C28",
                          "value": "9DB523493191467FA969B2613DEFB4DC",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C29",
                          "value": "9A8D689E9353487E895F93D0DDAC7A14",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C3",
                          "value": "55B0826D910B41FAAE6332189654AFAC",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C30",
                          "value": "69E2267D81C1448D854F09E379EEAED1",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C31",
                          "value": "0EED083D2B9D4E62AB0641D482918B1B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C32",
                          "value": "46F7C81383A54FCF87AC812A8E2A9345",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C32H1",
                          "value": "1E51FBA548B340A5A4DC9F4430C533DA",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C33H",
                          "value": "1020A4417F894F4A8D4D57074829D696",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C33H1",
                          "value": "9EACB87E4CE9669ADC081C9708EB8278",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C34H",
                          "value": "167B0FB6A13240F7994C83220D1825A7",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C34H1",
                          "value": "CB0E4E6A572E257F8879CFABBB0E9AE1",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C4",
                          "value": "BFF982C1429F401182502D1BCBC1C4F5",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C5",
                          "value": "731FCC582E8F468EB89AB9423EE1052E",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C6",
                          "value": "CB6969429C874D788DAD1D88345D2A3D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C7",
                          "value": "24B2ACE2768A4953871AD5643D9DA097",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C8",
                          "value": "AC2A3C1524154FFF8A05E15C5A7373FC",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C8H1",
                          "value": "4F89F5F579934153A8FF4D6BB051F8D9",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-C9",
                          "value": "CA2CA697D4F84171AEEA03BEB4F273BE",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-CW1",
                          "value": "6943B51C3BBB445B92E0856DC7D13054",
                          "level": "5",
                          "children": []
                        }
                      ]
                    },
                    {
                      "label": "QHD32-6WHPD",
                      "value": "FE3806964B9A4CD4AF095F862503A400",
                      "level": "4",
                      "children": [
                        {
                          "label": "QHD32-6-D1",
                          "value": "F392BF00444C4701BAB1D119054E5E6C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D10",
                          "value": "CDE09D475CA141FBAC1B128E7FCDA312",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D11",
                          "value": "8BF7C003D9E2406F86477F7B177C3EF7",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D12",
                          "value": "0255786175C44C089440EB4FF55BA013",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D13",
                          "value": "639327463206458D9C088BD24B2B21D5",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D14",
                          "value": "E3C64218FA0B452C874B0C4EB8268E27",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D14H1",
                          "value": "9D0D4E3A494F4352B06CB21E7D39EA13",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D14H2",
                          "value": "E5A489DA866C4774BB4D79E42AB2C46C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D15",
                          "value": "4C360DF8801743F1A938A370C265B30A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D16",
                          "value": "7DA18524E02F46BFA268BA9987DA41B0",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D17",
                          "value": "B66AFEE1140F45C4A7B2D173AD25B289",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D18",
                          "value": "842F027B20BE436995C8A56842C7C45E",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D18H1",
                          "value": "89F2745FA187430C9BB5C3262AEDD31B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D19",
                          "value": "5D2884C76FC74DAA9CE44C12CC22043D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D2",
                          "value": "6BB843AC990941E3A5AEF6253D9174B6",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D20",
                          "value": "2AA525B5BF5043CABF215DC66D1DB1E3",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D21",
                          "value": "5C7259DA42C04EEDBA97686DB89F0D92",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D21H1",
                          "value": "A5B093281DC342A8B8A624D10AC56A1B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D22",
                          "value": "AD8480D6E481453CB21C59DA68C21864",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D23",
                          "value": "AAEA4CDB9A1A41FE929000A82E7DC816",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D24",
                          "value": "6158D93B65CC4BEF9A1D26D7B0F945F9",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D25H",
                          "value": "F5BF51003DC3470192E519643F6D6974",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D25H1",
                          "value": "969F0152582AB64078580016591E3434",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D26",
                          "value": "F7218509683F41C593D0B187FB825C7E",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D27H1",
                          "value": "675FA1CEDBCBCDA423485413D8404908",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D27M",
                          "value": "F3773EE91B9A4F199A351E7A4714BC55",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D28H",
                          "value": "9AA99698D47C473DA253BA60A8D01EE1",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D29H",
                          "value": "64EC84B345C14D0C854CB29CED13DF77",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D29H2",
                          "value": "BB66AD87AB7E499C9D09A83A5A9A000F",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D29H3",
                          "value": "7491AF270BC440ED932AF076F509CB30",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D29HS",
                          "value": "6367C9DF2BCC4E0CA0B4CCF1E41FF1F0",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D3",
                          "value": "2BADE374849F41C6A959CA407F45B4E6",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D30H",
                          "value": "6A039B437BB340DE9FC0CD91DA0CC45C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D30S1",
                          "value": "4CBFB0E70A214149BCE9B2805BC94BCF",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D31H",
                          "value": "2076811AF8104C3E869E048516B13170",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D31H1",
                          "value": "BF075CF90FDD4B488F535578BFBBB0C8",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D32H",
                          "value": "80F96A05DAF84A5B822A4300E0916B42",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D32S1",
                          "value": "E4E064CFF5E74D34B968938DC105B840",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D33H",
                          "value": "EEAC7FAF7F704A01BB3EFF48E3E53F26",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D33H1",
                          "value": "5D6E5E84FDD04F0DA3449FB8DD99853D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D33H2",
                          "value": "A3904D9B868F40769155EB326CA5DB17",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D34H",
                          "value": "FCF9CB450C8B435BAA14272431F6DD8B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D34H1",
                          "value": "848012B190F24259832ACEC9B75B587A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D34H2",
                          "value": "1F7AB7B47ECC0A40E1189D6990932830",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D4",
                          "value": "A6E1B849F0794AC3BF011BC24DBC74AB",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D4H1",
                          "value": "4576685BB6084C8DAC4EB92D8BC63906",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D4P1",
                          "value": "229E73FA640733C176C9FD08D835D7A1",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D5",
                          "value": "9431C71114744A4482317CBE377CF034",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D6",
                          "value": "56FCFF3712984E6686FC8DDC2DEA942A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D7",
                          "value": "1758D41AD5484A6C9D32B18CF3A65CCE",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D8",
                          "value": "2041C25B14D4481ABB568BAB184E8005",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D9",
                          "value": "C209EE2BD5D35D49E050440A04947C7B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D9H1",
                          "value": "C209EE2BD5D45D49E050440A04947C7B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-D9H2",
                          "value": "C5EAEF2EF2E74B029045C3290BC33C9F",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-DW1",
                          "value": "9C97FF973993428291CE6BFA176389B4",
                          "level": "5",
                          "children": []
                        }
                      ]
                    },
                    {
                      "label": "QHD32-6WHPE",
                      "value": "71B8388BDF9D4991B7FAFED74C59E48A",
                      "level": "4",
                      "children": [
                        {
                          "label": "QHD32-6-E1",
                          "value": "19B6079CA9394CD393FDB4052E84554C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E10H",
                          "value": "A8333B4673354D61A1004B93F0981C63",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E11H",
                          "value": "0EB60614BBF344A699E2F43C0899B9A5",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E12",
                          "value": "613CB9146C4F464E8F3E52089A4E5055",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E13",
                          "value": "A37F65EA091747E080E067CDA1673452",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E14",
                          "value": "2D7247BAA4284EDAABDFA08BBC486FD7",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E14H1",
                          "value": "7ED57179BFD04598B85EF132EEEE8D45",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E14H2",
                          "value": "CA7E1FD1F0E84482BCABF53F55EAC76C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E15",
                          "value": "148311F6040E4AA7971343AF5E6A1A7D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E15H1",
                          "value": "6397A8DF764E4C2C84EF60FBC1834942",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E15H2",
                          "value": "F483F22BEEAC4ADB849F506657E8FCF5",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E15H3",
                          "value": "199F681B4FA04D51B550A96F9637F380",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E16",
                          "value": "07C77A2AB7F845A4B5A1FD73A09B4531",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E17",
                          "value": "BD626EEA8CD84B73BFD0EF7864A4D832",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E18",
                          "value": "D8CAA141C2D845399522A9362A570F9B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E19",
                          "value": "00F3F4DBDAD34675A5E4B33FF5572854",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E2",
                          "value": "6145A37EBEF5486FADA94410FBFB1844",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E20",
                          "value": "AD994B9F06E641CAA102FCE1CA73D366",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E21",
                          "value": "829C70EE53D7427BA051085D36B8E4AD",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E21H1",
                          "value": "6A51B2AC784B4ACA8FBCC6B713B5B8C5",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E22",
                          "value": "9F80D278D62B4B218DE5DE187F28079F",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E22H1",
                          "value": "B64B17D47C814849989D82ACC72E03A6",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E23",
                          "value": "20EA860257754FACB1C767EACB008A14",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E23S1",
                          "value": "9C3A1430CC6F498CBF3219F0B513BD9E",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E24",
                          "value": "4AC42BD5FD8D4521BB981F7A1C77A214",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E24H1",
                          "value": "A619C3CC56D34E48B5E7961F746492F7",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E25H",
                          "value": "1A26A8EA52D04C1A82F874F6FE0C0156",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E26H",
                          "value": "7906F7D5E5884D979DC47713B07D69E7",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E27H",
                          "value": "81AB295A1B33488C9E5784320F5467FA",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E28H",
                          "value": "0EA4687DB2AA4430B15A685DCA0C812D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E29H",
                          "value": "1195B960F998439D87451B90C6C63BFD",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E3",
                          "value": "6C8BF08D6CA442D7996BD571331CE5BA",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E30M",
                          "value": "63BC4756FB0842619519D0752103431A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E31H",
                          "value": "4A94AC05494240EF97CCFC11191CB900",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E32H",
                          "value": "BA9BF4F2C18D404B97126CB093C54773",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E33H",
                          "value": "918DACE215E84955A8F596BD3491B2D3",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E34H",
                          "value": "930F007C1B624EB6A8AC4E41EB8EC892",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E34H1",
                          "value": "BBB350B53BCA467BA9DA914D37DCA36D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E35H",
                          "value": "7C7B5604F5CA4E4C915889E6B17B6DAF",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E4",
                          "value": "8CDD242D0CC24817AF3F01E77E451157",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E5",
                          "value": "16F6684A6A9441B783E94E110635BA9A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E5H1",
                          "value": "CF5A84CEB7AB445BA581D9BE9D88B5CB",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E6",
                          "value": "3EC2B71BCE9240FE9F063DF2901F1891",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E6H2",
                          "value": "B8BF68BA2A354175A3389553580FCDF9",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E6H3",
                          "value": "B07CAE1571304F4585FA9F726ED52B7A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E6HS",
                          "value": "BF2012EF977F47A383FCD6CCDF2A3118",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E7",
                          "value": "BF54546BA9EB447CB94823CDB3D8226C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E9",
                          "value": "7DC2C8F2CB9B4E72BBBDA22103F36713",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E9H1",
                          "value": "AC44D54C9FFB4F77B0146A0112B9D16D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-E9H2",
                          "value": "4F722BA8EA4C4409BF7D6A80F4FA6DEE",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-EgH1",
                          "value": "515E2FC2373840E8BF3BA3B294660CC1",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-EgH2",
                          "value": "242F947D6D354C07A3BE4438774D0EB4",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-EgH3",
                          "value": "DE152B6CD15345C79092CA69782F3479",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-EgH4",
                          "value": "BB60D61121654F229A6162D2653B0797",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-EW1",
                          "value": "34F0997420D14CFAB0C6400ED8B2E6A7",
                          "level": "5",
                          "children": []
                        }
                      ]
                    },
                    {
                      "label": "QHD32-6WHPF",
                      "value": "C870EE1677884EE1A35C123E65D90F9D",
                      "level": "4",
                      "children": [
                        {
                          "label": "QHD32-6-F1",
                          "value": "EFA5795B04224FE99967E0B4CE6A7259",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F10",
                          "value": "508519DB6A5646A5A7DAB1EE2352003B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F11",
                          "value": "EE01E459952D45BA8CC8B756F8ED3854",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F12",
                          "value": "BE224A50084E4F6A871EEAF47128974B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F13",
                          "value": "370AF17D93B0412CA2D0489BC776FF71",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F14",
                          "value": "0EB116AC8A0840A1A1EA2D85F0769065",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F15",
                          "value": "F54E33AAA45C47BCAE481DA0E87C4C52",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F16",
                          "value": "80706A13F65A4A7A89B033878EAEDB85",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F17",
                          "value": "CFB1F04D677B44688526F9B638495429",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F18",
                          "value": "CFC03DCE8C2B413B9D9161DB43F431CF",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F19",
                          "value": "93143B1F608C4B498594E3E18701980A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F1H1",
                          "value": "C209EE2BD5D85D49E050440A04947C7B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F1H2",
                          "value": "17D10BDB3A5042C899158FF8A5798DFD",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F1H3",
                          "value": "D1EE5C27D8E748CABF4CDF6331BE4D48",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F2",
                          "value": "54B1CB0F1B5B4ADEAFBAA7EC01441D92",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F20",
                          "value": "21858446133B41D2AE93EE0756876ABE",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F21",
                          "value": "2271DB05A8724E1E8B828CB867E271F6",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F22",
                          "value": "D7CC1CBE896144DBB5EACA46E24FC684",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F23",
                          "value": "AEAA83F3781D4D05B40667C7678A459C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F24",
                          "value": "1AAC15F3DFAA4230876EBE8B961A2682",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F25",
                          "value": "2FBE4FE9B69041E0B48C6549B03D58E2",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F26",
                          "value": "FB5FB15937E64CEF9AAADB2A7E768EB9",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F27",
                          "value": "530E394A2F474752ABC88966C99238F2",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F28",
                          "value": "DEE541A355F24D4AB14F86AD9176F5AD",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F29",
                          "value": "787E93A30B0149028F76D257BD334117",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F2H1",
                          "value": "F6F7E981BE8247E0B72A426877D41057",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F2H2",
                          "value": "CA249FCD632C44A98B0FA53364C11B2A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F3",
                          "value": "89DE64DC16924BD1B5A732ECB3E94DD0",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F30",
                          "value": "3CC21A19BD534F1998E335F8CCF454AF",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F30H1",
                          "value": "DD88DC261107440C9A97F7919E0F3C18",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F31",
                          "value": "D663468C5B514F8D8523200E65F0AA10",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F32",
                          "value": "5B1473A3633A4C49BAA956791B94016C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F33H",
                          "value": "608E82D67F9D476380DD8393F80FA691",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F33H1",
                          "value": "A225471D27D142FF9140E2A57ACDC22A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F34H",
                          "value": "1C01043222EB4D5E9361E9468746E2C6",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F34S1",
                          "value": "37412F8C8AF14D56A839C40D50A2749F",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F36H",
                          "value": "41D2F171244B49F281507101681DFB41",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F4",
                          "value": "46E90A5A5601403FBD22D7EBD8B55483",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F4H1",
                          "value": "2A1310625DFB4269BC47A969C39718A5",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F4H2",
                          "value": "D0B4EFEB8AE0461888773756EDF21BD4",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F4H3",
                          "value": "6E73C512F8444CE3BAEE27FE23294144",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F5",
                          "value": "74B59F886DF1459AB58311A6159202A4",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F5H1",
                          "value": "9A58203E4B4942A096117C603670CE4F",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F6",
                          "value": "456D8BAA6DE24EA0888BDA6D37D20121",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F6H1",
                          "value": "A727DA113F17465D9A67D8631A436230",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F6H2",
                          "value": "77DCBB4F1ED643B99A0F8F8072EC5067",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F7",
                          "value": "05D5CAD0DA52494F9D60ADA38CFA5F0F",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F8",
                          "value": "CED4EA0157314B72896A45B4941C13F7",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-F9",
                          "value": "392CC3A939B8490BBC82FCA456196A7D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-FW1",
                          "value": "1E68E8AEBFE344EC95A5056B91224F94",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-FW1H1",
                          "value": "FE1492575BAA43048BC170D70A83DD12",
                          "level": "5",
                          "children": []
                        }
                      ]
                    },
                    {
                      "label": "QHD32-6WHPG",
                      "value": "3A5F370A168C4A3F9DF2CD244F9B4346",
                      "level": "4",
                      "children": [
                        {
                          "label": "QHD32-6-G10H",
                          "value": "C209EE2BD5D95D49E050440A04947C7B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G10H1",
                          "value": "8D1D03C340A14CD69CA522FA0600F978",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G10H2",
                          "value": "2BB0B052417C4C9B8CCD04757CE8E88D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G10H3",
                          "value": "A9A7AECB9AB147DCA3C5B080D2889ABF",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G11H",
                          "value": "7938503192AC4BD5B82DB7CE0885B932",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G11H1",
                          "value": "CD2F57A8033F42D0B77045F45E757F73",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G11H2",
                          "value": "245EB1E423EEF235984BCC7CA85F924C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G12H",
                          "value": "3F14E28F20E8493A8A021601CC606F24",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G13",
                          "value": "66D70DA6DBAA4958B64D9AD50970AC2E",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G14",
                          "value": "F5952CF34A6B4874A88E8E28D1E9DB3A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G14H1",
                          "value": "C209EE2BD5DA5D49E050440A04947C7B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G14P1",
                          "value": "B8EC4F3D14EEDE8CC8B85D9C7C73B9CF",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G15H",
                          "value": "C87F852F2C3443C68285D5223533D07C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G16H",
                          "value": "92EE5FC43CB441B3AEADBB0F279B30E7",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G17H",
                          "value": "4990DC3DA6A1485F97748731CCD04CD9",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G17H1",
                          "value": "1572547927EA4EFAB6443EB39C4ED420",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G18H",
                          "value": "C30C77ED439A4345AE720E95EB400A60",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G19H",
                          "value": "C9297831F3394093BBDDECBAD2179657",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G1H",
                          "value": "FFC6C792677344AE94A28526A94387E9",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G1H1",
                          "value": "BFE3AB64ABDA439292EE96A7062DF166",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G20H",
                          "value": "65D01EA59F6B4C8097879FDBCAF2CBC3",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G21H",
                          "value": "F75BADE1073C4AF787C2E387697C6AAC",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G21H1",
                          "value": "257518833E27472A830B041C85C0345C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G22H",
                          "value": "68485165263049E6A0B588A854B4D396",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G22H1",
                          "value": "B20589F5F945417C85A4BC09F303F3D7",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G23H",
                          "value": "A2BAE8CDEC3843C38EA618B7523ACB67",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G24H",
                          "value": "E374305721644B298FE81EA216F12797",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G24H1",
                          "value": "E62504FA88DF4B2DB7F9E198F03D46A1",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G25H",
                          "value": "8E7119C2510C4E8DAE041CD8D162F75A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G25H1",
                          "value": "B35B866BB9C04CA78BE55C3161CAFE6F",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G26H",
                          "value": "1828102AC034467EA487FA3A932D2965",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G27H",
                          "value": "D1CE2B88D1FB42BAB47CB08358D01C4D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G27H1",
                          "value": "2E21A7B141B748D58D8C27FBD0E16F47",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G28H",
                          "value": "74CAC6BD70334776AA3120FD3E5EB210",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G29H",
                          "value": "F34C7298DB3449E2A0096FD763C85274",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G29H1",
                          "value": "0FA3D84781AE4ADFA0B261DF2F017F30",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G2H",
                          "value": "D91EEA9EDE364852ADA047CEF62D064F",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G30H",
                          "value": "B340083E2C374B55857460D30318B409",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G31H",
                          "value": "C209EE2BD5DB5D49E050440A04947C7B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G31H1",
                          "value": "FA1801D6803148A2963528A50785391B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G32H",
                          "value": "18D7BA13B04B447BA5C56BAF99181D04",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G33H",
                          "value": "C686244B18E04370999ED0B544D2EB47",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G34H",
                          "value": "03C0B5E7A0B3476B8BB61FB1031AD894",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G35H",
                          "value": "88467C5386AF4A86A951561DE26B9067",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G36H",
                          "value": "D880A9027BC54B0EA9577B91179D97E3",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G36H1",
                          "value": "5D7C9832A2294111AB82D5041D7090DB",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G37H",
                          "value": "EFEF6EB7C84B4E2C98F0ACFAFDDFDE71",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G38",
                          "value": "3E172FAD297647C7AB61F7378AF7D1F7",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G39H",
                          "value": "6C41866470D14F2381E76F1B9D3F24A3",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G3H",
                          "value": "973197822DE04AB288F7C02AF0F172AC",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G40H",
                          "value": "D777D710939648BFB865A0FC76C6031D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G41H",
                          "value": "A8E587CFEE2D4338A762211655538F4A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G42",
                          "value": "CBF1DB11656B44C8A62AE5480EDAD547",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G43H",
                          "value": "B02C2208A51B4E6DAF8C0F349D010FCC",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G44H",
                          "value": "ED661145A1E74180958D1D60766C0102",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G45H",
                          "value": "A6621652DBAB4888B982A45FA46645A7",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G45P1",
                          "value": "4CEA2EF3509B79D67AF8CE118CCD4105",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G46H",
                          "value": "9522A19B9B3B4D8B9679C169ADF794D3",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G47H",
                          "value": "10D36E6D421C4E2DA4E258BE555B199F",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G48H",
                          "value": "94FCED6200824599817FD47A453BB115",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G4H",
                          "value": "EC64A6033729478E9A395C0462E1EE4F",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G4H1",
                          "value": "3928DE5EE9878A2494B8DFDEC5939F2E",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G5",
                          "value": "A22D7C847BE64ECE9B8B590C34E6DD57",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G6H",
                          "value": "670896A977014C0F9013CB0021B580DD",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G6H1",
                          "value": "EB4EC33D0FA98E9DEFA8881D215C7A31",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G7H",
                          "value": "CA65B69845AD438EAD1BEF9911ECA342",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G7H1",
                          "value": "379544119FCDA3EB4418A2BA0C1A6293",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G8H",
                          "value": "D29DABF36C144AFCA4357626C845F62A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G9H",
                          "value": "AA61635C44C8499A944DBD16A99232A1",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-G9H1",
                          "value": "375DB74FC89747028A9436A8E41D3991",
                          "level": "5",
                          "children": []
                        }
                      ]
                    },
                    {
                      "label": "QHD32-6WHPH",
                      "value": "89A1EF273FD748A7BD922E6458ACE128",
                      "level": "4",
                      "children": [
                        {
                          "label": "QHD32-6-H10H",
                          "value": "7AEF503FE0964136A965FE0FDF2118AA",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H10H1",
                          "value": "5A9DC1F9F4484DFF82A05E624ED8A7F2",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H11H",
                          "value": "8A97F87A22DE4B7484BB5349464EE2D2",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H12H",
                          "value": "95887694261E4DA68A0A5C148920E5B8",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H12H1",
                          "value": "4B37AB147E2B4723ACA241EE16031435",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H12H2",
                          "value": "55EBA84F7EB043EA9843FBB108797C68",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H13H",
                          "value": "1223BC018DF742808A571B27FB9E3353",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H14H",
                          "value": "3D092BFC535B48289701F73150892A7B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H15H",
                          "value": "E2D3AE07F1114ED4B3EB2211ED7482B6",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H15H1",
                          "value": "C0ECC6F47071587977080BA1C4C4FC38",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H16H",
                          "value": "BE6D76EC53E54A1E9B4F41DB1C204DDF",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H17H",
                          "value": "312CF187C1DC44DD916B26766CE3559E",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H18H",
                          "value": "7A0768C6AE6B4945AE1BBD738BDBF51D",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H18H1",
                          "value": "0A0111F30E3A4DBAB752DF511C61D211",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H18H2",
                          "value": "B1E831989DBC4FDDBDA56DD0D2118E32",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H19H",
                          "value": "2C60F4ADAF69442A802E0FEC99909A3A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H19H1",
                          "value": "2A75080945E37A5822B9AA8DBEDDC4F3",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H1H",
                          "value": "586B6DDF5F9341C8AD0425D6E34B602F",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H1H1",
                          "value": "998EB7D19F8E4232937AA6BDDA118F9B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H1H2",
                          "value": "BA1CEF96CB7B472AB315D3E86EC87406",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H20H",
                          "value": "0CFF8841C81048678D4B5EBE9677C4CD",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H20H1",
                          "value": "082855BAC4634EE196C442C9EEADA937",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H21H",
                          "value": "E17B69A23BEE45D6BEA1783BC811D093",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H22H",
                          "value": "1885A8AD77EC4C10A6C544F8641A7535",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H23H",
                          "value": "681DF9E6BB93467E956E11B0789D9BCE",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H24H",
                          "value": "630DEC1DDB894CE0B4BD9B24EFCCF659",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H25H",
                          "value": "D833D04053D2421C927E629175F1E249",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H26H",
                          "value": "E4AEF6C8E8554629B82A5820F5F89A0B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H27H",
                          "value": "30F615C417E6404D921BE11FE59F8B7C",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H28H",
                          "value": "F82AFC6772534A9FB09012375230327B",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H28P1",
                          "value": "CC94E60A6710FC741188AD0241809168",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H29H",
                          "value": "10D0F127F9174875AFA3E38D67962A1A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H2H",
                          "value": "89734E11092A47FBB5175C210293D914",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H30H",
                          "value": "EA89BE8AF1D449E983823F8FB0DA7987",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H3H",
                          "value": "3FC305BEAE434B30A06B75C7091BAF5A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H4H",
                          "value": "F27AF075630A4586935E3A85D70EE949",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H5H",
                          "value": "FAE78665AF92412790EAEFC719032D0A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H5H1",
                          "value": "D9989D456E514A479ECFC4E1E8B4979A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H6H",
                          "value": "3DA9FDF6CD0247BF8D310A60A24A5C5A",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H7H",
                          "value": "656F64DCC95C481883D276C2B1817601",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H7H1",
                          "value": "AD7726B3E26A4DBB867FBBAB9E3A6721",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H8H",
                          "value": "9553C5B91168416D99E3DB87FF588570",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H8H1",
                          "value": "EE2C15C0301546E09A1311535B3F1A33",
                          "level": "5",
                          "children": []
                        },
                        {
                          "label": "QHD32-6-H9H",
                          "value": "5B8D461C69E84C9980F3786F04F62928",
                          "level": "5",
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  },
  mounted() {
    this.init();
    // this.getTreeData();
  },
  methods: {
    init() {
      // 隐藏菜单
      const obscure = document.querySelector(".navH span");
      const open = document.querySelector(".open");
      const ensconce = document.querySelector(".ensconce");
      obscure.onclick = function() {
        open.style.marginLeft = "-300px";
        setTimeout(() => {
          ensconce.style.display = "block";
        }, 350);
      };
      // 显示菜单
      const showC = document.querySelector(".ensconce h2");
      showC.onclick = function() {
        open.style.marginLeft = "0px";
        setTimeout(() => {
          ensconce.style.display = "none";
        }, 100);
      };
      obscure.onclick();
      //= ==========================================
      /* rem 适应 */
      /* 让文字和标签的大小随着屏幕的尺寸做变话 等比缩放 */
      const html = document.getElementsByTagName("html")[0];
      /* 取到屏幕的宽度 */
      let width = window.innerWidth;
      /* 640 100  320 50 */
      if (width > 1080) {
        width = 1080;
      } else if (width < 320) {
        width = 320;
      }
      const fontSize = 100 / 1080 * width;
      /* 设置fontsize */

      html.style.fontSize = `${fontSize}px`;
      window.onresize = function() {
        const html = document.getElementsByTagName("html")[0];
        /* 取到屏幕的宽度 */
        let width = window.innerWidth;
        if (width > 1080) {
          width = 1080;
        } else if (width < 320) {
          width = 320;
        }
        /* 640 100  320 50 */
        const fontSize = 100 / 1080 * width;
        /* 设置fontsize */
        html.style.fontSize = `${fontSize}px`;
      };
    },
    getTreeData() {
      const params = { level: this.level, orgId: "715AD1CD60484BB59E737CD18A9DE44A" };
      axios.post("/dev-api/masterService/api/omc003d/getYczcTree", params).then(res => {
        this.deptOptions = res.data.data;
      });
    }
  }
};
</script>

<style scoped lang="less">
.menu {
  overflow: hidden;
  height: 100%;
  float: left;
  -webkit-touch-callout: none;
  user-select: none;
  box-shadow: 0 0 10px 0 rgba(144, 147, 153, 0.3);
}

.menu .ensconce {
  /* 隐藏菜单样式 */
  width: 0.3rem;
  height: 100%;
  float: left;
  text-align: center;
  position: relative;
  display: none;
}

.menu .ensconce h2 {
  cursor: pointer;
  font-size: 0.18rem;
  line-height: 0.5rem;
  width: 100%;
  position: absolute;
  top: 34%;
}

.menu .ensconce h2 img {
  width: 52%;
}

.menu .open {
  /* 显示菜单样式 */
  width: 2.6rem;
  height: 100%;
  padding-bottom: 0.1rem;
  box-sizing: border-box;
  transition: all 0.8s ease;
}

.menu .open-white {
  width: 2.6rem;
  height: 100%;
  background-color: #fff;
  padding-bottom: 0.1rem;
  box-sizing: border-box;
  transition: all 0.8s ease;
}

.menu .open .navH {
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: left;
  font-size: 0.18rem;
  position: relative;
  box-sizing: border-box;
  padding-left: 20px;
}

.menu .open .navH span {
  position: absolute;
  top: 49%;
  right: 0;
  padding: 0 0.15rem;
  cursor: pointer;
  transform: translate(0, -50%);
  display: inline-block;
}

.menu .open .navH span .obscure {
  width: 0.15rem;
}

.menu .open .navBox {
  height: 100%;
  overflow-y: auto;
  padding-left: 0.05rem;
  padding-right: 0.07rem;
  margin-top: 0.1rem;
  padding-bottom: 70px;
}

.menu .open .navBox ul li {
  background-color: #393c4a;
  cursor: pointer;
  margin-bottom: 4px;
}

.menu .open .navBox ul li .obtain {
  background-color: #3889d4;
}

.menu .open .navBox ul li .obtain:hover {
  background-color: #3d8332;
}

.menu .open .navBox ul li h2 {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  color: #fff;
  font-size: 0.15rem;
  padding: 0.15rem 0;
  transition: all 0.6s ease;
}

.menu .open .navBox ul li h2 i {
  position: absolute;
  top: 50%;
  right: 0.15rem;
  border-top: 0.07rem transparent dashed;
  border-left: 0.07rem solid #fff;
  border-right: 0.07rem transparent dashed;
  border-bottom: 0.07rem transparent dashed;
  display: inline-block;
  transition: -ms-transform 0.6s ease;
  transform-origin: 4px 3px;
  transform: translate(0, -50%);
}

.menu .open .navBox ul li h2 .arrowRot {
  transform: rotate(90deg);
}

.menu .open .navBox ul li .secondary {
  overflow: hidden;
  height: 0;
  transition: all 0.6s ease;
}

.menu .open .navBox ul li .secondary h3 {
  padding: 0.1rem 0;
  text-align: center;
  font-size: 0.13rem;
  background-color: #282c3a;
  color: #fff;
  border-bottom: 0.8px solid #42495d;
  transition: all 0.4s ease;
}

.menu .open .navBox ul li .secondary h3:hover {
  background-color: #1acbfc;
}

.menu .open .navBox ul li .secondary .seconFocus {
  background-color: #1acbfc;
  box-shadow: 3px 3px 3px #aa8c51;
}

.navClass {
  font-size: 14px;
  writing-mode: vertical-rl;
  width: 38px;
  margin: 0 auto;
  letter-spacing: 0.5em;
  font-weight: 500;
}
</style>