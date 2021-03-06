import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  userId: DS.attr('number'),
  website: DS.attr('string'),
  user: DS.belongsTo('user'),
  conversation: DS.hasMany('conversation')
});
