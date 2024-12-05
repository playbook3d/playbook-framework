/** 
 * ComfyUI workflow structural data. Note, workflow data in this 
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
 * ComfyUI workflow output data. Note, workflow data in this 
 * format is retrieved from and saved to our S3 storage bucket.
 */
export type ComfyWorkflowOutputData = Record<number, { class_type: string, inputs: Record<string, any>}>

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
export type NodeInputAPIFormat = Record<number, Record<string, any>>

/** 
 * Modeled after a type in the ComfyUI_Frontend repo that provides both 
 * structural data for the workflow graph, alongside output data which can
 * be submitted as a prompt to ComfyUI.
 */
export type ComfyWorkflowData = {
    workflow: ComfyWorkflowGraphData,
    output: ComfyWorkflowOutputData
}

export interface PlaybookWorkflowData {
    id: string
    name: string
    accounts_ids: string[]
    runs: string[]
    owner_id: string
    team_id: string
    editing_user_id: string
    date_created: string
    date_last_edited: string
    workflow_url: string
    workflow_api_url: string
    s3_file_id: string | null
    saved_workflows: [[string, string]]
    canvas_type: number
    public_url: string
    public: boolean
    is_template: boolean
    outputs_urls: string[]
    gallery_outputs_urls: string[]
    gpu_usage_total: number
    gpu_usage_billing_period: number
}

export interface PlaybookTeamData {
    id: string
    name: string
    owner_id: string
    api_key: string
    date_created: string
    date_last_login: string
    billing_date: string
    runs: [string]
    members: [string]
    subscription_tier: string
    custom_monthly_rate: number
    custom_free_credit: number
    gpu_usage_total: number
    gpu_usage_billing_period: number
    billing_overage: boolean
    projects: [string]
    models_urls: [string]
    modal_app_id: string
}