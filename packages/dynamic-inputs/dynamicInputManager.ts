/**
 * Defines the base data input which provides an interface between
 * user-provided UI dontrols and Playbook's custom ComfyUI nodes.
 */
export interface INodeInput {
    /** 
     * A unique identifier which can be used to associate this input
     * with a node within a ComfyUI workflow.
     * */
    id: string,

    /** 
     * The name of the associated ComfyUI workflow node.
     * */
    name: string,

    /**
     * The default value of the associated ComfyUI node.
     */
    defaultValue: any,

    /**
     * The current value of the associated node in the ComfyUI workflow. 
     * Use this property as the value source for associated UI controls.
     */
    readonly value: any,

    /**
     * A method for setting the internal value of the node. This should be 
     * called whenever a value change occurs via UI controls.
     */
    setValue: (value: any) => {},
}

/**
 * Extends the base input to interface with Playbook's custom text nodes.
 */
export interface ITextNodeInput extends INodeInput {
    readonly value: string,
    setValue: (value: string) => {},

    /**
     * A prompt phrase tailored to influence the workflow to generate
     * a strong and distinct result.
     */
    readonly triggerWords: string,
}

/**
 * Extends the base input to interface with Playbook's custom number nodes.
 */
export interface INumberNodeInput extends INodeInput {
    readonly value: number,
    setValue: (value: number) => {},

    /**
     * Determines whether or not the value is allowed to be a decimal.
     */
    isDecimal: boolean,

    /**
     * 
     */
    min: number, 

    /**
     * A prompt phrase tailored to influence the workflow to generate
     * a strong and distinct result.
     */
    max: number,
}