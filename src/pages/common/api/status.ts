import { getAction } from "@/api/common/manage";

export function getProcessStatus() {
  return getAction("/sys/dict/getDictItems/process_instance_status")
}

export default {};