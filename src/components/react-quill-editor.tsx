import "react-quill/dist/quill.snow.css";

import QuillComponent, { ReactQuillProps } from 'react-quill';
import { useEffect, useRef } from "react";
import { BindingHandlerContext, BindingHandlerRange } from "@/types/react-quill";


const ReactQuill = (
    typeof window === 'object' ? require('react-quill') : () => false
) as React.FC<ReactQuillProps & { ref: React.Ref<QuillComponent> }>;


export const ReactQuillEditor = () => {
    const quillRef = useRef<QuillComponent | null>(null);

    const modules = {
        toolbar: [
            [{ header: [3, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
        ],
        history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true,
        },
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
    ];

    useEffect(() => {
        if (quillRef.current) {
            const keyboard = quillRef.current.getEditor().getModule('keyboard');
            keyboard.addBinding({
                key: 'h',
                shortKey: true,
                handler: function (range: BindingHandlerRange, context: BindingHandlerContext) {
                    if (context.format.header === 3) {
                        this.quill.format('header', false);
                    } else {
                        this.quill.format('header', 3);
                    }
                }
            });
        }
    }, [quillRef]);

    return (
        <ReactQuill
            ref={quillRef}
            theme="snow"
            formats={formats}
            modules={modules}
            onChange={(newValue: string) => {
                console.log(newValue)
            }}
        />
    )
}

export default ReactQuillEditor;