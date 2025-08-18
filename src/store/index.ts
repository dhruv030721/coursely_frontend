import { RootState, store } from './store';

import authReducer from './slices/auth.slice';
import courseReducer from './slices/course.slice';

export { authReducer, courseReducer, store, type RootState };
