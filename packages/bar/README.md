---
nav: 组件
toc: content
---

# Bar

### 基本介绍

我是Bar组件，在子包里的`README.md`可自动生成文档，访问：`http://localhost:8000/components/bar`

### demo1
通过`code`标签引入代码文件的方式：

<code src='./src/index'></code>

### demo2
直接书写`jsx`和`tsx`的代码块的方式：

```jsx
import React from "react";
import Foo from "@tao/bar";

export default () => {
  return (
    <div>
      <h1>Hello Bar!</h1>
    </div>
  )
};
```
