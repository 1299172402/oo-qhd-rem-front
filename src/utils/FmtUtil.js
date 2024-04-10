/* eslint-disable no-use-before-define */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as MpfUtil from "@/utils/MpfUtil";
import * as Arrays from "@/utils/Arrays";
import store from "../store";

export function randomArrVal(arr) {
  if (Array.isArray(arr)) {
    for (const i in arr) {
      randomArrVal(arr[i]);
    }
  }
  randomObjVal(arr);
}

export function randomObjVal(obj) {
  // eslint-disable-next-line array-callback-return
  Object.keys(obj).map(key => {
    const val = Number(obj[key]);

    if (typeof val === "number" && !Number.isNaN(val)) {
      obj[key] = (val + Math.random() * 5).toFixed(2);
    }
  });
}

export function validNum(val) {
  if (!val) {
    return false;
  }

  if (typeof val === "number") {
    if (Number.isNaN(val) || !Number.isFinite(val)) {
      return false;
    }
  }

  return true;
}

export function number(val) {
  if (Array.isArray(val)) {
    for (const i in val) {
      val[i] = number(val[i]);
    }
  }
  if (typeof val !== "number") {
    return val;
  }

  const str = Number(val).toFixed(2);
  const v = Number(str); // 转化时，末尾的0会被化简
  return v;
}

export function val2Std(property, symbol, val) {
  const units = getUnits(property);
  const unit = getUnit(units, symbol);
  return toStdUnit(unit, val);
}

