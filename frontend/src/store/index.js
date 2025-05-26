import { createStore } from 'vuex';
import auth from './modules/auth';
import task from './modules/task';

export default createStore({
  modules: {
    auth,
    task,
  },
});
