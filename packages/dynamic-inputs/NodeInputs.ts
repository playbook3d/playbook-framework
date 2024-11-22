import { ComfyWorkflowNodeData } from "../core/types"

/**
 * Defines the base data input which provides an interface between
 * user-provided UI controls and Playbook's custom ComfyUI nodes.
 */
export abstract class INodeInput {
    /** Type identifier formatted 'Playbook [node type]' (ex. 'Playbook Text).
     * The type field pulls its value directly from the type field on the 
     * custom ComfyUI node data structure.
    */
    type: string

    /** A unique identifier which can be used to associate this input
     * with a node within a ComfyUI workflow. */
    id: number

    /** The name of the associated ComfyUI workflow node. */
    name: string

    /**
     * The current value of the associated node in the ComfyUI workflow. 
     * Use this property as the value source for associated UI controls.
     */
    readonly abstract value: any

    /**
     * A method for setting the internal value of the node. This should be 
     * called whenever a value change occurs via UI controls.
     */
    abstract setValue: (value: any) => void

    constructor(nodeData: ComfyWorkflowNodeData, _setValue: (value: any) => void) {
        this.id = nodeData.id
        this.type = nodeData.type

        try {
            if (nodeData.widgets_values.length > 1) {
                this.name = nodeData.widgets_values[1]
            } else {
                throw new Error(`No name found in ${nodeData.type} node data with id ${nodeData.id}.`)
            }
    
        } catch (error) {
            console.log(error)
        }
    }
}

/**
 * Extends the base input to interface with Playbook's custom text nodes.
 */
export class ITextNodeInput extends INodeInput {
    readonly value: string
    readonly setValue: (value: string) => void

    /**
     * A prompt phrase tailored to influence the workflow to generate
     * a strong and distinct result.
     */
    readonly triggerWords: string

    constructor(nodeData: ComfyWorkflowNodeData, _setValue: (value: string) => void) {
        super(nodeData, _setValue)
        
        try {
            if (nodeData.widgets_values.length > 2) {
                this.value = nodeData.widgets_values[2]
            } else {
                throw new Error(`No value found in ${nodeData.type} node data with id ${nodeData.id}.`)
            }
    
            if (nodeData.widgets_values.length > 3) {
                this.triggerWords = nodeData.widgets_values[3]
            } else {
                throw new Error(`No triggerWords value found in ${nodeData.type} node data with id ${nodeData.id}.`)
            }

            this.setValue = _setValue

        } catch (error) {
            console.log(error)
        }
    }
}

/**
 * Extends the base input to interface with Playbook's custom number nodes.
 */
export class INumberNodeInput extends INodeInput {
    readonly value: number
    readonly setValue: (value: number) => void

    /** The minimum threshold for this value. */
    min: number

    /** The minimum threshold for this value. */
    max: number

    constructor(nodeData: ComfyWorkflowNodeData, _setValue: (value: number) => void) {
        super(nodeData, _setValue)

        try {
            if (nodeData.widgets_values.length > 2) {
                this.min = nodeData.widgets_values[2]
            } else {
                throw new Error(`No min value found in ${nodeData.type} node data with id ${nodeData.id}.`)
            }

            if (nodeData.widgets_values.length > 3) {
                this.max = nodeData.widgets_values[3]
            } else {
                throw new Error(`No max value found in ${nodeData.type} node data with id ${nodeData.id}.`)
            }

            if (nodeData.widgets_values.length > 4) {
                this.value = nodeData.widgets_values[4]
            } else {
                throw new Error(`No value found in ${nodeData.type} node data with id ${nodeData.id}.`)
            }
    
            this.setValue = _setValue
        } catch (error) {
            console.log(error)
        }
    }
}

/**
 * Extends the base input to interface with Playbook's custom float nodes.
 */
export class IFloatNodeInput extends INodeInput {
    readonly value: number
    readonly setValue: (value: number) => void

    /** The minimum threshold for this value. */
    min: number

    /** The minimum threshold for this value. */
    max: number

    constructor(nodeData: ComfyWorkflowNodeData, _setValue: (value: number) => void) {
        super(nodeData, _setValue)

        try {
            if (nodeData.widgets_values.length > 2) {
                this.min = nodeData.widgets_values[2]
            } else {
                throw new Error(`No min value found in ${nodeData.type} node data with id ${nodeData.id}.`)
            }

            if (nodeData.widgets_values.length > 3) {
                this.max = nodeData.widgets_values[3]
            } else {
                throw new Error(`No max value found in ${nodeData.type} node data with id ${nodeData.id}.`)
            }

            if (nodeData.widgets_values.length > 4) {
                this.value = nodeData.widgets_values[4]
            } else {
                throw new Error(`No value found in ${nodeData.type} node data with id ${nodeData.id}.`)
            }
    
            this.setValue = _setValue
        } catch (error) {
            console.log(error)
        }
    }
}

/**
 * Extends the base input to interface with Playbook's custom boolean nodes.
 */
export class IBooleanNodeInput extends INodeInput {
    readonly value: boolean
    readonly setValue: (value: boolean) => void

    constructor(nodeData: ComfyWorkflowNodeData, _setValue: (value: boolean) => void) {
        super(nodeData, _setValue)

        try {
            if (nodeData.widgets_values.length > 2) {
                this.value = nodeData.widgets_values[2]
            } else {
                throw new Error(`No value found in ${nodeData.type} node data with id ${nodeData.id}.`)
            }

            this.setValue = _setValue
        } catch (error) {
            console.log(error)
        }
    }
}

/**
 * Extends the base input to interface with Playbook's custom image nodes.
 */
export class IImageNodeInput extends INodeInput {
    readonly value: string
    readonly setValue: (value: string) => void

    constructor(nodeData: ComfyWorkflowNodeData, _setValue: (value: string) => void) {
        super(nodeData, _setValue)
        
        try {
            if (nodeData.widgets_values.length > 2) {
                this.value = nodeData.widgets_values[2]
            } else {
                throw new Error(`No value found in ${nodeData.type} node data with id ${nodeData.id}.`)
            }

            this.setValue = _setValue
        } catch (error) {
            console.log(error)
        }
    }
}

/**
 * Extends the base input to interface with Playbook's custom mask pass nodes.
 */
export class IMaskPassNodeInput extends INodeInput {
    readonly value: string
    readonly setValue: (value: string) => void

    // /** Determines whether or not the value is allowed to be a decimal. */
    // blurSize: number

    // /** Text prompt for Mask 1. */
    // mask1Prompt: string
    // /** Text prompt for Mask 2. */
    // mask2Prompt: string
    // /** Text prompt for Mask 3. */
    // mask3Prompt: string
    // /** Text prompt for Mask 4. */
    // mask4Prompt: string
    // /** Text prompt for Mask 5. */
    // mask5Prompt: string
    // /** Text prompt for Mask 6. */
    // mask6Prompt: string
    // /** Text prompt for Mask 7. */
    // mask7Prompt: string

    constructor(nodeData: ComfyWorkflowNodeData, _setValue: (value: string) => void) {
        super(nodeData, _setValue)
        // this.blurSize = blurSize
        // this.mask1Prompt = mask1Prompt
        // this.mask2Prompt = mask2Prompt
        // this.mask3Prompt = mask3Prompt
        // this.mask4Prompt = mask4Prompt
        // this.mask5Prompt = mask5Prompt
        // this.mask6Prompt = mask6Prompt
        // this.mask7Prompt = mask7Prompt
    }
}