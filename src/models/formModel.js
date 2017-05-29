
export default {
  namespace: 'formModel',
  state: {
    topic: '卷的标题',
    illustrate: '卷说明',
    id: 0,
    question: [
      // 单选0
      {
        qId: 0,
        type: '单选',
        title: '这是一个单选题',
        isReuired: false,
        options: ['Apple', 'Pear', 'Orange'],
        defaultValue: ['Apple'],
      },
      // 多选1
      {
        qId: 1,
        type: '多选',
        title: '这是一个多选题',
        isReuired: true,
        options: ['Apple', 'Pear', 'Orange'],
        defaultValue: ['Apple'],
      },
      // 评分2
      {
        qId: 2,
        type: '评分',
        title: '这是一个评分',
        isReuired: true,
        options: [
          '选项1', '选项2', '选项3',
        ],
      },
      // 填空题3
      {
        qId: 3,
        type: '填空',
        title: '这是一个填空题___,_____,__',
        isReuired: true,
        options: [
          'number',
          'text',
        ],
      },
      // 多行文本4
      {
        qId: 4,
        type: '文本',
        title: '这是一个多行文本',
        isReuired: false,
        options: [
          [10, 100],
        ],
      },
    ],
  },
  reducers: {
    changeTopic(state, { payload }) {
      return {
        ...state,
        topic: payload,
      };
    },
    changeIllustrate(state, { payload }) {
      return {
        ...state,
        illustrate: payload,
      };
    },
  },
  effects: {},
  subscriptions: {},
};
