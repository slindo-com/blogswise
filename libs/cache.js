class Cache {


  constructor() {
    this.data = {}
  }


  getList(ids, userID) {

    var cached = [];
    var notCached = [];

    ids.forEach((id) => {
      var obj = this.get(id, userID);
      if (obj) {
        cached.push(obj);
      } else {
        notCached.push(id)
      }
      return { cached, notCached };
    });
  }



  get(id, userID) {
    if (this.data[id] && this.data[id].user == userID) {
      return this.data[id].obj;
    } else {
      return false;
    }
  }


  set(id, obj, userID) {

    this.data[id] = {
      obj: obj,
      user: userID,
      expires: Date.now() + (15 * 60 * 1000)
    }
  }
};

module.exports = Cache;
