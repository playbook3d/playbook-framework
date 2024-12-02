import {
    INodeInput,
    IBooleanNodeInput,
    IImageNodeInput,
    INumberNodeInput,
    ITextNodeInput,
} from "./NodeInputs";
import { ComfyWorkflowGraphData, ComfyWorkflowNodeData } from '../core'

/**
 * Provides an interface of data inputs which can be used to 
 * read and write values to and from dynamic workflow nodes in
 * a ComfyUI workflow.
 */
export class PlaybookNodeInputsManager {
    /**
     * Set the value of a given node within the given Comfy workflow data.
     * @param nodeId The unique identifier of the node within the Comfy workflow.
     * @param value The new value to be assigned to the target node.
     * @param _workflowData The current workflow data state. A copy of this data object
     * will be returned with the updated value assigned to it.
     * @returns A Comfy workflow data object with the new value assigned. This object is an updated copy
     * of the workflow data object passed into this function.
     */
    public setWorkflowNodeValue = (nodeId: number, value: any, _workflowData: ComfyWorkflowGraphData): ComfyWorkflowGraphData => {
        const updatedWorkflowData: ComfyWorkflowGraphData = { ..._workflowData }
        const nodeIndex: number = _workflowData.nodes.findIndex(node => node.id === nodeId)

        if (updatedWorkflowData.nodes[nodeIndex].type === 'Playbook Number' ||
            updatedWorkflowData.nodes[nodeIndex].type === 'Playbook Float' 
        ) {
            updatedWorkflowData.nodes[nodeIndex].widgets_values[4] = value
        } else {
            updatedWorkflowData.nodes[nodeIndex].widgets_values[2] = value
        }

        return updatedWorkflowData
    }

    /** 
     * Parse JSON-formatted workflow data for dynamic nodes
     * and create corresponding data inputs for interfacing. 
     */
    public getNodeInputsFromWorkflowData(workflowData: ComfyWorkflowGraphData): INodeInput[] {
        let nodeInputs: INodeInput[] = []

        const nodes: any[] = workflowData.nodes
        const playbookNodes = nodes.filter(node => node.type.includes('Playbook'))

        playbookNodes.forEach(node => {
            const setValueCallback = (value: any) => this.setWorkflowNodeValue(node.id, value, workflowData)

            switch (node.type) {
                case 'Playbook Text':
                    nodeInputs.push(new ITextNodeInput(node, setValueCallback))
                    break
                case 'Playbook Float':
                case 'Playbook Number':
                    nodeInputs.push(new INumberNodeInput(node, setValueCallback))
                    break
                case 'Playbook Boolean':
                    nodeInputs.push(new IBooleanNodeInput(node, setValueCallback))
                    break
                case 'Playbook Image':
                    nodeInputs.push(new IImageNodeInput(node, setValueCallback))
                    break
                case 'Playbook Mask':
                    break
                default:
                    break
            }
        })
        return nodeInputs
    }
}