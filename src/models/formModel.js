import R from 'ramda';

export default {
  namespace: 'formModel',
  state: {
    topic: '卷的标题',
    illustrate: '卷说明',
    id: 0,
    optionChooseBox: 0,
    chooseBoxShow: -2,
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
    changeBoxshow(state,{payload}){
      return {
        ...state,
        chooseBoxShow: payload,
      }
    },
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
    changQuestion(state, { payload }) {
      return R.assocPath(['question', R.findIndex(R.propEq('qId', payload.qId), state.question)], payload)(state);
    },
    delQuestion(state, { payload }) {
      return R.dissocPath(['question', R.findIndex(R.propEq('qId', payload), state.question)])(state);
    },
    addQuestion(state, { payload }) {
      return {
        ...state,
        question: R.insert(R.findIndex(R.propEq('qId', payload.thisqId), state.question) + 1, { ...payload, 
qId:
          R.reduce((a,b) =>  {
            return Math.max(a, b.qId);
          }, 0)(state.question) + 1 })(state.question),
      };
    },
    addOptionItem(state, { payload }) {
      // 1、根据id找到question下标
      // 2、取出question对象的option数组
      // 3、option数组增加一个value
      // 4、把新的option数组更新到question对象
      // 5、把新的question更新到state
      // var index = R.findIndex(R.propEq("qId", payload),state.question);
      // if(index > -1)
      // {
      //   var optionList = state.question[index].options;
      //   optionList = R.append("增加选项", optionList);
      //   var questionItem = R.assocPath(['options'], optionList, state.question[index]);
      //   var stateTmp = R.assocPath(['question', index],questionItem, state);
      //   return stateTmp;
      // }
      // else
      // {
      //   console.log("未找到questionItem")
      // }

      let index = R.findIndex(R.propEq('qId', payload), state.question);
      let optionList = state.question[index].options;
      const num = optionList.reduce((a, b) => {
        if (/^选项(\d+)$/.exec(b) === null) {
            return a;
          } else {
            return Math.max(a, /^选项(\d+)$/.exec(b)[1]);
          }
      }, 0) + 1;


      if (index > -1)      {
        optionList = R.append(`选项${num}`, optionList);
        let questionItem = R.assocPath(['options'], optionList, state.question[index]);
        let stateTmp = R.assocPath(['question', index], questionItem, state);
        return stateTmp;
      }      else      {
        console.log('未找到questionItem');
      }
    },
    removeOptionItem(state, { payload }) {
          // console.log(payload);
          // var index = R.findIndex(R.propEq("qId", payload),state.question);
          // if(index > -1)
          // {
          //   var optionList = state.question[index].options;
          //   optionList = R.remove("index",1)(optionList);
          //   var questionItem = R.assocPath(['options'], optionList, state.question[index]);
          //   var stateTmp = R.assocPath(['question', index],questionItem, state);
          //   console.log(stateTmp)
          //   return stateTmp;
          // }
          // else
          // {
          //   console.log("未找到questionItem")
          // }
      let questionIndex = R.findIndex(R.propEq('qId', payload.qId), state.question);
      console.log('+++++++++++++' + questionIndex);
      console.log('+++++++++++++' + state);
      if (questionIndex > -1)          {
            let optionList = state.question[questionIndex].options;
            optionList = R.remove(payload.index, 1)(optionList);
            console.log('+++++++++++++' + optionList);
            let questionItem = R.assocPath(['options'], optionList, state.question[questionIndex]);
            let stateTmp = R.assocPath(['question', questionIndex], questionItem, state);
            console.log('*************' + stateTmp);
            return stateTmp;
          }
    },
  },
  effects: {},
  subscriptions: {},
};
