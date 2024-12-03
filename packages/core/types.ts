/** 
 * Structural ComfyUI workflow data. Note, workflow data in this 
 * format is retrieved from and saved to our S3 storage bucket.
 */
export type ComfyWorkflowGraphData = {
    last_node_id: string,
    last_link_id: number,
    nodes: ComfyWorkflowNodeData[],
    groups?: any[],
    config?: any[] | null,
    extra?: any[] | null,
    version: number,
    models?: any[],
}

/** 
 * Reduction of node data structure in structural ComfyUI workflow data
 * to conveniently provide properties relevant to frontend implementation.
 */
export type ComfyWorkflowNodeData = {
    id: number,
    type: string,
    widgets_values: any[],
}

/**
 * Defines a node's input properties and values. We use this structure
 * to pass the values of custom Playbook nodes to backend when a workflow is run.
 * Matches the node structure within Comfy's outputs JSON format.
 */
export type NodeInputAPIFormat = Record<number, Record<string, string|number|boolean>>

