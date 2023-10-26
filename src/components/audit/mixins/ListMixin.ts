import { postAction } from "@/components/audit/process/api/manage";

export default {
  methods: {
    handleAuditToPage(processInstanceId: string, id: string) {
      postAction("/flow/task/taskIdByInstance", { processInstanceId })
        .then(result => {
          if (result.firstTaskId) {
            // todo
            this.$router.push({ name: this.routerInfo.view, query: {
              taskId: result.firstTaskId,
              businessKey: id,
              processInstanceId
            }});
          } else {
            this.$message.warning("找不到审批任务");
          }
        });
    }
  }
};