import Ember from 'ember';

export default Ember.Component.extend({
tagName: 'tr',
onInit: function() {
console.log(this.get('conversation'))
}.on('init'),
actions: {
  deleteConvo() {
    this.sendAction('deleteConvo', this.get('conversation'));
  }
}
});
