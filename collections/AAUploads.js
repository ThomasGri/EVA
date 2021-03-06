Uploads = new FS.Collection("uploads", {
  stores: [new FS.Store.GridFS("uploads", {})]
});

Uploads.allow({
  insert: function(userId, doc){
    return !!userId;
  }, download: function(userId, doc){
    return !!userId;
  }, update: function(userId, doc){
    return !!userId;
  },
  remove: function(userId, doc){
    return !!userId;
  }
});