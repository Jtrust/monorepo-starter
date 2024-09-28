import {Button} from 'antd';

import Foo from '@tao/foo';

const Bar = () => {
    return (
        <div>
            <div>子包@tao/bar 依赖另一个子包@tao/foo 示例</div>
            <Foo />
            <Button>Button</Button>
        </div>
    );
};

export default Bar;
