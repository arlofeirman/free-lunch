import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),
  user: Ember.computed.alias('auth.credentials.email'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),
  isEngineer: Ember.computed.alias('auth.isEngineer'),
  isRecruiter: Ember.computed.alias('auth.isRecruiter'),
  classNames: ['signup-form-container'],

  passwords: {},
  clearnOnInit: function() {
    this.set('passwords', {});
  }.on('init'),
  actions: {
    submit () {
      this.sendAction('submit', this.get('passwords'));
    },

    reset () {
      this.set('passwords', {});
    },
  },
});
