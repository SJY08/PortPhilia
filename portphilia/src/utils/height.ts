import React, { ReactNode, ReactElement } from "react"
import ReactDOMServer from "react-dom/server"

function measureElementHeight(element: ReactNode): number {
    const tempContainer = document.createElement("div")
    document.body.appendChild(tempContainer)

    Object.assign(tempContainer.style, {
        width: "680px", // 🔥 padding 제외한 실제 콘텐츠 영역 기준
        position: "absolute",
        visibility: "hidden",
        display: "block",
    })

    const wrapper = document.createElement("div")
    tempContainer.appendChild(wrapper)

    if (React.isValidElement(element)) {
        const reactElement = element as ReactElement<any>
        wrapper.innerHTML = ReactDOMServer.renderToString(reactElement)
    }

    const height = wrapper.scrollHeight || 200
    document.body.removeChild(tempContainer)
    return height
}

export default measureElementHeight
