import Api from '../store/modules/api'
import Example from '../store/modules/example';

export type Store = {
    api: Api
    example: Example;
};

const store: Store = {
    api: Api.getInstance(),
    example: Example.getInstance(),
};

export default store;