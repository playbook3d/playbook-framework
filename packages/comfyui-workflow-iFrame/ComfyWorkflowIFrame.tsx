// import { useCallback, useEffect, useRef } from 'react'
// import { ComfyWorkflowData } from 'core'

// export interface WorkflowWindowMessageData {
//     message: 'RequestWorkflowDataFromComfyWindow'
//            | 'SendWorkflowDataToComfyWindow'
//            | 'ComfyWindowInitialized'
//            | 'SendWorkflowDataToPlaybookWrapper'
//     data?: any,
// }

// export function ComfyWorkflowIFrame(props: {
//     workflowData: ComfyWorkflowData,
//     setWorkflowData: (workflowData: ComfyWorkflowData) => void,
// }) {
//     const workflowTargetOrigin = import.meta.env.VITE_CONNECT_WORKFLOW
//     const iFrameRef = useRef<HTMLIFrameElement>(null)
//     const workflowWindowRef = useRef<Window>(null)

//     const requestDataFromWorkflowWindow = useCallback(() => {
//         const messageData: WorkflowWindowMessageData = {
//             message: 'RequestWorkflowDataFromComfyWindow'
//         }
//         workflowWindowRef.current.postMessage(messageData, workflowTargetOrigin)
//     }, [props.workflowData])

//     const sendWorkflowDataToComfyWindow = (workflowData: ComfyWorkflowData) => {
//         const messageData: WorkflowWindowMessageData = {
//             message: 'SendWorkflowDataToComfyWindow',
//             data: workflowData
//         }
//         workflowWindowRef.current.postMessage(
//             JSON.parse(JSON.stringify(messageData)),
//             workflowTargetOrigin
//         )
//     }

//     const handleMessageFromWorkflowWindow = useCallback((evt) => {
//         const message: WorkflowWindowMessageData = evt.data
        
//         if (evt.origin !== workflowTargetOrigin) return 

//         switch (message.message) {
//             case 'RequestWorkflowDataFromComfyWindow':
//                 break
//             case 'SendWorkflowDataToPlaybookWrapper':
//                 props.setWorkflowData(message.data)
//                 break
//             case 'SendWorkflowDataToComfyWindow':
//                 break
//             case 'ComfyWindowInitialized':
//                 sendWorkflowDataToComfyWindow(props.workflowData)
//                 break;
//         }

//     }, [props.workflowData])

//     useEffect(() => {
//         // Get iFrame window ref.
//         if (!iFrameRef.current) return

//         workflowWindowRef.current = iFrameRef.current.contentWindow

//         if (!workflowWindowRef.current) {
//             console.log('Failed to assign workflow iFrame window or document ref.')
//         }
//     }, [])

//     useEffect(() => {
//         // Event subscriptions
//         window.addEventListener('message', handleMessageFromWorkflowWindow)
//         return () => {
//             window.removeEventListener('message', handleMessageFromWorkflowWindow)
//         }
//     }, [handleMessageFromWorkflowWindow])

//     return (
//         <iframe 
//             ref={iFrameRef}
//             src={workflowTargetOrigin}
//             className={`absolute w-full h-full right-0 top-0 bg-plbk-gray`}
//         />
//     )
// }