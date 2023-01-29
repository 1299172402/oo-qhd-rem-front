import { getAction } from "@/components/audit/process/api/manage";

export function getProcessStatus() {
  return getAction("/sys/dict/getDictItems/process_instance_status")
}

export default {};