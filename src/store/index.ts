import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import clone from '@/lib/clone'
import createId from '../lib/ctreateId';
import router from '@/router'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    output: '0.00',
    recordList: [],
    createRecordError: null,
    createTagError: null,
    tagList: [],
    currentTag: undefined
  } as RootState,
  mutations: {
    setCurrentTag(state, id: string) {

      state.currentTag = state.tagList.filter(t => t.id === id)[0]
    },
    updateTag(state, payload: { id: string; name: string }) {
      const { id, name } = payload

      const idList = state.tagList.map(item => item.id)

      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name)
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复了')
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0]
          tag.name = name
          store.commit('saveTag')
        }
      }
    },
    removeTag(state, id: string) {
      let index = -1
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1)
        store.commit('saveTag')
        router.back()
      } else {
        window.alert('删除失败')
      }

    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || "[]");
    },
    createRecord(state, record) {
      const record2: RecordItem = clone(record);
      record2.createdAt = record2.createdAt || new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecords')

    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || "[]");
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createdTag', '衣')
        store.commit('createdTag', '食')
        store.commit('createdTag', '住')
        store.commit('createdTag', '行')

      }
    },
    createdTag(state, name: string) {
      state.createTagError = null
      const names = state.tagList.map(item => item.name)
      if (names.indexOf(name) >= 0) {

        state.createTagError = new Error('tag name duplicated')
        return
      }
      const id = createId().toString()
      state.tagList.push({ id, name: name })
      store.commit('saveTag')

    },
    saveTag(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    inputContent(state, input: string) {

      if (store.state.output.length === 16) {
        return;
      }
      if (store.state.output === "0.00") {
        if ("0123456789".indexOf(input) >= 0) {
          store.state.output = input;
        } else {
          store.state.output += input;
        }
        return;
      }
      if (store.state.output.indexOf(".") >= 0 && input === ".") {
        return;
      }
      store.state.output += input;
    },
    removeAmount(state) {
      if (store.state.output.length === 1) {
        store.state.output = "0.00";
      } else if (store.state.output === "0.00") {
        return
      } else {
        store.state.output = store.state.output.slice(0, -1);
      }
    },
    clearAmount(state) {
      store.state.output = "0.00";
    }
  },

  actions: {
  },
  modules: {
  }
})

export default store