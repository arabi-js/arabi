
import { _arguments } from '../كلمات-مفتاحية';

const functionPrototypeMap = {
  اربط: "bind",
  استدعي: "call",
  طبق: "apply",
  لنص: "toString",
  [_arguments]: "arguments",
  مستدعي: "caller",
  اسم_ظاهر: "displayName",
  طول: "length",
  اسم: "name",
  نموذج: "prototype",
};

const functionMap = null;

export default [ "Function", functionMap, { constructMap: [functionPrototypeMap] } ];
