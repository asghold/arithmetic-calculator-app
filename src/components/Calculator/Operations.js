const operatorsArr = ['*', '/', '+', '-']

const actions = {
    handleClear() {
        console.clear();
        return "";
    },


    addtoInputNum(state, param) {
    if ((state[state.length - 1] === '-' && param === '-') || (operatorsArr.includes(state[state.length - 1]) && operatorsArr.includes(param))) {
      return state;
    } else {
      return state + param;
    }
  },
  addtoInputOpr(state, param) {
    if (state === "" || (operatorsArr.includes(state[state.length - 1]) && operatorsArr.includes(param))) {
      return state;
    } else {
      return state + param;
    }
  },

  handleEqual(state) {
    if (state === "") {
      return state;
    } else {
      {/*console.log(math.evaluate(state));
      return math.evaluate(state);*/}
      return state;
    }
  },

  handleRoot(state) {
    if (state === "") {
      return state;
    } else {
      return state;{/*Math.sqrt(state);*/}
    }
  },
  
}

const reducer = (value, action) => {
    let type = action.type;
    let param = action.param;

    

    return actions[type](value,param);

}

export default reducer;