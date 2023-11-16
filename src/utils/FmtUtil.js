/* eslint-disable no-use-before-define */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as MpfUtil from "@/utils/MpfUtil";
import * as Arrays from "@/utils/Arrays";

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

  // const v = Number(val).toFixed(2);
  // debugger;
  return v;
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
  unitConver(wellbore, "myTeu1", aT, bT); // 吸入温度
  // unitConver(wellbore, "myTcd1", aT, bT);
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
  if (Array.isArray(steadyData.myProfileV)) {
    steadyData.myProfileV = steadyData.myProfileV[0];
  }
  steadyData.myProfileVe = Arrays.ftm(steadyData.myProfileVe);

  steadyData.myProfileFgStdvol = Arrays.ftm(steadyData.myProfileFgStdvol, fluxA);
  steadyData.myProfileFoStdvol = Arrays.ftm(steadyData.myProfileFoStdvol, fluxA);
  steadyData.myProfileFwStdvol = Arrays.ftm(steadyData.myProfileFwStdvol, fluxA);

  if (Array.isArray(steadyData.myProfileFoStdvol)) {
    steadyData.myProfileFoStdvol = steadyData.myProfileFoStdvol[0];
  }

  if (Array.isArray(steadyData.myProfileFwStdvol)) {
    steadyData.myProfileFwStdvol = steadyData.myProfileFwStdvol[0];
  }

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

  if (!steadyData.myType) {
    return;
  }

  if (steadyData.myType === "Pipe") {
    steadyData.myType = "海管";
  } else if (steadyData.myType === "Pump") {
    steadyData.myType = "泵";
  }
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
  unitConver(sep, "R_OIL_WATER_INTERFACE");
  unitConver(sep, "R_OIL_CHAMBER_LEVEL");
  unitConver(sep, "R_WATER_CHAMBER_LEVEL");
  unitConver(sep, "R_OP_OUTLET_LEVEL_RV_OPENING");
  unitConver(sep, "R_AP_OUTLET_LEVEL_RV_OPENING");
  unitConver(sep, "R_GP_DS_OUTLET_PRV_OPENING");
  unitConver(sep, "R_GP_TORCH_OUTLET_PRV_OPENING");
  unitConver(sep, "R_OPER_PRESSURE");
  unitConver(sep, "R_WATER_CHAMBER_OPERATION_TEMP");
  unitConver(sep, "R_OIL_CHAMBER_OPERATION_TEMP");
}

// 井日度数据
export function unitConver4WellDailyData(wellDailyData) {
  unitConver(wellDailyData, "myfo");
  unitConver(wellDailyData, "myfg");
  wellDailyData.myfg = Number((wellDailyData.myfg * 10000).toFixed(2));
  unitConver(wellDailyData, "myfw");
  wellDailyData.myfl = (wellDailyData.myfo - 0) + (wellDailyData.myfw - 0);
  unitConver(wellDailyData, "myfl");
  wellDailyData.mygor = number(wellDailyData.myfg / wellDailyData.myfo);
  unitConver(wellDailyData, "mygor");
  wellDailyData.mywc = (wellDailyData.myfw - 0) / (wellDailyData.myfl - 0);
  unitConver(wellDailyData, "mywc", 100.0);
  unitConver(wellDailyData, "myhz");
  unitConver(wellDailyData, "nozzle_diameter");
  unitConver(wellDailyData, "mypg");
  unitConver(wellDailyData, "mytg");
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

export function createFluxPoint(time, fluxArr, isSum = false) {
  return {
    isSum: isSum,
    x: time,
    y: [...fluxArr]
  };
}