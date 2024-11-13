export type ComfyWorkflowData = {
    last_node_id: string,
    last_link_id: number,
    nodes: ComfyWorkflowNodeData[],
    groups?: any[], // zGroup[],
    config?: any[] | null, // zConfig[] | null,
    extra?: any[] | null, // zExtra[] | null,
    version: number,
    models?: any[], // zModelFile[],
  }

  export type ComfyWorkflowNodeData = {
      id: number,
      type: string,
      widgets_values: any[],
  }