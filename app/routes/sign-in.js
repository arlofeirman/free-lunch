import Ember from 'ember';
import RSVP from 'rsvp';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({
  auth: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  credentials: storageFor('auth'),

  model () {
    return RSVP.Promise.resolve({});
  },

  actions: {
    signIn (credentials) {
      return this.get('auth').signIn(credentials)
      .then(() => {
        const typeOfUser = this.get('credentials.content.type');
        if (typeOfUser === 'engineer'){
          this.transitionTo('engineer');
        } else if (typeOfUser === 'recruiter') {
          this.transitionTo('recruiter');
        }
      })
      .then(() => this.get('flashMessages').success('Thanks for signing in!'))
      .catch(() => {
        this.get('flashMessages')
        .danger('There was a problem. Please try again.');
      });
    },
  },
});
