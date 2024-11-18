export type ComfyWorkflowData = {
    last_node_id: string,
    last_link_id: number,
    nodes: ComfyWorkflowNodeData[],
    groups?: any[],
    config?: any[] | null,
    extra?: any[] | null,
    version: number,
    models?: any[],
  }

  export type ComfyWorkflowNodeData = {
      id: number,
      type: string,
      widgets_values: any[],
  }