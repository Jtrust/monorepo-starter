import {FC} from 'react';
import {Button} from 'antd';

import './index.less';

interface FooProps {
  text?: number;
}

const Foo: FC<FooProps> = ({text = 'foo'}) => {
    return (
        <div className="tao-foo-container">
            <Button>{text}</Button>
        </div>
    );
};

export default Foo;