export function std2Val(property, symbol, valStd) {
  const units = getUnits(property);
  const unit = getUnit(units, symbol);
  const v = toValUnit(unit, valStd);
  return v;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getUnits(property) {
  const us = store.getters.unitMap;
  return us[property];
}

export function getUnit(units, symbol) {
  // debugger
  for (const unit of units) {
    if (unit.symbol === symbol) {
      return unit;
    }
  }
}

export function toStdUnit(unit, val) {
  if (!unit) {
    return val;
  }
  return val * unit.k + unit.b;
}

export function toValUnit(unit, val) {
  if (!unit) {
    return val;
  }
  return (val - unit.b) / unit.k;
}

export function unitConver4Well(well, onlyFlux = false) {
  const fluxA = 3600 * 24;
  const pressA = 1e-3;
  const pressB = 1e-6;
  const aT = 1;
  const bT = -273.15;

  // debugger;
  // 计算值
  unitConver(well, "myFgStdvol", fluxA);
  unitConver(well, "myFoStdvol", fluxA);
  unitConver(well, "myFwStdvol", fluxA);
  // debugger;
  well.myFlStdvol = number((well.myFoStdvol - 0) + (well.myFwStdvol - 0));
  unitConver(well, "myFlStdvol");
  well.gor = number(well.myFgStdvol / well.myFoStdvol);

  if (onlyFlux) {
    return;
  }

  unitConver(well, "myFgMass", fluxA);
  unitConver(well, "myFoMass", fluxA);
  unitConver(well, "myFwMass", fluxA);
  unitConver(well, "myMass", fluxA);

  // unitConver(well, "myPeu1", pressA); // 旧
  unitConver(well, "myPeu1", pressB); // 新
  // unitConver(well, "myPin1", pressA); // 旧
  unitConver(well, "myPin1", pressB); // 新
  // unitConver(well, "myPout1", pressA); // 旧
  unitConver(well, "myPout1", pressB); // 新
  unitConver(well, "myPout2", pressA);
  unitConver(well, "myPinh1", pressA);
  // unitConver(well, "myPcd1", pressA); // 旧回压
  unitConver(well, "myPcd1", pressB); // 新回压
  unitConver(well, "myPcd2", pressA);
  unitConver(well, "myPsc", pressA);
  unitConver(well, "myPinHot", pressA);
  unitConver(well, "myPoutHot", pressA);

  // unitConver(well, 'mTin1', aT, bT)
  unitConver(well, "myTin1");
  unitConver(well, "myTout1", aT, bT); // 油温
  unitConver(well, "myTeu1", aT, bT); // 吸入温度
  // unitConver(well, "myTcd1", aT, bT);
  // unitConver(well, 'mTout2', aT, bT)
  // unitConver(well, 'mTinh1', aT, bT)
  unitConver(well, "myTcd1");
  // unitConver(well, "mTcd1", aT, bT);
  // unitConver(well, 'mTcd2', aT, bT)
  // unitConver(well, 'mTsc', aT, bT)
  // unitConver(well, 'mTinHot', aT, bT)
  // unitConver(well, 'mToutHot', aT, bT)

  unitConver(well, "myPcv", 100.0);
  unitConver(well, "myPcv2", 100.0);
  unitConver(well, "myPcvG", 100.0);
  unitConver(well, "myPcvO", 100.0);
  unitConver(well, "myPcvW", 100.0);
  unitConver(well, "myPcvHot", 100.0);

  unitConver(well, "myEspE", 100.0);
  unitConver(well, "myEspQr", 100.0);

  // 实测值
  unitConver(well, "gor");
  unitConver(well, "myFo");
  unitConver(well, "myFg");
  unitConver(well, "myFw");
  // debugger;
  if (well.myFw === null || well.myFo === null) {
    well.myFl = "N/A";
  } else {
    well.myFl = (well.myFw - 0) + (well.myFo - 0);
  }

  unitConver(well, "myFl");

  well.myWc = (well.myFwStdvol - 0) / (well.myFl - 0);
  unitConver(well, "myWc", 100.0);

  unitConver(well, "myFrequency"); // 电潜泵频率
  unitConver(well, "myA");
  unitConver(well, "myV");

  // debugger
  well.myFgr = MpfUtil.er(well.myFg, well.myFgStdvol);
  well.myFor = MpfUtil.er(well.myFo, well.myFoStdvol);
  well.myFwr = MpfUtil.er(well.myFw, well.myFwStdvol);
  well.myFlr = MpfUtil.er(well.myFl, well.myFlStdvol);
  unitConver(well, "myFgr");
  unitConver(well, "myFor");
  unitConver(well, "myFwr");
  unitConver(well, "myFlr");
}

export function unitConver(obj, field, k, b) {
  // debugger;
  let val = obj[field];
  if (Number.isNaN(val) || !Number.isFinite(val - 0)) {
    obj[field] = "";
    return;
  }

  if (typeof val !== "number") {
    return;
  }

  val *= k || 1;
  if (b) val += b;
  obj[field] = number(val);
  // debugger;
}

export function unitConver4Pipe(pipe) {
  // debugger
  pipe.myProfile = Arrays.parse(pipe.myProfile);
  pipe.myProfileE = Arrays.parse(pipe.myProfileE);
  pipe.myProfileV = Arrays.ftm(pipe.myProfileV);
  // pipe.myProfileVc = Arrays.ftm(pipe.myProfileVc);
  // pipe.myProfileVcor = Arrays.ftm(pipe.myProfileVcor);
  pipe.myProfileHl = Arrays.ftm(pipe.myProfileHl);
  pipe.myProfileT = Arrays.ftm(pipe.myProfileT, 1, -273.15);
  pipe.myProfileP = Arrays.ftm(pipe.myProfileP, 1e-6);

  unitConver4Well(pipe, true);
  pipe.myMaxV = Arrays.max(pipe.myProfileV);
  pipe.myPin1 = pipe.myProfileP[0];
  pipe.myTin1 = pipe.myProfileT[0];
  pipe.myPout1 = pipe.myProfileP[pipe.myProfileP.length - 1];
  pipe.myTout1 = pipe.myProfileT[pipe.myProfileT.length - 1];
  pipe.mydP1 = number(pipe.myPin1 - pipe.myPout1);
  pipe.mydT1 = number(pipe.myTin1 - pipe.myTout1);
  pipe.mydE1 = number((pipe.mydP1 * pipe.myFlStdvol) / 24 / 3.6);
  pipe.myFlUnused = pipe.myDesignFl - pipe.myFlStdvol;
  pipe.myQrl = number((pipe.myFlStdvol / pipe.myDesignFl) * 100);
}

// 井筒
export function unitConver4Wellbore(wellbore) {
  const fluxA = 3600 * 24;
  const pressA = 1e-6;
  const aT = 1;
  const bT = -273.15;

  wellbore.myProfile = Arrays.ftm(wellbore.myProfile);
  wellbore.myProfileE = Arrays.ftm(wellbore.myProfileE);
  wellbore.myProfileV = Arrays.ftm(wellbore.myProfileV);
  wellbore.myProfileVe = Arrays.ftm(wellbore.myProfileVe);

  wellbore.myProfileFgStdvol = Arrays.ftm(wellbore.myProfileFgStdvol, fluxA);
  wellbore.myProfileFoStdvol = Arrays.ftm(wellbore.myProfileFoStdvol, fluxA);
  wellbore.myProfileFwStdvol = Arrays.ftm(wellbore.myProfileFwStdvol, fluxA);

  unitConver(wellbore, "myFgStdvol", fluxA);
  unitConver(wellbore, "myFoStdvol", fluxA);
  unitConver(wellbore, "myFwStdvol", fluxA);
  wellbore.myFlStdvol = (wellbore.myFoStdvol - 0) + (wellbore.myFwStdvol - 0);
  unitConver(wellbore, "myFlStdvol");
  // debugger;
  wellbore.myProfileFlStdvol = (wellbore.myProfileFoStdvol - 0) + (wellbore.myProfileFwStdvol - 0);
  unitConver(wellbore, "myProfileFlStdvol");
  wellbore.myWc = (wellbore.myProfileFwStdvol - 0) / (wellbore.myProfileFlStdvol - 0);
  unitConver(wellbore, "myWc", 100.0);

  wellbore.myCumVolL = Arrays.ftm(wellbore.myCumVolL);
  wellbore.myProfileVg = Arrays.ftm(wellbore.myProfileVg);
  wellbore.myProfileVl = Arrays.ftm(wellbore.myProfileVl);
  wellbore.myProfileHl = Arrays.ftm(wellbore.myProfileHl);

  wellbore.myProfileTe = Arrays.ftm(wellbore.myProfileTe, 1, -273.15);

  wellbore.myProfilePat = Arrays.ftm(wellbore.myProfilePat);

  unitConver(wellbore, "myP", pressA);
  unitConver(wellbore, "myT", aT, bT);

  // debugger;
  unitConver(wellbore, "myPeu1", pressA); // 吸入压力
  unitConver(wellbore, "myPout1", pressA); // 井口压力
  unitConver(wellbore, "myPin1", pressA); // 排出压力
  unitConver(wellbore, "myTeu1", aT, bT); // 吸入温度
  unitConver(wellbore, "myTcd1", aT, bT);
  unitConver(wellbore, "myTout1", aT, bT); // 油温
  unitConver(wellbore, "myPcd1", pressA); // 回压

  // debugger
  if (!wellbore.myProfileP) {
    return;
  }
  wellbore.myProfileP = Arrays.ftm(wellbore.myProfileP, 1e-6);
  wellbore.myPin1 = wellbore.myProfileP[0];
  wellbore.myPout1 = wellbore.myProfileP[wellbore.myProfileP.length - 1];
  wellbore.mydP1 = number(wellbore.myPin1 - wellbore.myPout1);

  if (!wellbore.myProfileT) {
    return;
  }
  wellbore.myProfileT = Arrays.ftm(wellbore.myProfileT, 1, -273.15);
  wellbore.myTin1 = wellbore.myProfileT[0];
  wellbore.myTout1 = wellbore.myProfileT[wellbore.myProfileT.length - 1];
  wellbore.mydT1 = number(wellbore.myTin1 - wellbore.myTout1);
}

// 生产节点
export function unitConver4SteadyEdgesData(steadyData) {
  const fluxA = 3600 * 24;

  steadyData.myCumVolL = Arrays.ftm(steadyData.myCumVolL);

  steadyData.myProfile = Arrays.ftm(steadyData.myProfile);
  steadyData.myProfileE = Arrays.ftm(steadyData.myProfileE);
  steadyData.myProfileV = Arrays.ftm(steadyData.myProfileV);
  // if (Array.isArray(steadyData.myProfileV)) {
  //   steadyData.myProfileV = steadyData.myProfileV[0];
  // }
  steadyData.myProfileVe = Arrays.ftm(steadyData.myProfileVe);

  steadyData.myProfileFgStdvol = Arrays.ftm(steadyData.myProfileFgStdvol, fluxA);
  // debugger;
  steadyData.myProfileFoStdvol = Arrays.ftm(steadyData.myProfileFoStdvol, fluxA);
  steadyData.myProfileFwStdvol = Arrays.ftm(steadyData.myProfileFwStdvol, fluxA);

  // // debugger;
  // if (Array.isArray(steadyData.myProfileFoStdvol)) {
  //   steadyData.myProfileFoStdvol = steadyData.myProfileFoStdvol[0];
  // }
  // // debugger;
  // if (Array.isArray(steadyData.myProfileFwStdvol)) {
  //   steadyData.myProfileFwStdvol = steadyData.myProfileFwStdvol[0];
  // }

  // debugger;
  steadyData.myProfileFlStdvol = (steadyData.myProfileFoStdvol - 0) + (steadyData.myProfileFwStdvol - 0);
  unitConver(steadyData, "myProfileFlStdvol");

  steadyData.myWc = (steadyData.myProfileFwStdvol - 0) / (steadyData.myProfileFlStdvol - 0);
  // unitConver(steadyData, "myWc", 100.0);
  unitConver(steadyData, "myWc");

  steadyData.myProfileVg = Arrays.ftm(steadyData.myProfileVg);
  steadyData.myProfileVl = Arrays.ftm(steadyData.myProfileVl);
  steadyData.myProfileHl = Arrays.ftm(steadyData.myProfileHl);
  steadyData.myProfileTe = Arrays.ftm(steadyData.myProfileTe, 1, -273.15);
  steadyData.myProfilePat = Arrays.ftm(steadyData.myProfilePat);

  if (!steadyData.myProfileP) {
    return;
  }
  steadyData.myProfileP = Arrays.ftm(steadyData.myProfileP, 1e-6);
  steadyData.myPin1 = steadyData.myProfileP[0];
  steadyData.myPout1 = steadyData.myProfileP[steadyData.myProfileP.length - 1];
  steadyData.mydP1 = number(steadyData.myPin1 - steadyData.myPout1);

  if (!steadyData.myProfileT) {
    return;
  }
  steadyData.myProfileT = Arrays.ftm(steadyData.myProfileT, 1, -273.15);
  steadyData.myTin1 = steadyData.myProfileT[0];
  steadyData.myTout1 = steadyData.myProfileT[steadyData.myProfileT.length - 1];
  steadyData.mydT1 = number(steadyData.myTin1 - steadyData.myTout1);
}

// 管路数据
export function unitConver4SteadyNodesData(steadyData) {
  const pressA = 1e-6;
  const fluxA = 3600 * 24;
  const aT = 1;
  const bT = -273.15;

  unitConver(steadyData, "myFgStdvol", fluxA);
  unitConver(steadyData, "myFoStdvol", fluxA);
  unitConver(steadyData, "myFwStdvol", fluxA);
  // steadyData.myFlStdvol = number((steadyData.myFoStdvol - 0) + (steadyData.myFwStdvol - 0));
  steadyData.myFlStdvol = number((steadyData.myFoStdvol - 0) + (steadyData.myFwStdvol - 0));
  // steadyData.myFlStdvol = Number(steadyData.myFlStdvol);
  // debugger;
  unitConver(steadyData, "myP", pressA);
  unitConver(steadyData, "myT", aT, bT);
}

// 注水泵
export function unitConver4Pump(pump) {
  // debugger;
  const pressA = 1e-3;
  unitConver(pump, "myPin1", pressA);
  unitConver(pump, "myPout1", pressA);
  // debugger;
}

// 分离器
export function unitConver4Sep(sep) {
  unitConver(sep, "r_oil_water_interface");
  unitConver(sep, "r_oil_chamber_level");
  unitConver(sep, "r_water_chamber_level");
  unitConver(sep, "r_op_outlet_level_rv_opening");
  unitConver(sep, "r_ap_outlet_level_rv_opening");
  unitConver(sep, "r_gp_ds_outlet_prv_opening");
  unitConver(sep, "r_gp_torch_outlet_prv_opening");
  unitConver(sep, "r_oper_pressure");
  unitConver(sep, "r_water_chamber_operation_temp");
  unitConver(sep, "r_oil_chamber_operation_temp");
}

// 井日度数据
export function unitConver4WellDailyData(wellDailyData) {
  const pressA = 1e3;
  wellDailyData.myfl = wellDailyData.my_fo + wellDailyData.my_fw;
  wellDailyData.mygor = wellDailyData.my_fg / wellDailyData.my_fo;
  wellDailyData.mywc = wellDailyData.my_fw / wellDailyData.myfl;

  unitConver(wellDailyData, "my_fo");
  unitConver(wellDailyData, "my_fg", 10000);
  unitConver(wellDailyData, "my_fw");
  unitConver(wellDailyData, "myfl");
  unitConver(wellDailyData, "mygor", 10000);
  unitConver(wellDailyData, "mywc", 100.0);
  unitConver(wellDailyData, "pump_frequency");
  unitConver(wellDailyData, "nozzle_diameter");
  unitConver(wellDailyData, "pump_inlet_press", pressA);
  unitConver(wellDailyData, "pump_outlet_press", pressA);
  unitConver(wellDailyData, "oil_press", pressA);
}

// 海管日度数据
export function unitConver4PipeDailyData(pipeDailyData) {
  unitConver(pipeDailyData, "myfo");
  unitConver(pipeDailyData, "myfg");
  unitConver(pipeDailyData, "myfw");
  unitConver(pipeDailyData, "mywc");
  unitConver(pipeDailyData, "mypin");
  unitConver(pipeDailyData, "mypout");
  unitConver(pipeDailyData, "mytin");
  unitConver(pipeDailyData, "mytout");
}

// 海管设计数据
export function unitConver4PipeDesignData(pipeDesignData) {
  unitConver(pipeDesignData, "mdesignfo");
  unitConver(pipeDesignData, "mdesignfg");
  unitConver(pipeDesignData, "mdesignfw");
  unitConver(pipeDesignData, "mdesignp");
  unitConver(pipeDesignData, "mdesignt");
  unitConver(pipeDesignData, "diameter");
  unitConver(pipeDesignData, "length");

  // eslint-disable-next-line array-callback-return
  pipeDesignData.filter(item => {
    if (item.mytype === "002") {
      item.mytype = "混输";
    } else if (item.mytype === "005") {
      item.mytype = "注水";
    }
  });
}

// 混输/注水海管实时数据
export function unitConver4PipeData(pipeData) {
  const pressA = 1e-3;
  unitConver(pipeData, "myPin1", pressA);
  unitConver(pipeData, "myPout1", pressA);
  unitConver(pipeData, "myStatus");
  unitConver(pipeData, "myTin1");
  unitConver(pipeData, "myTout1");
}

// 工艺计算输入转格式
export function unitConver4FlowSimData(dpipeData) {
  const pressA = 1e-3;
  const fluxA = 1 / (3600 * 24);
  const aT = 1;
  const bT = 273.15;
  unitConver(dpipeData, "myDout", pressA);
  unitConver(dpipeData, "myPout", 1000000);
  unitConver(dpipeData, "myQg", fluxA);
  unitConver(dpipeData, "myQo", fluxA);
  unitConver(dpipeData, "myQw", fluxA);
  unitConver(dpipeData, "myRoughAbs", pressA);
  unitConver(dpipeData, "myTe", aT, bT);
  unitConver(dpipeData, "myTin", aT, bT);
  unitConver(dpipeData, "myWallThick", pressA);
}

// 工艺计算输出转格式
export function unitConver4FlowSimResultData(dpipeData) {
  const pressA = 1e-6;
  unitConver(dpipeData, "myDP", pressA);
  unitConver(dpipeData, "myDPHammer", pressA);
  unitConver(dpipeData, "myDT");
  unitConver(dpipeData, "myPdesign", pressA);
  unitConver(dpipeData, "myPin", pressA);
  unitConver(dpipeData, "myTdesign");
  unitConver(dpipeData, "myTout");
}

// 内压分析输入转格式
export function unitConver4BurstingSimData(dpipeData) {
  const pressA = 1e-3;
  unitConver(dpipeData, "myDout", pressA);
  unitConver(dpipeData, "myFut", 1000000);
  unitConver(dpipeData, "myFyt", 1000000);
  unitConver(dpipeData, "myPd", 1000000);
  unitConver(dpipeData, "mySMTS", 1000000);
  unitConver(dpipeData, "mySMYS", 1000000);
  unitConver(dpipeData, "myThCorr", pressA);
  unitConver(dpipeData, "myThFab", pressA);
  unitConver(dpipeData, "myThSteel", pressA);
}

// 内压分析输出转格式
export function unitConver4BurstingSimResultData(dpipeData) {
  const pressA = 1e-6;
  unitConver(dpipeData, "myFu", pressA);
  unitConver(dpipeData, "myFy", pressA);
  unitConver(dpipeData, "myPd", pressA);
  unitConver(dpipeData, "myPb", pressA);
  unitConver(dpipeData, "myPbs", pressA);
  unitConver(dpipeData, "myPus", pressA);
}

// 外压分析输入转格式
export function unitConver4BucklingSimData(dpipeData) {
  const pressA = 1e-3;
  // debugger;
  unitConver(dpipeData, "myDout", pressA);
  unitConver(dpipeData, "myE", 1000000);
  unitConver(dpipeData, "myFo", 1e-2);
  unitConver(dpipeData, "myFyt", 1000000);
  unitConver(dpipeData, "mySMYS", 1000000);
  unitConver(dpipeData, "myThCorr", pressA);
  unitConver(dpipeData, "myThSteel", pressA);
}

// 外压分析输出转格式
export function unitConver4BucklingSimResultData(dpipeData) {
  const pressA = 1e-6;
  unitConver(dpipeData, "myFy", pressA);
  unitConver(dpipeData, "myPcc", pressA);
  unitConver(dpipeData, "myPec", pressA);
  unitConver(dpipeData, "myPpc", pressA);
  unitConver(dpipeData, "myPbs", pressA);
  unitConver(dpipeData, "myPus", pressA);
}

// 载荷分析输入转格式
export function unitConver4LoadingSimData(dpipeData) {
  const pressA = 1e-3;
  // debugger;
  unitConver(dpipeData, "myDout", pressA);
  unitConver(dpipeData, "myE", 1000000);
  unitConver(dpipeData, "myFo", 1e-2);
  unitConver(dpipeData, "myFut", 1000000);
  unitConver(dpipeData, "myFyt", 1000000);
  unitConver(dpipeData, "myPd", 1000000);
  unitConver(dpipeData, "mySMTS", 1000000);
  unitConver(dpipeData, "mySMYS", 1000000);
  unitConver(dpipeData, "myThCorr", pressA);
  unitConver(dpipeData, "myThFab", pressA);
  unitConver(dpipeData, "myThSteel", pressA);
}

// 载荷分析输出转格式
export function unitConver4LoadingSimResultData(dpipeData) {
  const pressA = 1e-6;
  // debugger;
  unitConver(dpipeData, "myFu", pressA);
  unitConver(dpipeData, "myFy", pressA);
  unitConver(dpipeData, "myPb", pressA);
  unitConver(dpipeData, "myPbs", pressA);
  unitConver(dpipeData, "myPus", pressA);
}

// 膨胀分析输入转格式
export function unitConver4ExpanSimData(dpipeData) {
  const pressA = 1e-3;
  unitConver(dpipeData, "myDout", pressA);
  unitConver(dpipeData, "myE", 1000000);
  unitConver(dpipeData, "myFo", 1e-2);
  unitConver(dpipeData, "myFut", 1000000);
  unitConver(dpipeData, "myFyt", 1000000);
  unitConver(dpipeData, "myPd", 1000000);
  unitConver(dpipeData, "mySMTS", 1000000);
  unitConver(dpipeData, "mySMYS", 1000000);
  unitConver(dpipeData, "myThCorr", pressA);
  unitConver(dpipeData, "myThFab", pressA);
  unitConver(dpipeData, "myThSteel", pressA);
}

// 膨胀分析输出转格式
export function unitConver4ExpanSimResultData(dpipeData) {
  const pressA = 1e-6;
  unitConver(dpipeData, "myFu", pressA);
  unitConver(dpipeData, "myFy", pressA);
  unitConver(dpipeData, "myPb", pressA);
  unitConver(dpipeData, "myPbs", pressA);
  unitConver(dpipeData, "myPus", pressA);
  unitConver(dpipeData, "mySxr", pressA);
  unitConver(dpipeData, "mySxt", pressA);
  unitConver(dpipeData, "mySy", pressA);
  //   "myFf": 2751926.5082176137,
}

export function formatValOrNa(v, rep) {
  return formatValOrNaZero(v, rep, true);
}

export function formatValOrNaZero(v, repVal, isZeroRep) {
  // debugger;
  if (
    (isZeroRep && v === "0") ||
    (v === null ||
      v === "N/A" ||
      v === undefined)
  ) {
    if (repVal) {
      v = `${repVal.toFixed(2)}*`;
    } else {
      v = "N/A";
    }
  } else if (Number(v)) {
    // debugger;
    v = Number(v).toFixed(2);
  }
  // debugger;
  if (v !== "") {
    return v;
  }
  return "N/A";
}

// 表格数据格式化
export function formatVal(v) {
  if (
    v !== null &&
    v !== "" &&
    v !== undefined &&
    v !== "N/A" &&
    v !== "NaN"
  ) {
    if (Array.isArray(v)) {
      return Number(v[0]).toFixed(2);
    }
    return Number(v).toFixed(2);
  }
  return "N/A";
}

// 表格数据格式化
export function formatVal3(v) {
  if (
    v !== null &&
    v !== "" &&
    v !== undefined &&
    v !== "N/A" &&
    v !== "NaN"
  ) {
    if (Array.isArray(v)) {
      return Number(v[0]).toFixed(3);
    }
    return Number(v).toFixed(3);
  }
  return "N/A";
}

// 表格数据格式化
export function formatVals(v1, v2, operator) {
  if (
    v1 !== null &&
    v1 !== "" &&
    v1 !== undefined &&
    v1 !== "N/A" &&
    v1 !== "NaN" &&
    v2 !== null &&
    v2 !== "" &&
    v2 !== undefined &&
    v2 !== "N/A" &&
    v2 !== "NaN"
  ) {
    let v;
    if (operator === "+") {
      v = v1 + v2;
    }
    if (operator === "-") {
      v = v1 - v2;
    }
    if (operator === "*") {
      v = v1 * v2;
    }
    if (operator === "/") {
      v = v1 / v2;
    }
    if (operator === "%") {
      v = v1 % v2;
    }

    return formatVal(v);
  }
  return "N/A";
}

export function sortByStrNo(a, b) {
  const letterA = a.match(/[a-zA-Z]+/)[0];
  const letterB = b.match(/[a-zA-Z]+/)[0];
  const numA = parseInt(a.match(/\d+/)[0], 10);
  const numB = parseInt(b.match(/\d+/)[0], 10);
  const restA = a.replace(letterA, "").replace(numA, "");
  const restB = b.replace(letterB, "").replace(numB, "");

  if (letterA < letterB) {
    return -1;
  } if (letterA > letterB) {
    return 1;
  }
  if (numA !== numB) {
    return numA - numB;
  }
  return restA.localeCompare(restB);
}

// 对含有特殊字符的列数据进行排序
export function sortHasStr(arr, prop, order) {
  let data1 = [];
  const data2 = [];

  // eslint-disable-next-line array-callback-return
  arr.map(item => {
    const data = formatVal(item[prop]);
    if (data !== "N/A") {
      item[prop] = parseFloat(data);
      data1.push(item);
    } else {
      item[prop] = "N/A";
      data2.push(item);
    }
  });
  if (order === "ascending") {
    data1 = data1.sort((a, b) => a[prop] - b[prop]);
  }
  if (order === "descending") {
    data1 = data1.sort((a, b) => b[prop] - a[prop]);
  }

  return data1.concat(data2);
}

export function createFluxPoint(time, fluxArr, isSum = false) {
  return {
    isSum: isSum,
    x: time,
    y: [...fluxArr]
  };
}