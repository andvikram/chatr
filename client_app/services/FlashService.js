const flashMessageObj = {
  typeFunc: null,
  msgFunc: null,
  set: function(type, message) {
    this.typeFunc(type);
    this.msgFunc(message);
  },
  setFuncs: function(func1, func2) {
    if (this.typeFunc == null && this.msgFunc == null) {
      this.typeFunc = func1;
      this.msgFunc = func2;
    }
  }
};

export default flashMessageObj;
