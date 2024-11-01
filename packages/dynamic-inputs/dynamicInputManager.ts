import { IMaskPassNodeSocket, INodeSocket } from "./NodeSockets";

type NodeSocketEntry = { key: string, socket: INodeSocket }

/**
 * Provides an interface of data sockets which can be used to 
 * read and write values to and from dynamic workflow nodes in
 * a ComfyUI workflow.
 */
export class DynamicInputsManager {
    private workflowData: string
    private nodeSockets: NodeSocketEntry[]

    /**
     * Instance a new DynamicInputsManager.
     * @param workflowData JSON-formatted workflow data, output from
     * a ComfyUI workflow.
     */
    constructor(workflowData: string) {
        this.workflowData = workflowData
        this.setNodeSockets(this.createNodeSocketsFromWorkflowData(workflowData))
    }

    /** 
     * Parse JSON-formatted workflow data for dynamic nodes
     * and create corresponding data sockets for interfacing. 
     */
    private createNodeSocketsFromWorkflowData(workflowData: string): NodeSocketEntry[] {
        let nodeSockets: NodeSocketEntry[] = []

        const parsedData: any = JSON.parse(workflowData)

        const nodes: any[] = parsedData.nodes
        const playbookNodes = nodes.filter(node => node.type.includes('Playbook'))

        playbookNodes.forEach(node => {

            switch (node.type) {
                case 'Playbook Mask':
                    nodeSockets.push({
                        key: node.id,
                        socket: new IMaskPassNodeSocket(
                            0, '', '', '', '', '', '', '',
                        )
                    })
                    break;
                default:
                    break;
            }
        })

        return nodeSockets
    }

    public getNodeSockets() {
        return this.nodeSockets
    }

    private setNodeSockets(nodeSockets: NodeSocketEntry[]) {
        this.nodeSockets = nodeSockets
    }
}