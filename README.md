## Using React-Quill with Next.js my suggestion ##

If you are facing a problem when using react-quill with Next.js and need to render ssr false, you can find such answer from internet:

```javascript
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function App() {
    const [value, setValue] = useState('')
    return(
       <ReactQuill value={value} onChange={setValue}/>
    )
} 
```

but it's works ONLY for such simple example. When you will need make some more complicated you will face with a lot of problems. 
For example if you need to bind custom keyboard events. 

My suggestion is down

To do this, you can define a custom ReactQuill component that conditionally requires the react-quill module based on whether the window object is available:

```javascript
import { BindingHandlerContext, BindingHandlerRange } from "@/types/react-quill";
import QuillComponent, { ReactQuillProps } from 'react-quill';

const ReactQuill = (
    typeof window === 'object' ? require('react-quill') : () => false
) as React.FC<ReactQuillProps & { ref: React.Ref<QuillComponent> }>;
```

Here, we're importing the necessary types from the @/types/react-quill module, as well as the QuillComponent and ReactQuillProps from the react-quill module. We're then defining a ReactQuill component that uses require to import react-quill if window is available, and returns a function that always returns false if it's not. We also pass in the ReactQuillProps and a reference to the QuillComponent as props to the ReactQuill component.

You can then use the ReactQuill component in your code like this:

```javascript
import { useState, useRef } from 'react';

function MyComponent() {
    const [value, setValue] = useState('');
    const quillRef = useRef(null);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <ReactQuill
            value={value}
            onChange={handleChange}
            ref={quillRef}
        />
    );
}
```