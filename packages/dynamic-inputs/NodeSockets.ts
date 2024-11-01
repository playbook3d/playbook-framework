/**
 * Defines the base data socket which provides an interface between
 * user-provided UI dontrols and Playbook's custom ComfyUI nodes.
 */
export class INodeSocket {
    /** A unique identifier which can be used to associate this socket
     * with a node within a ComfyUI workflow. */
    id: string

    /** The name of the associated ComfyUI workflow node. */
    name: string

    /**
     * The current value of the associated node in the ComfyUI workflow. 
     * Use this property as the value source for associated UI controls.
     */
    readonly value: any

    /**
     * A method for setting the internal value of the node. This should be 
     * called whenever a value change occurs via UI controls.
     */
    setValue: (value: any) => {}

    constructor() {
        this.id
        this.name
        this.value
    }
}

/**
 * Extends the base socket to interface with Playbook's custom text nodes.
 */
export class ITextNodeSocket extends INodeSocket {
    declare readonly value: string
    declare setValue: (value: string) => {}
    declare defaultValue: string

    /**
     * A prompt phrase tailored to influence the workflow to generate
     * a strong and distinct result.
     */
    readonly triggerWords: string

    constructor() {
        super()
        this.triggerWords
    }
}

/**
 * Extends the base socket to interface with Playbook's custom number nodes.
 */
export class INumberNodeSocket extends INodeSocket {
    declare readonly value: number
    declare setValue: (value: number) => {}
    declare defaultValue: number

    /** Determines whether or not the value is allowed to be a decimal. */
    isDecimal: boolean

    /** The minimum threshold for this value. */
    min: number

    /** The minimum threshold for this value. */
    max: number

    constructor() {
        super()
        this.isDecimal
        this.min
        this.max
    }
}

/**
 * Extends the base socket to interface with Playbook's custom boolean nodes.
 */
export class IBooleanNodeSocket extends INodeSocket {
    declare readonly value: boolean
    declare setValue: (value: boolean) => {}
    declare defaultValue: boolean

    constructor() {
        super()
    }
}

/**
 * Extends the base socket to interface with Playbook's custom image nodes.
 */
export class IImageNodeSocket extends INodeSocket {
    declare readonly value: Blob
    declare setValue: (value: Blob) => {}
    declare defaultValue: Blob

    constructor() {
        super()
    }
}

/**
 * Extends the base socket to interface with Playbook's custom mask pass nodes.
 */
export class IMaskPassNodeSocket extends INodeSocket {
    declare readonly value: Blob
    declare setValue: (value: Blob) => {}
    declare defaultValue: Blob

    /** Determines whether or not the value is allowed to be a decimal. */
    blurSize: number

    /** Text prompt for Mask 1. */
    mask1Prompt: string
    /** Text prompt for Mask 2. */
    mask2Prompt: string
    /** Text prompt for Mask 3. */
    mask3Prompt: string
    /** Text prompt for Mask 4. */
    mask4Prompt: string
    /** Text prompt for Mask 5. */
    mask5Prompt: string
    /** Text prompt for Mask 6. */
    mask6Prompt: string
    /** Text prompt for Mask 7. */
    mask7Prompt: string

    constructor(blurSize, mask1Prompt, mask2Prompt, mask3Prompt, mask4Prompt, mask5Prompt, mask6Prompt, mask7Prompt) {
        super()
        this.blurSize = blurSize
        this.mask1Prompt = mask1Prompt
        this.mask2Prompt = mask2Prompt
        this.mask3Prompt = mask3Prompt
        this.mask4Prompt = mask4Prompt
        this.mask5Prompt = mask5Prompt
        this.mask6Prompt = mask6Prompt
        this.mask7Prompt = mask7Prompt
    }
}