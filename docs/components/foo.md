---
nav: 组件
toc: content
---

# Foo

### 基本介绍

Foo组件介绍...

### 代码演示

```js
<div>
  <div>基本用法</div>
  <br />
  <Foo />
</div>
```

### API

| 参数 | 说明   | 默认值 | 是否必填 | 类型   |
| ---- | ------ |-----| -------- | ------ |
| text | 文案 | `foo` | 否       | string |

### demo1
通过`code`标签引入代码文件的方式：

<code src='../../packages/foo/demo' description="demo 描述"></code>

### demo2
直接书写`jsx`和`tsx`的代码块的方式：

```jsx
import React from "react";
import Foo from "@tao/foo";

export default () => {
  return (
    <div>
      <h1>Hello dumi!</h1>
      <Foo text="Foo text" />
    </div>
  )
};
```
