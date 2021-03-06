import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['navbar-header'],

  auth: Ember.inject.service(),
  user: Ember.computed.alias('auth.credentials.email'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),
  isEngineer: Ember.computed.alias('auth.isEngineer'),
  isRecruiter: Ember.computed.alias('auth.isRecruiter')
});
